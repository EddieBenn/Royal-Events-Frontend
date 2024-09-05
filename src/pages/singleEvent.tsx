import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import SingleEventHeader from "../components/singleEventHeader";
import Cards from "../components/Cards";
import SingleEventBody from "../components/singleEventBody";
import { FaArrowLeft, FaThumbsDown, FaThumbsUp } from "react-icons/fa6";
import { showErrorToast, showSuccessToast } from "../utility/toast";
import { useParams } from "react-router-dom";
import { makeComments, getEventComments, getSingleEvent, upComingEvents } from "../axiosSettings/events/eventAxios";
import { useEffect, useState } from "react";
import Adminsidebar from "../components/adminSideBar";

function SingleEvent() {
  const user:any = localStorage.getItem("user")
  const mainUser:any = JSON.parse(user)
  const {eventId} = useParams()
  const [fetchedComments, setFetchedComments] = useState<any>([])
  const [events, setEvents] = useState<any>({})
  const [newComment, setNewComment] = useState("")
  const [loading, setLoading] = useState(false)
  const [organizer, setOrganizer] = useState<any>({})
  const [upcomingEvents, setUpcomingEvents] = useState<any>([])

  function formatDate(dateString:any) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year
  
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
  
    return `${formattedDay}/${formattedMonth}/${year}`;
  }
  
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

const fetchEventData = async()=>{
  try{
    const response = await getSingleEvent(eventId)
    response.data.event_date = formatDate(response.data.event_date)
    localStorage.setItem("event_id", response.data.id)
    console.log(response)
    setOrganizer(response.data.organizers[0])
    return setEvents(response.data)
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

const fetchEventComments = async()=>{
  try{
    const response = await getEventComments(eventId)
    setFetchedComments(response.mainComments)
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
const fetchUpcomingEvents = async()=>{
  try{
    const response = await upComingEvents()
    return setUpcomingEvents(response)
  }catch(error:any){
    console.log(error)
  }
}

useEffect(()=>{
  fetchEventData()
  fetchUpcomingEvents()
  fetchEventComments()
},[])
const locate = localStorage.getItem("location")


const handleCommentChange = async(e:any)=>{
  try{
    e.preventDefault()
    let target = e.target.value
    setNewComment(target)
  }catch(error:any){
    console.log(error)
  }
}

const addComments = async(e:React.FormEvent<HTMLFormElement>)=>{
  try{
    e.preventDefault()
    setLoading(true)
    const body = {
      comments: newComment
    }
    const response = await makeComments(body, eventId)
    console.log('add_comment',response)
    if(response.status !== 'success'){
      setLoading(false)
      return showErrorToast(response.message)
    }
    showSuccessToast(response.message)
    fetchEventComments()
    fetchEventData()
    setNewComment("")
    localStorage.setItem("event", JSON.stringify(response.data))
    return setLoading(false)
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

// const likeEventFunction = async()=>{
//   try{
//     console.log('liked')
//     // const response = await userLikeEvent(eventId)
//   }catch (error: any) {
//     if (error.response) {
//       return showErrorToast(error.response.data.message);
//     } else if (error.request) {
//       return showErrorToast('Network Error. Please try again later.');
//     } else {
//       return showErrorToast('Error occurred. Please try again.');
//     }
//   }
// }

// const dislikeEventFunction = async()=>{
//   try{
//     console.log('disliked')
//     // const response = await userDislikeEvent(eventId)
//   }catch (error: any) {
//     if (error.response) {
//       return showErrorToast(error.response.data.message);
//     } else if (error.request) {
//       return showErrorToast('Network Error. Please try again later.');
//     } else {
//       return showErrorToast('Error occurred. Please try again.');
//     }
//   }
// }
  return (
    <div className="w-screen">
      <div className="fixed">
      {mainUser.role === "Admin" ? <Adminsidebar /> : <Sidebar />} 
      </div>
      <div className="pl-24">
        <div>
          <Navbar
            name={mainUser.first_name} image={mainUser.profile_picture?.length === 0
              ? "/images/event1.png"
              : mainUser.profile_picture}
          />
        </div>
        <div className="ml-16 mr-16 mt-2">
          <div className="pl-8 my-2">
            <a href={`http://localhost:5173${locate}`} className="no-underline text-black">
              <div className="flex">
                <FaArrowLeft className="text-black" />{" "}
                <p className="pl-2">Back</p>
              </div>
            </a>
          </div>
          <SingleEventHeader
            title={events.title}
            description={events.description}
            address={events.location}
            date={`${events.event_date}, ${events.event_time}`}
            image={
              events.event_image
            }
          />
          {/* description and map */}
          <div>
            <SingleEventBody
              description={events.description}
              time={events.event_time}
              organizerInfo={`${organizer.name_of_organizer}: ${organizer.email_of_organiser}`} organizerImage={organizer.image_of_organizer}/>
          </div>
          {/* comment section */}
          <div className="text-gray-900 text-base font-medium leading-snug tracking-tight py-4">
            Comments
          </div>
          <div className="p-5 w-full bg-white rounded-lg shadow border border-gray-300 flex-col">
            <div className="flex">
              <img
                src={mainUser.profile_picture?.length === 0
                  ? "/images/event1.png"
                  : mainUser.profile_picture}
                alt="profile_pic"
                className="w-8 h-8 relative rounded-[200px] border-2 border-gray-300"
              />
              <h3 className="text-black text-lg pl-2 font-semibold">
              {mainUser.user_name}
              </h3>
            </div>
            <hr />
            <div className="w-full">
              <form className="flex justify-between w-full" onSubmit={(e:any)=> addComments(e)}>
                <div className="w-4/5">
                  <input
                    type="text"
                    className="h-12 w-full border border-gray-500 px-2 font-Inter"
                    required
                    value={newComment}
                    onChange={(e)=> handleCommentChange(e)}
                  />
                </div>
                <div className="pl-2 w-1/5">
                  <Button
                    title={loading ? "Loading..." : "Comment"}
                    text={"white"}
                    bg={"green"}
                    type={"submit"}
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="py-3 bg-gray-100 p-[20px] h-[300px] overflow-y-scroll">
            {fetchedComments && fetchedComments.map((comment:any, index:any)=>
            <div key={index}>
              <div className="flex">
                <img
                  src={comment.picture}
                  alt="profile_pic"
                  className="w-8 h-8 relative rounded-[200px] border-2 border-gray-300"
                />
                <h3 className="text-black text-lg pl-2 font-semibold">
                  {comment.name}
                </h3>
              </div>
              <p className="font-Inter">
                {comment.comment}
              </p>
              <div className="flex justify-start font-Inter">
                <a href="#" className="w-8 h-8">
                  <FaThumbsUp className="" />
                </a>
                <a href="#" className="w-8 h-8">
                  <FaThumbsDown className="" />
                </a>
                <p>{formatDateTime(comment.comment_time)}</p>
              </div>
            </div>
            )}
            {!fetchedComments && <p>No comments Yet</p>}
          </div>
          {/* other events */}
          <div className="pb-4">
            <div className="text-gray-900 text-base font-medium font-Inter leading-snug tracking-tight">
              <div className="text-gray-900 text-base font-medium font-['Inter'] leading-snug tracking-tight py-4">
                Others you may like
              </div>
              <div className="flex gap-3 overflow-x-scroll">
                {upcomingEvents?.length !== 0 ? ( upcomingEvents?.map((events:any, index:any)=>(
                <div key={index}>
                <Cards
                  date={events.event_date}
                  ticketsNo={events.dataValues?.tickets_bought}
                  title={events.dataValues?.title}
                  description={events.dataValues?.description}
                  image={events.dataValues?.event_image}
                  id={events.dataValues?.id}
                  event_details={event}
                />
                </div>
                ))):(null)
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleEvent;
