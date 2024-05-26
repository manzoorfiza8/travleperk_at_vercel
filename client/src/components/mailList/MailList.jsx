import "./mailList.css"

const MailList = () => {
  return (
    <div className="mail">
      <h1 className="mailTitle text-3xl">Save time, save money!</h1>
      <span className="mailDesc text-center text-blue-200">Sign up and we'll send the best deals to you</span>
      <div className="mailInputContainer">
        <input type="text" placeholder="Your Email" />
        <button className="text-white bg-blue-300 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-blue-400 dark:hover:bg-blue-500 focus:outline-none">Subscribe</button>
      </div>
    </div>
  )
}

export default MailList