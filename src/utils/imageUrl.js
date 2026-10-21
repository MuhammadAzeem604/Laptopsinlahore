const API_BASE = process.env.REACT_APP_API_URL?.replace("/api", "") || "https://localhost:7252";

export const getImageUrl = (imagePath) => {
  if (!imagePath) return "/no_image.png";
  if (imagePath.startsWith("http")) return imagePath;
  return `${API_BASE}${imagePath}`;
};

/**
 * Url of a file that lives in the `public` folder (logo, favicon, ...).
 *
 * Those files are copied as they are to the root of the site, so they always
 * keep the same name - no hash, no build id. That way the logo can be
 * replaced on the server without rebuilding the app.
 *
 * PUBLIC_URL is the folder the app is served from ("/LIL" on GitHub pages,
 * "" on localhost), so the path is always absolute and works on every route.
 */
export const getPublicAsset = (fileName) => {
  const base = (process.env.PUBLIC_URL || "").replace(/\/+$/, "");
  return `${base}/${fileName.replace(/^\/+/, "")}`;
};

/**
 * Brand logos that are shipped with the site (public/brands).
 *
 * They are static files, so the browser never has to ask the API for them
 * and they keep working even when the API is not reachable.
 */
const BRAND_LOGOS = {
  apple: "brands/apple.png",
  hp: "brands/hp.jpg",
  "hewlett packard": "brands/hp.jpg",
  lenovo: "brands/lenovo.png",
  dell: "brands/dell.png",
  acer: "brands/acer.png",
  asus: "brands/asus.png",
  msi: "brands/msi.png",
  microsoft: "brands/micro.png",
  surface: "brands/micro.png",
  "microsoft surface": "brands/micro.png",
  razer: "brands/razer.jpg",
  samsung: "brands/samsung.jpg",
};

/**
 * Logo of a brand. Uses the static file of the shop and falls back to the
 * image the API sends for the category.
 */
export const getBrandImage = (brandName, fallbackUrl) => {
  const key = (brandName || "").trim().toLowerCase();
  const file = BRAND_LOGOS[key];

  if (file) return getPublicAsset(file);
  if (fallbackUrl) return getImageUrl(fallbackUrl);
  return getPublicAsset("brands/dell.png");
};
