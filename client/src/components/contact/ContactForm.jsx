import React, { useState } from 'react';
import './ContactForm.css';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // You can perform form submission here
  };

  return (
    <>
      <Navbar />
      {/* <div className="contact-form-container">
        <h2>Contact To BookingGo</h2>
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
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div> */}
      <main className="relative py-8 bg-no-repeat bg-size-cover bg-cover bg-fixed" style={{ backgroundImage: 'url(https://images.pexels.com/photos/4721577/pexels-photo-4721577.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)' }}>
        <div className="relative z-10 max-w-screen-lg mx-auto text-gray-600 sm:px-4 md:px-8">
          <div className="mx-auto px-4 bg-transparent sm:max-w-lg sm:px-8 sm:rounded-xl" >
          <div className="max-w-lg px-4 sm:mx-auto sm:text-center sm:px-0">
            <h3 className="text-black font-semibold">
              Contact
            </h3>
          </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-1 bg-white bg-opacity-20 backdrop-filter backdrop-blur-md p-6 rounded-lg shadow-lg"
            >
              <div>
                <label className="font-medium">
                  Full name
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 text-black bg-transparent outline-none border focus:border-black shadow-sm rounded-lg"
                />
              </div>
              <div>
                <label className="font-medium">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-3 py-2 text-black bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
                />
              </div>
              <div>
                <label className="font-medium">
                  Message
                </label>
                <textarea required className="w-full text-black h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"></textarea>
              </div>
              <button
                className="w-full px-4 py-2 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-lg duration-150"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default ContactForm;

