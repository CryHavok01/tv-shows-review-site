import React, { useState, useEffect } from "react"
import { useParams, Redirect } from "react-router-dom"
import fetchReviews from "../services/fetchReviews.js"
import NewReviewForm from "./NewReviewForm.js"
import ReviewTile from "./ReviewTile.js"
import EditShowForm from "./EditShowForm.js"

const TVDetailsPage = props => {
  const [show, setShow] = useState({
    name: "",
    description: "",
  })
  const [reviews, setReviews] = useState([])
  const [canEdit, setCanEdit] = useState(false)
  const [showError, setShowError] = useState(false)
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const { id } = useParams()

  const canEditShow = () => {
    event.preventDefault()
    setCanEdit(!canEdit)
  }

  const handleDeleteShow = async () => {
    event.preventDefault()
    try {
      const response = await fetch(`/api/v1/shows/${id}`, {
        method: "DELETE"
      })
      if(!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
    } catch(error) {
      console.error(`Error in Fetch: ${error.message}`)
    }
    setShouldRedirect(true)
  }
  
  const handleEditShow = (editedShow) => {
    let updatedShow = {}
    updatedShow.name = editedShow.name
    updatedShow.description = editedShow.description
    setShow(updatedShow)
  }

  const handleDeleteReview = (reviewId) => {
    const currentReviews = [...reviews]
    const targetIndex = reviews.findIndex((review)=> {
      return review.id === reviewId
    })
    currentReviews.splice(targetIndex, 1)
    setReviews(currentReviews)
  }

  const handleEditReview = (reviewId, editedReview) => {
    const currentReviews = [...reviews]
    const targetIndex = reviews.findIndex((review)=> {
      return review.id === reviewId
    })
    currentReviews.splice(targetIndex, 1, editedReview)
    setReviews(currentReviews)
  }
  
  const getShow = async () => {
    try {
      const response = await fetch(`/api/v1/shows/${id}`)
      if(!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const body = await response.json()
      setShow(body.show)
      setReviews(body.show.reviews)
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }
  
  useEffect(() => { 
    getShow()
  }, [])

  const addNewReview = (newReview) => {
    const updatedReviews = [...reviews, newReview]
    setReviews(updatedReviews)
  }

  const addNewVoteToPage = async () => {
    const newReviews = await fetchReviews(id)
    setReviews(newReviews)
  }

  let editDeleteButtons
  if(props.admin === true) {
    editDeleteButtons = (
      <div>
        <input 
          type="submit"
          value="Edit"
          onClick={canEditShow}
        />

        <input 
          type="submit"
          value="Delete"
          onClick={handleDeleteShow}
        />
      </div>
    )
  }
  
  let editForm
  if(canEdit && props.admin === true) {
    editForm = (
      <EditShowForm
        userId={props.userId}
        showId={id}
        handleEditShow={handleEditShow}
      />
    )
  }

  const reviewListItems = reviews.map(review => {
    return (
      <ReviewTile
        key={review.id}
        review={review}
        userId={props.userId}
        admin={props.admin}
        showError={showError}
        setShowError={setShowError}
        addNewVoteToPage={addNewVoteToPage}
        handleDelete={handleDeleteReview}
        handleEdit={handleEditReview}
      />
    )
  })

  if(shouldRedirect) {
    return (<Redirect push to="/shows" />)
  }
 
  return(
    <div className="callout primary">
      <div className="callout">
        <h1>{show.name}</h1>
        <h4>{show.description}</h4>
        {editDeleteButtons}
        {editForm}
      <NewReviewForm 
        showId={id} 
        addNewReview={addNewReview}
        userId={props.userId}
      />
      </div>
      <h4>Reviews: </h4>
      {reviewListItems}
    </div>
  )
}

export default TVDetailsPage