import "./App.css";
import Navbar from "./components/shared/Navbar/Navbar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <Outlet />
    </>
  );
}

export default App;
