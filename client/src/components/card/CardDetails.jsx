import pkgs from '../packages/assets/pkgs.jpg'
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { CardList } from '../packages/Data';
import { Link } from 'react-router-dom';
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer';
import Card from './Card';
import { MdLocationOn } from "react-icons/md"
import "./CardDetails.css"
import Review from './Review';
import useFetch from '../../hooks/useFetch';
import axios from 'axios'

const CardDetails = () => {
  const { id } = useParams();
  const { data, loading, error, reFetch } = useFetch(
    `/subscription/${id}`
  );
  

  const handleReserve = async () => {
    const userid = localStorage.getItem("userid")
    if(userid == null)
    {
      window.location.href = '/login'
    }
    else{
      axios.post(`/stripe`,{
        ...data,
        quantity:1,
        userId:userid
      })
      .then((res) => {
        window.location.href = res.data;
      })
      .catch(err => console.log(err))
    }
  }



  const [card, setCard] = useState(null);

  useEffect(() => {
    let card = CardList.find((card) => card.id === parseInt(id));
    if (card) {
      setCard(card);
    }
  }, [data]);
  return (
    <>
      <Navbar />
      <div className="detailcard-container">
        <div className="detailcard-content">
          <div className="right-content">
            <img
              src="https://images.unsplash.com/photo-1595507205672-ae65e9fda540?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2thcmR1fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" // Replace with your image URL
              alt="Card Image"
              className="detailcard-image"
            />
          </div>
          <div className="left-content">
            <h1 className="detailcard-heading p-0">{data && data.title}
              {/* {card.title} */}
            </h1>
            <div className="location-container">
              <MdLocationOn size={29} className="location-icon" />
              <h3 className="detailcard-heading p-0">{data && data.locations ? data.locations.join(', ') : ""}</h3>
            </div>
            <p className="detailcard-text">
              {data && data.description}
            </p>
            <p className='chip'>starting From Rs.{data.price} per person</p>

            <br />
            <br />
            <div className="button-container">
              <button className="detailcard-button bg-blue-400 hover:bg-blue-500" onClick={handleReserve}>Reserve Now</button>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="navbar">
        <div className="navbar-logo">
        </div>
        <ul className="navbar-links">
          <li><a href="#overview">Overview</a></li>
          <li><a href="#facilities">Facilities</a></li>
          <li><a href="#cancellation">Cancellation Policies</a></li>
          <li><a href="#reviews">Review</a></li>
        </ul>
      </div>
      <section id="overview" >
        <div className="overview-style"> 
        <h1 >Overview</h1>
        <div className="overview-text">
          <p>Neelum Valley a 144 km long bow-shaped thickly forested region 
            in Azad Kashmir in Pakistan Administered Kashmir. It is named after
             the Neelum river, which flows through the length of the valley. 
             Neelum valley is situated in the north-east of Muzaffarabad, 
             running parallel to Kaghan Valley. The two valleys are only 
             separated by snow-covered peaks, some over 4,000 meters
              (13,000 ft) above sea level.</p>
        </div>

        <h3> Recommendation Gear:</h3>
        <div className="recommended-gear">
      <ul>
        <li>Sun Block and Sun Glasses</li>
        <li>Hand Wash/Soap/Sanitizer, Wipes, Toothpaste, and All Other Necessities</li>
        <li>Beanie (Highly Recommended)</li>
        <li>Muffler (Highly Recommended)</li>
        <li>Gloves (Highly Recommended)</li>
        <li>Fleece/Sweaters</li>
      </ul>
    </div>
        <h3>  Duration</h3>
           <div className='duration-text'>
            <p>2Days and 1 Night</p>
           </div>
        </div>
      </section>
      <section id="cancellation" >
        <h1  className="canc-heading" >Cancellation Policy</h1>
        
        <div className='canc-text'> <ul>
        <li>
          <span className="percentage">50%</span> of the total amount will be deducted if cancellation is notified 7 days prior to the trip.
        </li>
        <li>
          <span className="percentage">75%</span> of the total amount will be deducted if cancellation is notified 4 days prior to the trip.
        </li>
        <li>
          <span className="percentage">100%</span> of the total amount will be deducted if cancellation is notified within the last 3 days
          <br /> prior to the trip unless the trip is canceled by the management.
        </li>
      </ul>
      </div>
      </section>
      <section id="facilities" >
        <div className="facilities-style">
      <h1  >Facilities</h1>
      <h2>Services</h2>
      <div className='services-text'>
      <ul className="horizontal-bullets">
        <li>Basic First Aid Kit</li>
        <li>Bonfire</li>
        <li>Accommodation (3-4 Persons Sharing)</li>
        <li>Transport</li>
        <li>Standard Meals</li>
        <li>Tour Guide</li>
      </ul>
    </div>
      </div>
      </section>
     
      <section id="reviews" >
      <div  className="reviews-style">
          <Review />
          </div>
      </section> */}
      <Footer />
    </>

  )
}
export default CardDetails;
