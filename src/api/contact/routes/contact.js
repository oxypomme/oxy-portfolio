module.exports = {
  routes: [
    {
      method: "POST",
      path: "/contact",
      handler: "contact.send",
      config: {
        auth: false,
      },
    },
  ],
};
