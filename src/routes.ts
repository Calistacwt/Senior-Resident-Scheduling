import {
  createRootRouteWithContext,
  createRoute,
  lazyRouteComponent,
} from "@tanstack/react-router";
import { RouteContext } from "./types/route";

// Root Route
const rootRoute = createRootRouteWithContext<RouteContext>()({
  component: lazyRouteComponent(() => import("@/layouts/DashboardLayout")),
});

// Dashboard Route
const dashboardRoute = createRoute({
  path: "/dashboard",
  component: lazyRouteComponent(() => import("@/modules/dashboard")),
  getParentRoute: () => rootRoute,
});

const registerSRroute = createRoute({
  path: "/registerSR",
  component: lazyRouteComponent(() => import("@/modules/registerSR")),
  getParentRoute: () => rootRoute,
});

// Export Routes
export default rootRoute.addChildren([dashboardRoute, registerSRroute]);
