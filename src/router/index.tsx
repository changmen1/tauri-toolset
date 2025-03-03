import { IndexPage } from "../pages/IndexPage";
import Translate from "../pages/translate";
import Xiaoshuo from "../pages/xiaoshuo";
import Setting from "../pages/setting";

const routes = [
  {
    path: "/",
    element: <IndexPage />,
    children: [
      {
        path: "/translate",
        element: <Translate />,
      },
      {
        path: "/xiaoshuo",
        element: <Xiaoshuo />,
      },
      {
        path: "/setting",
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
