const { Text, File } = require("@keystonejs/fields");
const { LocalFileAdapter } = require("@keystonejs/file-adapters");

const fileAdapter = new LocalFileAdapter({
  src: "./client/public/images",
  path: "./images"
});

module.exports = {
  name: "Project",
  schema: {
    schemaDoc: "Any technical project I have made",
    fields: {
      title: { type: Text, schemaDoc: "Project name" },
      previewImage: {
        type: File,
        adapter: fileAdapter,
        schemaDoc: "this will be displayed on main the list of projects"
      },
      description: { type: Text, schemaDoc: "Project description" }
    }
  }
};
