import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { RiLockPasswordFill } from "react-icons/ri";
import { useState } from "react";
import { changePassword } from "../axiosSettings/user/userAxios";
import { showErrorToast, showSuccessToast } from "../utility/toast";
import Adminsidebar from "../components/adminSideBar";

export function ChangePassword() {
  const navigate = useNavigate()
  const user:any = localStorage.getItem("user")
  const mainUser = JSON.parse(user)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
    confirm_password: ""
  })

  const handlePasswordChange = async (e:any)=>{
    try{
      e.preventDefault()
      const {name, value} = e.target
      setFormData({
        ...formData,
        [name]: value
      })
    }catch(error:any){
      console.log(error)
    }
  }

  const handleSubmit = async(e:any)=>{
    try{
      e.preventDefault()
      setLoading(true)
      const response = await changePassword(formData)
      if(response.status !== 200){
        setLoading(false)
        return showErrorToast(response.data.message)
      }
      showSuccessToast(response.data.message)
      setFormData({
        old_password: "",
        new_password: "",
        confirm_password: ""
      })
      setLoading(false)
      navigate("/profile")
    }catch(error:any){
      console.log(error)
    }
  }
  return (
    <>
      <div className="fixed left-0">
      {mainUser.role === "Admin" ? <Adminsidebar /> : <Sidebar />} 
      </div>
      <div className="pl-20 pb-10">
        <Navbar name={mainUser.first_name} image={mainUser.profile_picture.length === 0
              ? "/images/event1.png"
              : mainUser.profile_picture} />
      </div>
      <div className="w-full sm:w-[80%] h-auto sm:h-[678px] flex-col md:px-32 md:ml-32 justify-start items-start gap-4 inline-flex px-4 sm:px-32">
        <div className="w-full sm:w-[854px] justify-start items-start gap-2.5 inline-flex">
          <Link
            to={"/profile"}
            className="grow shrink basis-0 h-11 px-4 py-3 rounded-md flex-col justify-center items-center inline-flex text-gray-800 text-sm font-medium font-Inter no-underline"
          >
            Profile
          </Link>
          <div className="grow shrink basis-0 h-11 px-4 py-3 bg-green-500 rounded-md justify-center items-center gap-2 flex text-gray-100 text-sm font-medium font-Inter">
            <RiLockPasswordFill />
            Password
          </div>
          <Link
            to={"/user_account"}
            className="grow shrink basis-0 rounded-md flex-col justify-center items-center inline-flex no-underline"
          >
            <div className="px-4 py-3 justify-start items-center gap-2 inline-flex">
              <div className="justify-center items-center gap-2 flex">
                <div className="text-gray-800 text-sm font-medium font-['Inter'] leading-tight tracking-tight">
                 Bank Account Details
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="justify-start items-start gap-4 sm:gap-[104px]">
          <form className="w-full sm:w-[578px] flex-col justify-start items-start" onSubmit={handleSubmit}>
            <Input
              title={"OLD PASSWORD"}
              placeholder={"Enter your old password"}
              type={"text"}
              name={"old_password"}
              required
              value={formData.old_password}
              onChange={handlePasswordChange}
            />
            <Input
              title={"NEW PASSWORD"}
              placeholder={"Enter your new password"}
              type={"password"}
              required
              value={formData.new_password}
              name={"new_password"}
              onChange={handlePasswordChange}
            />
            <Input
              title={"CONFIRM PASSWORD"}
              placeholder={"Enter your password again"}
              type={"password"}
              name={"confirm_password"}
              required
              value={formData.confirm_password}
              onChange={handlePasswordChange}
            />
            <Button
              title={loading ? "Loading..." : "Submit"}
              text={"white"}
              bg={"#4caf50"}
              type={"submit"}
            />
          </form>
        </div>
      </div>
    </>
  );
}
