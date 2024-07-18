import "./App.css";
// import { ToastContainer } from "react-toastify";
import { RouterProvider } from "react-router-dom";
import router from "./routes/index.jsx";

function App() {
  return (
    <>
      {/* <ToastContainer position="bottom-right"/> */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
