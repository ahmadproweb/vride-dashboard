import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const email = 'dmispvt@gmail.com';
const passKey = 'requeim243';


const Login = () => {
  const [inputValue, setInputValue] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(()=>{
    localStorage.removeItem('key')

  },[])

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    const payload = { email: inputValue, password };

    if(payload.email.trim() === email && payload.password.trim() === passKey){
        toast.success('Login successful');
        localStorage.setItem('key','jami243')
         setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1000);
    }
    else{
      toast.error('Invalid credentials')
    }

  
  };

  return (
    <>
      <div className="auth-container">
        <form className="auth-box" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <p>Please login Admin</p>

          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ?  <FaEye />: <FaEyeSlash /> }
            </span>
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
