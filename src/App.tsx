import routeTree from "@/routes";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { appName } from "@/config/env";
import "@/styles/index.css";

const router = createRouter({
  routeTree,
  caseSensitive: true,
  defaultPreload: "intent",
  context: {
    title: appName,
  },
});
const App = () => <RouterProvider router={router} />;

export default App;
