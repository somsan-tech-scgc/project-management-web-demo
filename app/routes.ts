import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/login.tsx"),
  route("/dashboard", "routes/dashboard/dashboard.tsx"),
  route("/projects/:id", "routes/project-detail/project-detail.tsx"),
] satisfies RouteConfig;
