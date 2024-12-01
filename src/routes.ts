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
  path: "/",
  component: lazyRouteComponent(() => import("@/modules/dashboard")),
  getParentRoute: () => rootRoute,
});

const clinicScheduleRoute = createRoute({
  path: "/clinicSchedule",
  component: lazyRouteComponent(() => import("@/modules/clinicSchedule")),
  getParentRoute: () => rootRoute,
});

const registerSRroute = createRoute({
  path: "/seniorResidentForm",
  component: lazyRouteComponent(() => import("@/modules/registerSR/create")),
  getParentRoute: () => rootRoute,
});

const srDetailsRoute = createRoute({
  path: "/seniorResidentForm/:id",
  component: lazyRouteComponent(() => import("@/modules/registerSR/details")),
  getParentRoute: () => rootRoute,
});

const scheduleSRroute = createRoute({
  path: "/scheduleSR",
  component: lazyRouteComponent(() => import("@/modules/scheduleSR")),
  getParentRoute: () => rootRoute,
});

const srListRoute = createRoute({
  path: "/srList",
  component: lazyRouteComponent(() => import("@/modules/srList")),
  getParentRoute: () => rootRoute,
});

const roomFormRoute = createRoute({
  path: "/roomForm",
  component: lazyRouteComponent(() => import("@/modules/room/create")),
  getParentRoute: () => rootRoute,
});

const approvedDoctorRoute = createRoute({
  path: "/approvedDoctor",
  component: lazyRouteComponent(
    () => import("@/modules/approvedDoctor/create"),
  ),
  getParentRoute: () => rootRoute,
});

// Export Routes
export default rootRoute.addChildren([
  dashboardRoute,
  registerSRroute,
  scheduleSRroute,
  srListRoute,
  roomFormRoute,
  approvedDoctorRoute,
  clinicScheduleRoute,
  srDetailsRoute,
]);
