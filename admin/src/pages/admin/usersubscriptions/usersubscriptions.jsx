import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from 'axios';
import './usersubscriptions.scss';
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import Navbar from "../../../components/admin/navbar/Navbar";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { saveAs } from 'file-saver';
import useFetch from "../../../hooks/useFetch";
import { useEffect, useState } from "react";


export default function UserSubscriptions() {
    const [data , setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8800/api/UserSubscription')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setData(data)
            })
            .catch(err => console.log(err));
    },[])

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`/UserSubscription/${id}`);
            if (res.status == 200) {
                alert("deleted")
                fetch('http://localhost:8800/api/UserSubscription')
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        setData(data);
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
    
        // Add header text ("Subscriptions Data") to the top center of the page
        const headerText = 'Users Subscriptions Data';
        const textWidth = doc.getStringUnitWidth(headerText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        const pageWidth = doc.internal.pageSize.getWidth();
        const textX = (pageWidth - textWidth) / 2;
    
        doc.text(headerText, textX, 10);
    
        // Exclude '_id' from columns
        const columns = Object.keys(data[0]).filter(column => column !== '_id' && column !== 'createdAt' && column !== 'updatedAt' && column !== '__v');
    
        // Extract values for each row, excluding '_id' field
        const rows = data.map(obj => {
            const rowValues = columns.map(key => {
                // Access nested properties for the first three columns
                if (key === 'user') {
                    return obj.user ? obj.user.username : '';
                } else {
                    return obj[key];
                }
            });
            return rowValues;
        }
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
                    <p className="content">User Subscriptions</p>
                </div>
                <div className="listContainer">
                <button className="button1" onClick={() => generateAndDownloadPDF(data)}>Generate Report</button>
                    
                    
                    <TableContainer component={Paper} className="table">
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className="tableCell">User</TableCell>
                                    <TableCell className="tableCell">Image & title</TableCell>
                                    <TableCell className="tableCell">type</TableCell>
                                    <TableCell className="tableCell">Description</TableCell>
                                    <TableCell className="tableCell">Locations</TableCell>
                                    <TableCell className="tableCell">Amount</TableCell>
                                    <TableCell className="tableCell">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data && data.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell className="tableCell">{row.user.username}</TableCell>
                                        <TableCell className="tableCell">
                                            <div className="cellWrapper">
                                                <img src={row.img} alt="" className="image" />
                                                {row.title}
                                            </div>
                                        </TableCell>
                                        <TableCell className="tableCell">{row.type}</TableCell>
                                        <TableCell className="tableCell">{row.description}</TableCell>
                                        <TableCell className="tableCell">{row.locations.join(', ')}</TableCell>
                                        <TableCell className="tableCell">{row.price}</TableCell>
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