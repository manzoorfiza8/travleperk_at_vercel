import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Register from "./pages/register/register";
import Landingpage from "./pages/landingPage/landingPage";
import ContactForm from "./components/contact/ContactForm";
import Landing from "./components/packages/Landing";
import CardDetails from "./components/card/CardDetails";
import ReviewForm from "./components/reviewForm/ReviewForm";
import SubscriptionScreen from "./components/SubscriptionScreen/SubscriptionScreen";
import Profile from "./pages/profile/profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landingpage/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/hotels" element={<List/>}/>
        <Route path="/hotels/:id" element={<Hotel/>}/>
        <Route path="/ContactForm" element={<ContactForm/>}/>
        <Route path="/Landing" element={<Landing/>}/>
        <Route path="/CardDetails/:id" element={<CardDetails/>}/>
        <Route path="/ReviewForm" element={<ReviewForm/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
