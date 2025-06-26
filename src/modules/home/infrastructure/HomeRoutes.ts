export const HomeRoutes = '/' as const;
export type TypeHomeRoutes = (typeof HomeRoutes)[keyof typeof HomeRoutes];
