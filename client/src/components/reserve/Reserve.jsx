import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
  const { dates } = useContext(SearchContext);

  setTimeout(() => {
    console.log(data[0]?._id)
  }, 1000)

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = getDatesInRange(dates[0]?.startDate, dates[0]?.endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const rid = data[0]?._id
      const userid = localStorage.getItem("userid")
      console.log("dta", hotelId, userid, selectedRooms.length)
      const response = await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`/rooms/availability/${roomId}/${rid}`, {
            dates: alldates,
          });
          return res.data;
        })
      );
      if (response) {
        const data = {
          hotelId: hotelId,
          userid: userid,
          count: selectedRooms.length
        }
        const res2 = await axios.post(`/orders`, data)
        if(res2.status == 200){
          alert("room booked")
          setOpen(false);
          navigate("/");
        }
      }
    } catch (err) {

    }
  };
  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data?.map((item) => (
          <div className="rItem" key={item ? item._id : ""}>
            <div className="rItemInfo">
              <div className="rTitle">{item ? item.title : ""}</div>
              <div className="rDesc">{item ? item.desc : ""}</div>
              <div className="rMax">
                Max people: <b>{item ? item.maxPeople : ""}</b>
              </div>
              <div className="rPrice">{item ? item.price : ""}</div>
            </div>
            <div className="rSelectRooms">
              {item
                ? item?.roomNumbers?.map((roomNumber) => (
                  <div className="room" key={roomNumber._id}>
                    <label>{roomNumber.number}</label>
                    <input
                      type="checkbox"
                      value={roomNumber._id}
                      onChange={handleSelect}
                      disabled={!isAvailable(roomNumber)}
                    />
                  </div>
                ))
                : null}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
      </div>
    </div>

  );
};

export default Reserve;
