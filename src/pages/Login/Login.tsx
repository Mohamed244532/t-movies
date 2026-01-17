import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import bgImage from "../../assets/images/bg.jpg"; 
import "./auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = () => {
    if (email && password) {
      localStorage.setItem("userEmail", email);
      toast.success("Welcome back to tMovies!");
      
      setTimeout(() => {
        navigate("/");
        window.location.reload(); 
      }, 1500);
    } else {
      toast.error("Please fill in all fields");
    }
  };

  return (
    <div className="auth-container" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="auth-box">
        <h1>Sign In</h1>
        <input 
          type="text" 
          placeholder="Email address" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <div className="password-wrapper">
          <input 
            type={showPassword ? "text" : "password"} 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        <button className="auth-btn" onClick={handleSignIn}>Sign In</button>

        <div className="auth-options">
          <label className="checkbox-label"><input type="checkbox" /> Remember me</label>
          <span className="need-help">Need help?</span>
        </div>

        <p className="auth-switch">
          New to tMovies? <Link to="/register">Sign up now</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;