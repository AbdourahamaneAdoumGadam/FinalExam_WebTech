import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import 'font-awesome/css/font-awesome.min.css';
import { FaGoogle, FaFacebook } from 'react-icons/fa';

const SignIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { signIn, loginWithGoogle, loginWithFacebook } = useAuth(); // Add social login methods here

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await signIn(username, password);  // Assuming signIn is async
            if (!user) {
                setError("Invalid credentials");
                return;
            }
            navigate("/dashboard");
        } catch (error) {
            setError("An error occurred. Please try again.");
        }
    };

    const handleSocialLogin = async (platform) => {
        try {
            if (platform === "google") {
                await loginWithGoogle();  // You should implement this function in your AuthContext
            } else if (platform === "facebook") {
                await loginWithFacebook();  // Implement Facebook login logic
            }
            navigate("/dashboard");
        } catch (error) {
            setError("Failed to login with social account");
        }
    };

    return (
        <div
            className="signin-container"
            style={{
                background: 'linear-gradient(45deg, #90638c, #ebdfe9, #d5c0d1, #bea1bd, #a583a4, #92638f)',
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                transition: "background 0.5s ease",
            }}
        >
            <section
                style={{
                    maxWidth: "400px",
                    width: "100%",
                    backgroundColor: "#d5c0d1", // Dark gray background for the form section
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    borderRadius: "15px",
                    padding: "40px 50px",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
                    margin: "20px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    transition: "all 0.3s ease",
                }}
            >
                <h1 style={{ fontSize: "2.5rem", color: "#fff", textAlign: "center", marginBottom: "20px", fontWeight: "bold" }}>Sign In</h1>
                {error && <p className="error" style={{ color: "#90638c", fontSize: "1rem", marginBottom: "20px" }}>{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="form-grid" style={{ width: "100%" }}>
                        <div className="inputbox" style={{ position: "relative", marginBottom: "20px", borderBottom: "2px solid #fff", paddingBottom: "10px" }}>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                style={{
                                    width: "100%",
                                    height: "40px",
                                    background: "transparent",
                                    border: "none",
                                    outline: "none",
                                    fontSize: "1rem",
                                    padding: "0 35px 0 10px",
                                    color: "#fff",
                                    transition: "all 0.3s ease",
                                }}
                            />
                            <label
                                style={{
                                    position: "absolute",
                                    top: "-10px",
                                    left: "10px",
                                    color: "#fff",
                                    fontSize: "1rem",
                                    pointerEvents: "none",
                                    transition: "all 0.3s ease",
                                }}
                            >
                                Username
                            </label>
                        </div>
                        <div className="inputbox" style={{ position: "relative", marginBottom: "20px", borderBottom: "2px solid #fff", paddingBottom: "10px" }}>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={{
                                    width: "100%",
                                    height: "40px",
                                    background: "transparent",
                                    border: "none",
                                    outline: "none",
                                    fontSize: "1rem",
                                    padding: "0 35px 0 10px",
                                    color: "#fff",
                                    transition: "all 0.3s ease",
                                }}
                            />
                            <label
                                style={{
                                    position: "absolute",
                                    top: "-10px",
                                    left: "10px",
                                    color: "#fff",
                                    fontSize: "1rem",
                                    pointerEvents: "none",
                                    transition: "all 0.3s ease",
                                }}
                            >
                                Password
                            </label>
                        </div>
                    </div>

                    <button
                        className="submit-btn"
                        type="submit"
                        style={{
                            width: "80%",
                            height: "45px",
                            backgroundColor: "#90638c", // Orange button color
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            fontSize: "1.1rem",
                            transition: "all 0.3s ease",
                            marginTop: "20px",
                            boxShadow: "0 4px 10px rgba(255, 152, 0, 0.3)",
                        }}
                    >
                        Sign In
                    </button>
                </form>

                <div className="social-login" style={{ display: "flex", justifyContent: "space-between", width: "100%", marginTop: "30px" }}>
                    <div
                        className="social-btn"
                        onClick={() => handleSocialLogin("google")}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "28%",
                            padding: "12px",
                            borderRadius: "5px",
                            cursor: "pointer",
                            backgroundColor: "#d5c0d1", // Google red color
                            color: "#fff",
                            fontWeight: "bold",
                            transition: "0.3s",
                            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <FaGoogle size={20} />
                        <span style={{ marginLeft: "5px" }}></span>
                    </div>
                    <div
                        className="social-btn"
                        onClick={() => handleSocialLogin("facebook")}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "28%",
                            padding: "12px",
                            borderRadius: "5px",
                            cursor: "pointer",
                            backgroundColor: "#d5c0d1", // Facebook blue color
                            color: "#fff",
                            fontWeight: "bold",
                            transition: "0.3s",
                            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <FaFacebook size={20} />
                        <span style={{ marginLeft: "5px" }}></span>
                    </div>
                </div>

                <div className="register" style={{ marginTop: "20px", textAlign: "center" }}>
                    <p style={{ color: "#fff" }}>
                        Don't have an account? <Link to="/signup" style={{ color: "#90638c", fontWeight: "bold" }}>Sign Up</Link>
                    </p>
                    <p>
                        <Link to="/forgot-password" style={{ color: "#fff", fontWeight: "bold" }}>Forgot Password?</Link>
                    </p>
                </div>
            </section>
        </div>
    );
};

export default SignIn;
