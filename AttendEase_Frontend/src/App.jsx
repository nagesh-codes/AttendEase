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
import { SystemAdminAuthProvider } from "./context/SystemAdminAuthContext";
import RequireSystemAdmin from "./components/pages/RequireSystemAdmin";
import SysAdminVerifyOtp from "./components/pages/SysAdminVerifyOtp";
import CollegeAdmin from "./components/pages/CollegeAdmin";
import TeacherPanel from "./components/pages/TeacherPanel";

function App() {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="dark"
        stacked
      />
      <SystemAdminAuthProvider>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/signup"} element={<Signup />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/apply-college"} element={<ApplyCollege />} />
          <Route
            path={"/system-admin-panel"}
            element={
              <RequireSystemAdmin>
                <SystemAdmin />
              </RequireSystemAdmin>
            }
          />
          <Route path={"/system-admin-login"} element={<SysAdminLogin />} />
          <Route path={"/system-admin-login/verify"} element={<SysAdminVerifyOtp />} />
          <Route path={"/college-admin-panel"} element={<CollegeAdmin />} />
          <Route path={"/teacher-panel"} element={<TeacherPanel />} />
          <Route path={"*"} element={<ApplicationList />} />
        </Routes>
      </SystemAdminAuthProvider>
    </>
  );
}

export default App;
