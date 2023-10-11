import "./css/main.css";
import { Routes, Route, redirect } from 'react-router-dom';
import { motion } from "framer-motion";
import Main from "./Main";
import Signup from '../src/components/Signup/signup';
import Login from './components/Login/login'

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Signup />} />
       
      </Routes>
    </div>
  );
}

export default App;