const { Keystone } = require("@keystonejs/keystone");
const { Text } = require("@keystonejs/fields");
const { PasswordAuthStrategy } = require("@keystonejs/auth-password");
const { GraphQLApp } = require("@keystonejs/app-graphql");
const { AdminUIApp } = require("@keystonejs/app-admin-ui");
const { NextApp } = require("@keystonejs/app-next");

const { MongooseAdapter: Adapter } = require("@keystonejs/adapter-mongoose");
const PROJECT_NAME = "booking_platform";
const adapterConfig = { mongoUri: "mongodb://0.0.0.0:27017/my_database" };
//as
const keystone = new Keystone({
  name: PROJECT_NAME,
  adapter: new Adapter(adapterConfig),
  cookieSecret: "long_secret"
});

keystone.createList("Todo", {
  schemaDoc: "A list of things which need to be done",
  fields: {
    name: { type: Text, schemaDoc: "This is the thing you need to do" },
    description: { type: Text, schemaDoc: "Description of thing to do" }
  }
});

keystone.createList("Note", {
  schemaDoc: "A list of things which need to be done",
  fields: {
    name: { type: Text, schemaDoc: "Note name" },
    text: { type: Text, schemaDoc: "Note text" }
  }
});

module.exports = {
  keystone,
  apps: [new GraphQLApp(), new AdminUIApp({ name: PROJECT_NAME, adminPath: "/admin" }), new NextApp({ dir: "client" })]
};
