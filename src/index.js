import { createRoot } from "react-dom/client";
import App from "./components/app/App";
import "./style/style.css";
import "./components/weather/Weather.css";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
