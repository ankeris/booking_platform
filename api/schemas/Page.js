const { Markdown } = require("@keystonejs/fields-markdown");

module.exports = {
  name: "Page",
  schema: {
    label: "Page",
    labelField: "Pages",
    schemaDoc: "A list of things which need to be done",
    fields: {
      content: {
        type: Markdown
      }
    }
  }
};
