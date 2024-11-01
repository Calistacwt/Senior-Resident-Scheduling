export type RouteContext = {
  // Content
  title: string;
  subTitle?: string;
  description?: string;
  backPath?: string;
  breadcrumbs?: Array<{ path: string; label: string }>;
};
