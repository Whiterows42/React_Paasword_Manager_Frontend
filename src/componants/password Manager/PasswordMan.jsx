import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import {
  allStoredPasswordApi,
  deletePasswordEntityApi,
  editPasswordManagerEntityApi,
  StorePasswordApi,
} from "../action creator/actionCreator";
import { useDispatch, useSelector } from "react-redux";
import { setFeilds } from "../redux/reducer/passwordReducer";
import { usePagination, useSortBy, useTable } from "react-table";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import deleteicon from "./icon/deletesvg.svg";
import editicon from "./icon/edit.svg";
import eyecloseicon from "./icon/eyeclose.svg";
import eyeopen from "./icon/eyeopen.svg";
import hidedivvertically from "./icon/hidedivvertically.svg";
import genrateP from "./icon/genrateP.svg";
import PasswordGen from "../Password Genrator/PasswordGen";
import { useNavigate } from "react-router-dom";
const PasswordMan = () => {
  const [passwordmanger, setPasswordmanger] = useState({
    id: "",
    webUrl: "",
    userName: "",
    email:"",
    password: "",
  });
  const navigate = useNavigate()
  useEffect(() => {
    const email = localStorage.getItem("email") 
      if (!email) {
        navigate("/login")
      }
    passwordmanger.email = email
  }, [])
  
  
  const [formsubmited, setFormsubmited] = useState(false);
  const [allpasswordEntity, setAllpasswordEntity] = useState([]);
  const dispatch = useDispatch();
  const values = useSelector((state) => state.password_manager.passwordmanger);
  const [updatePassEntity, setUpdatePassEntity] = useState(false);

const handleOnChange = useCallback((e) => {
  setPasswordmanger((prevState) => ({
    ...prevState,
    [e.target.name]: e.target.value,
  }));
}, []);

  const [showPasswordGen, setshowPasswordGen] = useState(false)
  const [showpassicon, setShowpassicon] = useState(false)
  useEffect(() => {



    allStoredPasswordApi(passwordmanger.email)
      .then((res) => {
        console.log("res", res);
        dispatch(setFeilds(res.data));
        // setAllpasswordEntity(res.data)
      })
      .catch((e) => {
        console.log(e);
      });
  }, [formsubmited]);

  useEffect(() => {
    setAllpasswordEntity(values);
  }, [values]);

  const columns = useMemo(
    () => [
      { Header: "Id", accessor: "id", width: 120 },
      { Header: "Web Site Url", accessor: "webUrl", width: 120 },
      { Header: "User Name", accessor: "userName", width: 120 },
      { Header: "Password", accessor: "password", width: 120 },
      { Header: "Action", accessor: "action", width: 120 },
    ],
    []
  );

  const data1 = useMemo(() => {
    return allpasswordEntity?.map((v) => ({
      id: v.id,
      webUrl: v.webUrl,
      userName: v.userName,
      password: v.password,
    }));
  }, [allpasswordEntity]);
  const {
    getTableProps: getTableProps1,
    getTableBodyProps: getTableBodyProps1,
    headerGroups: headerGroups1,
    rows: rows1,
    prepareRow: prepareRow1,
  } = useTable(
    {
      columns: columns,
      data: data1,
    },
    useSortBy,
    usePagination
  );
  const savePassword = () => {
    if (passwordmanger.email != "" && passwordmanger.password != "" && passwordmanger.webUrl !="" && passwordmanger.userName != "") {
      StorePasswordApi(passwordmanger)
        .then((res) => {
          console.log("res", res);
         
          if (res.status === 200) {
            setPasswordmanger({
              ...passwordmanger,
              webUrl: "",
              password: "",
              userName: "",
            });
             toast.success(`Password Saved Successfully`);
            setFormsubmited(!formsubmited);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
    else{
      toast.error("Feilds is empty !")
    }
    
  };

  const editpassword = (obj) => {
    setPasswordmanger({ ...passwordmanger,...obj});
    
    setUpdatePassEntity(!updatePassEntity)
  };

  const editPasswordEntity = (obj) => {
    console.log(obj);
    
    const { id } = obj;
    editPasswordManagerEntityApi(id, passwordmanger)
      .then((res) => {
        console.log(res);
        toast.success("Update Successfully");
        setFormsubmited(!formsubmited);
          setPasswordmanger({
            ...passwordmanger,
            webUrl: "",
            password: "",
            userName: "",
          });
          
    setUpdatePassEntity(!updatePassEntity);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const cancelEditPasswordEntity = () => { 

    setUpdatePassEntity(!updatePassEntity)
    setPasswordmanger({
      id:"",
      webUrl:"",
      userName:"",
      password:""
    })
    toast.warn("Cancled")
   }
  const deletePasswordEntity = (id) => { 

    deletePasswordEntityApi(id).then((res)=>{
      console.log(res);
      toast.success("Delete Successfully")
      setFormsubmited(!formsubmited)
      
    })
    .catch((e)=>{
      console.log(e);
      
    }).finally(
      setFormsubmited(!formsubmited)
    )
    
  }
 

   const configureError = (first) => {

    console.log(first);
    
     }
  return (
    <>
      <div className="h-screen mt-9 dark:bg-black dark:text-white transition-all">
        <div className="flex flex-col  dark:text-black w-full shadow-md px-1 py-2 rounded-lg">
          <input
            className="w-full p-3 rounded-md border border-blue-500"
            type="text"
            name="webUrl"
            value={passwordmanger.webUrl}
            placeholder="Enter website url"
            onChange={handleOnChange}
          />
          <div className="flex gap-3 mt-2">
            <input
              className="grow p-3 rounded-md border border-blue-500"
              type="text"
              name="userName"
              value={passwordmanger.userName}
              placeholder="Enter User name"
              onChange={handleOnChange}
            />
            <div className="relative">
              <input
                className="p-3 rounded-md border border-blue-500"
                type={showpassicon ? "text" : "password"}
                name="password"
                value={passwordmanger.password}
                placeholder="Enter password"
                onChange={handleOnChange}
              />
              {showpassicon ? (
                <img
                  className="w-10 z-10 absolute right-0 top-1 cursor-pointer"
                  src={eyeopen}
                  alt="llose eye"
                  onClick={() => setShowpassicon(!showpassicon)}
                />
              ) : (
                <img
                  className="w-10 z-10 absolute right-0 top-1 cursor-pointer"
                  src={eyecloseicon}
                  alt="llose eye"
                  onClick={() => setShowpassicon(!showpassicon)}
                />
              )}
            </div>
          </div>
          {showPasswordGen ? <PasswordGen /> : null}
          <div className="buttons flex mt-2 justify-center">
            {updatePassEntity ? (
              <div className="flex gap-5">
                <button
                  className="bg-green-400 rounded-md w-fit p-2 px-4 text-white font-bold tracking-tight"
                  onClick={() => editPasswordEntity(passwordmanger)}
                >
                  Update
                </button>
                <button
                  className="bg-yellow-500 rounded-md w-fit p-2 px-4 flex items-center gap-2 text-white font-bold tracking-tight"
                  onClick={() => cancelEditPasswordEntity()}
                >
                  {" "}
                  Cancel
                  <lord-icon
                    src="https://cdn.lordicon.com/nqtddedc.json"
                    trigger="hover"
                    // style="width:250px;height:250px"
                  ></lord-icon>
                </button>
              </div>
            ) : (
              <div className="flex gap-4">
                <button
                  className="bg-green-400 rounded-md w-fit p-3 px-4 text-white font-bold tracking-tight"
                  onClick={() => savePassword()}
                >
                  Save Password
                </button>
                <button
                  className="p-3 px-4 rounded-md font-bold dark:bg-white bg-black text-white dark:text-black"
                  onClick={() => setshowPasswordGen(!showPasswordGen)}
                >
                  {!showPasswordGen ? "Genrate Passowrd " : "hide"}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="passwords mt-3">
          <h1 className="tracking-wider font-bold "> Your Passowrds</h1>
          {data1 && data1.length > 0 ? (
            <table
              className="dark:bg-black dark:text-white"
              {...getTableProps1()}
              style={{ width: "100%", borderCollapse: "collapse" }}
            >
              <thead>
                {headerGroups1.map((headerGroup, index) => (
                  <tr
                    {...headerGroup.getHeaderGroupProps()}
                    // style={{ fontSize: "1.4vw" }}
                  >
                    {headerGroup.headers.map((column, inde) => (
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        className="dark:bg-black dark:text-white bg-[#EEEEEE]"
                        style={{
                          borderBottom: "1px solid #ddd",
                          textAlign: "left",
                          padding: " 1vw 2vw",
                        }}
                      >
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>

              <tbody className="dark:text-black" {...getTableBodyProps1()}>
                {rows1.map((row, index) => {
                  prepareRow1(row);
                  return (
                    <tr
                      {...row.getRowProps()}
                      style={{
                        background: index % 2 === 0 ? "#ffffff" : "#F1F6FF",
                        // fontSize: "1.4vw",
                      }}
                    >
                      {row.cells.map((cell, cellIndex) => (
                        <td
                          style={{ padding: " 1vw 2vw" }}
                          {...cell.getCellProps()}
                        >
                          {/* {cellIndex === 3 ? cell.value.length : null}
                    {cellIndex === 4 ? <span>delete</span> : null}
                    <span style={{ color: "black" }}>
                      {cell.render("Cell")}
                    </span> */}
                          {cellIndex === 3 ? (
                            //  new String(cell.value)
                            <input
                              style={{ width: "50%" }}
                              className="bg-transparent outline-none border-none "
                              readOnly
                              type="password"
                              value={cell.value}
                            />
                          ) : cellIndex === 2 ? (
                            <span className="text-ellipsis w-full">
                              {" "}
                              {cell.value}{" "}
                            </span>
                          ) : cellIndex === 4 ? (
                            <>
                              <div className="flex gap-4">
                                <img
                                  onClick={() => editpassword(cell.row.values)}
                                  className="object-contain w-5 cursor-pointer"
                                  src={editicon}
                                  alt=""
                                />
                                <img
                                  onClick={() =>
                                    deletePasswordEntity(cell.row.values.id)
                                  }
                                  className="object-contain w-5 cursor-pointer"
                                  src={deleteicon}
                                  alt=""
                                />
                              </div>
                            </>
                          ) : (
                            <span
                              style={{
                                color: "black",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {cell.render("Cell")}
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <span>No Passowrd Found</span>
          )}
        </div>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
        />
      </div>
    </>
  );
};

export default memo( PasswordMan);
