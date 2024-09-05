import { Link } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { addBankAccount, editAccountDetails, getBankAccount } from "../axiosSettings/user/userAxios";
import { showErrorToast, showSuccessToast } from "../utility/toast";
import { CiBank } from "react-icons/ci";
import Modal from "../components/modal";
import Adminsidebar from "../components/adminSideBar";

export function UserAccount() {
  const user:any = localStorage.getItem("user")
  const mainUser = JSON.parse(user)
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [editLoading, setEditLoading] = useState(false)

  const [formData, setFormData] = useState({
    bank_name: "",
    account_name: "",
    account_number: ""
  })

  const [editFormData, setEditFormData] = useState({
    bank_name: "",
    account_name: "",
    account_number: ""
  })

  const [getAccount, setGetAccount] = useState<any>()

  const fetchUserAccountDetails = async()=>{
    try{
    const response = await getBankAccount()
    if(response.status === 404){
      setGetAccount(null)
    }
    setGetAccount(response.userBankDetails)
    }catch(error:any){
      console.log(error.message)
    }
  }

  useEffect(()=>{
    fetchUserAccountDetails()
  }, [])
  //const response = await addBankAccount(body)
  const handleAccountChange = async (e:any)=>{
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

  const handleSubmit = async()=>{
    try{
      setLoading(true)
      if(formData.bank_name.length === 0){
        setLoading(false)
        return showErrorToast("Bank Name is required")
      }
      if(formData.account_name.length === 0){
        setLoading(false)
        return showErrorToast("Account Name is required")
      }
      if(formData.account_number.length === 0){
        setLoading(false)
        return showErrorToast("Account Number is required")
      }
      if(formData.account_number.length !== 10){
        setLoading(false)
        return showErrorToast("Invalid Account Number")
      }
      const response = await addBankAccount(formData)
      if(response.status ===`error`){
        setLoading(false)
        setFormData({
          bank_name: "",
          account_name: "",
          account_number: ""
        })
      return showErrorToast(response.message)
      }
      setFormData({
        bank_name: "",
        account_name: "",
        account_number: ""
      })
      showSuccessToast(response.message)
      localStorage.setItem("user", JSON.stringify(response.updatedUser))
     return fetchUserAccountDetails()
    }catch (error: any) {
      if (error.response) {
        return showErrorToast(error.response.message);
      } else if (error.request) {
        return showErrorToast('Network Error. Please try again later.');
      } else {
        console.log(error)
        return showErrorToast(error.response);
      }
    }
  }

  const editAccount = async()=>{
    try{
    setEditLoading(true)
    const response = await editAccountDetails(editFormData)
    if(response.status !== 200){
      setEditLoading(false)
      return showErrorToast(response.data.message)
    }
    showSuccessToast(response.data.message)
    console.log('res', response)
    setEditLoading(false)
    setShowModal(false)
    setEditFormData({
      bank_name: "",
      account_name: "",
      account_number: ""
    })
    return fetchUserAccountDetails()
    }catch (error: any) {
      if (error.response) {
        return showErrorToast(error.response.message);
      } else if (error.request) {
        return showErrorToast('Network Error. Please try again later.');
      } else {
        console.log(error)
        return showErrorToast(error.response);
      }
    }
  }
  const handleEditChange = async(e:any)=>{
    try{
      e.preventDefault()
      const {name, value} = e.target
      setEditFormData({
        ...editFormData,
        [name]: value
      })
    }catch(error:any){
      console.log(error)
    }
}

const handleModalClose = async()=>{
  try{
    setEditFormData({
      bank_name: "",
      account_name: "",
      account_number: ""
    })
    setEditLoading(false)
    return setShowModal(false)
  }catch(error){
    console.log(error)
  }
}
const buttons: any = [
  {
    label: `${editLoading ? "Loading..." : "Submit"}`,
    onClick: editAccount,
    bg: "#27AE60",
    text: "#FFFFFF",
  },
];
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
          <Link
            to={"/changepass"}
            className="grow shrink basis-0 rounded-md flex-col justify-center items-center inline-flex no-underline"
          >
            <div className="px-4 py-3 justify-start items-center gap-2 inline-flex">
              <div className="justify-center items-center gap-2 flex">
                <div className="text-gray-800 text-sm font-medium font-['Inter'] leading-tight tracking-tight">
                  Password
                </div>
              </div>
            </div>
          </Link>
          <div className="grow shrink basis-0 h-11 px-4 py-3 bg-green-500 rounded-md justify-center items-center gap-2 flex text-gray-100 text-sm font-medium font-Inter">
            {/* <RiLockPasswordFill /> */}
            <CiBank />
            Bank Account Details
          </div>
        </div>
        <div className="justify-start items-start gap-4 sm:gap-[104px]">
          <div className="w-full sm:w-[578px] flex-col justify-start items-start">
          {/* <form className="w-full sm:w-[578px] flex-col justify-start items-start"> */}
            <Input
              title={"BANK NAME"}
              placeholder={getAccount ? getAccount.bank_name : "Enter your bank name"}
              type={"text"}
              name={"bank_name"}
              value={formData.bank_name}
              onChange={handleAccountChange}
            />
            <Input
              title={"ACCOUNT NAME"}
              placeholder={getAccount ? getAccount.account_name : "Enter your account name"}
              type={"text"}
              value={formData.account_name}
              name={"account_name"}
              onChange={handleAccountChange}
            />
            <Input
              title={"ACCOUNT NUMBER"}
              placeholder={getAccount ? getAccount.account_number : "Enter your account number"}
              type={"number"}
              name={"account_number"}
              value={formData.account_number}
              onChange={handleAccountChange}
            />
            <div className="flex items-center justify-center">
              {!getAccount ? (
            <Button
              title={loading ? "Loading..." : "Add Account"}
              text={"white"}
              bg={"#4caf50"}
              type={"submit"}
              onClick={()=>handleSubmit()}
            />
             ):(
              <Button
              title={"Edit Account"}
              text={"white"}
              bg={"#4caf50"}
              type={"submit"}
              onClick={()=>setShowModal(true)}
            />
            )}
          </div>
        </div>
      </div>
      {showModal && (
              <Modal onClose={()=>handleModalClose()} buttons={buttons}>
                <p>You can edit any field you choose to</p>
                <Input
                  title={"BANK NAME"}
                  placeholder={"Enter new Bank Name"}
                  type={"text"}
                  name={"bank_name"}
                  value={editFormData.bank_name}
                  required
                  onChange={handleEditChange}
                />
                <Input
                  title={"ACCOUNT NAME"}
                  placeholder={"Enter new Account Name"}
                  type={"text"}
                  name={"account_name"}
                  value={editFormData.account_name}
                  required
                  onChange={handleEditChange}
                />
                <Input
                  title={"ACCOUNT NUMBER"}
                  placeholder={"Enter new Account Number"}
                  type={"number"}
                  name={"account_number"}
                  value={editFormData.account_number}
                  required
                  onChange={handleEditChange}
                />
              </Modal>
            )}
      </div>
    </>
  );
}