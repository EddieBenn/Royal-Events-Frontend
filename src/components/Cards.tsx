import { useLocation } from "react-router-dom";
import { useState } from "react";
import Button from "./Button";
import { showErrorToast } from "../utility/toast";
import Modal from "./modal";

interface Props {
  date: string;
  ticketsNo: number;
  title: string;
  description: string;
  image: string;
  id?:string
  event_details?: any
}

function Card(props: Props) {
  const [isHovered, setIsHovered] = useState(false);
const params = useLocation()
const [showModal3, setShowModal3] = useState(false);
  const handleEventPage = async(id:any, event_details:any)=>{
    try{
      const user:any = localStorage.getItem("user")
      const mainUser = JSON.parse(user)
      
      if(!user){
        return showErrorToast("Only logged in users can view events")
      }
      if (user.isBlocked) {
        return setShowModal3(true);
      }
      localStorage.setItem("event_id", id)
      localStorage.setItem("event", JSON.stringify(event_details))
      localStorage.setItem("location", params.pathname)
      return  mainUser.role === "Admin" ? window.location.href = `/admin_single/${id}` : event_details.owner_id === mainUser.id ? window.location.href = `/organizer/single-event/${id}` : window.location.href = `/single-event/${id}`
    }catch(error:any){
      console.log(error)
    }
  }

  return (
    <div
      className={`relative w-[386.67px] h-[400px] pt-[282px] rounded-md flex-col justify-end items-center flex bg-cover bg-center transition-all duration-100 delay-200`}
      style={{ backgroundImage: `url(${props.image})` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative w-full h-full transition-opacity duration-200 ${
          isHovered ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Front of the card (Card component) */}
        <div className="absolute h-full w-full px-6 pt-2 pb-4 bg-opacity-10 rounded-md backdrop-blur-[3px] flex-col justify-end items-start gap-2 inline-flex">
          <div>
            <span className="text-white text-base font-medium font-Inter">
              {props.date}
            </span>
            <span className="text-white text-base font-normal font-Inter">
              {" "}
              /{" "}
            </span>
            <span className="text-white text-base font-semibold font-Inter">
              {props.ticketsNo}
            </span>
            <span className="text-white text-base font-normal font-Inter">
              {" "}
            </span>
            <span className="text-white text-base font-medium font-Inter">
              Tickets bought
            </span>
          </div>
          <div className="w-[338.67px]">
            <span className="text-white text-lg font-bold font-Inter leading-[25.20px] tracking-tight">
              {props.title}
            </span>
            <span className="text-white text-base font-semibold font-Inter">
              ,
            </span>
            <span className="text-white text-sm font-normal font-Inter leading-tight">
              {" "}
            </span>
            <span className="text-white text-sm font-medium font-Inter leading-tight">
              {props.description}
            </span>
          </div>
        </div>
      </div>

      {/* Back of the card (Card2 component) */}
      <div
        className={`absolute top-0 left-0 w-full h-full transition-opacity duration-200 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="px-6 h-full w-full pb-4 bg-black bg-opacity-10 rounded-md rounded-br-md backdrop-blur-[2px] flex-col justify-end items-start gap-2 inline-flex">
          <div>
            <span className="text-white text-base font-medium font-Inter">
              {props.date}
            </span>
            <span className="text-white text-base font-normal font-Inter">
              {" "}
              /{" "}
            </span>
            <span className="text-white text-base font-semibold font-Inter">
              {props.ticketsNo}
            </span>
            <span className="text-white text-base font-normal font-Inter">
              {" "}
            </span>
            <span className="text-white text-base font-medium font-Inter">
              Tickets bought
            </span>
          </div>
          <div className="w-[338.67px]">
            <span className="text-white text-lg font-bold font-Inter leading-[25.20px] tracking-tight">
              {props.title}
            </span>
            <span className="text-white text-base font-semibold font-Inter">
              ,
            </span>
            <span className="text-white text-sm font-normal font-Inter leading-tight">
              {" "}
            </span>
            <span className="text-white text-sm font-medium font-Inter leading-tight">
              {props.description}
            </span>
          </div>
          <Button
            title={"BUY TICKETS"}
            text={"white"}
            bg={"#27AE60"}
            type={"submit"}
            onClick={() => handleEventPage(props.id, props.event_details)}
          />
        </div>
      </div>
      {showModal3 && (
        <Modal onClose={() => setShowModal3(false)}>
          <p className="font-Inter text-center">
          <span className="text-red-500">Your Account has been blocked, Please <a className="text-red-500" href="mailto:admin@example.com?subject=Blocked&body=Please%20Contact%20Admin">Click Here To Contact Admin</a></span>
              </p>
        </Modal>
      )}
    </div>
  );
}

export default Card;
