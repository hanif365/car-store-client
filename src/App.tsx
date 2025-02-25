import "./App.css";
import Navbar from "./components/Shared/Navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const urlPath = location.pathname.split("/");
  const isDashboard = urlPath.includes("dashboard");

  return (
    <div className="min-h-screen flex flex-col">
      {!isDashboard && <Navbar />}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
