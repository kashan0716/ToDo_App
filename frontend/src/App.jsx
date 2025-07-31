import Home from "./components/Home";
import { ToastContainer } from "react-toastify";
export default function App() {
  return (
    <div>
      <ToastContainer position="top-center" autoClose={1000} />

      <Home />
    </div>
  );
}
