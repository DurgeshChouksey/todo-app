import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/login.css";
const BASE_URL = import.meta.env.VITE_API_URL;

const Login = () => {
    // State to show error or success messages
    const [errMessage, setErrMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const navigate = useNavigate();

    // Handler to process login
    const loginHandler = async () => {
        // Fetch values from input fields
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        try {
            // Send login request to backend
            const response = await axios.post(`${BASE_URL}/login`, {
                username,
                password
            }, {
                withCredentials: true,
            });

            const data = response.data;

            // Save token and user in local storage
            localStorage.setItem("userInfo", JSON.stringify({
                token: data.token,
                user: data.user
            }));

            // Success message and redirection
            setErrMessage("Logged in successfully...");
            setMessageType("success");

            setTimeout(() => {
                navigate("/dashboard");
            }, 1500);
        } catch (error) {
            // Error handling
            if (error?.response?.data) {
                setErrMessage(error.response.data.message);
            } else {
                setErrMessage("Something went wrong!");
            }
            setMessageType("error");
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login_container">
                {/* Login form */}
                <input type="text" id="username" placeholder="Enter username" />
                <br />
                <input type="password" id="password" placeholder="Enter password" />
                <br />
                <button onClick={loginHandler}>Login</button>

                {/* Feedback message */}
                {errMessage && (
                    <p className={messageType === "success" ? "success-message" : "error-message"}>
                        {errMessage}
                    </p>
                )}

                {/* Navigation link */}
                <Link to="/signup">Don't have an account?</Link>
            </div>
        </div>
    );
};

export default Login;
