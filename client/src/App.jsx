import "./App.css";
import { ToastContainer } from "react-toastify";
import { RouterProvider } from "react-router-dom";
import router from "./routes/index.jsx";
import "react-toastify/dist/ReactToastify.css";
import 'react-toastify/dist/ReactToastify.min.css';

function App() {
  return (
    <>
      <ToastContainer position="bottom-right"/>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
