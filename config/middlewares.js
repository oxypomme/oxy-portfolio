module.exports = [
  "strapi::errors",
  "strapi::security",
  {
    // custom resolve to find a package or a path
    resolve: "strapi::cors",
    config: {
      origin: [
        "oxypomme.fr",
        "oxypomme.github.io",
        "oxy-portfolio.herokuapp.com",
      ],
    },
  },
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  "strapi::favicon",
  "strapi::public",
];
