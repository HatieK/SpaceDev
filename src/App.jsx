import { useRoutes } from "react-router-dom";

import "./assets/custome.css";

import { routers } from "./router/index.jsx";

function App() {
  const element = useRoutes(routers);

  return <div>{element}</div>;
}

export default App;
