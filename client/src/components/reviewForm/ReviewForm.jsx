import React, { useState } from 'react';
import './ReviewForm.css'; // Make sure to import your CSS file
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

const ReviewForm = () => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can handle form submission logic here, like sending the review to a server
    console.log('Submitting review:', { rating, comment });
  };

  return (
    <>
      <Navbar />
      <div className='relative py-8 bg-no-repeat bg-size-cover bg-cover bg-fixed' style={{ backgroundImage: 'url(https://images.pexels.com/photos/4721577/pexels-photo-4721577.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)'}}>
        <div className="review-form-container bg-white bg-opacity-20 backdrop-filter backdrop-blur-md rounded-lg shadow-lg">
          <h2>Leave a Review</h2>
          <form onSubmit={handleSubmit} className="review-form">
            <div className="rating">
              <label>Rating:</label>
              <div className="rating-stars">
                {[1, 2, 3, 4, 5].map((value) => (
                  <span
                    key={value}
                    className={value <= rating ? 'star active' : 'star'}
                    onClick={() => handleRatingChange(value)}
                  >
                    &#9733;
                  </span>
                ))}
              </div>
            </div>
            <div className="comment">
              <label>Comment:</label>
              <textarea
                value={comment}
                onChange={handleCommentChange}
                placeholder="Leave your comment here..."
              />
            </div>
            <button type="submit">Submit Review</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ReviewForm;
