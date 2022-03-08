const emailTemplate = {
  subject: "Demande de contact : <%= name %>",
  text: `<%= name %> (<%= email %>) vous a envoyé un message via.`,
  html: `<h4><a href="mailto:<%= email %>"><%= name %></a> vous a envoyé un message :</h4>
		<p><%= text %><p>
		<p style="color: grey; font-style: italic;">
			Vous pouvez lui répondre en envoyant un mail à <a href="mailto:<%= email %>"><%= email %></a>
			ou en répondant à ce message.
		</p>`,
};

module.exports = {
  async send(ctx, next) {
    const { email, name, text } = ctx.request.body;
    const params = {
      to: "tom.sublet@oxypomme.fr",
      sender: "Votre Portfolio",
      replyTo: email,
    };
    const content = {
      name,
      text,
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
