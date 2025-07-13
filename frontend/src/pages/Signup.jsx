import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import "../styles/signup.css";

const Signup = () => {
    // State for handling user messages and message type
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const navigate = useNavigate();

    // Handles the signup process
    const signupHandler = async () => {
        // Getting form values
        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        // Log inputs (for debugging only — remove in production)
        console.log(username, email, password);

        try {
            // API request to signup endpoint
            const response = await axios.post("http://localhost:5001/user/signup", {
                username,
                email,
                password
            });

            const data = response.data;

            // On success, show message and redirect
            setMessage(data.message + " Redirecting...");
            setMessageType("success");

            // Redirect to login page after short delay
            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (error) {
            // Handle errors gracefully
            if (error?.response?.data) {
                setMessage(error.response.data.message);
            } else {
                setMessage("Something went wrong");
            }
            setMessageType("error");
        }
    };

    return (
        <div className="signup-wrapper">
            <div className="signup_container">
                {/* Signup Form */}
                <input type="text" id="username" placeholder="Enter username" />
                <br />
                <input type="email" id="email" placeholder="Enter email" />
                <br />
                <input type="password" id="password" placeholder="Enter password" />
                <br />
                <button onClick={signupHandler}>Signup</button>

                {/* Feedback message */}
                {message && (
                    <p className={messageType === "success" ? "success-message" : "error-message"}>
                        {message}
                    </p>
                )}

                {/* Navigation link */}
                <br />
                <Link to="/login">Already have an account?</Link>
            </div>
        </div>
    );
};

export default Signup;
