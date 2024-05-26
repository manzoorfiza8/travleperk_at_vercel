import React from "react";
import { Link, useNavigate } from "react-router-dom";

import './landingPage.css'
import '../../Animations/animation.css'

const Landingpage = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    // Use the navigate function to navigate to the Home component
    console.log('Explore button clicked');
    navigate('/Home');
  };
  return (
    <div className="landingpage">
      <video
        src="https://media.istockphoto.com/id/1194337503/video/aerial-view-of-clear-turquoise-sea-and-waves.mp4?s=mp4-640x640-is&k=20&c=9bXAggRhoV_cO7uqdXF8cCUn-d1gTDg0hzjbG3Z8XoU="
        className="video-bg"
        autoPlay
        loop 
        muted 
        controls={false} 
      />
      <div className="bg-overlay"></div>
      <div className="home-text">
        <div>
          <h1 className="bgheading text-white">Travelperk</h1>
        </div>
        <p className="animations text-black">Live out your life with Travelperk </p>
      </div>
      <div className="button">
        <Link to="/Home" className="home-btn" onClick={handleExploreClick}>
          Explore
        </Link>
      </div>
    </div>
  );
}

export default Landingpage;
