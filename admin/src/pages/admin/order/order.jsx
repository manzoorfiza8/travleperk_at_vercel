import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from 'axios';
import './order.scss';
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import Navbar from "../../../components/admin/navbar/Navbar";
// import { useState } from "react";
// import { useEffect } from "react";
// import { Button } from "react-bootstrap";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { saveAs } from 'file-saver';
import useFetch from "../../../hooks/useFetch";
import { useEffect, useState } from "react";


export default function AdminOrders() {
    // const [udata, setudata] = useState([])
    // const [showModal, setShowModal] = useState(false);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [orders , setOrders] = useState([]);
    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
      };
      
    const addroom = () => {
        window.location.href = 'new';
    }
    
    const [amount, setAmount] = useState(0);
    const handleClick = () => {
        // reFetch();
    };

    useEffect(() => {
        fetch('http://localhost:8800/api/orders')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                const totalAmount = data?.reduce((sum, item) => sum + item.amount, 0);
                setAmount(totalAmount)
                setOrders(data);
            })
            .catch(err => console.log(err));
    },[])
    // useEffect(() => {
    //     reFetch()
    // }, [showModal]);

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`/orders/${id}`);
            if (res.status == 200) {
                alert("deleted")
                fetch('http://localhost:8800/api/orders')
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        const totalAmount = data?.reduce((sum, item) => sum + item.amount, 0);
                        setAmount(totalAmount)
                        setOrders(data);
                    })
                    .catch(err => console.log(err));
            }
            else {
                alert("not found")
            }
        }
        catch (error) {
            throw error;
        }
    }

    // const updateHandle = (d) => {
    //     setudata(d);
    // }
    const generateAndDownloadPDF = (data) => {
        // Create a new jsPDF instance
        const doc = new jsPDF();
    
        // Add header text ("Orders Data") to the top center of the page
        const headerText = 'Orders Data';
        const textWidth = doc.getStringUnitWidth(headerText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        const pageWidth = doc.internal.pageSize.getWidth();
        const textX = (pageWidth - textWidth) / 2;
    
        doc.text(headerText, textX, 10);
    
        // Exclude '_id' from columns
        const columns = Object.keys(data[0]).filter(column => column !== '_id' && column !== 'createdAt' && column !== 'updatedAt' && column !== '__v');
    
        // Extract values for each row, handling nested properties
        const rows = data.map(obj => {
            const rowValues = columns.map(key => {
                // Access nested properties for the first three columns
                if (key === 'user') {
                    return obj.user ? obj.user.username : '';
                } else if (key === 'serviceProvider') {
                    return obj.serviceProvider ? obj.serviceProvider.username : '';
                } else if (key === 'hotel') {
                    return obj.hotel ? obj.hotel.name : '';
                } else {
                    return obj[key];
                }
            });
            return rowValues;
        });
    
        // Add the table with the extracted data to the PDF
        doc.autoTable({
            head: [columns],
            body: rows,
            startY: 20, // Adjust the starting Y position for the table to leave space for the header
        });
    
        // Save the PDF with a specific name (e.g., 'downloaded.pdf')
        const pdfName = 'downloaded.pdf';
    
        // Save the generated PDF
        doc.save(pdfName);
    };
    
    
    const allClick= () => {
        fetch('http://localhost:8800/api/orders')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                const totalAmount = data?.reduce((sum, item) => sum + item.amount, 0);
                setAmount(totalAmount)
                setOrders(data);
            })
            .catch(err => console.log(err));
    }
    const weekClick= () => {
        fetch('http://localhost:8800/api/orders/week')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                const totalAmount = data?.orders.reduce((sum, item) => sum + item.amount, 0);
                setAmount(totalAmount)
                setOrders(data?.orders);
            })
            .catch(err => console.log(err));
    }
    const monthClick= () => {
        fetch('http://localhost:8800/api/orders/month')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                const totalAmount = data?.orders.reduce((sum, item) => sum + item.amount, 0);
                setAmount(totalAmount)
                setOrders(data?.orders);
            })
            .catch(err => console.log(err));
    }
    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="header">
                    <p className="content">Orders</p>
                    <p>Amount admin get: {amount*0.3}</p>
                </div>
                <div className="listContainer">
                    <div className="flex justify-between">
                        <button className="button1" onClick={() => generateAndDownloadPDF(orders)}>Generate Report</button>
                        <div className="relative inline-block text-left">
                            <button
                                id="dropdownDefaultButton"
                                onClick={toggleDropdown}
                                className="button1"
                                type="button"
                            >
                                Dropdown button
                            </button>
                        {isDropdownVisible && (
                            <div
                            id="dropdown"
                            className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                            >
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                <li className="cursor-pointer hover:bg-gray-100 px-2 py-2" onClick={allClick}>
                                    All
                                </li>
                                <li className="cursor-pointer hover:bg-gray-100 px-2 py-2" onClick={weekClick}>
                                    Week
                                </li>
                                <li className="cursor-pointer hover:bg-gray-100 px-2 py-2" onClick={monthClick}>
                                    Month
                                </li>
                            </ul>
                            </div>
                        )}
                        </div>
                    </div>
                    
                    <TableContainer component={Paper} className="table">
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className="tableCell">User</TableCell>
                                    <TableCell className="tableCell">Service Provider</TableCell>
                                    <TableCell className="tableCell">Hotel</TableCell>
                                    <TableCell className="tableCell">Amount</TableCell>
                                    <TableCell className="tableCell">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders && orders.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell className="tableCell">{row.user.username}</TableCell>
                                        <TableCell className="tableCell">{row.serviceProvider.username}</TableCell>
                                        <TableCell className="tableCell">{row.hotel.name}</TableCell>
                                        <TableCell className="tableCell">{row.amount}</TableCell>
                                        <TableCell className="tableCell action">
                                            <button className="delete" onClick={() => handleDelete(row._id)}>Delete</button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    );
}

// const Modal = ({ data, showModal, setShowModal }) => {

//     const [submit, setSubmit] = useState(false);
//     const [title, setTitle] = useState(data.title); // Assuming `data.Description` holds initial value
//     const [price, setprice] = useState(data.price); // Assuming `data.Description` holds initial value
//     const [desc, setdesc] = useState(data.desc); // Assuming `data.Description` holds initial value
//     const [maxP, setMexP] = useState(data.maxPeople); // Assuming `data.Description` holds initial value
//     // const [rn, setrn] = useState(''); // Assuming `data.Description` holds initial value
//     const [rooms, setRooms] = useState([]);
    

//     useEffect(() => {
//         console.log(data)
//         if(data?.roomNumbers){
//             const numbersArray = data?.roomNumbers.map(item => item.number) || [];
//             setTitle(data.title)
//             setprice(data.price)
//             setdesc(data.desc)
//             setMexP(data.maxPeople)
//             // setrn(numbersString);
//             setRooms(numbersArray)
//             console.log("bye")
//         }
//         else{
//             console.log("hello")
//             setTitle(data.title)
//             setprice(data.price)
//             setdesc(data.desc)
//             setMexP(data.maxPeople)
//         }
//     }, [data])

//     const handletitleChange = (e) => {
//         setTitle(e.target.value);
//     };
//     const handlepriceChange = (e) => {
//         setprice(e.target.value);
//     };
//     const handledescChange = (e) => {
//         setdesc(e.target.value);
//     };
//     const handlemaxpChange = (e) => {
//         setMexP(e.target.value);
//     };
    

//     const handleSubmit = async (event) => {
//         setShowModal(false)
//         event.preventDefault();
//         setSubmit(true);
//         let data1 = {}
//         if(Array.isArray(rooms)){
//             const roomNumbers = rooms.map((room) => ({ number: room }));
//             data1 = {
//                 title: title,
//                 price: price,
//                 desc: desc,
//                 maxPeople: maxP,
//                 roomNumbers: roomNumbers
//             }
//         }
//         else{
//             const roomArray = rooms.split(",");
//             const roomNumber = roomArray.map(Number);
//             const roomNumbers =  roomNumber.map((room) => ({ number: room }));
//             data1 = {
//                 title: title,
//                 price: price,
//                 desc: desc,
//                 maxPeople: maxP,
//                 roomNumbers: roomNumbers
//             }
//             console.log(roomNumbers);
//         }
//         try {
//             const response = await axios.put(`/rooms/${data._id}/${data.hotelId}`, data1);
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
//                                 Title
//                             </label>
//                             <input
//                                 value={title}
//                                 onChange={handletitleChange}
//                                 className="border border-gray-300 rounded-lg py-2 px-3 w-full focus:outline-none focus:border-blue-500"
//                                 id="course"
//                                 type="text"
//                                 name="course"
//                                 required
//                             />
//                         </div>
//                         <div className="mb-2">
//                             <label htmlFor="course" className="block text-gray-700 font-bold mb-2">
//                                 Price
//                             </label>
//                             <input
//                                 value={price}
//                                 onChange={handlepriceChange}
//                                 className="border border-gray-300 rounded-lg py-2 px-3 w-full focus:outline-none focus:border-blue-500"
//                                 id="course"
//                                 type="number"
//                                 name="course"
//                                 required
//                             />
//                         </div>
//                         <div className="mb-2">
//                             <label htmlFor="course" className="block text-gray-700 font-bold mb-2">
//                                 Max People
//                             </label>
//                             <input
//                                 value={maxP}
//                                 onChange={handlemaxpChange}
//                                 className="border border-gray-300 rounded-lg py-2 px-3 w-full focus:outline-none focus:border-blue-500"
//                                 id="course"
//                                 type=" "
//                                 name="course"
//                                 required
//                             />
//                         </div>
//                         <div className="mb-2">
//                             <label htmlFor="course" className="block text-gray-700 font-bold mb-2">
//                                 Description
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
//                                 Rooms
//                             </label>
//                             <textarea
//                                 value={rooms}
//                                 onChange={(e) => setRooms(e.target.value)}
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
//                             {submit ? <div className="spinner"></div> : <span>Update Room</span>}
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </div>

//     );
// };