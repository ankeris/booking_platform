const { GraphQLApp } = require("@keystonejs/app-graphql");
const { AdminUIApp } = require("@keystonejs/app-admin-ui");
const { NextApp } = require("@keystonejs/app-next");
const { keystoneInstance, PROJECT_NAME } = require("./api/config");

module.exports = {
  keystone: keystoneInstance,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({
      name: PROJECT_NAME,
      adminPath: "/admin"
    }),
    new NextApp({ dir: "client" })
  ]
};
