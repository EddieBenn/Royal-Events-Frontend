import axios from '../../configurations/httpSetup'

  export const createEvent = async(body:any)=>{
    try {
      const response = await axios.post("events/create", body);
      return response;
    } catch (err: any) {
      return err.response;
    }
}

export const getSingleEvent = async(params:any)=>{
  try{
    const response = await axios.get(`/events/get-single-event/${params}`)
    return response.data
  }catch(error:any){
    return error.response
  }
}

export const makeComments = async(comment:any, params:any)=>{
  try{
    const response = await axios.post(`/events/add-comment/${params}`, comment)
    return response.data
  }catch(error:any){
    return error.response
  }
}

export const upComingEvents = async(params?:any)=>{
  try{
    const response = await axios.get("/events/upcoming_events", {
      params: params,
  })
  return response.data.data
  }catch(error:any){
    return error.response
}
}

export const getEventComments = async(id:any)=>{
  try{
      const response = await axios.get(`/events/comments/${id}`)
        return response.data;
  }catch(err:any){
      return err.response
  }
}

export const getUserEvents = async()=>{
  try{
    const response = await axios.get(`/events/get-my-events`)
      return response.data;
}catch(err:any){
    return err.response
}
}

export const getUserAttendedEvents = async()=>{
  try{
    const response = await axios.get(`/events/attended_events`)
      return response.data;
}catch(err:any){
    return err.response
}
}

export const reportEvent = async(id:any, body:any)=>{
  try{
    const response = await axios.post(`/events/report/${id}`, body)
      return response.data;
}catch(err:any){
    return err.response
}
}

export const organizerDeleteEvent = async(id:any)=>{
  try{
    const response = await axios.delete(`events/delete_event/${id}`)
      return response.data;
}catch(err:any){
    return err.response
}
}

export const payForEvent = async(body:any, id:any)=>{
  try{
      const response = await axios.post(`/events/payment/${id}`, body)
      return response
  }catch(error:any){
      return error.response
  }
}

export const paystack = async(body:any) => {
  try{
    const response = await axios.post(`paystack/pay`, body)
    return response
}catch(err:any){
  return err.response
}
}

export const userLikeEvent = async(id:any) => {
  try{
    const response = await axios.post(`events/like/${id}`)
      return response;
}catch(err:any){
    return err.response
}
}

export const userDislikeEvent = async(id:any) => {
  try{
    const response = await axios.post(`events/dislike/${id}`)
      return response;
}catch(err:any){
    return err.response
}
}

export const getFlaggedEvents = async()=>{
  try{
    const response = await axios.get(`/admin/flagged`)
      return response;
}catch(err:any){
    return err.response
}
}

export const adminBlockEvent = async(id:any) => {
  try{
    const response = await axios.post(`admin/block_event/${id}`)
      return response;
}catch(err:any){
    return err.response
}
}

export const adminUnblockEvent = async(id:any) => {
  try{
    const response = await axios.post(`admin/unblock_event/${id}`)
      return response;
}catch(err:any){
    return err.response
}
}

export const getReports = async(id:any)=>{
  try{
    const response = await axios.get(`/admin/get_reports/${id}`)
      return response;
}catch(err:any){
    return err.response
}
}