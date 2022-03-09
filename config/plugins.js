const { readFileSync } = require("fs");
const { join } = require("path");

let privateKey;
try {
  privateKey = readFileSync(join(__dirname, "../dkim-private.pem"), "utf-8");
} catch (error) {
  privateKey = undefined;
}

module.exports = ({ env }) => {
  if (env("DKIM_PRIVATE")) {
    privateKey = env("DKIM_PRIVATE");
  }

  return {
    email: {
      config: {
        provider: "sendmail",
        providerOptions: {
          dkim: {
            privateKey,
            keySelector: env("DKIM_KEY"), // the same as the one set in DNS txt record, use online dns lookup tools to be sure that is retreivable
          },
        },
        settings: {
          defaultFrom: "noreply@oxypomme.fr",
        },
      },
    },
  };
};
