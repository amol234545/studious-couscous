
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
// Require the fastify framework and instantiate it
const fastify = require("fastify")({
  // Set this to true for detailed logging:
  logger: false,
});
// Setup our static files
fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "public"),
  prefix: "/", // optional: default '/'
});

// Formbody lets us parse incoming forms
fastify.register(require("@fastify/formbody"));

// View is a templating manager for fastify
fastify.register(require("@fastify/view"), {
  engine: {
    handlebars: require("handlebars"),
  },
});

// Load and parse SEO data
const seo = require("./src/seo.json");
if (seo.url === "glitch-default") {
  seo.url = `https://${process.env.PROJECT_DOMAIN}.glitch.me`;
}
fastify.get("/", function (request, reply) {
  // params is an object we'll pass to our handlebars template
  let params = { seo: seo };
  // The Handlebars code will be able to access the parameter values and build them into the page
  return reply.view("/src/pages/index.hbs", params);
});
fastify.get("/signup", function (request, reply) {
  // params is an object we'll pass to our handlebars template
  let params = { seo: seo };
  // The Handlebars code will be able to access the parameter values and build them into the page
  return reply.view("/src/pages/index.hbs", params);
});
fastify.get("/signin", function (request, reply) {
  // params is an object we'll pass to our handlebars template
  let params = { seo: seo };
  // The Handlebars code will be able to access the parameter values and build them into the page
  return reply.view("/src/pages/index.hbs", params);
});
fastify.post("/signinfin", function (request, reply) {
  // params is an object we'll pass to our handlebars template
  let params = { seo: seo };
  // The Handlebars code will be able to access the parameter values and build them into the page
  return reply.view("/src/pages/index.hbs", params);
});
// Run the server and report out to the logs
fastify.listen(
  { port: process.env.PORT, host: "0.0.0.0" },
  function (err, address) {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    console.log(`Your app is listening on ${address}`);
    fastify.log.info(`server listening on ${address}`);
  }
);
