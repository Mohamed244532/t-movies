import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import bgImage from "../../assets/images/bg.jpg"; 
import "./auth.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = () => {
    if (!email || !password) {
      toast.error("Fields cannot be empty");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    localStorage.setItem("userEmail", email);
    toast.success("Account created successfully!");
    
    setTimeout(() => {
      navigate("/");
      window.location.reload(); 
    }, 1500);
  };

  return (
    <div className="auth-container" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="auth-box">
        <h1>Sign Up</h1>
        <div className="flex gap-2">
           <input type="text" placeholder="First Name" />
           <input type="text" placeholder="Last Name" />
        </div>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <div className="password-wrapper">
          <input type={showPass ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="button" className="eye-icon" onClick={() => setShowPass(!showPass)}>
            {showPass ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

        <button className="auth-btn" onClick={handleSignUp}>Sign Up</button>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;