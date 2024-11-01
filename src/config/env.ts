import { tailingSlash } from "@/utils/formatter";

export const environment = import.meta.env.NODE_ENV;
export const isProduction = environment === "production";

// app
export const appName = import.meta.env.VITE_APP_NAME || "";
export const appVersion = import.meta.env.VITE_APP_VERSION || "";
export const appBuildSignature = import.meta.env.VITE_APP_BUILD_SIGNATURE || "";

// api
export const apiBaseUrl = tailingSlash(import.meta.env.VITE_API_BASE_URL || "");
export const apiClientId = import.meta.env.VITE_API_CLIENT_ID || "";
export const apiClientSecret = import.meta.env.VITE_API_CLIENT_SECRET || "";
export const apiPlatformId = parseInt(
  import.meta.env.VITE_API_PLATFORM_ID || 0,
);

// mock api
export const mockApiBaseUrl = tailingSlash(
  import.meta.env.VITE_MOCK_API_BASE_URL || "",
);
export const mockApiClientId = import.meta.env.VITE_MOCK_API_CLIENT_ID || "";
export const mockApiClientSecret =
  import.meta.env.VITE_MOCK_API_CLIENT_SECRET || "";
