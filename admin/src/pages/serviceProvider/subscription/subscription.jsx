import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from 'axios';
import './subscription.scss';
import Sidebar from "../../../components/serviceProvider/sidebar/Sidebar";
import Navbar from "../../../components/serviceProvider/navbar/Navbar";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { saveAs } from 'file-saver';


export default function Subscription() {
    const [selectedPlan, setSelectedPlan] = useState(null);

    const handlePlanSelect = (plan) => {
        setSelectedPlan(plan);
    };

    const { data, loading, error, reFetch } = useFetch(
        `/serviceProviderSubscription?id=${JSON.parse(localStorage.getItem("userid"))._id}`
    );

    const basic = async () => {
        try {
            const newSub = {
                title: "basic",
                percentage: 10,
                description: "You will get 10% from every client",
                serId: JSON.parse(localStorage.getItem("userid"))._id,
                price: 100,
            }
            axios.post(`/stripe/sub`, {
                ...newSub,
                quantity: 1,
            })
                .then((res) => {
                    window.location.href = res.data;
                })
                .catch(err => console.log(err))
        } catch (err) {
            console.log(err);
        }
    }
    const premium = async () => {
        try {
            const newSub = {
                title: "premium",
                percentage: 20,
                description: "You will get 20% from every client",
                serId: JSON.parse(localStorage.getItem("userid"))._id,
                price: 200,
            }
            axios.post(`/stripe/sub`, {
                ...newSub,
                quantity: 1,
            })
                .then((res) => {
                    window.location.href = res.data;
                })
                .catch(err => console.log(err))
        } catch (err) {
            console.log(err);
        }
    }
    const premiumPro = async () => {
        try {
            const newSub = {
                title: "premium pro",
                percentage: 30,
                description: "You will get 30% from every client",
                serId: JSON.parse(localStorage.getItem("userid"))._id,
                price: 300,
            }
            axios.post(`/stripe/sub`, {
                ...newSub,
                quantity: 1,
            })
                .then((res) => {
                    window.location.href = res.data;
                })
                .catch(err => console.log(err))
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="header">
                    <p className="content">Subscriptions</p>
                    {data ? <p>You have {data[data.length - 1]?.title} subscription</p> : ""}
                </div>
                <div class="subscription-container p-4 md:p-8">
                    <h1 class="text-lg md:text-2xl font-bold">
                        Affordable Excellence: Elevate Your Travel Experience with Our
                        <span class="text-blue-400"> Budget-Friendly Plans!</span>{' '}
                    </h1>
                    <h2 class="text-lg md:text-xl font-semibold">Choose a Subscription Plan</h2>
                    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <div class="plan flex-1 bg-white rounded-lg shadow-md p-4 md:p-6 lg:p-8 border border-gray-200">
                            <h3 class="text-lg md:text-xl font-semibold">Basic Plan</h3>
                            <p class="text-gray-600 text-base md:text-lg mt-2 mb-4 md:mb-6">RS. 10%/order</p>
                            <ul class="text-sm md:text-base">
                                <li>Access to standard layout</li>
                                <li>Email Support</li>
                            </ul>
                            <a href="#basic" class="mt-4 md:mt-6 block w-full md:w-auto text-center md:text-left bg-blue-400 text-white py-2 md:py-3 px-4 md:px-6 rounded-lg hover:bg-blue-500 transition duration-300" onClick={basic}>Subscribe</a>
                        </div>
                        <div class="plan flex-1 bg-white rounded-lg shadow-md p-4 md:p-6 lg:p-8 border border-gray-200">
                            <h3 class="text-lg md:text-xl font-semibold">Premium Plan</h3>
                            <p class="text-gray-600 text-base md:text-lg mt-2 mb-4 md:mb-6">RS. 20%/order</p>
                            <ul class="text-sm md:text-base">
                                <li>Access to standard layout</li>
                                <li>Email Support</li>
                            </ul>
                            <a href="#basic" class="mt-4 md:mt-6 block w-full md:w-auto text-center md:text-left bg-blue-400 text-white py-2 md:py-3 px-4 md:px-6 rounded-lg hover:bg-blue-500 transition duration-300" onClick={premium}>Subscribe</a>
                        </div>
                        <div class="plan flex-1 bg-white rounded-lg shadow-md p-4 md:p-6 lg:p-8 border border-gray-200">
                            <h3 class="text-lg md:text-xl font-semibold">Premium Pro Plan</h3>
                            <p class="text-gray-600 text-base md:text-lg mt-2 mb-4 md:mb-6">RS. 30%/order</p>
                            <ul class="text-sm md:text-base">
                                <li>Access to standard layout</li>
                                <li>Email Support</li>
                            </ul>
                            <a href="#basic" class="mt-4 md:mt-6 block w-full md:w-auto text-center md:text-left bg-blue-400 text-white py-2 md:py-3 px-4 md:px-6 rounded-lg hover:bg-blue-500 transition duration-300" onClick={premiumPro}>Subscribe</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// const Modal = ({ data, showModal, setShowModal }) => {

//     const [submit, setSubmit] = useState(false);
//     const [name, setname] = useState(data.username); // Assuming `data.Description` holds initial value
//     const [city, setcity] = useState(data.city); // Assuming `data.Description` holds initial value
//     const [price, setprice] = useState(data.country); // Assuming `data.Description` holds initial value
//     const [desc, setdesc] = useState(data.password); // Assuming `data.Description` holds initial value
//     const [address, setaddress] = useState(data.phone); // Assuming `data.Description` holds initial value
//     const [distance, setdistance] = useState(data.email); // Assuming `data.Description` holds initial value

//     useEffect(() => {
//         setname(data.name)
//         setcity(data.city)
//         setprice(data.country)
//         setdesc(data.password)
//         setaddress(data.phone)
//         setdistance(data.email)
//     }, [showModal])

//     const handlenameChange = (e) => {
//         setname(e.target.value);
//     };
//     const handlecityChange = (e) => {
//         setcity(e.target.value);
//     };
//     const handlepriceChange = (e) => {
//         setprice(e.target.value);
//     };
//     const handledescChange = (e) => {
//         setdesc(e.target.value);
//     };
//     const handleaddressChange = (e) => {
//         setaddress(e.target.value);
//     };
//     const handledistanceChange = (e) => {
//         setdistance(e.target.value);
//     };

//     const handleSubmit = async (event) => {
//         setShowModal(false)
//         event.preventDefault();
//         setSubmit(true);
//         const data1 = {
//             username: name,
//             city: city,
//             country: price,
//             password: desc,
//             phone: address,
//             email: distance
//         }
//         try {
//             const response = await axios.put(`/users/${data._id}`, data1);
//             if (response.status == 200) {
//                 setSubmit(false)
//                 window.location.href = "all";
//             } else if (response.data.message === "already") {
//                 setSubmit(false);
//                 document.getElementById("desk-error").innerHTML = "Course ALREADY EXIST";
//                 document.getElementById("desk-error").style.color = "red";
//                 document.getElementById("desk-error").style.display = "block";
//             }
//         } catch (error) {
//             console.error("Error:", error);
//         }
//     };
//     // You can customize the modal content here
//     //
//     return (
//         <div className={`overflow-y-auto fixed top-0 left-0 w-full h-full bg-black z-10 bg-opacity-50 flex justify-center items-center ${showModal ? '' : 'hidden'}`}>
//             <div className="w-full max-w-md">
//                 <div className="bg-white rounded shadow-lg p-8 mx-auto">
//                     <form onSubmit={handleSubmit}>
//                         <div className="mb-2">
//                             <label htmlFor="course" className="block text-gray-700 font-bold mb-2">
//                                 Email
//                             </label>
//                             <input
//                                 value={distance}
//                                 onChange={handledistanceChange}
//                                 className="border border-gray-300 rounded-lg py-2 px-3 w-full focus:outline-none focus:border-blue-500"
//                                 id="course"
//                                 type="text"
//                                 name="course"
//                                 required
//                             />
//                         </div>
//                         <div className="mb-2">
//                             <label htmlFor="course" className="block text-gray-700 font-bold mb-2">
//                                 Username
//                             </label>
//                             <input
//                                 value={name}
//                                 onChange={handlenameChange}
//                                 className="border border-gray-300 rounded-lg py-2 px-3 w-full focus:outline-none focus:border-blue-500"
//                                 id="course"
//                                 type="text"
//                                 name="course"
//                                 required
//                             />
//                         </div>
//                         <div className="mb-2">
//                             <label htmlFor="course" className="block text-gray-700 font-bold mb-2">
//                                 Password
//                             </label>
//                             <input
//                                 value={desc}
//                                 onChange={handledescChange}
//                                 className="border border-gray-300 rounded-lg py-2 px-3 w-full focus:outline-none focus:border-blue-500"
//                                 id="course"
//                                 type="text"
//                                 name="course"
//                                 required
//                             />
//                         </div>
//                         <div className="mb-2">
//                             <label htmlFor="course" className="block text-gray-700 font-bold mb-2">
//                                 City
//                             </label>
//                             <input
//                                 value={city}
//                                 onChange={handlecityChange}
//                                 className="border border-gray-300 rounded-lg py-2 px-3 w-full focus:outline-none focus:border-blue-500"
//                                 id="course"
//                                 type="text"
//                                 name="course"
//                                 required
//                             />
//                         </div>
//                         <div className="mb-2">
//                             <label htmlFor="course" className="block text-gray-700 font-bold mb-2">
//                                 Country
//                             </label>
//                             <input
//                                 value={price}
//                                 onChange={handlepriceChange}
//                                 className="border border-gray-300 rounded-lg py-2 px-3 w-full focus:outline-none focus:border-blue-500"
//                                 id="course"
//                                 type="text"
//                                 name="course"
//                                 required
//                             />
//                         </div>
//                         <div className="mb-2">
//                             <label htmlFor="course" className="block text-gray-700 font-bold mb-2">
//                                 Phone
//                             </label>
//                             <input
//                                 value={address}
//                                 onChange={handleaddressChange}
//                                 className="border border-gray-300 rounded-lg py-2 px-3 w-full focus:outline-none focus:border-blue-500"
//                                 id="course"
//                                 type="text"
//                                 name="course"
//                                 required
//                             />
//                         </div>
//                         <button
//                             type="submit"
//                             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                             style={{ transition: 'background-color 0.3s ease' }}
//                         >
//                             {submit ? <div className="spinner"></div> : <span>Update User</span>}
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </div>

//     );
// };