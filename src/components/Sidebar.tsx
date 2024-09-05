import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { MdAddCircleOutline } from "react-icons/md";
import { FaRegCalendarDays } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { IoTicketOutline } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { showToast } from "../utility/toast";
import { useState } from "react";
import { Modal } from "../components/modal";
import { GiMoneyStack } from "react-icons/gi";

function Sidebar() {
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const navigate = useNavigate();
  const user: any = localStorage.getItem("user");
  const mainUser = JSON.parse(user);
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    return showToast(`Goodbye ${mainUser.first_name}`);
  };

  const handleEventCreation = async () => {
    try {
      if (mainUser.is_completed_profile === false) {
        return setShowModal(true);
      }
      if (mainUser.profile_picture.length === 0) {
        return setShowModal2(true);
      }
      if (mainUser.isBlocked) {
        return setShowModal3(true);
      }
      if (!mainUser.isAddAccount) {
        return setShowModal4(true);
      }
      return navigate("/create_event");
    } catch (err: any) {
      console.log(err);
    }
  };
  const buttons: any = [
    {
      label: "click here to complete profile",
      onClick: () => navigate("/profile"),
      bg: "#27AE60", // Replace with your desired color
      text: "#FFFFFF", // Replace with your desired color
    },
  ];
  const buttons2: any = [
    {
      label: "click here to update profile picture",
      onClick: () => navigate("/profile"),
      bg: "#27AE60", // Replace with your desired color
      text: "#FFFFFF", // Replace with your desired color
    },
  ];
  const buttons3: any = [
    {
      label: "click here to update account details",
      onClick: () => navigate("/user_account"),
      bg: "#27AE60", // Replace with your desired color
      text: "#FFFFFF", // Replace with your desired color
    },
  ];
  return (
    <div className="w-[107px] h-[1024px] bg-green-500 flex-col justify-start items-start inline-flex z-30">
      <div className="w-[107px] grow shrink basis-0 px-8 py-[50px] flex-col justify-start items-start gap-[50px] flex">
        <Link to={"/"} className="text-center no-underline">
          <span className="text-white text-[32px] font-normal font-Imperial leading-[44.80px]">
            R
          </span>
          <span className="text-emerald-900 text-[32px] font-normal font-Imperial leading-[44.80px]">
            E
          </span>
        </Link>
        <div className="flex-col justify-center items-center gap-8 flex ">
          <button className="hover:bg-white hover:bg-opacity-10 py-2 px-2 hover:rounded-xl active:bg-white active:bg-opacity-10 active:rounded-xl">
            <Link to={"/upcomingevents"}>
              <IoHomeOutline className="text-white text-3xl" />
            </Link>
          </button>
          <button
            onClick={() => handleEventCreation()}
            className="hover:bg-white hover:bg-opacity-10 py-2 px-2 hover:rounded-xl active:bg-white active:bg-opacity-10 active:rounded-xl"
          >
            <MdAddCircleOutline className="text-white text-3xl" />
          </button>
          <button className="hover:bg-white hover:bg-opacity-10 py-2 px-2 hover:rounded-xl active:bg-white active:bg-opacity-10 active:rounded-xl">
            <Link to={"/hostedevent"}>
              <FaRegCalendarDays className="text-white text-3xl" />
            </Link>
          </button>
          <button className="hover:bg-white hover:bg-opacity-10 py-2 px-2 hover:rounded-xl active:bg-white active:bg-opacity-10 active:rounded-xl">
            <Link to={"/ticketHistory"}>
              <IoTicketOutline className="text-white text-3xl" />
            </Link>
          </button>
          <button className="hover:bg-white hover:bg-opacity-10 py-2 px-2 hover:rounded-xl active:bg-white active:bg-opacity-10 active:rounded-xl">
            <Link to={"/earningHistory"}>
              <GiMoneyStack className="text-white text-3xl" />
            </Link>
          </button>
          <button className="hover:bg-white hover:bg-opacity-10 py-2 px-2 hover:rounded-xl active:bg-white active:bg-opacity-10 active:rounded-xl">
            <Link to={"/profile"}>
              <CgProfile className="text-white text-3xl" />
            </Link>
          </button>
          <button
            onClick={handleLogout}
            className="hover:bg-white hover:bg-opacity-10 py-2 px-2 hover:rounded-xl active:bg-white active:bg-opacity-10 active:rounded-xl"
          >
            <CiLogout className="text-white text-3xl" />
            <Link to={""}></Link>
          </button>
        </div>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} buttons={buttons}>
          <p className="text-center">
            Only Users with completed profiles can create events. Please update
            your details, avatar and bank account details
          </p>
        </Modal>
      )}
      {showModal2 && (
        <Modal onClose={() => setShowModal2(false)} buttons={buttons2}>
          <p className="text-center">
            Please update your avatar before you can create events
          </p>
        </Modal>
      )}
      {showModal3 && (
        <Modal onClose={() => setShowModal3(false)}>
          <p className="font-Inter text-center">
            <span className="text-red-500">
              Your Account has been blocked, Please{" "}
              <a
                className="text-red-500"
                href="mailto:admin@example.com?subject=Blocked&body=Please%20Contact%20Admin"
              >
                Click Here To Contact Admin
              </a>
            </span>
          </p>
        </Modal>
      )}
      {showModal4 && (
        <Modal onClose={() => setShowModal4(false)} buttons={buttons3}>
          <p className="text-center">
            Please update your bank account details before you can create
            events. This is to enable you receive payments for event tickets
          </p>
        </Modal>
      )}
    </div>
  );
}

export default Sidebar;
