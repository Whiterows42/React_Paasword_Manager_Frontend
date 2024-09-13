import { data } from "autoprefixer";
import axios from "axios";

const baseUrl = import.meta.env.VITE_USER_BASE_URL;;


axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Fetch token before every request
    if (token) {
      config.headers.Authorization = token; // Attach token to Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export const createUserEntityApi =async (obj) => { 

 const response = await   axios.post(baseUrl + "/create_user", obj);
 return response
 }

 export const loginEntityApi = async (email, password) => { 

    const response = await axios.post(`http://localhost:8080/auth/login`, {
      email,
      password,
    });

    return response
  }

  export const forgottenPasswordApi = async (email) => {
    const response = await axios.put(
      `http://localhost:8080/auth/forgotten-password`, email
    );

    return response;
  };

export const verifyOtpApi = async (otpServiceDto) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/auth/verify-otp",
      otpServiceDto,
      {
        headers: {
          "Content-Type": "application/json",
          withCredentials: true,
        },
      }
    );
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
    const response = await axios.post(
      baseUrl + `/upload_profile/pic/${id}`,
      file,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response
  }

  export const updateUserEntityApi = async (id ,obj) => {
    
    const response = await axios.put(baseUrl+`/update_user/${id}`, obj)

    return response;
  }


  export const logedUserApi = async () => {
    const response = await axios.get(baseUrl+"/loged-user")

    return response
  }