// SubscriptionScreen.js
import React, { useState } from 'react';
import './SubscriptionScreen.css';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

const SubscriptionScreen = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  return (
    <>
      <Navbar />
      <div class="subscription-container p-4 md:p-8">
        <h1 class="text-lg md:text-2xl font-bold">
          Affordable Excellence: Elevate Your Travel Experience with Our
          <span class="text-blue-400"> Budget-Friendly Plans!</span>{' '}
        </h1>
        <h2 class="text-lg md:text-xl font-semibold">Choose a Subscription Plan</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div class="plan flex-1 bg-white rounded-lg shadow-md p-4 md:p-6 lg:p-8 border border-gray-200">
            <h3 class="text-lg md:text-xl font-semibold">Basic Plan</h3>
            <p class="text-gray-600 text-base md:text-lg mt-2 mb-4 md:mb-6">RS. 12,000/month</p>
            <ul class="text-sm md:text-base">
              <li>Access to standard layout</li>
              <li>Email Support</li>
            </ul>
            <a href="#basic" class="mt-4 md:mt-6 block w-full md:w-auto text-center md:text-left bg-blue-400 text-white py-2 md:py-3 px-4 md:px-6 rounded-lg hover:bg-blue-500 transition duration-300">Get Started</a>
          </div>
          <div class="plan flex-1 bg-white rounded-lg shadow-md p-4 md:p-6 lg:p-8 border border-gray-200">
            <h3 class="text-lg md:text-xl font-semibold">Premium Plan</h3>
            <p class="text-gray-600 text-base md:text-lg mt-2 mb-4 md:mb-6">RS. 12,000/month</p>
            <ul class="text-sm md:text-base">
              <li>Access to standard layout</li>
              <li>Email Support</li>
            </ul>
            <a href="#basic" class="mt-4 md:mt-6 block w-full md:w-auto text-center md:text-left bg-blue-400 text-white py-2 md:py-3 px-4 md:px-6 rounded-lg hover:bg-blue-500 transition duration-300">Get Started</a>
          </div>
          <div class="plan flex-1 bg-white rounded-lg shadow-md p-4 md:p-6 lg:p-8 border border-gray-200">
            <h3 class="text-lg md:text-xl font-semibold">Premium Pro Plan</h3>
            <p class="text-gray-600 text-base md:text-lg mt-2 mb-4 md:mb-6">RS. 12,000/month</p>
            <ul class="text-sm md:text-base">
              <li>Access to standard layout</li>
              <li>Email Support</li>
            </ul>
            <a href="#basic" class="mt-4 md:mt-6 block w-full md:w-auto text-center md:text-left bg-blue-400 text-white py-2 md:py-3 px-4 md:px-6 rounded-lg hover:bg-blue-500 transition duration-300">Get Started</a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SubscriptionScreen;
