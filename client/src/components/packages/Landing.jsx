import React, { useEffect, useState } from 'react'
import Home from "./Home"
import "./Landing.css"
import Card from '../card/Card'
import Footer from '../footer/Footer'
import useFetch from '../../hooks/useFetch'
import { Link } from 'react-router-dom'

const Landing = () => {
  const { data:subscription, loading, error, reFetch } = useFetch(
    `/subscription`
  );

  const { data:userSubscription, loading1, error1, reFetch1 } = useFetch(
    `/userSubscription/${localStorage.getItem("userid")}`
  );

  useEffect(() => {
    console.log(userSubscription)
    console.log(subscription)
  }, [subscription,userSubscription])
  return (
    <>
      <div className='homeClass'>
        <Home />
      </div>
      < br />
      < br />
      <div className='pkg-header'>
        <h1 className='sub'>
          <span></span> Already subscribed packages  <span></span>
        </h1>
      </div>
      <div className='flex flex-col gap-10 justify-center items-center mb-20'>
        <div className="w-full max-w-4xl">
          {userSubscription.length != 0 ? "" : "You are not subscribed to any package"}
          {userSubscription && userSubscription.map((d, index) => (
            <div key={d._id} className="flex gap-5 px-5 bg-white rounded-lg shadow-md">
              <div className='flex items-center justify-center'>
                <img src={d.img} alt="" width={250} height={120} className='rounded' />
              </div>
              <div className='w-full'>
                <div className="flex justify-between items-center">
                  <span className="font-light text-gray-600">{new Date(Date.now()).toLocaleDateString()}</span>
                  <a className="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500 cursor-pointer" >
                    {d.price} PKR
                  </a>
                </div>
                <div className="mt-2">
                  <a className="text-2xl text-gray-700 font-bold hover:text-gray-600" href="/">
                    {d.title}
                  </a>
                  <p className="mt-2 text-gray-600">
                    {d.description}
                  </p>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <a className="text-blue-600 cursor-pointer">
                    {d.locations.join(', ')}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='pkg-header'>
        <h2 className='text-blue-400'> Our Exclusive Packages</h2>
        <h1>
          <span>“</span> Seamless Travel Booking with Travelperk <span>”</span>
        </h1>
        <p>
          Experience pure joy and bliss on your travels with us, your ultimate adventure companion!
        </p>
      </div>


      <div className="cardgrid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {subscription && subscription.map((cardData) => (
          <Card
            key={cardData.id} // Don't forget to add a unique key if your data has a unique identifier
            imageSrc={cardData.img}
            category={cardData.type}
            title={cardData.title}
            description={
              <>
                <p style={{ padding: '10px 0', color: "black", fontSize: "15px", fontWeight: "10px" }}>
                  {cardData.description}
                </p>
              </>
            }
            calendarText={<p>
              <span style={{ fontSize: '11px', color: "black", fontWeight: "bold" }}>{cardData.locations.join(', ')}</span>&nbsp;
            </p>
            }
            priceText={
              <p>
                <span style={{ fontSize: '10px', color: "black" }}>Starting from</span>&nbsp;
                <strong style={{ fontSize: '15px', color: "black" }}>Rs. {cardData.price}</strong>
              </p>
            }
            id={cardData._id}
          />
        ))}
      </div>
      <div className='mb-16'></div>
      <Footer />
    </>
  );
}
export default Landing;


