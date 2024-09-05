import { FaSquareMinus, FaSquarePlus } from "react-icons/fa6";
import { MdDeleteForever, MdOutlinePendingActions } from "react-icons/md";
import { IoPricetags } from "react-icons/io5";
import { GiTicket } from "react-icons/gi";
import Button from "../components/Button";
import Input from "../components/Input";
import { useEffect, useState } from "react";
import { formatCurrency } from "../utility/currencyFormat";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { showErrorToast } from "../utility/toast";
import { getSingleEvent, payForEvent } from "../axiosSettings/events/eventAxios";
import EventsTicketsDropdown from "../components/ticketForEventDropdown";
import {Ticket} from '../components/ticketForEventDropdown'
import { checkUserPaymentDetails } from "../axiosSettings/user/userAxios";
import Adminsidebar from "../components/adminSideBar";

const Reg4Event = () => {
  const user: any = localStorage.getItem("user");
  const mainUser = JSON.parse(user);
  const eventId = localStorage.getItem("event_id")
  const [counter, setCounter] = useState(0);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | any>(null);
  const [cart, setCart] = useState<Ticket[]>([]);
  const [event, setEvent] = useState<any>({})
  const [loading, setLoading] = useState(false)

  const [userDetails, setUserDetails] = useState({
    email: "",
    password: ""
  })


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
      email: mainUser.email
    })
  }
  const incrementCounter = () => {
    setCounter(counter + 1);
  };

  const decrementCounter = () => {
    if (counter !== 0) {
      setCounter(counter - 1);
    }
  };

  const addToCart = () => {
    if (selectedTicket && counter > 0) {
      const updatedCart = [...cart, { ...selectedTicket, quantity: counter, total_amount: selectedTicket.ticket_amount * counter }];
      setCart(updatedCart);
      setCounter(0);
      setSelectedTicket(null);
    }
  };

  const handleTicketSelect = (ticket: Ticket) => {
    setSelectedTicket(ticket);
  };

  const calculateSubTotal = () => {
    return cart.reduce(
      (total, item:any) => total + item.ticket_amount * (item.quantity ?? 0),
      0
    );
  };

  const calculateTax = () => {
    const subTotal = calculateSubTotal();
    const taxPercentage = 0.05; // 10% tax
    return subTotal * taxPercentage;
  };

  const calculateTotal = () => {
    const subTotal = calculateSubTotal();
    const tax = calculateTax();
    let totals = subTotal + tax
    return totals;
  };

  const handleDeleteCartItem = (index:any) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  const handlePaymentSubmit = async (event:any) => {
    try{
    event.preventDefault();
    setLoading(true)
    if(cart.length === 0){
      setLoading(false)
      return showErrorToast("Please Select a Ticket")
    }
    if(userDetails.password.length === 0){
      setLoading(false)
      return showErrorToast("Please input your password")
    }
    setUserDetails({...userDetails, email: mainUser.email })
    const checkUserDetails = await checkUserPaymentDetails(userDetails)
    if(checkUserDetails.status !== 200){
      setLoading(false)
      return showErrorToast(checkUserDetails.data.message)
    }
    const total:any = calculateTotal();

    const mainCart = new FormData()
    mainCart.append("totalAmount", total)
    mainCart.append("cart", JSON.stringify(cart))

    const response = await payForEvent(mainCart, eventId)
    if(response.status !== 200){
      setLoading(false)
      return showErrorToast(response.data.message)
    }
      localStorage.setItem("user_email", mainUser.email)
      localStorage.setItem("amount", total.toString())

      // const data = {
      //   email: mainUser.email,
      //   amount: total
      // }
      // const paystackResponse = await paystack(data)
      // let url = paystackResponse.data.data.authorization_url
      // window.location.href = url
    setCounter(0)
    setSelectedTicket(null)
    setCart([])
    setEvent({})
    setLoading(false)
    // return navigate("/ticketHistory")
    } catch (error: any) {
      if (error.response) {
        return showErrorToast(error.response.data.message);
      } else if (error.request) {
        return showErrorToast('Network Error. Please try again later.');
      } else {
        return showErrorToast('Error occurred. Please try again.');
      }
    }
  };

  const fetchEvent = async()=>{
    try{
      const response = await getSingleEvent(eventId)
      setEvent(response.data)
    } catch (error: any) {
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
    fetchEvent()
  },[])

  return (
    <>
     <div>
        <div className="fixed top-0 left-0 z-20">
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
      </div>
    <div className="flex justify-center mt-[100px]">
      <div className="max-w-[982px] w-full md:h-[660px] p-4 md:p-8 bg-white rounded-2xl items-start md:gap-[100px] flex flex-col md:flex-row shadow">
        <div className="w-full md:w-[400px] flex-col justify-start items-start gap-2 mb-32 md:mb-auto">
          <h2 className="text-gray-900 text-base font-bold font-Inter">
            REGISTER FOR EVENTS
          </h2>
          <Input
            title={"Email"}
            placeholder={mainUser.email}
            type={"email"}
            disabled
          />
          <Input
            title={"Password"}
            placeholder={"Enter your password"}
            type={"password"}
            value={userDetails.password}
            onChange={handleInputChange}
            name={"password"}
          />
          <div className="w-full h-[300px] pl-[30px] text-gray-900 text-base font-Inter">
            <table className="w-full pl-[100px] gap-5">
              <tr className="font-bold flex justify-between w-[100%]">
                <th>
                  <GiTicket className="text-green-500" />
                  Ticket
                </th>
                <th>
                  <IoPricetags className="text-green-500" />
                  Price
                </th>
                <th>
                  <MdOutlinePendingActions className="text-green-500" />
                  Action
                </th>
              </tr>
              <div className="h-[300px] bg-gray-200 overflow-y-scroll">
              {cart.map((cartItem:any, index) => (
                <tr key={index} className="font-bold flex justify-between w-[95%]">
                  <td className="w-[15%]">{cartItem.ticket_type}</td>
                  <td>
                    {formatCurrency(Number(cartItem.ticket_amount) * (cartItem.quantity ?? 0))}
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteCartItem(index)}
                      className="text-red-500 justify-center items-center"
                    >
                      <MdDeleteForever />
                    </button>
                  </td>
                </tr>
              ))}
              </div>
            </table>
          </div>
        </div>
        <div className="w-full md:w-[418px] flex-col justify-end items-end gap-2 md:inline-flex">
          <div className="self-stretch justify-between items-start inline-flex">
            <div className="flex-col justify-start items-start inline-flex">
              <p className="text-black text-xl font-medium font-Inter">
                Buy tickets for {event.title}
              </p>
              <p className="text-black text-2xl font-bold font-Inter">
                {formatCurrency(
                  selectedTicket ? Number(selectedTicket.ticket_amount) * counter : 0
                )}
              </p>
            </div>
            <div className="justify-start items-center gap-6 flex">
              <button type="button" onClick={decrementCounter}>
                <FaSquareMinus className="w-8 h-8 text-green-400 hover:text-gray-300 rounded-md" />
              </button>
              <span className="text-black text-l font-normal font-Inter leading-7">
                {counter}
              </span>
              <button type="button" onClick={incrementCounter}>
                <FaSquarePlus className="w-8 h-8 text-green-400 hover:text-gray-300 rounded-md" />
              </button>
            </div>
          </div>
          <EventsTicketsDropdown tickets={event.ticket_types} onTicketSelect={handleTicketSelect} />
          <button
            type="submit"
            className="flex h-12 py-1 px-2 justify-center items-center flex-shrink-0 rounded font-Inter border-1 border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
            onClick={addToCart}
          >
            Add Ticket to Cart
          </button>
          <form className="w-full h-[78px] items-start gap-[15px] self-stretch px-4 py-2 mb-4">
            <label className="self-stretch text-black font-normal font-Inter mb-2.5 leading-none tracking-tight">
              Gift Card / Discount Code
            </label>
            <div className="inline-flex space-x-10">
              <input
                placeholder="Input your code"
                type="text"
                className="self-stretch h-[46px] focus:outline-none p-2.5 bg-gray-50 font-Inter rounded-[5px] border-b-2 border-green-500 items-center gap-2.5 w-full"
              />
              <Button
                title={"Apply"}
                text={"#4caf50"}
                bg={"white"}
                type={"submit"}
              />
            </div>
          </form>
          <form
            onSubmit={handlePaymentSubmit}
            className="self-stretch mt-2 flex-col justify-end items-end gap-2 flex"
          >
            <div className="self-stretch justify-start items-start inline-flex">
              <div className="text-gray-500 text-base font-normal font-['Inter']">
                Order Summary
              </div>
            </div>
            <div className="self-stretch h-28 flex-col justify-start items-start gap-2 flex">
              <div className="self-stretch justify-between items-start inline-flex">
                <h3 className="text-gray-500 text-lg font-medium font-['Inter']">
                  Sub total
                </h3>
                <span className="text-slate-600 text-xl font-medium font-['Inter']">
                  {formatCurrency(calculateSubTotal())}
                </span>
              </div>
              <div className="self-stretch justify-between items-start inline-flex">
                <h3 className="text-gray-500 text-lg font-medium font-['Inter']">
                  Tax
                </h3>
                <span className="text-slate-600 text-xl font-medium font-['Inter']">
                  {formatCurrency(calculateTax())}
                </span>
              </div>
              <div className="self-stretch justify-between items-start inline-flex">
                <h2 className="text-gray-700 text-xl font-bold font-['Inter']">
                  Total
                </h2>
                <span className="text-gray-900 text-xl font-medium font-['Inter']">
                  {formatCurrency(calculateTotal())}
                </span>
              </div>
            </div>
            <br />
            <Button
              title={loading ? "LOADING..." : "PROCEED TO PAYMENT"}
              text={"white"}
              bg={"#4caf50"}
              type={"submit"}
            />
          </form>
        </div>
      </div>
    </div>
</>
  );
};

export default Reg4Event;
