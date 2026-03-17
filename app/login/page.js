"use client";

import { useState } from "react";
import Link from "next/link";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className={`auth-page ${isDark ? "auth-dark" : ""}`}>
      <div className="auth-bg-icons">
        <svg className="auth-bg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ top: "8%", left: "4%", width: "64px", color: "#1B75EB" }}>
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
        <svg className="auth-bg-icon" viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{ top: "15%", left: "26%", width: "36px", color: "#2BAFB6" }}>
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
        <svg className="auth-bg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ top: "55%", left: "5%", width: "80px", color: "#2BAFB6" }}>
          <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
          <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
          <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
        </svg>
        <svg className="auth-bg-icon" viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{ top: "78%", left: "20%", width: "44px", color: "#193862" }}>
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
        <svg className="auth-bg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ top: "6%", right: "6%", width: "72px", color: "#2BAFB6" }}>
          <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
        </svg>
        <svg className="auth-bg-icon" viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{ top: "28%", right: "4%", width: "40px", color: "#1B75EB" }}>
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
        <svg className="auth-bg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ top: "65%", right: "5%", width: "60px", color: "#193862" }}>
          <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
        </svg>
        <svg className="auth-bg-icon" viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{ top: "85%", right: "18%", width: "50px", color: "#2BAFB6" }}>
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      </div>

      <header className="auth-header">
        <div className="auth-header-inner">
          <Link href="/" className="auth-header-logo">
            <img src="/images/logo.svg" alt="Bulbul" className="auth-logo-img" />
          </Link>
          <button className="auth-theme-toggle" onClick={toggleTheme} title="Toggle dark/light mode">
            {isDark ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            )}
          </button>
        </div>
      </header>

      <div className="auth-card">
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-subtitle">Sign in to continue learning</p>

        <button className="auth-social-btn">
          <svg width="20" height="20" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" /><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,19,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" /><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" /><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" /></svg>
          Continue with Google
        </button>

        <button className="auth-social-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
          Continue with Facebook
        </button>

        <div className="auth-separator"><span>or</span></div>

        <div className="auth-form-group">
          <label className="auth-label">Email</label>
          <input type="email" className="auth-input" placeholder="name@email.com" />
        </div>

        <div className="auth-form-group">
          <label className="auth-label">Password</label>
          <div className="auth-input-wrap">
            <input type={showPassword ? "text" : "password"} className="auth-input auth-input-pass" placeholder="Enter your password" />
            <button className="auth-eye-btn" onClick={() => setShowPassword(!showPassword)} type="button">
              {showPassword ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
              )}
            </button>
          </div>
        </div>

        <div className="auth-forgot"><a href="#">Forgot password?</a></div>

        <button className="auth-btn-primary">Log in</button>

        <p className="auth-switch">Don&apos;t have an account? <Link href="/signup">Sign up</Link></p>
        <p className="auth-footer-note">By logging in, you agree to our <a href="#">Terms</a> and <a href="#">Privacy Policy</a></p>
      </div>
    </div>
  );
}
