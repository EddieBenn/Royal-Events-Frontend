// import axios from "../configurations/httpSetup";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";
import { FaLinkedin, FaInstagram, FaFacebookF } from "react-icons/fa6";
import Events from "../components/events";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import CalendarInput from "../components/calender";
import CardContainer from "../components/CardContainer";
import search from "../assets/search.svg";
import axios from "../configurations/httpSetup";
import { useState } from "react";
import {showToast, showErrorToast} from '../utility/toast'

export const LandingPage = () => {

  const [filters, setFilters] = useState<any>({
    eventType: '',
    location: '',
    date: '',
  });
  const handleSearch = async (event:any) => {
    event.preventDefault();
    try {
      const response = await axios.get('/events/upcoming_events', {
        params: {
          eventType: filters.eventType,
          location: filters.location,
          date: filters.date,
        },
      });
      setFilters(response.data.data)
      showToast(response.data.message)
    } catch (error:any) {
      if (error.response) {
        return showErrorToast(error.response.data.message);
      }
      if (error.request) {
        return showErrorToast("Network Error");
      }
      if (error.message) {
        return showErrorToast(error.message);
      }
    }
  };
  return (
    <div className="flex flex-col justify-center min-h-screen w-full items-center">
      <nav className="w-full bg-gray-100 p-4 fixed top-0 z-40">
        <div className="w-10/12 mx-auto flex items-center justify-between">
          <div className="text-center">
            <Link to={"/"} className="no-underline">
              <span className="text-gray-900 text-3xl font-Holtwood leading-14">
                ROYAL
              </span>
              <span className="text-green-500 text-3xl font-Holtwood leading-14">
                EVENTS
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link to={"/signin"} className="no-underline">
              <Button title={"Login"} text={"#27AE60"} bg={"white"} type={""} />
            </Link>
            <Link to={"/signup"} className="no-underline">
              <Button
                title={"Signup"}
                text={"white"}
                bg={"#27AE60"}
                type={""}
              />
            </Link>
          </div>
        </div>
      </nav>

      {/* ----------------------- Header ----------------------- */}

      <section className="rounded-md w-full relative mb-4 items-center justify-center flex flex-col">
        <div className="bg-[url('/images/img.png')] w-11/12 bg-cover bg-center h-[596px] md:max-h-screen  items-center rounded-md">
          <h1 className="text-center text-white text-4xl font-bold mt-60 font-bold font-Product uppercase">
            Made for those <br />
            who do
          </h1>
        </div>
        <div className="w-10/12 flex inline-flex items-center p-2 md:p-8 bg-green-500 rounded-md md:flex-col justify-start md:absolute top-[510px]">
          <form
            action=""
            method="get"
            className="md:w-full lg:w-full p-4 md:p-8 flex flex-col md:flex-row justify-center items-center"
          >
            <div className="mb-4 md:mb-0 md:w-1/3">
              <p className="text-gray-50 text-base font-normal font-Product mb-2">
                Looking for
              </p>
              <Events
                placeholder={"Choose event type"}
                text={"text-green-500 text-xs"}
                h={""}
                onChange={(eventType) => setFilters({ ...filters, eventType })}
              />
            </div>
            <div className="mb-4 md:mb-0 md:w-1/3">
              <p className="text-gray-50 text-base font-normal font-Product mb-2">
                Location
              </p>
              <input title={"Location"} placeholder={"Enter Location"} type={"text"} onChange={(location) => setFilters({ ...filters, location })} className="self-stretch h-[46px] focus:outline-none p-2.5 bg-gray-50 font-Inter rounded-[5px] border-b-2 border-green-500 items-center gap-2.5 w-full md:w-64" />
            </div>
            <div className="mb-4 md:mb-0 md:w-1/3">
              <p className="text-gray-50 text-base font-normal font-Product mb-2">
                When
              </p>
              <CalendarInput 
                onChange={(date) => setFilters({ ...filters, date })}
              />
            </div>
            <button
              type="submit"
              className="p-2.5 bg-emerald-900 rounded-[5px] justify-center items-center hover:bg-emerald-700"
              onClick={handleSearch}
            >
              <img src={`${search}`} style={{ alignItems: "center" }} />
            </button>
          </form>
        </div>
      </section>

      {/* ----------------------- Events ----------------------- */}

      <div className="w-full mt-24 items-center mb-8">
        <div className="w-11/12 mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          <div className="flex flex-col items-start gap-1.5">
            <h2 className="text-green-500 text-2xl font-semibold font-Inter">
              Upcoming Events
            </h2>
            <div className="w-16 h-1 bg-green-500"></div>
          </div>
          {/* <div className="flex flex-col md:flex-row gap-5 ">
            <Events
              placeholder={"Any category"}
              text={"text-grey-500 text-xs"}
              h={""}
              onChange={(eventType) => setFilters({ ...filters, eventType })}
            />
            <Locations
              placeholder={"Choose location"}
              text={"text-grey text-xs"}
              h={""}
              onChange={(location) => setFilters({ ...filters, location })}
            />
            <div className="h-10 px-4 py-2 bg-gray-50 rounded-[5px] justify-between items-center flex">
              <input
                type="date"
                name=""
                id=""
                className="text-slate-500 text-xs font-normal font-Inter bg-gray-50"
              />
            </div>
          </div> */}
        </div>
        <CardContainer filters={filters}/>
      </div>
      <div className="h-12 bg-green-500 rounded-md text-white mt-16 mb-8">
        <Button
          title={"Load More..."}
          text={"white"}
          bg={"#27AE60"}
          type={"submit"}
        />
      </div>

      {/* ----------------------- Footer ----------------------- */}

      <footer className="h-80 w-full bg-green-500 items-center justify-center flex flex-col mt-16">
        <h1 className="font-Holtwood text-3xl font-normal text-white my-7">
          <span className="text-white">Royal</span>
          <span className="text-emerald-900">EVENTS</span>
        </h1>
        <form
          action="#"
          method="POST"
          className="flex max-w-md justify-center items-center gap-2.5 mt-6"
        >
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="px-4 py-2.5 text-sm border-b-2 rounded-md border-gray-400 outline-none opacity-50 focus:border-blue-400 flex-grow flex-shrink-0 flex-basis-0 h-14 md:h-14 "
            placeholder="Enter your mail"
          />
          <button
            type="submit"
            className="w-32 md:w-40 px-10 py-2.5 bg-emerald-900 rounded-md text-white font-sans hover:bg-emerald-700"
          >
            Subscribe
          </button>
        </form>
        <div className="w-full md:w-[292px] my-7 h-12 flex justify-center items-center gap-5 text-center text-white font-normal font-product-sans">
          <a href="" className="no-underline text-white">Home</a>
          <a href="" className="no-underline text-white">About</a>
          <a href="" className="no-underline text-white">Get in touch</a>
        </div>
        <div className="w-11/12 top-20 md:mt-18 border border-white"></div>
        <div className=" w-11/12 flex justify-between mt-10">
          <div className="w-32 h-8 md:w-96 flex gap-3">
            <a href="linkedin.com">
              <FaLinkedin className="text-white" />
            </a>
            <a href="instagram.com">
              <FaInstagram className="text-white" />
            </a>
            <a href="facebook.com">
              <FaFacebookF className="text-white" />
            </a>
          </div>
          <p className="text-right text-white text-sm font-normal font-inter">
            Non Copyrighted © 2023 Upload by Royal-Event
          </p>
        </div>
      </footer>
    </div>
  );
};
