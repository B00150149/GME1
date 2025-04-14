'use client';

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Review.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ReviewPage() {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/review');
        const data = await response.json();
        setReviews(data || []); // Ensure correct response handling
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };
    fetchReviews();
  }, []);

  const handleImageChange = (event) => {
    const files = event.target.files;
    setImages(files);
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(files[0]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    const formData = new FormData();
    formData.append('reviewText', reviewText);
    formData.append('rating', rating);
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    try {
      const response = await fetch('/api/review', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        setErrorMessage('Failed to submit review. Please try again.');
        setIsSubmitting(false);
        return;
      }

      const data = await response.json();
      setReviewText('');
      setRating(0);
      setImages([]);
      setPreview(null);

      // Optimistically update reviews without refetching
      setReviews((prevReviews) => [data, ...prevReviews]);
    } catch (error) {
      setErrorMessage('An error occurred while submitting the review.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="review-page">
      <Header />
      <div className="review-container">
        <h2>Submit a Review!</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="review-form">
          <textarea
            className="review-textarea"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review here..."
          ></textarea>
          <div className="rating-container">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} onClick={() => setRating(star)} className="star" style={{ color: star <= rating ? 'gold' : 'gray' }}>
                ★
              </span>
            ))}
          </div>
          <div className="image-upload-container">
            <label htmlFor="images" className="image-upload-label">Choose images (optional)</label>
            <input type="file" id="images" name="images" multiple onChange={handleImageChange} style={{ display: 'none' }} />
            {preview && <div className="image-preview"><img src={preview} alt="Preview" /></div>}
          </div>
          <button type="submit" className="review-submit" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit Review'}</button>
        </form>
        {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
        <div className="review-list">
          {reviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            <div className="reviews-grid">
              {reviews.map((review) => (
                <div key={review._id} className="review-item">
                  <h5>{review.userName}</h5>
                  <p>{review.reviewText}</p>
                  <div className="rating-container">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="star" style={{ color: star <= review.rating ? 'gold' : 'gray' }}>
                        ★
                      </span>
                    ))}
                  </div>
                  <div className="review-date">{new Date(review.createdAt).toLocaleString()}</div>
                  {review.images?.length > 0 && (
                    <div className="review-images">
                      {review.images.map((image, index) => (
                        <img key={index} src={image} alt={`Review image ${index + 1}`} />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}