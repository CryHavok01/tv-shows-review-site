import React from "react"

const ReviewDisplay = (props) => {
  return(
    <div className="callout">
      <p>Score: {props.review.score} out of 5</p>
      <p>{props.review.body}</p>
      <div className="votes">
        {props.upButton}
        <p className="vote_text"> Upvotes: {props.review.upVotes} </p>
        {props.downButton}
        <p className="vote_text"> Downvotes: {props.review.downVotes} </p>
      </div>
    </div>
  )
}

export default ReviewDisplay