import React,{useState} from 'react'
import "./Review.css"

export default function Review() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        review: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Here, you can handle the form submission, e.g., send the review data to an API.
        console.log(formData);
      };
    
  return (
    <div className="review-card">
    <h2>Leave a Review</h2>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="review">Review:</label>
        <textarea
          id="review"
          name="review"
          value={formData.review}
          onChange={handleChange}
          rows="4"
          required
        ></textarea>
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>

  )
}
