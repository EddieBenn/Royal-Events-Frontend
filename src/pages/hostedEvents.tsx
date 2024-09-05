import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Card from '../components/Cards';
import Events from "../components/events";
import { showErrorToast } from "../utility/toast";
import { getUserAttendedEvents, getUserEvents, upComingEvents } from "../axiosSettings/events/eventAxios";
import { useEffect, useState } from "react";
import Adminsidebar from "../components/adminSideBar";

export const HostedEventPage = () => {
    const user:any = localStorage.getItem("user")
    const newUser = JSON.parse(user)
    const [userEvents, setUserEvents] = useState<any>([])
    const [filters, setFilters] = useState({
        eventType: "",
        location: "",
        date: "",
      });
    const [getEvents, setGetEvents] = useState<any>([])
    const [attendedEvents, setAttendedEvents] = useState<any>([])

    function formatDate(dateString:any) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year
      
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;
      
        return `${formattedDay}/${formattedMonth}/${year}`;
      }

    const getHostedevents = async()=> {
        try{
            const response = await getUserEvents()
            return setUserEvents(response.getMyEvents)
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

    const handleDate = async (e:any) => {
        try{
            e.preventDefault()
            const date = e.target.value
            const originalDate = new Date(date);
            const isoDateString = originalDate.toISOString();
    
            setFilters({...filters, date:isoDateString})
    
        }catch(error:any){
            console.log(error)
        }
      }

    const fetcUpcominghData = async () => {
        try {
          const params = {
            eventType: filters.eventType,
            location: filters.location,
            date: filters.date,
          }
          const response:any = await upComingEvents(params)
    
          if(response.length !== 0){
            return setGetEvents(response);
          }else{
            null
          }
        } catch (error: any) {
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

      const getAttendedEvents = async () => {
        try {

          const response:any = await getUserAttendedEvents()
          console.log(response)
          if(response.length !== 0){
            return setAttendedEvents(response.userEvents);
          }else{
            null
          }
        } catch (error: any) {
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
      

    useEffect(()=>{
        fetcUpcominghData()
    },[filters])
    useEffect(()=>{
        getHostedevents()
        getAttendedEvents()
    },[])
    return (
        <>
        <div className="fixed left-0">
        {newUser.role === "Admin" ? <Adminsidebar /> : <Sidebar />} 
        </div>
        <div className="pl-20 pb-10">
        <Navbar name={newUser.first_name} image={newUser.profile_picture.length === 0 ? "/images/event1.png" : newUser.profile_picture} />
        </div>
        <div className="flex justify-center">
            <div className="w-[80%]">
                <Tabs className="flex flex-col">
                    <div className="flex justify-between">
                        <TabList>
                            <Tab>Hosted Events</Tab>
                            <Tab>Upcoming Events</Tab>
                            <Tab>Attended Events</Tab>
                        </TabList>
                        <div className="h-10 flex flex-col md:flex-row gap-5 ">
                            <Events
                                    placeholder={"Any category"}
                                    text={"text-grey-500 text-xs"}
                                    h={""}
                                    onChange={(eventType) => setFilters({ ...filters, eventType })}
                            />
                            <div className="h-10 px-4 py-2 bg-gray-50 rounded-[5px] justify-between items-center flex">
                            <input
                                type="date"
                                name=""
                                id=""
                                className="text-green-500 bg-gray-200 w-[120px] h-[20px] text-[16px] font-normal font-Inter cursor-pointer"
                                onChange={handleDate}
                            />
                            </div>
                        </div>
                    </div>
                    <TabPanel>
                        {userEvents?.length ? (
                        <div className="mt-6 flex-wrap grid grid-cols-3 gap-6 flex">
                            {userEvents?.map((event:any)=> (
                            <div key={event.id}>
                            <Card
                                image={event.event_image}
                                date={formatDate(event.event_date)}
                                ticketsNo={event.tickets_bought}
                                title={event.title}
                                description={event.description}
                                id={event.id}
                                event_details={event}
                            />
                            </div>
                            ))}
                        </div>
                        ):(<p className="ml-[11%] mt-[2%]">You have not hosted any events yet</p>)
                        }
                    </TabPanel>
                    <TabPanel>
                    {getEvents.length ? (
                        <div className="mt-6 flex-wrap grid grid-cols-3 gap-8 flex">
                            {getEvents?.map((event:any)=> (
                            <div key={event.dataValues.id}>
                           <Card
                            image={event.dataValues.event_image}
                            date={event.event_date}
                            ticketsNo={event.dataValues.tickets_bought}
                            title={event.dataValues.title}
                            description={event.dataValues.description}
                            id={event.dataValues.id}
                            event_details={event.dataValues}
                            />
                            </div>
                            ))}
                        </div>
                        ):(<p className="ml-[11%] mt-[2%]">No Upcoming Events Yet</p>)
                    }
                    </TabPanel>
                    <TabPanel>
                      {attendedEvents?.length ? (
                        <div className="mt-6 flex-wrap grid grid-cols-3 gap-8 flex">
                          {attendedEvents?.map((event:any)=>(
                          <div key={event.id}>
                            <Card
                                image={event.event_image}
                                date={formatDate(event.event_date)}
                                ticketsNo={event.tickets_bought}
                                title={event.title}
                                description={event.description}
                                id={event.id}
                                event_details={event}
                            />
                            </div>
                            ))}
                        </div>
                        ):(<p className="ml-[11%] mt-[2%]">You have not attended any Events Yet</p>)
                      }
                    </TabPanel>
                </Tabs>
            </div>
        </div>
        </>
    )
}