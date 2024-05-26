import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import "./home.css";
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react'

const Home = () => {
  const location = useLocation();
  useEffect(() => {
    let script; 
      script = document.createElement('script');
      script.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js';
      script.async = true;
      document.getElementById("webchat").appendChild(script);
      script.onload = () => {
        window.botpressWebChat.init({
          composerPlaceholder: 'Chat with bot',
          botConversationDescription: 'This chatbot is built for Travelperk users',
          botId: "1ed40b55-9b15-46ad-80ec-ca9e562fbe5f",
          hostUrl: "https://cdn.botpress.cloud/webchat/v1",
          messagingUrl: "https://messaging.botpress.cloud",
          clientId: "1ed40b55-9b15-46ad-80ec-ca9e562fbe5f",
          webhookId: "e963ab48-3315-4fa4-beba-574053d3d5a4",    
          lazySocket: true,
          themeName: 'prism',
          frontendVersion: 'v1',
          showPoweredBy: false,
          useSessionStorage: true,
          enableConversationDeletion: true,
          theme: 'prism',
          themeColor: '#2563eb',
        });
      };
  }, []);
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <div className="feature">
          <Featured />
        </div>
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList />
        <h1 className="homeTitle">Homes guests love</h1>
        <div className="FeaturedProperties">
          <FeaturedProperties />
        </div>
        <MailList />
        <Footer />
      </div>
      <div id="webchat" />
    </div>
  );
};

export default Home;
