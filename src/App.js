import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import SignupPage from "./components/core/SignupPage";
import LoginPage from "./components/core/LoginPage";
import VerifyEmail from "./pages/VerifyEmail";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <div className="" >
    {/* Hello World */}
      <Routes>
        <Route path="/" element={<Home/>} />

        <Route path="signupPage" element={<SignupPage/>} />
        <Route path="loginPage" element={<LoginPage />} />
        <Route path="verify-email" element={<VerifyEmail />} />
        <Route path="main-page" element={<MainPage />} />
      </Routes>
    </div>
  );
}

export default App;
