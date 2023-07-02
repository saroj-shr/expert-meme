export const environment = process?.evn?.environment ?? "dev";
export const port = parseInt(process?.evn?.port ?? "8080");
export const database_url =
  process?.env?.database_url ??
  "postgresql://username:password@localhost:5432/energy_monitoring_system";
