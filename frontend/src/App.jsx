import Navbar from "./components/navbar"
import Dashboard from "./components/Dashboard"
import AuthForm from "./components/AuthForm";

export default function App() {
  return (
    <div style={{
      width: "100vw"
    }}>
      <Navbar />
      <Dashboard />
    </div>
  );
}
