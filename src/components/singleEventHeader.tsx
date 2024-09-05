import { FaFlag } from "react-icons/fa6";
import Button from "./Button";
import { useState } from "react";
import Modal from "./modal";
import { showErrorToast, showSuccessToast } from "../utility/toast";
import { reportEvent } from "../axiosSettings/events/eventAxios";
import { useNavigate } from "react-router-dom";

interface Props {
  title: string;
  description: string;
  address: string;
  date: string;
  image: string;
}
function SingleEventHeader(props: Props) {
  const[reportModal, setReportModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [report, setReport] = useState<any>("")

  const closeReportModal = ()=>{
    setLoading(false)
    return setReportModal(false)
  }

  const navigate = useNavigate()
  
  const handleReportModal = async()=>{
    return setReportModal(true)
  }
  const event_id = localStorage.getItem("event_id")
  const handleReportChange = async(e:any)=>{
    try{
      let target = e.target.value
      setReport({report: target})
    }catch(error:any){
      console.log(error)
    }
  }

  const navigateToPayment = async()=>{
    try{
    return navigate("/reg4event")
    }catch(error:any){
      console.log(error)
    }
  }
  const submitReport = async()=>{
    try{
      setLoading(true)
      if(report.length === 0){
        setLoading(false)
        return showErrorToast("Input required")
      }
      const body = new FormData()
      body.append("report", report)
      const response = await reportEvent(event_id, report)
      if(response.status === 500){
        setLoading(false)
        return showErrorToast("Text too long")
      }
      showSuccessToast(response.message)
      setReport("")
      setLoading(false)
      return setReportModal(false)
    } catch (error: any) {
      if (error.response) {
        setLoading(false)
        return showErrorToast(error.response.data.message);
      } else if (error.request) {
        setLoading(false)
        return showErrorToast('Network Error. Please try again later.');
      } else {
        setLoading(false)
        return showErrorToast('Error occurred. Please try again.');
      }
    }
  }
  const buttons:any = [
    {
      label: `${loading ? "Loading..." : "Submit"}`,
      onClick: ()=> submitReport(),
      bg: '#27AE60', // Replace with your desired color
      text: '#FFFFFF', // Replace with your desired color
    },
  ]
  return (
    <div
      className="w-full h-[595px] bg-neutral-900 bg-opacity-30 bg-cover bg-center rounded-[10px]"
      style={{ backgroundImage: `url(${props.image})` }}
    >
      <div className="flex px-20 text-white justify-end py-5">
        <div>
          <a href="#" className="w-8 h-8" onClick={handleReportModal}>
            <FaFlag className="text-green-500 w-full h-full p-2 bg-white rounded-full" />
          </a>
        </div>
      </div>

      <div className="flex px-20 text-white justify-between pt-35">
        <div className="w-3/5 h-[307px] flex-col gap-[18px] inline-flex">
          <h1 className="text-white text-[64px] font-['Inter']">
            {props.title}
          </h1>
          <div className="text-white text-base font-Inter">
            {props.description}
          </div>
          <div className="relative">
            <div className="left-[29px] top-0 text-white text-lg font-normal font-['Inter']">
              {props.address}{" "}
            </div>
          </div>
        </div>
        {/* right div */}
        <div className="bg-white rounded-[10px] shadow p-10">
          <div className="text-black text-2xl font-normal font-Inter pb-4">
            Date & time
          </div>
          <div className="text-zinc-500 text-lg font-normal font-Inter pb-4">
            {props.date}
          </div>

          <div className="text-green-500 text-base font-normal font-Inter pb-4">
            Add to calendar
          </div>
          <div className="self-stretch gap-2.5 inline-flex pb-4">
            <Button
              title={"Book Now"}
              text={"white"}
              bg={"green"}
              type={"button"}
              onClick={navigateToPayment}
            />
          </div>
          <div className="text-center text-zinc-500 text-base font-normal font-['Inter']">
            No Refunds
          </div>
        </div>
      </div>
      {reportModal && (
        <Modal onClose={() => closeReportModal()} buttons={buttons}>
          <div className="font-Inter w-[100%] h-[200px] text-center mb-[60px]">
            <p className="font-Inter bold">Please Type your Report Below</p>
            <textarea
            placeholder="Not more than 20 words"
      className="h-[100%] w-[100%] resize-none border border-gray-300 p-2"
      style={{ resize: 'none' }}
      required
      onChange={(e)=>handleReportChange(e)}
    ></textarea>
              </div>
        </Modal>
      )}
    </div>
  );
}

export default SingleEventHeader;
