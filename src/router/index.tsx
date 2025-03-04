import { IndexPage } from "../pages/IndexPage";
import Translate from "../pages/translate";
import Setting from "../pages/setting";
import Deepseek from "../pages/deepseek";

const routes = [
  {
    path: "/",
    element: <IndexPage />,
    children: [
      {
        index: true, // 👈 默认子路由
        element: <Translate />, // 👈 访问 `/` 默认显示翻译页面
      },
      {
        path: "translate",
        element: <Translate />,
      },
      {
        path: "deepseek",
        element: <Deepseek />,
      },
      {
        path: "setting",
        element: <Setting />,
      },
    ],
  },
  {
    path: "*",
    element: <div>404</div>,
  },
];

export default routes;
