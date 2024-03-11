import logo from './logo.svg';
import './App.css';
import ChoosePage from "./pages/ChoosePage"
import { Route, Routes, Link } from "react-router-dom"
import LoginPage from "./pages/LoginClient"
import RegisterPage from './pages/RegisterPage';
import LoginWorker from './pages/LoginWorker';
import HomeClientPage from './pages/HomeClientPage';
import AddCar from './pages/AddCar';
import AddOrderPage from './pages/AddOrderPage';
import HomeWorkerPage from './pages/HomeWorkerPage';



export function App() {
  

  return (
    <Routes>
      <Route path="/" element={<ChoosePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login_worker" element={<LoginWorker />} />
      <Route path="/home_client" element={<HomeClientPage />} />
      <Route path="/client/add_order" element={<AddOrderPage />}/>
      <Route path="/client/add_car" element={<AddCar />}/>
      <Route path="/home_worker" element={<HomeWorkerPage />}/>
      
    </Routes>
  );
}

export default App;
