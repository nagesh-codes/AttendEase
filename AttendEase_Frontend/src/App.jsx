import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Home from "./components/pages/Home";
import ApplyCollege from "./components/pages/ApplyCollege";
import SystemAdmin from "./components/pages/SystemAdmin";
import SysAdminLogin from "./components/pages/SysAdminLogin";
import ApplicationList from "./components/pages/Test";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
      />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/signup"} element={<Signup />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/apply-college"} element={<ApplyCollege />} />
        <Route path={"/SysAdminLogin"} element={<SysAdminLogin />} />
        <Route path={"/system-admin-panel"} element={<SystemAdmin />} />
        <Route path={"*"} element={<ApplicationList/>} />
      </Routes>
    </>
  );
}

export default App;
