import { Link } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { IoIosArrowRoundBack } from "react-icons/io";

export const EventOrganizersPage = () => {
    return (
        <>
            <div className="fixed left-0">
                <Sidebar />
            </div>
            <div className="pl-20 pb-10">
                <Navbar name={"Praise"} image={"Him"} />
            </div>
            <div className="flex justify-center">
                <div className="w-[80%] flex flex-col">
                    <div className="flex justify-between">
                        <div className="w-[289px] h-10 justify-start items-center gap-4 inline-flex">
                            <div className="justify-start items-center gap-2 flex">
                                <div className="w-6 h-6 relative"> <IoIosArrowRoundBack /> </div>
                                <div className="mb-2 text-gray-900 text-base font-medium font-['Inter']">Back</div>
                            </div>
                            <div className="flex-col justify-start items-start gap-1.5 inline-flex">
                                <div className="text-green-500 text-2xl font-medium font-['Inter'] leading-[33.60px]">Create new event</div>
                                <div className="w-[90px] h-[0px] border-2 border-green-500"></div>
                            </div>
                        </div>
                        <Button title={"Submit"} text={"white"} bg={"green"} type={"text"} />
                    </div>
                    <div className="md:mt-12"><Input title={"EVENT ORGANIZERS"} placeholder={"Enter your co-organizers"} type={"text"} /></div>
                    <div className="md:mt-12 flex gap-3 justify-center">
                        <h4>Don't want to add other organizers?</h4>
                        <h4><Link to="/hostedEvents" > Click here to skip </Link></h4>
                    </div>
                </div>
            </div>
        </>
    )
}