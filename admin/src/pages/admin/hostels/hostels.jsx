import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from 'axios';
import './hostel.scss';
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import Navbar from "../../../components/admin/navbar/Navbar";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { useEffect } from "react";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Button } from "react-bootstrap";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { saveAs } from 'file-saver';


export default function Hostels() {
    const location = useLocation();
    const [udata, setudata] = useState([])
    const [showModal, setShowModal] = useState(false);

    const addhostel = () => {
        window.location.href = 'new';
    }
    const { data, loading, error, reFetch } = useFetch(
        `/hotels/all`
    );

    const handleClick = () => {
        // reFetch();
    };

    useEffect(() => {
        console.log(data)
        reFetch()
    }, [showModal]);

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`/hotels/${id}`);
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

    // Add header text ("Hotels Data") to the top center of the page
    const headerText = 'Hotels Data';
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

    const [hover, setHover] = useState(false);
    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="header">
                    <p className="content">Hotels</p>
                    <button className="button1" onClick={addhostel}>Add Hotel</button>
                </div>
                <div className="listContainer">
                    <Modal data={udata} showModal={showModal} setShowModal={setShowModal} />
                    <button className="button1" onClick={() => generateAndDownloadPDF(data)}>Generate Report</button>
                    <TableContainer component={Paper} className="table">
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className="tableCell">City</TableCell>
                                    <TableCell className="tableCell">Image & Name</TableCell>
                                    <TableCell className="tableCell">address</TableCell>
                                    <TableCell className="tableCell">Price</TableCell>
                                    <TableCell className="tableCell">Distance</TableCell>
                                    <TableCell className="tableCell">Description</TableCell>
                                    <TableCell className="tableCell">Rooms</TableCell>
                                    <TableCell className="tableCell">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data && data.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell className="tableCell">{row.city}</TableCell>
                                        <TableCell className="tableCell">
                                            <div className="cellWrapper">
                                                <img src={row.photos[0]} alt="" className="image" />
                                                {row.name}
                                            </div>
                                        </TableCell>
                                        <TableCell className="tableCell">{row.address}</TableCell>
                                        <TableCell className="tableCell">{row.cheapestPrice}</TableCell>
                                        <TableCell className="tableCell">{row.distance}</TableCell>
                                        <TableCell className="tableCell">{row.desc}</TableCell>
                                        <TableCell className="relative flex flex-row items-center text-gray-500 cursor-pointer hover:text-gray-600"
                                            onMouseEnter={() => setHover(true)}
                                            onMouseLeave={() => setHover(false)}>
                                            <p>{row.rooms.map(item => item.number).join(',') ? row.rooms.map(item => item.number).join(',').substring(0, 5) : ''}...</p>
                                            <div className="relative">
                                                {hover && (
                                                    <div className="absolute bottom-0 inline-block w-64 px-4 py-3 mb-10 -ml-32 text-black bg-gray-100 rounded-lg"
                                                        style={{
                                                            opacity: 1,
                                                            transform: 'scale(1)',
                                                            transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
                                                        }}>
                                                        <span className="inline-block text-sm leading-tight">
                                                            <p>{row.rooms.map(item => item.number).join(',')}</p>
                                                        </span>
                                                        <span className="absolute bottom-0 right-0 w-5 h-5 -mb-3 transform rotate-45 bg-gray-100"
                                                            style={{ left: '50%' }}></span>
                                                    </div>
                                                )}
                                            </div>
                                        </TableCell>
                                        {/* <TableCell className="tableCell">
                                        {row.rooms.map(item => item.number).join(',')}
                                        </TableCell> */}
                                        <TableCell className="tableCell action">
    <FaEdit className="updateIcon"
     style={{ fontSize: '30px' }}
    onClick={() => {
        updateHandle(row);
        setShowModal(true);
    }} />
    </TableCell>
    <TableCell>
    <FaTrash className="deleteIcon"
         style={{ fontSize: '25px' }}
     onClick={() => handleDelete(row._id)} />
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
    const [name, setname] = useState(data.name); // Assuming `data.Description` holds initial value
    const [city, setcity] = useState(data.city); // Assuming `data.Description` holds initial value
    const [price, setprice] = useState(data.cheapestPrice); // Assuming `data.Description` holds initial value
    const [desc, setdesc] = useState(data.desc); // Assuming `data.Description` holds initial value
    const [address, setaddress] = useState(data.address); // Assuming `data.Description` holds initial value
    const [distance, setdistance] = useState(data.distance); // Assuming `data.Description` holds initial value

    useEffect(() => {
        setname(data.name)
        setcity(data.city)
        setprice(data.cheapestPrice)
        setdesc(data.desc)
        setaddress(data.address)
        setdistance(data.distance)
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
            name: name,
            city: city,
            cheapestPrice: price,
            desc: desc,
            address: address,
            distance: distance
        }
        try {
            const response = await axios.put(`/hotels/${data._id}`, data1);
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
                                Name
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
                                Address
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
                        <div className="mb-2">
                            <label htmlFor="course" className="block text-gray-700 font-bold mb-2">
                                Price
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
                                Distance
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
                                Description
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
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            style={{ transition: 'background-color 0.3s ease' }}
                        >
                            {submit ? <div className="spinner"></div> : <span>Update Hostel</span>}
                        </button>
                    </form>
                </div>
            </div>
        </div>

    );
};