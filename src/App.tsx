import { Routes, Route } from "react-router-dom";
import SideNavbar from "./layout/SideNavbar.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import { Toaster } from "react-hot-toast";
import TopNavbar from "./layout/TopNavbar.jsx";
import ProtectedRoute from "./utils/ProtectedRoute.js";
import AdManager from "./pages/AdManager.js";
import AdsDisplay from "./pages/YourAds.js";
import Bookings from "./pages/Bookings.js";
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
              <ProtectedRoute>

                <Home />
              </ProtectedRoute>
            }
          />  <Route
            path="/"
            element={
              <ProtectedRoute>

                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ads-manager"
            element={
              <ProtectedRoute>

                <AdManager />
              </ProtectedRoute>
            }
          />
           <Route
            path="/ads"
            element={
              <ProtectedRoute>

                <AdsDisplay />
              </ProtectedRoute>
            }
          />
           <Route
            path="/bookngs"
            element={
              <ProtectedRoute>

                <Bookings />
              </ProtectedRoute>
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
