const { encode } = require("html-entities");

const emailTemplate = {
  subject: "Demande de contact : <%= name %>",
  text: `<%= name %> (<%= email %>) vous a envoyé un message via votre Portflio.`,
  html: `<h4><a href="mailto:<%= email %>"><%= name %></a> vous a envoyé un message via votre Portflio :</h4>
    <br />
		<p><%= text %><p>
    <br />
		<p style="font-style: italic;">
			Vous pouvez lui répondre en envoyant un mail à <a href="mailto:<%= email %>"><%= email %></a>
			ou en répondant à ce message.
		</p>
    <br/>
    <p style="color: grey; font-style: italic;">
      ----</br >
			Ceci est un message automatisé, merci de ne pas répondre à ce mail (sauf indication contraire).<br/>
      Pour toute réclamation, envoyez un mail à <a href="mailto:tom.sublet@oxypomme.fr">tom.sublet@oxypomme.fr</a>
		</p>`,
};

module.exports = {
  async send(ctx, next) {
    if (
      ["https://oxypomme.fr", "https://oxypomme.github.io"].includes(
        ctx.request.origin
      )
    ) {
      ctx.set("Access-Control-Allow-Origin", ctx.request.origin);
    }

    const { email, name, text } = ctx.request.body;
    const params = {
      to: "tom.sublet@oxypomme.fr",
      sender: "Votre Portfolio",
      replyTo: email,
    };
    const content = {
      name,
      text: encode(text),
      email,
    };

    await strapi.plugins["email"].services.email.sendTemplatedEmail(
      params,
      emailTemplate,
      content
    );

    ctx.body = {
      data: {
        ...params,
        content,
      },
      meta: {},
    };
  },
};
