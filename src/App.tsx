import "./App.css";
import { useRoutes } from "react-router-dom";
import routes from "./router";

function App() {
  return (
    <>
      {/* 声明式路由管理 */}
      {useRoutes(routes)}
    </>
  );
}

export default App;
