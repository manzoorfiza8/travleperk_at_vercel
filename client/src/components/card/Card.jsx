import React from 'react';
import './card.css';
import { Link } from 'react-router-dom';
import { FaRegHeart } from 'react-icons/fa';
import { LuCalendarRange } from 'react-icons/lu';
import { IoLocationSharp } from 'react-icons/io5';
import CardDetails from './CardDetails';

const Card = ({
  imageSrc,
  title,
  description,
  category,
  priceText,
  calendarText,
  id
}) => {
  return (
    <div className="card-container">
      <div className="card2">
        <img src={imageSrc} alt={title} className="card-image" />
        <div className="chip-content">
          <p className="chip">{category}</p>
        </div>
        <div className="card-content">
          <h2 className="card-title">{title}</h2>
        </div>
        <div className="desc-content">
          <p className="card-description">{description}</p>
        </div>
        <div className="calendar-info">
          <IoLocationSharp />
          <p className="calendar-text">{calendarText}</p>
        </div>
        <div className="price-info">
          <p className="price-text">{priceText}</p>
        </div>
        <div className="card-bottom">
          <div className="icon">
            <FaRegHeart />
          </div>
          <div className="button">
            <Link to={`/CardDetails/${id}`}>
              <button className="card-button">Tour Details</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
