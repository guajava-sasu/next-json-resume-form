import axios, { AxiosRequestConfig } from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

if (!API_BASE_URL) {
    // Keep runtime warning instead of throwing to avoid breaking unrelated pages.
    // Calls will fail with a clear message if env is missing.
    console.warn("NEXT_PUBLIC_API_BASE_URL is not configured.");
}

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 15000,
});

const withAuthHeader = (
    config: AxiosRequestConfig = {},
    accessToken?: string
): AxiosRequestConfig => {
    const headers = {
        ...(config.headers ?? {}),
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    };

    return {
        ...config,
        headers,
    };
};

export const apiGet = async <T>(
    path: string,
    accessToken?: string,
    config?: AxiosRequestConfig
): Promise<T> => {
    if (!API_BASE_URL) {
        throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured");
    }

    const response = await api.get<T>(path, withAuthHeader(config, accessToken));
    return response.data;
};

export const apiPost = async <TResponse, TBody = unknown>(
    path: string,
    body: TBody,
    accessToken?: string,
    config?: AxiosRequestConfig
): Promise<TResponse> => {
    if (!API_BASE_URL) {
        throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured");
    }

    const response = await api.post<TResponse>(
        path,
        body,
        withAuthHeader(config, accessToken)
    );

    return response.data;
};
