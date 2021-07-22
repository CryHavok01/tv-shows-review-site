import ReviewSerializer from "./ReviewSerializer.js"

class ShowSerializer {
  static async getSummary(show) {
    const allowedAttributes = ["name", "description", "id"]

    let serializedShow = {}
    allowedAttributes.forEach(attribute => {
      serializedShow[attribute] = show[attribute]
    })

    serializedShow.reviews = await show.$relatedQuery("reviews")
    return serializedShow
  }

  static async getDetail(show) {
    const allowedAttributes = ["name", "description", "id"]

    let serializedShow = {}
    allowedAttributes.forEach(attribute => {
      serializedShow[attribute] = show[attribute]
    })
    const reviews = await show.$relatedQuery("reviews")
    const serializedReviews = reviews.map(review => {
      return ReviewSerializer.getSummary(review)
    })  
    serializedShow.reviews = serializedReviews

    return serializedShow
  }
}

export default ShowSerializer