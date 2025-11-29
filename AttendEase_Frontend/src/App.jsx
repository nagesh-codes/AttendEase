import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import './App.css'
import Login from './components/pages/Login'
import Signup from './components/pages/Signup'
import Home from './components/pages/Home';

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
        <Route path={"/"} element={<Login />} />
        <Route path={"/signup"} element={<Signup />} />
        <Route path={"/home"} element={<Home />} />
      </Routes>
    </>
  )
}

export default App
