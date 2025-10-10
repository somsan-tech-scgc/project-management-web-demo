import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    index("routes/dashboard/dashboard.tsx"),
    route("/projects/:id", "routes/project-detail/project-detail.tsx"),
  ]),
] satisfies RouteConfig;
