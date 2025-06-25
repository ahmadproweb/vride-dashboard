import { Routes, Route ,  Navigate } from "react-router-dom";
import SideNavbar from "./layout/SideNavbar.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import { Toaster } from "react-hot-toast";
import TopNavbar from "./layout/TopNavbar.jsx";
function App() {

  return (
    <>
      <Toaster
        containerStyle={{
          zIndex: 99999,
        }}
      />
      <TopNavbar />
      <div className="main-layout">
        <SideNavbar />
        <Routes>
          <Route
            path="/dashboard"
            element={
              <Home />
            }
          />  <Route
            path="/"
            element={
              <Home />
            }
          />
          <Route
            path="/login"
            element={<Login />}
          />
        </Routes>
      </div>
    </>
  )
}

export default App
