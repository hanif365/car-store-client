import "./App.css";
import Navbar from "./components/shared/Navbar/Navbar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
