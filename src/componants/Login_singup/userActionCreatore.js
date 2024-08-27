import axios from "axios";

const baseUrl = import.meta.env.VITE_USER_BASE_URL;;

export const createUserEntityApi =async (obj) => { 

 const response = await   axios.post(baseUrl + "/create_user", obj);
 return response
 }

 export const loginEntityApi = async (email, password) => { 

    const response = await axios.post(baseUrl + `/login_user/${email}/${password}`)

    return response
  }

export const verifyOtpApi = async (formData) => {
  try {
    const response = await axios.post(baseUrl + "/verify-otp", formData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const resendOtpApi = async (email) => {
  
  const response = await axios.post(baseUrl + "/resend-otp", email);
  return response
}

  export const userdetailsEnityApi = async (email) => {
    const response = await axios.get(baseUrl + `/show_user_details/${email}`);
    return response;
  }

  export const uploadUserProfilePicApi = async (id , file) => {
    const response = await axios.post(baseUrl + `/upload_profile/pic/${id}`, file );
    return response
  }

  export const updateUserEntityApi = async (id ,obj) => {
    
    const response = await axios.put(baseUrl+`/update_user/${id}`, obj)

    return response;
  }

