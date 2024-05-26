import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from 'axios';
import './users.scss';
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import Navbar from "../../../components/admin/navbar/Navbar";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { saveAs } from 'file-saver';


export default function Users() {
    const location = useLocation();
    const [udata, setudata] = useState([])
    const [showModal, setShowModal] = useState(false);

    const adduser = () => {
        window.location.href = 'new';
    }
    const { data, loading, error, reFetch } = useFetch(
        `/serviceProvider`
    );

    const handleClick = () => {
        // reFetch();
    };

    useEffect(() => {
        reFetch()
        console.log(data);
    }, [showModal]);

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`/serviceProvider/${id}`);
            if (res.status == 200) {
                alert("deleted")
                reFetch()
            }
            else {
                alert("not found")
            }
        }
        catch (error) {
            throw error;
        }
    }

    const updateHandle = (d) => {
        setudata(d);
    }
    const generateAndDownloadPDF = (data) => {
        // Create a new jsPDF instance
        const doc = new jsPDF();
    
        // Add header text to the top center of the page
        const headerText = 'Service Providers Report';
        const textWidth = doc.getStringUnitWidth(headerText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        const pageWidth = doc.internal.pageSize.getWidth();
        const textX = (pageWidth - textWidth) / 2;
    
        doc.text(headerText, textX, 10);
    
        // Exclude '_id' from columns
        const columns = Object.keys(data[0]).filter(column => column !== '_id' && column !== 'createdAt' && column !== 'updatedAt' && column !== '__v');
    
        // Extract values for each row, excluding '_id' field
        const rows = data.map(obj => Object.keys(obj)
            .filter(key => key !== '_id' && key !== 'createdAt' && key !== 'updatedAt' && key !== '__v')
            .map(key => obj[key])
        );
    
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
    

    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="header">
                    <p className="content">Service Providers</p>
                    <button className="button1" onClick={adduser}>Add Service Provider</button>
                </div>
                <div className="listContainer">
                    <Modal data={udata} showModal={showModal} setShowModal={setShowModal} />
                    <button className="button1" onClick={() => generateAndDownloadPDF(data)}>Generate Report</button>
                    <TableContainer component={Paper} className="table">
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className="tableCell">Email</TableCell>
                                    <TableCell className="tableCell">Image & Username</TableCell>
                                    <TableCell className="tableCell">City</TableCell>
                                    <TableCell className="tableCell">Country</TableCell>
                                    <TableCell className="tableCell">Phone</TableCell>
                                    {/* <TableCell className="tableCell">Password</TableCell> */}
                                    <TableCell className="tableCell">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data && data.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell className="tableCell">{row.email}</TableCell>
                                        <TableCell className="tableCell">
                                            <div className="cellWrapper">
                                                <img src={row.img} alt="" className="image" />
                                                {row.username}
                                            </div>
                                        </TableCell>
                                        <TableCell className="tableCell">{row.city}</TableCell>
                                        <TableCell className="tableCell">{row.country}</TableCell>
                                        <TableCell className="tableCell">{row.phone}</TableCell>
                                        {/* <TableCell className="tableCell">{row.password}</TableCell> */}
                                        <TableCell className="tableCell action">
                                            <button className="update" onClick={() => {
                                                updateHandle(row);
                                                setShowModal(true);
                                            }}>Update</button>
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

const Modal = ({ data, showModal, setShowModal }) => {

    const [submit, setSubmit] = useState(false);
    const [name, setname] = useState(data.username); // Assuming `data.Description` holds initial value
    const [city, setcity] = useState(data.city); // Assuming `data.Description` holds initial value
    const [price, setprice] = useState(data.country); // Assuming `data.Description` holds initial value
    const [desc, setdesc] = useState(data.password); // Assuming `data.Description` holds initial value
    const [address, setaddress] = useState(data.phone); // Assuming `data.Description` holds initial value
    const [distance, setdistance] = useState(data.email); // Assuming `data.Description` holds initial value

    useEffect(() => {
        setname(data.username)
        setcity(data.city)
        setprice(data.country)
        setdesc(data.password)
        setaddress(data.phone)
        setdistance(data.email)
    }, [showModal])

    const handlenameChange = (e) => {
        setname(e.target.value);
    };
    const handlecityChange = (e) => {
        setcity(e.target.value);
    };
    const handlepriceChange = (e) => {
        setprice(e.target.value);
    };
    const handledescChange = (e) => {
        setdesc(e.target.value);
    };
    const handleaddressChange = (e) => {
        setaddress(e.target.value);
    };
    const handledistanceChange = (e) => {
        setdistance(e.target.value);
    };

    const handleSubmit = async (event) => {
        setShowModal(false)
        event.preventDefault();
        setSubmit(true);
        const data1 = {
            username: name,
            city: city,
            country: price,
            password: desc,
            phone: address,
            email: distance
        }
        try {
            const response = await axios.put(`/serviceProvider/${data._id}`, data1);
            if (response.status == 200) {
                setSubmit(false)
                window.location.href = "all";
            } else if (response.data.message === "already") {
                setSubmit(false);
                document.getElementById("desk-error").innerHTML = "Course ALREADY EXIST";
                document.getElementById("desk-error").style.color = "red";
                document.getElementById("desk-error").style.display = "block";
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    // You can customize the modal content here
    //   
    return (
        <div className={`overflow-y-auto fixed top-0 left-0 w-full h-full bg-black z-10 bg-opacity-50 flex justify-center items-center ${showModal ? '' : 'hidden'}`}>
            <div className="w-full max-w-md">
                <div className="bg-white rounded shadow-lg p-8 mx-auto">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-2">
                            <label htmlFor="course" className="block text-gray-700 font-bold mb-2">
                                Email
                            </label>
                            <input
                                value={distance}
                                onChange={handledistanceChange}
                                className="border border-gray-300 rounded-lg py-2 px-3 w-full focus:outline-none focus:border-blue-500"
                                id="course"
                                type="text"
                                name="course"
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="course" className="block text-gray-700 font-bold mb-2">
                                Username
                            </label>
                            <input
                                value={name}
                                onChange={handlenameChange}
                                className="border border-gray-300 rounded-lg py-2 px-3 w-full focus:outline-none focus:border-blue-500"
                                id="course"
                                type="text"
                                name="course"
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="course" className="block text-gray-700 font-bold mb-2">
                                Password
                            </label>
                            <input
                                value={desc}
                                onChange={handledescChange}
                                className="border border-gray-300 rounded-lg py-2 px-3 w-full focus:outline-none focus:border-blue-500"
                                id="course"
                                type="text"
                                name="course"
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="course" className="block text-gray-700 font-bold mb-2">
                                City
                            </label>
                            <input
                                value={city}
                                onChange={handlecityChange}
                                className="border border-gray-300 rounded-lg py-2 px-3 w-full focus:outline-none focus:border-blue-500"
                                id="course"
                                type="text"
                                name="course"
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="course" className="block text-gray-700 font-bold mb-2">
                                Country
                            </label>
                            <input
                                value={price}
                                onChange={handlepriceChange}
                                className="border border-gray-300 rounded-lg py-2 px-3 w-full focus:outline-none focus:border-blue-500"
                                id="course"
                                type="text"
                                name="course"
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="course" className="block text-gray-700 font-bold mb-2">
                                Phone
                            </label>
                            <input
                                value={address}
                                onChange={handleaddressChange}
                                className="border border-gray-300 rounded-lg py-2 px-3 w-full focus:outline-none focus:border-blue-500"
                                id="course"
                                type="text"
                                name="course"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            style={{ transition: 'background-color 0.3s ease' }}
                        >
                            {submit ? <div className="spinner"></div> : <span>Update User</span>}
                        </button>
                    </form>
                </div>
            </div>
        </div>

    );
};