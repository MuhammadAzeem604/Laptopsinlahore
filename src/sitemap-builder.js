global.window = {};
global.document = {};
global.fn = {};

require("babel-register")({
  presets: ["es2015", "react"],
});

const router = require("./router/index").default;
const Sitemap = require("react-router-sitemap").default;

new Sitemap(router)
  .build("https://laptopsinlahore.com")
  .save("./public/sitemap.xml");
