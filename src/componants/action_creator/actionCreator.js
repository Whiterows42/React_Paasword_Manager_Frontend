import axios from "axios";

const baseUrl = import.meta.env.VITE_PASSWORDMAN_BASE_URL;



export const StorePasswordApi = async (obj) => {
  const response = await axios.post(baseUrl + "/api/pass/store_pass_req", obj);

  return response;
};

export const allStoredPasswordApi = async ( pageNo ,email) => {
  const response = await axios.get(baseUrl + `/api/pass/all_recored/${pageNo}/${email}`);
  return response;
};

export const editPasswordManagerEntityApi = async (id, obj) => {
  const response = await axios.put(
    baseUrl + `/api/pass/update_recored/${id}`,
    obj
  );
  return response;
};

export const deletePasswordEntityApi = async (id) =>{
    const response = await axios.delete(baseUrl + `/api/pass/delete/${id}`);

    return response;
}