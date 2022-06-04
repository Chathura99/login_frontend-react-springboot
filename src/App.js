import './App.css';
import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";
import LoginPage from './pages/LoginPage';
import Dashboard from "./pages/dashboard/Dashboard";
function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LoginPage/>}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
