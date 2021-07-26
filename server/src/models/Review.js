const Model = require("./Model.js")

class Review extends Model {
  static get tableName() {
    return "reviews"
  }
  
  static get jsonSchema() {
    return {
      type: "object",
      required: ["body", "score", "showId"],
      properties: {
        reviewBody: { type: "string", minLength: 10 },
        score: { type: "number", minimum: 1, maximum: 5 },
        showId: { type: "number" }
      }
    }
  }
  
  static get relationMappings() {
    const { Show, Vote } = require("./index.js")

    return {
      show: {
        relation: Model.BelongsToOneRelation,
        modelClass: Show,
        join: {
          from: "reviews.showId",
          to: "shows.id"
        }
      },
      votes: {
        relation: Model.HasManyRelation,
        modelClass: Vote,
        join: {
          from: "reviews.id",
          to: "votes.reviewId"
        }
      }
    }
  }
}

module.exports = Review