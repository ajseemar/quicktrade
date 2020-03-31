const { Model, snakeCaseMappers } = require("objection");

class BaseModel extends Model {
  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  $beforeInsert() {
    this.createdAt = new Date();
  }

  $beforeUpdate() {
    this.updatedAt = new Date();
  }
}

module.exports = BaseModel;
