const { Keystone } = require("@keystonejs/keystone");
const { PasswordAuthStrategy } = require("@keystonejs/auth-password");
const { MongooseAdapter: Adapter } = require("@keystonejs/adapter-mongoose");
const Project = require("./schemas/Project");
const Page = require("./schemas/Page");
const Technology = require("./schemas/Technology");

const PROJECT_NAME = "Booking platform";
const adapterConfig = { mongoUri: "mongodb://0.0.0.0:27017/my_database" };

const keystoneInstance = new Keystone({
    name: PROJECT_NAME,
    adapter: new Adapter(adapterConfig),
    cookieSecret: "long_secret"
});

keystoneInstance.createList(Project.name, Project.schema);
keystoneInstance.createList(Page.name, Page.schema);
keystoneInstance.createList(Technology.name, Technology.schema);

module.exports = { keystoneInstance, PROJECT_NAME };
