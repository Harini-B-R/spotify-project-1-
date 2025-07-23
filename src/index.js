// import 'bootstrap/dist/css/bootstrap.min.css';

// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import App from "./App";
// import { AuthProvider } from "./context/AuthContext";
// import "./index.css"; // Make sure Tailwind is imported
// import { PlayerProvider } from "./context/PlayerContext";

// const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <AuthProvider>
//         <PlayerProvider>
//         <App />
//         </PlayerProvider>
//       </AuthProvider>
//     </BrowserRouter>
//   </React.StrictMode>
// );
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { PlayerProvider } from "./context/PlayerContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PlayerProvider>
          <App />
        </PlayerProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
