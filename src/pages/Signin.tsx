import { Link, useNavigate } from "react-router-dom";
import image from "/images/deca-signin.jpeg";
import Button from "../components/Button";
import Input from "../components/Input";
import { useState } from "react";
import { showErrorToast, showSuccessToast } from "../utility/toast";
import { loginUser, resendVerificationLink } from "../axiosSettings/user/userAxios";
import { Modal } from "../components/modal";

export const SignIn = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false)
  const [showModal3, setShowModal3] = useState(false);
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }
const handleResendLink = async()=>{
  try{
    setLoading(true)
    const email = localStorage.getItem("email")
    const data = await resendVerificationLink({email: email})
    showSuccessToast(data.data.message)
    setLoading(false)
    setFormData({
      email: "",
      password: ""
    })
    return setShowModal(false);
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
  const buttons:any = [
    {
      label: `${loading ? "Loading..." : "Resend Verification Link"}`,
      onClick: ()=> handleResendLink(),
      bg: '#27AE60', // Replace with your desired color
      text: '#FFFFFF', // Replace with your desired color
    },
  ]
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>)=>{
    try{
      e.preventDefault()
      setLoading(true)
      const response:any = await loginUser(formData);

      if (response.status === 401) {
        localStorage.setItem('email', formData.email)
        setLoading(false)
        return setShowModal(true);
      }
      if(response.status !== 200){
        return showErrorToast(response.data.message)
      }
      if (response.data.user.isBlocked) {
        return setShowModal3(true);
      }
      localStorage.setItem("user", JSON.stringify(response.data.user))
      localStorage.setItem("token", response.data.token)
      showSuccessToast(response.data.message)
      const user = response.data.user
      user.role === "Admin" ? navigate("/admin") : navigate("/upcomingevents")
    }catch (error: any) {
      if (error.response) {
        // Server responded with a status code other than 2xx
        return showErrorToast(error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        return showErrorToast('Network Error. Please try again later.');
      } else {
        // Something happened in setting up the request
        return showErrorToast('Error occurred. Please try again.');
      }
    }
  }
  return (
    <div className="w-full h-screen justify-start items-center inline-flex">
      <div
        className="w-2/5 self-stretch flex flex-col justify-center items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      >
        <p className="w-[338px] text-center text-white text-[40px] font-bold font-Inter">
          Welcome back
        </p>
        <p className="text-center text-white font-medium font-Inter">
          Please share your contact details to stay in touch with us.
        </p>
      </div>
      <div className="w-3/5 items-center flex flex-col justify-center">
        <Link to={'/'} className="no-underline">
        <h1 className="text-center">
          <span className="text-black text-2xl font-normal font-Holtwood">
            Royal
          </span>{" "}
          <span className="text-green-500 text-2xl font-normal font-Holtwood leading-[33.60px]">
            EVENTS
          </span>
        </h1>
        </Link>
        <h2 className="text-center text-black text-[32px] font-medium font-Inter mb-8">
          Sign In to Royal Event
        </h2>
        <form className="flex flex-col w-3/4" onSubmit={handleLogin}>
          <Input
            title={"EMAIL"}
            placeholder={"Enter your email"}
            type={"text"}
            name={"email"}
            value={formData.email}
            required
            onChange={handleInputChange}
          />
          <Input
            title={"PASSWORD"}
            placeholder={"Enter your password"}
            type={"password"}
            name={"password"}
            value={formData.password}
            required
            onChange={handleInputChange}
          />
          <div className="flex justify-between">
            <p>
              {" "}
              Don't have an account? Click{" "}
              <Link to={"/signup"} style={{ textDecoration: "none" }}>
                here
              </Link>{" "}
              to register.
            </p>
            <a
              href="#"
              className="underline decoration-green-500 decoration-2 underline-offset-4 text-green-500 float-right mb-8"
            >
              Forgot your password?
            </a>
          </div>
          <Button title={`${loading ? "Loading..." : "Login"}`} text={"white"} bg={"#27AE60"} type={"submit"} />
        </form>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} buttons={buttons}>
          <p className="text-center">Only verified users can login <br />please check your email address <span className="text-blue-600">{formData.email}</span>, <br /> and click on the verification link that was sent to you when you registered.</p>
        </Modal>
      )}
        {showModal3 && (
        <Modal onClose={() => setShowModal3(false)}>
          <p className="font-Inter text-center">
          <span className="text-red-500">Your Account has been blocked, Please <a className="text-red-500" href="mailto:admin@example.com?subject=Blocked&body=Please%20Contact%20Admin">Click Here To Contact Admin</a></span>
              </p>
        </Modal>
      )}
    </div>
  );
};
