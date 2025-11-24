// https://reactrouter.com/start/framework/routing
import {
  type RouteConfig,
  index,
  route,
  layout,
  prefix,
} from "@react-router/dev/routes";

export default [
  route("login", "routes/login/login-page.tsx"),
  route("register", "routes/register/register-page.tsx"),
  layout("routes/layout.tsx", [
    index("routes/dashboard/dashboard.tsx"),
    route("calendar", "routes/calendar/calendar-page.tsx"),
    route("notifications", "routes/notifications/notifications-page.tsx"),
    ...prefix("/projects", [
      ...prefix(":id", [
        index("routes/project-detail/project-detail-page.tsx"),
        route("pre-review", "routes/project-detail-gates/pre-review-page.tsx"),
        // route(
        //   "assign-committee",
        //   "routes/project-detail-gates/assign-committee-page.tsx"
        // ),
        
      ]),
    ]),
    route(
      "schedule-meeting",
      "routes/project-detail-gates/schedule-meeting-page.tsx"
    ),
    ...prefix("/meetings", [
      route("new", "routes/meetings/new/new-meeting-page.tsx"),
      route(":id", "routes/meetings/$id/meeting-detail-page.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
