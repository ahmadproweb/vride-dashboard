import { Link, useNavigate } from "react-router-dom";

const TopNavbar = () => {
  const navigator = useNavigate();
  
  return (
    <>
      <div className="top_navbar">
        <div className="logo_title">
          <div className="img">
            <img src="/logo.jpg" alt="" />
          </div>
          <span>Admin</span>
        </div>
       
        
        <button onClick={()=>{
          navigator('/login');
          localStorage.removeItem('key')

        }}>Logout</button>
        
      </div>
      <hr />
    </>
  );
};

export default TopNavbar;
