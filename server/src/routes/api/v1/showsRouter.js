import express from "express"
import { Show } from "../../../models/index.js"
import ShowSerializer from "../../../serializers/ShowSerializer.js"

const showsRouter = new express.Router()

showsRouter.get("/", async (req, res) => {
  try {
    const shows = await Show.query()
    const serializedShows = shows.map(show => {
      return ShowSerializer.getSummary(show)
    })

    return res.status(200).json({ shows: serializedShows })
  } catch (err) {
    return res.status(500).json({ err })
  }
})

export default showsRouter