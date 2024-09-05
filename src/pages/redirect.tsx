import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { verifyUser } from "../axiosSettings/user/userAxios";
import { showSuccessToast } from "../utility/toast";

export const Redirect = () => {
  const { token } = useParams()
  const navigate = useNavigate()
  const fetchData = async () => {
    try {
      const data = await verifyUser(token)
      showSuccessToast(data.data.message)
      setTimeout(() => {
        navigate('/signin')
      }, 10000);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
  fetchData();
}, []);
  return (
    <>
      <div className="flex flex-col justify-center min-h-screen w-full items-center">
        <nav className="w-full bg-gray-100 p-4 fixed top-0 z-40">
          <div className="w-10/12 mx-auto flex items-center justify-between">
            <div className="text-center">
              <span className="text-gray-900 text-3xl font-normal font-Holtwood leading-14">
                ROYAL
              </span>
              <span className="text-green-500 text-3xl font-normal font-Holtwood leading-14">
                EVENTS
              </span>
            </div>
          </div>
          <div>
            <Navbar name={""} image={"src/assets/DecaEvent.svg"} />
          </div>
        </nav>
      </div>
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg">
          <p>
            Verification Sucessfull, redirecting you to login page. If it delays, you can <a href="/signin">click here to go to login page</a>
          </p>
        </div>
      </div>
    </>
  );
};
