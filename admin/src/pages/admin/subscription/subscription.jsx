import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from 'axios';
import './subscription.scss';
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


export default function Subscriptions() {
    const location = useLocation();
    const [udata, setudata] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [hover, setHover] = useState(false);

    const add = () => {
        window.location.href = 'new';
    }
    const { data, loading, error, reFetch } = useFetch(
        `/subscription`
    );

    const handleClick = () => {
        // reFetch();
    };

    useEffect(() => {
        reFetch()
    }, [showModal]);

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`/subscription/${id}`);
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
    
        // Add header text ("Subscriptions Data") to the top center of the page
        const headerText = 'Subscriptions Data';
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
                    <p className="content">Subscriptions</p>
                    <button className="button1" onClick={add}>Add Subscription</button>
                </div>
                <div className="listContainer">
                    <Modal data={udata} showModal={showModal} setShowModal={setShowModal} />
                    <button className="button1" onClick={() => generateAndDownloadPDF(data)}>Generate Report</button>
                    <TableContainer component={Paper} className="table">
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className="tableCell">Title</TableCell>
                                    <TableCell className="tableCell">Image & Type</TableCell>
                                    <TableCell className="tableCell">Price</TableCell>
                                    <TableCell className="tableCell">Description</TableCell>
                                    <TableCell className="tableCell">Locations</TableCell>
                                    <TableCell className="tableCell">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data && data.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell className="tableCell">{row.title}</TableCell>
                                        <TableCell className="tableCell">
                                            <div className="cellWrapper">
                                                <img src={row.img} alt="" className="image" />
                                                {row.type}
                                            </div>
                                        </TableCell>
                                        <TableCell className="tableCell">{row.price}</TableCell>
                                        <TableCell className="tableCell">{row.description}</TableCell>
                                        <TableCell className="relative flex flex-row items-center text-gray-500 cursor-pointer hover:text-gray-600"
                                            onMouseEnter={() => setHover(true)}
                                            onMouseLeave={() => setHover(false)}>
                                            <p>{row.locations.join(', ') ? row.locations.join(', ').substring(0, 5) : ''}...</p>
                                            <div className="relative">
                                                {hover && (
                                                    <div className="absolute bottom-0 inline-block w-64 px-4 py-3 mb-10 -ml-32 text-black bg-gray-100 rounded-lg"
                                                        style={{
                                                            opacity: 1,
                                                            transform: 'scale(1)',
                                                            transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
                                                        }}>
                                                        <span className="inline-block text-sm leading-tight">
                                                            <p>{row.locations.join(', ')}</p>
                                                        </span>
                                                        <span className="absolute bottom-0 right-0 w-5 h-5 -mb-3 transform rotate-45 bg-gray-100"
                                                            style={{ left: '50%' }}></span>
                                                    </div>
                                                )}
                                            </div>
                                        </TableCell>
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
    const [title, settitle] = useState(data.title); // Assuming `data.Description` holds initial value
    const [type, settype] = useState(data.type); // Assuming `data.Description` holds initial value
    const [locations, setlocations] = useState(data.locations); // Assuming `data.Description` holds initial value
    const [desc, setdesc] = useState(data.description); // Assuming `data.Description` holds initial value
    const [price, setprice] = useState(data.price); // Assuming `data.Description` holds initial value

    useEffect(() => {
        settitle(data.title)
        settype(data.type)
        setlocations(data.locations)
        setdesc(data.description)
        setprice(data.price)
    }, [showModal])

    const handletitleChange = (e) => {
        settitle(e.target.value);
    };
    const handletypeChange = (e) => {
        settype(e.target.value);
    };
    const handlepriceChange = (e) => {
        setprice(e.target.value);
    };
    const handledescChange = (e) => {
        setdesc(e.target.value);
    };
    const handlelocChange = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
        setlocations(selectedOptions);
    };

    const handleSubmit = async (event) => {
        setShowModal(false)
        event.preventDefault();
        setSubmit(true);
        const data1 = {
            title: title,
            type: type,
            price: price,
            description: desc,
            locations: locations
        }
        try {
            const response = await axios.put(`/subscription/${data._id}`, data1);
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
                                Title
                            </label>
                            <input
                                value={title}
                                onChange={handletitleChange}
                                className="border border-gray-300 rounded-lg py-2 px-3 w-full focus:outline-none focus:border-blue-500"
                                id="title"
                                type="text"
                                name="title"
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="course" className="block text-gray-700 font-bold mb-2">
                                Type
                            </label>
                            <input
                                value={type}
                                onChange={handletypeChange}
                                className="border border-gray-300 rounded-lg py-2 px-3 w-full focus:outline-none focus:border-blue-500"
                                id="type"
                                type="text"
                                name="type"
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
                                id="desc"
                                type="text"
                                name="desc"
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
                                id="price"
                                type="number"
                                name="price"
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700 font-bold mb-2">Locations</label>
                            <select
                                multiple
                                name="Location"
                                className="border border-gray-300 rounded-lg py-2 px-3 w-full focus:outline-none focus:border-blue-500"
                                id="Location"
                                required
                                onChange={handlelocChange}
                                value={locations} // This is important for controlled components
                            >
                                <option value="" disabled selected>Select The City</option>
                                <option value="Islamabad">Islamabad</option>
                                <option value="" disabled>Punjab Cities</option>
                                <option value="Ahmed Nager Chatha">Ahmed Nager Chatha</option>
                                <option value="Ahmadpur East">Ahmadpur East</option>
                                <option value="Ali Khan Abad">Ali Khan Abad</option>
                                <option value="Alipur">Alipur</option>
                                <option value="Arifwala">Arifwala</option>
                                <option value="Attock">Attock</option>
                                <option value="Bhera">Bhera</option>
                                <option value="Bhalwal">Bhalwal</option>
                                <option value="Bahawalnagar">Bahawalnagar</option>
                                <option value="Bahawalpur">Bahawalpur</option>
                                <option value="Bhakkar">Bhakkar</option>
                                <option value="Burewala">Burewala</option>
                                <option value="Chillianwala">Chillianwala</option>
                                <option value="Chakwal">Chakwal</option>
                                <option value="Chichawatni">Chichawatni</option>
                                <option value="Chiniot">Chiniot</option>
                                <option value="Chishtian">Chishtian</option>
                                <option value="Daska">Daska</option>
                                <option value="Darya Khan">Darya Khan</option>
                                <option value="Dera Ghazi Khan">Dera Ghazi Khan</option>
                                <option value="Dhaular">Dhaular</option>
                                <option value="Dina">Dina</option>
                                <option value="Dinga">Dinga</option>
                                <option value="Dipalpur">Dipalpur</option>
                                <option value="Faisalabad">Faisalabad</option>
                                <option value="Ferozewala">Ferozewala</option>
                                <option value="Fateh Jhang">Fateh Jang</option>
                                <option value="Ghakhar Mandi">Ghakhar Mandi</option>
                                <option value="Gojra">Gojra</option>
                                <option value="Gujranwala">Gujranwala</option>
                                <option value="Gujrat">Gujrat</option>
                                <option value="Gujar Khan">Gujar Khan</option>
                                <option value="Hafizabad">Hafizabad</option>
                                <option value="Haroonabad">Haroonabad</option>
                                <option value="Hasilpur">Hasilpur</option>
                                <option value="Haveli Lakha">Haveli Lakha</option>
                                <option value="Jatoi">Jatoi</option>
                                <option value="Jalalpur">Jalalpur</option>
                                <option value="Jattan">Jattan</option>
                                <option value="Jampur">Jampur</option>
                                <option value="Jaranwala">Jaranwala</option>
                                <option value="Jhang">Jhang</option>
                                <option value="Jhelum">Jhelum</option>
                                <option value="Kalabagh">Kalabagh</option>
                                <option value="Karor Lal Esan">Karor Lal Esan</option>
                                <option value="Kasur">Kasur</option>
                                <option value="Kamalia">Kamalia</option>
                                <option value="Kamoke">Kamoke</option>
                                <option value="Khanewal">Khanewal</option>
                                <option value="Khanpur">Khanpur</option>
                                <option value="Kharian">Kharian</option>
                                <option value="Khushab">Khushab</option>
                                <option value="Kot Addu">Kot Addu</option>
                                <option value="Jauharabad">Jauharabad</option>
                                <option value="Lahore">Lahore</option>
                                <option value="Lalamusa">Lalamusa</option>
                                <option value="Layyah">Layyah</option>
                                <option value="Liaquat Pur">Liaquat Pur</option>
                                <option value="Lodhran">Lodhran</option>
                                <option value="Malakwal">Malakwal</option>
                                <option value="Mamoori">Mamoori</option>
                                <option value="Mailsi">Mailsi</option>
                                <option value="Mandi Bahauddin">Mandi Bahauddin</option>
                                <option value="Mian Channu">Mian Channu</option>
                                <option value="Mianwali">Mianwali</option>
                                <option value="Multan">Multan</option>
                                <option value="Murree">Murree</option>
                                <option value="Muridke">Muridke</option>
                                <option value="Mianwali Bangla">Mianwali Bangla</option>
                                <option value="Muzaffargarh">Muzaffargarh</option>
                                <option value="Narowal">Narowal</option>
                                <option value="Nankana Sahib">Nankana Sahib</option>
                                <option value="Okara">Okara</option>
                                <option value="Renala Khurd">Renala Khurd</option>
                                <option value="Pakpattan">Pakpattan</option>
                                <option value="Pattoki">Pattoki</option>
                                <option value="Pir Mahal">Pir Mahal</option>
                                <option value="Qaimpur">Qaimpur</option>
                                <option value="Qila Didar Singh">Qila Didar Singh</option>
                                <option value="Rabwah">Rabwah</option>
                                <option value="Raiwind">Raiwind</option>
                                <option value="Rajanpur">Rajanpur</option>
                                <option value="Rahim Yar Khan">Rahim Yar Khan</option>
                                <option value="Rawalpindi">Rawalpindi</option>
                                <option value="Sadiqabad">Sadiqabad</option>
                                <option value="Safdarabad">Safdarabad</option>
                                <option value="Sahiwal">Sahiwal</option>
                                <option value="Sangla Hill">Sangla Hill</option>
                                <option value="Sarai Alamgir">Sarai Alamgir</option>
                                <option value="Sargodha">Sargodha</option>
                                <option value="Shakargarh">Shakargarh</option>
                                <option value="Sheikhupura">Sheikhupura</option>
                                <option value="Sialkot">Sialkot</option>
                                <option value="Sohawa">Sohawa</option>
                                <option value="Soianwala">Soianwala</option>
                                <option value="Siranwali">Siranwali</option>
                                <option value="Talagang">Talagang</option>
                                <option value="Taxila">Taxila</option>
                                <option value="Toba Tek Singh">Toba Tek Singh</option>
                                <option value="Vehari">Vehari</option>
                                <option value="Wah Cantonment">Wah Cantonment</option>
                                <option value="Wazirabad">Wazirabad</option>
                                <option value="" disabled>Sindh Cities</option>
                                <option value="Badin">Badin</option>
                                <option value="Bhirkan">Bhirkan</option>
                                <option value="Rajo Khanani">Rajo Khanani</option>
                                <option value="Chak">Chak</option>
                                <option value="Dadu">Dadu</option>
                                <option value="Digri">Digri</option>
                                <option value="Diplo">Diplo</option>
                                <option value="Dokri">Dokri</option>
                                <option value="Ghotki">Ghotki</option>
                                <option value="Haala">Haala</option>
                                <option value="Hyderabad">Hyderabad</option>
                                <option value="Islamkot">Islamkot</option>
                                <option value="Jacobabad">Jacobabad</option>
                                <option value="Jamshoro">Jamshoro</option>
                                <option value="Jungshahi">Jungshahi</option>
                                <option value="Kandhkot">Kandhkot</option>
                                <option value="Kandiaro">Kandiaro</option>
                                <option value="Karachi">Karachi</option>
                                <option value="Kashmore">Kashmore</option>
                                <option value="Keti Bandar">Keti Bandar</option>
                                <option value="Khairpur">Khairpur</option>
                                <option value="Kotri">Kotri</option>
                                <option value="Larkana">Larkana</option>
                                <option value="Matiari">Matiari</option>
                                <option value="Mehar">Mehar</option>
                                <option value="Mirpur Khas">Mirpur Khas</option>
                                <option value="Mithani">Mithani</option>
                                <option value="Mithi">Mithi</option>
                                <option value="Mehrabpur">Mehrabpur</option>
                                <option value="Moro">Moro</option>
                                <option value="Nagarparkar">Nagarparkar</option>
                                <option value="Naudero">Naudero</option>
                                <option value="Naushahro Feroze">Naushahro Feroze</option>
                                <option value="Naushara">Naushara</option>
                                <option value="Nawabshah">Nawabshah</option>
                                <option value="Nazimabad">Nazimabad</option>
                                <option value="Qambar">Qambar</option>
                                <option value="Qasimabad">Qasimabad</option>
                                <option value="Ranipur">Ranipur</option>
                                <option value="Ratodero">Ratodero</option>
                                <option value="Rohri">Rohri</option>
                                <option value="Sakrand">Sakrand</option>
                                <option value="Sanghar">Sanghar</option>
                                <option value="Shahbandar">Shahbandar</option>
                                <option value="Shahdadkot">Shahdadkot</option>
                                <option value="Shahdadpur">Shahdadpur</option>
                                <option value="Shahpur Chakar">Shahpur Chakar</option>
                                <option value="Shikarpaur">Shikarpaur</option>
                                <option value="Sukkur">Sukkur</option>
                                <option value="Tangwani">Tangwani</option>
                                <option value="Tando Adam Khan">Tando Adam Khan</option>
                                <option value="Tando Allahyar">Tando Allahyar</option>
                                <option value="Tando Muhammad Khan">Tando Muhammad Khan</option>
                                <option value="Thatta">Thatta</option>
                                <option value="Umerkot">Umerkot</option>
                                <option value="Warah">Warah</option>
                                <option value="" disabled>Khyber PakhtunKhawa Cities</option>
                                <option value="Abbottabad">Abbottabad</option>
                                <option value="Adezai">Adezai</option>
                                <option value="Alpuri">Alpuri</option>
                                <option value="Akora Khattak">Akora Khattak</option>
                                <option value="Ayubia">Ayubia</option>
                                <option value="Banda Daud Shah">Banda Daud Shah</option>
                                <option value="Bannu">Bannu</option>
                                <option value="Batkhela">Batkhela</option>
                                <option value="Battagram">Battagram</option>
                                <option value="Birote">Birote</option>
                                <option value="Chakdara">Chakdara</option>
                                <option value="Charsadda">Charsadda</option>
                                <option value="Chitral">Chitral</option>
                                <option value="Daggar">Daggar</option>
                                <option value="Dargai">Dargai</option>
                                <option value="Darya Khan">Darya Khan</option>
                                <option value="Dera Ismail Khan">Dera Ismail Khan</option>
                                <option value="Doaba">Doaba</option>
                                <option value="Dir">Dir</option>
                                <option value="Drosh">Drosh</option>
                                <option value="Hangu">Hangu</option>
                                <option value="Haripur">Haripur</option>
                                <option value="Karak">Karak</option>
                                <option value="Kohat">Kohat</option>
                                <option value="Kulachi">Kulachi</option>
                                <option value="Lakki Marwat">Lakki Marwat</option>
                                <option value="Latamber">Latamber</option>
                                <option value="Madyan">Madyan</option>
                                <option value="Mansehra">Mansehra</option>
                                <option value="Mardan">Mardan</option>
                                <option value="Mastuj">Mastuj</option>
                                <option value="Mingora">Mingora</option>
                                <option value="Nowshera">Nowshera</option>
                                <option value="Paharpur">Paharpur</option>
                                <option value="Pabbi">Pabbi</option>
                                <option value="Peshawar">Peshawar</option>
                                <option value="Saidu Sharif">Saidu Sharif</option>
                                <option value="Shorkot">Shorkot</option>
                                <option value="Shewa Adda">Shewa Adda</option>
                                <option value="Swabi">Swabi</option>
                                <option value="Swat">Swat</option>
                                <option value="Tangi">Tangi</option>
                                <option value="Tank">Tank</option>
                                <option value="Thall">Thall</option>
                                <option value="Timergara">Timergara</option>
                                <option value="Tordher">Tordher</option>
                                <option value="" disabled>Balochistan Cities</option>
                                <option value="Awaran">Awaran</option>
                                <option value="Barkhan">Barkhan</option>
                                <option value="Chagai">Chagai</option>
                                <option value="Dera Bugti">Dera Bugti</option>
                                <option value="Gwadar">Gwadar</option>
                                <option value="Harnai">Harnai</option>
                                <option value="Jafarabad">Jafarabad</option>
                                <option value="Jhal Magsi">Jhal Magsi</option>
                                <option value="Kacchi">Kacchi</option>
                                <option value="Kalat">Kalat</option>
                                <option value="Kech">Kech</option>
                                <option value="Kharan">Kharan</option>
                                <option value="Khuzdar">Khuzdar</option>
                                <option value="Killa Abdullah">Killa Abdullah</option>
                                <option value="Killa Saifullah">Killa Saifullah</option>
                                <option value="Kohlu">Kohlu</option>
                                <option value="Lasbela">Lasbela</option>
                                <option value="Lehri">Lehri</option>
                                <option value="Loralai">Loralai</option>
                                <option value="Mastung">Mastung</option>
                                <option value="Musakhel">Musakhel</option>
                                <option value="Nasirabad">Nasirabad</option>
                                <option value="Nushki">Nushki</option>
                                <option value="Panjgur">Panjgur</option>
                                <option value="Pishin Valley">Pishin Valley</option>
                                <option value="Quetta">Quetta</option>
                                <option value="Sherani">Sherani</option>
                                <option value="Sibi">Sibi</option>
                                <option value="Sohbatpur">Sohbatpur</option>
                                <option value="Washuk">Washuk</option>
                                <option value="Zhob">Zhob</option>
                                <option value="Ziarat">Ziarat</option>
                                <option value="" disabled>Gilgit-Baltistan Cities</option>
                                <option value="Gilgit">Gilgit</option>
                                <option value="Skardu">Skardu</option>
                                <option value="Khaplu">Khaplu</option>
                                <option value="Dambudas">Dambudas</option>
                                <option value="Tolti">Tolti</option>
                                <option value="Eidghah">Eidghah</option>
                                <option value="Nagarkhas">Nagarkhas</option>
                                <option value="Ishkoman">Ishkoman</option>
                                <option value="Juglot">Juglot</option>
                                <option value="Danyor">Danyor</option>
                                <option value="Karimabad">Karimabad</option>
                                <option value="Aliabad">Aliabad</option>
                                <option value="Chilas">Chilas</option>
                                <option value="Gahkuch">Gahkuch</option>
                                <option value="Tangir">Tangir</option>
                                <option value="" disabled>Azad-Kashmir</option>
                                <option value="Mirpur">Mirpur</option>
                                <option value="Kotli">Kotli</option>
                                <option value="Bhimber">Bhimber</option>
                                <option value="Muzaffarabad">Muzaffarabad</option>
                                <option value="Hattian">Hattian</option>
                                <option value="Neelam Valley">Neelam Valley</option>
                                <option value="Poonch">Poonch</option>
                                <option value="Haveli">Haveli</option>
                                <option value="Bagh">Bagh</option>
                                <option value="Sudhanoti">Sudhanoti</option>
                            </select>
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