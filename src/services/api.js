const API_BASE_URL = process.env.REACT_APP_API_URL || "https://localhost:7252/api";

/**
 * Builds a query string, skipping empty / null / undefined values.
 */
const buildQueryString = (params) => {
  if (!params) return "";
  const entries = Object.entries(params).filter(
    ([, value]) => value !== null && value !== undefined && value !== ""
  );
  if (!entries.length) return "";
  return `?${new URLSearchParams(entries).toString()}`;
};

/**
 * Turns an ASP.NET error payload into a readable message so the admin panel
 * can show what actually went wrong instead of a generic "API error".
 *
 * Handles ValidationProblemDetails ({ errors: { Field: [message] } }),
 * ProblemDetails ({ title, detail }) and plain text bodies.
 */
const readErrorMessage = async (response) => {
  const fallback = `Request failed (${response.status} ${response.statusText})`.trim();

  let raw = "";
  try {
    raw = await response.text();
  } catch (e) {
    return fallback;
  }
  if (!raw) return fallback;

  let payload;
  try {
    payload = JSON.parse(raw);
  } catch (e) {
    // Plain text body (e.g. the ASP.NET developer exception page). Only the
    // first line is useful, the rest is a stack trace.
    const firstLine = raw.split("\n").find((line) => line.trim().length > 0) || raw;
    return firstLine.length > 500 ? `${firstLine.slice(0, 500)}...` : firstLine;
  }

  if (payload && payload.errors && typeof payload.errors === "object") {
    const messages = Object.entries(payload.errors).flatMap(([field, value]) =>
      (Array.isArray(value) ? value : [value])
        .filter(Boolean)
        .map((message) => (field ? `${field}: ${message}` : message))
    );
    if (messages.length) return messages.join(" | ");
  }
  if (payload && payload.title) {
    return payload.detail ? `${payload.title} - ${payload.detail}` : payload.title;
  }
  if (payload && payload.message) return payload.message;
  return raw;
};

const request = async (method, url, { body, headers, params, signal } = {}) => {
  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;

  const finalHeaders = {};
  Object.entries(headers || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null) finalHeaders[key] = value;
  });

  const hasContentType = Object.keys(finalHeaders).some(
    (key) => key.toLowerCase() === "content-type"
  );

  if (isFormData) {
    // The browser has to generate the multipart boundary itself. If we set
    // Content-Type manually the boundary is missing and the API rejects the
    // request with 400 "Failed to read the request form. Missing
    // content-type boundary."
    delete finalHeaders["Content-Type"];
    delete finalHeaders["content-type"];
  } else if (!hasContentType) {
    finalHeaders["Content-Type"] = "application/json";
  }

  const response = await fetch(`${API_BASE_URL}${url}${buildQueryString(params)}`, {
    method,
    headers: finalHeaders,
    signal,
    body:
      body === undefined || body === null
        ? undefined
        : isFormData
        ? body
        : JSON.stringify(body),
  });

  if (!response.ok) {
    const error = new Error(await readErrorMessage(response));
    error.status = response.status;
    throw error;
  }

  if (response.status === 204) return { data: null };

  const text = await response.text();
  if (!text) return { data: null };
  try {
    return { data: JSON.parse(text) };
  } catch (e) {
    return { data: text };
  }
};

const api = {
  get: (url, config = {}) => request("GET", url, config),
  post: (url, data, config = {}) => request("POST", url, { ...config, body: data }),
  put: (url, data, config = {}) => request("PUT", url, { ...config, body: data }),
  patch: (url, data, config = {}) => request("PATCH", url, { ...config, body: data }),
  delete: (url, config = {}) => request("DELETE", url, config),
};

export default api;
