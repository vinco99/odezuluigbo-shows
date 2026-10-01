export type DashboardRole = "ADMIN" | "ORGANIZER" | "CONTESTANT" | "USER" | string;

export function dashboardPath(role: DashboardRole | undefined) {
    switch (role) {
        case "ADMIN":
            return "/admin";
        case "ORGANIZER":
            return "/organizer";
        case "CONTESTANT":
            return "/contestant";
        default:
            return "/dashboard";
    }
}
