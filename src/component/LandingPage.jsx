import React from "react";

const LandingPage = () => {
    const changeLanguage = (event) => {
        const lang = event.target.value;
        window.location.search = `?lang=${lang}`; // Update the language parameter in the URL
    };

    const styles = {
        container: {
            position: "relative",
            zIndex: 2,
            background: 'linear-gradient(45deg, #90638c, #ebdfe9, #d5c0d1, #bea1bd, #a583a4, #92638f)',
            padding: "60px 80px",
            borderRadius: "20px",
            boxShadow: "0 12px 30px rgba(0, 0, 0, 0.5)",
            textAlign: "center",
            maxWidth: "650px",
            marginTop: "100px",
            opacity: 0,
            animation: "slideUp 1s ease-out forwards",
        },
        navbar: {
            position: "absolute",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "90%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 3,
            background: 'linear-gradient(45deg, #90638c, #ebdfe9, #d5c0d1, #bea1bd, #a583a4, #92638f)',
            padding: "10px 20px",
            borderRadius: "10px",
        },
        logo: {
            fontSize: "1.5rem",
            color: "#fff",
            fontWeight: "bold",
        },
        navLinks: {
            display: "flex",
            gap: "20px",
        },
        btn: {
            padding: "10px 20px",
            fontSize: "1rem",
            borderRadius: "20px",
            background: 'linear-gradient(45deg, #ebdfe9, #d5c0d1, #bea1bd, #a583a4, #92638f)',
            color: "#fff",
            border: "none",
            cursor: "pointer",
            transition: "background 0.5s, transform 0.3s",
            boxShadow: "0px 4px 10px rgba(76, 175, 80, 0.3)",
        },
        btnHover: {
            background: 'linear-gradient(45deg, #90638c, #ebdfe9, #d5c0d1, #bea1bd, #a583a4, #92638f)',
            transform: "translateY(-3px)",
            boxShadow: "0px 6px 12px rgba(76, 175, 80, 0.5)",
        },
        select: {
            padding: "8px 15px",
            fontSize: "1rem",
            borderRadius: "20px",
            background: 'linear-gradient(45deg, #90638c, #ebdfe9, #d5c0d1, #bea1bd, #a583a4, #92638f)',
            color: "#fff",
            border: "none",
            cursor: "pointer",
            transition: "background 0.5s",
            boxShadow: "0px 4px 10px rgba(76, 175, 80, 0.3)",
            appearance: "none",
        },
        selectHover: {
            background: "linear-gradient(90deg, #4caf50, #8bc34a)",
        },
        h1: {
            fontSize: "3rem",
            color: "#fff",
            marginBottom: "20px",
            textTransform: "uppercase",
            letterSpacing: "2px",
        },
        p: {
            fontSize: "1.2rem",
            color: "#ddd",
            marginBottom: "40px",
            lineHeight: "1.6",
        },
    };

    return (
        <div>
            <style>
                {`
                    body {
                        font-family: 'Poppins', sans-serif;
                        background: "linear-gradient(90deg, #4caf50, #8bc34a)",
                        background-size: cover;
                        height: 100vh;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        position: relative;
                        overflow: hidden;
                    }

                    body::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0, 0, 0, 0.7); /* Dark overlay */
                        z-index: 1;
                    }

                    @keyframes slideUp {
                        0% {
                            opacity: 0;
                            transform: translateY(50px);
                        }
                        100% {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                `}
            </style>

            <div className="navbar" style={styles.navbar}>
                <div className="logo" style={styles.logo}>Task Management System</div>
                <div className="nav-links" style={styles.navLinks}>
                    <button className="btn" style={styles.btn} onClick={() => (window.location.href = "/signin")}>
                        Login
                    </button>
                    <button className="btn" style={styles.btn} onClick={() => (window.location.href = "/signup")}>
                        Sign Up
                    </button>
                    <select
                        style={styles.select}
                        onChange={changeLanguage}
                    >
                        <option value="">Choose Language</option>
                        <option value="en">English</option>
                        <option value="fr">French</option>
                    </select>
                </div>
            </div>

            <div className="container" style={styles.container}>
                <h1>Welcome to Task Management System</h1>
                <p>
                    Manage your tasks efficiently and stay organized with the Task Management System.
                </p>
            </div>
        </div>
    );
};

export default LandingPage;
