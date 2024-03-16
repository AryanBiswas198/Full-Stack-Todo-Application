import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import SignupModal from "./components/core/SignupModal";
import LoginModal from "./components/core/LoginModal";
import VerifyEmail from "./pages/VerifyEmail";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <div className="" >
    {/* Hello World */}
      <Routes>
        <Route path="/" element={<Home/>} />

        <Route path="signup" element={<SignupModal/>} />
        <Route path="login" element={<LoginModal />} />
        <Route path="verify-email" element={<VerifyEmail />} />
        <Route path="main-page" element={<MainPage />} />
      </Routes>
    </div>
  );
}

export default App;
