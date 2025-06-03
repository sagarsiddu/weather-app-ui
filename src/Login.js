import React from "react";

const Login = () => {
    const handleLogin = () => {
        window.location.href = "http://localhost:8084/oauth2/authorization/github";
    };

    return (
        <button onClick={handleLogin} style={{ padding: "10px 20px", fontSize: "16px" }}>
            Login with GitHub
        </button>
    );
};

export default Login;