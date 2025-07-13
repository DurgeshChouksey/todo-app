import axios from "axios";

// Custom axios wrapper to handle token-based authentication + auto-refresh
export const axiosWiithAuth = async (config) => {
  const BASE_URL = "http://localhost:5001";

  // Step 1: Get token from localStorage
  const userInfoRaw = localStorage.getItem("userInfo");
  let userInfo = {};

  try {
    userInfo = JSON.parse(userInfoRaw);
  } catch (e) {
    console.error("Invalid JSON in localStorage userInfo:", userInfoRaw);
  }

  const token = userInfo?.token;

  try {
    // Step 2: Make the original request with access token
    const response = await axios({
      ...config,
      headers: {
        ...config?.headers,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;

  } catch (error) {
    // Step 3: If 401 Unauthorized → Try refreshing token
    if (error.response?.status === 401) {
      try {
        // Step 4: Refresh token using /refresh endpoint
        const refResponse = await axios.post(
          `${BASE_URL}/user/refresh`,
          {},
          { withCredentials: true }
        );

        // Step 5: Save new token in localStorage
        const updatedUserInfo = {
          ...userInfo,
          token: refResponse.data.token,
        };
        localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));

        // Step 6: Retry original request with new token
        const newResponse = await axios({
          ...config,
          headers: {
            Authorization: `Bearer ${refResponse.data.token}`,
            "Content-Type": "application/json",
          },
        });

        return newResponse.data;

      } catch (refreshError) {
        // Step 7: If refresh also fails → Logout
        localStorage.removeItem("userInfo");
        window.location.href = "/login";
        throw refreshError;
      }
    }

    // Step 8: Handle other errors
    throw error;
  }
};
