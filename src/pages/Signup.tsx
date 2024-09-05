import { Link, useNavigate } from "react-router-dom";
import image from "/images/deca-signup.jpeg";
import Button from "../components/Button";
import Input from "../components/Input";
import Swal from "sweetalert2";
import "../index.css";
import { useState } from "react";
import { registerUser } from "../axiosSettings/user/userAxios";
import { showToast, showErrorToast } from "../utility/toast";

function SignUp() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    user_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try{
      e.preventDefault()
      setLoading(true);
      if (formData.password !== formData.confirm_password) {
        setLoading(false)
        return showErrorToast('pasword mismatch, try again')
      }
      if (formData.password.length < 6) {
        setLoading(false)
        return showErrorToast(`Password must be at least six characters long`)
      }
      const response = await registerUser(formData);

      if (response.status !== 200) {
        setLoading(false)
        return showErrorToast(`${response.data.message}`);
      }
  
      const { data } = response;
      Swal.fire({
        position: "center",
        icon: "success",
        title: `Registration successfull, a link has been sent to your mail, click on it to verify your account before you login`,
        showConfirmButton: true,
        customClass: {
          popup: 'w-[50%] text-[10px]',
        },
        timer: 8000,
      });
      navigate('/signin')
      showToast(data.message)
    } catch (error: any) {
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
   
  };
  return (
    <div className="w-full h-screen justify-start items-center inline-flex">
      <div
        className={`w-2/5 self-stretch flex flex-col justify-center items-center bg-cover bg-center`}
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
        <Link to={"/"} className="no-underline">
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
          Sign Up to Royal Event
        </h2>

        <form className="flex flex-col w-3/4" onSubmit={handleSubmit}>
          <div className="flex gap-3">
            <Input
             title={"FIRST NAME"}
             placeholder={"Enter your first name"}
             type={"text"}
             name="first_name"
             value={formData.first_name}
             onChange={handleInputChange}
             required
            />
            <Input
              title={"LAST NAME"}
              placeholder={"Enter your last name"}
              type={"text"}
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              required
            />
          </div>
          <Input
            title={"USERNAME"}
            placeholder={"Enter your username"}
            type={"text"}
            name="user_name"
            value={formData.user_name}
            onChange={handleInputChange}
            required
          />
          <Input
            title={"EMAIL"}
            placeholder={"Enter your Email"}
            type={"email"}
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <div className="flex gap-3">
            <Input
              title={"PASSWORD"}
              placeholder={"Enter your password"}
              type={"password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <Input
              title={"CONFIRM PASSWORD"}
              placeholder={"Confirm your password"}
              type={"password"}
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleInputChange}
              required
            />
          </div>
          <p>
            {" "}
            Already have an account? Click{" "}
            <Link to={"/signin"} style={{ textDecoration: "none" }}>
              here
            </Link>{" "}
            to login.
          </p>
          <Button title={`${loading ? "Loading..." : "Signup"}`} text={"white"} bg={"#27AE60"} type={"submit"} />
        </form>
      </div>
    </div>
  );
}

export default SignUp;
