import { API_URL } from "@/data/constant";

export class HttpError extends Error {
  data: any;
  constructor(msg: string, data: any) {
    super(msg);

    this.data = data;
  }
}

async function request<T>(path: string, config: RequestInit): Promise<T> {
  let finalPath = path;
  if (path.startsWith("/")) {
    finalPath = `${API_URL}${path}`;
  }

  console.log(finalPath);

  const token = localStorage.getItem("token");

  const request = new Request(finalPath, {
    ...config,
    headers: {
      "Content-Type": "application/json",
      Authorization: token === null ? "" : `Bearer ${token}`,
      ...config.headers,
    },
  });

  const response = await fetch(request);

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw data;
  }

  return data;
}

async function get<T>(path: string, config?: RequestInit): Promise<T> {
  const init = { method: "GET", ...config };
  return await request<T>(path, init);
}

async function post<T, U>(
  path: string,
  body: U,
  config?: RequestInit
): Promise<T> {
  const init = { method: "POST", body: JSON.stringify(body), ...config };
  return await request<T>(path, init);
}

async function put<T, U>(
  path: string,
  body: U,
  config?: RequestInit
): Promise<T> {
  const init = { method: "PUT", body: JSON.stringify(body), ...config };
  return await request<T>(path, init);
}

async function remove<T>(path: string, config?: RequestInit): Promise<T> {
  const init = { method: "DELETE", ...config };
  return await request<T>(path, init);
}

const http = {
  get,
  post,
  put,
  delete: remove,
};

export default http;
