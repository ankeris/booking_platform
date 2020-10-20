const { Text, File } = require("@keystonejs/fields");
const { LocalFileAdapter } = require("@keystonejs/file-adapters");

const fileAdapter = new LocalFileAdapter({
    src: "./client/public/images",
    path: "./images"
});

module.exports = {
    name: "Technology",
    schema: {
        schemaDoc: "Technology that one knows and can use",
        fields: {
            title: { type: Text, schemaDoc: "Technology name" },
            logoImage: {
                type: File,
                adapter: fileAdapter,
                schemaDoc: "Logo of the technology"
            },
            description: { type: Text, schemaDoc: "Describe for how long & how the tech was used" }
        }
    }
};
