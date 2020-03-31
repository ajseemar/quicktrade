const BaseModel = require("./baseModel");
const Models = require("../models");

const table = Models.USERS.table;

class UserModel extends BaseModel {
  static tableName = table;

  static get jsonSchema() {
    return {
      type: "object",
      required: ["firstName", "lastName", "email", "password"],

      properties: {
        id: { type: "integer" },
        firstName: { type: "string", minLength: 1, maxLength: 255 },
        lastName: { type: "string", minLength: 1, maxLength: 255 },
        email: { type: "string", minLength: 1, maxLength: 255 },
        password: { type: "string", minLength: 8, maxLength: 32 }
      }
    };
  }

  static get relationMappings() {
    return {};
  }
}

module.exports = UserModel;
