import logo from './logo.svg';
import './App.css';
import NavBar from './NavBar';
import { Link } from "react-router-dom";
function App() {
  return (
    <div>
      <h1 className="app-header">CRUD Application</h1>
      <NavBar/>
    </div>
    

  );
}

export default App;
