import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { showErrorToast } from "../utility/toast";
import { getTicketHistory } from "../axiosSettings/user/userAxios";
import Adminsidebar from "../components/adminSideBar";

const TicketHistory = () => {
  const user: any = localStorage.getItem("user");
  const mainUser = JSON.parse(user);
  const[getTickets, setGetTickets] = useState<any>()


  function formatDateTime(dateString: any) {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year

    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedDay}/${formattedMonth}/${year} ${formattedHours}:${formattedMinutes}`;
}

  const fetchTicketHistory = async()=>{
    try{
      const response = await getTicketHistory()
     return setGetTickets(response.data.getAllTickets)
    }catch (error: any) {
      if (error.response) {
        return showErrorToast(error.response.data.message);
      } else if (error.request) {
        return showErrorToast('Network Error. Please try again later.');
      } else {
        return showErrorToast('Error occurred. Please try again.');
      }
    }
  }

  useEffect(()=>{
    fetchTicketHistory()
  },[])
  return (
    <>
      <div className="fixed left-0 z-30">
      {mainUser.role === "Admin" ? <Adminsidebar /> : <Sidebar />} 
      </div>
      <div className="pl-20 fixed top-0 w-full z-10">
          <Navbar
            name={mainUser.first_name}
            image={
              mainUser.profile_picture.length === 0
                ? "/images/event1.png"
                : mainUser.profile_picture
            }
          />
        </div>
      <div className="w-full sm:w-[80%] h-auto sm:h-[678px] flex-col md:px-32 justify-start items-start gap-4 inline-flex mt-32">
        <div className="w-[1180px] justify-between items-center inline-flex">
          <div className="flex-col justify-start items-start gap-1.5 inline-flex">
            <div className="text-green-500 text-2xl font-semibold font-['Inter']">
              Ticket History
            </div>
            <div className="w-[200px] h-[0px] border-2 border-green-500"></div>
          </div>
          <div className="h-10 justify-center items-center gap-5 flex">
            <div className="h-10 px-4 py-2 bg-gray-50 rounded-[5px] justify-between items-center flex">
              <input
                type="date"
                name=""
                id=""
                className="text-slate-500 text-xs font-normal font-Inter bg-gray-50"
              />
            </div>
          </div>
        </div>
        <table className="w-full" id="tickets">
          <tr className="h-10 px-5 py-3 border-b border-gray-200 justify-start items-start gap-2.5 text-gray-500 text-xs font-medium font-Inter tracking-tight">
            <th>ORDER NUMBER</th>
            <th>EVENT NAME</th>
            <th>EVENT CATEGORY</th>
            <th>ORDER DATE</th>
            <th>TICKET TYPE</th>
            <th>QUANTITY</th>
            <th>TOTAL COST</th>
          </tr>
          {getTickets ? (getTickets.map((tickets:any, index:any)=>(
          <tr key={index} className="h-11 px-5 py-3 justify-start items-start gap-2.5 text-red-800 text-sm font-medium font-Inter leading-tight tracking-tight">
            <td>{tickets.order_number}</td>
            <td>{tickets.event_name}</td>
            <td>{tickets.event_type}</td>
            <td>{formatDateTime(tickets.createdAt)}</td>
            <td>{tickets.ticket_type}</td>
            <td>{tickets.quantity}</td>
            <td>{tickets.total_cost}</td>
          </tr>
          ))):(<p>No Tickets Purchased</p>)}
        </table>
      </div>
    </>
  );
};

export default TicketHistory;