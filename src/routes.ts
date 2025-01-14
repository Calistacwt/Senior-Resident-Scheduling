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

// Senior Resident Form
const registerSRroute = createRoute({
  path: "/seniorResidentForm",
  component: lazyRouteComponent(() => import("@/modules/registerSR/create")),
  getParentRoute: () => rootRoute,
});

const updateSRroute = createRoute({
  path: "/seniorResidentForm/$id/edit",
  component: lazyRouteComponent(() => import("@/modules/registerSR/update")),
  getParentRoute: () => rootRoute,
});

const scheduleSRroute = createRoute({
  path: "/scheduleSR",
  component: lazyRouteComponent(() => import("@/modules/scheduleSR/create")),
  getParentRoute: () => rootRoute,
});

const updatescheduleSRroute = createRoute({
  path: "/scheduleSR/$id/edit",
  component: lazyRouteComponent(() => import("@/modules/scheduleSR/update")),
  getParentRoute: () => rootRoute,
});

const clinicScheduleRoute = createRoute({
  path: "/clinicSchedule",
  component: lazyRouteComponent(() => import("@/modules/clinicSchedule")),
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

const registerSeniorDoctorRoute = createRoute({
  path: "/seniorDoctorForm",
  component: lazyRouteComponent(() => import("@/modules/seniorDoctor/create")),
  getParentRoute: () => rootRoute,
});

const seniorDoctorListRoute = createRoute({
  path: "/seniorDoctorList",
  component: lazyRouteComponent(() => import("@/modules/seniorDoctorList")),
  getParentRoute: () => rootRoute,
});

// Export Routes
export default rootRoute.addChildren([
  dashboardRoute,
  registerSRroute,
  scheduleSRroute,
  srListRoute,
  roomFormRoute,
  registerSeniorDoctorRoute,
  clinicScheduleRoute,
  seniorDoctorListRoute,
  updateSRroute,
  updatescheduleSRroute
]);
