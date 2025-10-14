// https://reactrouter.com/start/framework/routing
import {
  type RouteConfig,
  index,
  route,
  layout,
  prefix,
} from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    index("routes/dashboard/dashboard.tsx"),
    ...prefix("/projects", [
      ...prefix(":id", [
        index("routes/project-detail/project-detail.tsx"),
        route("pre-review", "routes/project-detail-gates/pre-review-page.tsx"),
        route(
          "assign-committee",
          "routes/project-detail-gates/assign-committee-page.tsx"
        ),
        route(
          "schedule-meeting",
          "routes/project-detail-gates/schedule-meeting-page.tsx"
        ),
      ]),
    ]),
  ]),
] satisfies RouteConfig;
