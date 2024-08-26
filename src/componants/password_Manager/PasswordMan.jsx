import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import {
  allStoredPasswordApi,
  deletePasswordEntityApi,
  editPasswordManagerEntityApi,
  StorePasswordApi,
} from "../action_creator/actionCreator";
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
import PasswordGen from "../Password_Genrator/PasswordGen";
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
  
  const darkmode = useSelector((state)=>state.password_manager.darkmode)
  const [formsubmited, setFormsubmited] = useState(false);
  const [allpasswordEntity, setAllpasswordEntity] = useState([]);
  const dispatch = useDispatch();
  const values = useSelector((state) => state.password_manager.passwordmanger);
  const [updatePassEntity, setUpdatePassEntity] = useState(false);
const [currentPage, setCurrentPage] = useState(0);
 const [pageSize] = useState(3);
const [totalPages, setTotalPages] = useState(1)
const handleOnChange = useCallback((e) => {
  setPasswordmanger((prevState) => ({
    ...prevState,
    [e.target.name]: e.target.value,
  }));
}, []);

  const [showPasswordGen, setshowPasswordGen] = useState(false)
  const [showpassicon, setShowpassicon] = useState(false)
  const [elemets, setElemets] = useState({
    numberOfElements :"",
    totalElements :"",

  });
  useEffect(() => {


    allStoredPasswordApi(currentPage,passwordmanger.email)
      .then((res) => {
        console.log("res s", res);
        dispatch(setFeilds(res.data?.content));
        setTotalPages(res.data.totalPages);
        // setAllpasswordEntity(res.data)
        setElemets({
          numberOfElements: res.data.numberOfElements,
          totalElements:res.data.totalElements,
        });
        

      })
      .catch((e) => {
        console.log(e);
      });
  }, [formsubmited, currentPage]);

  useEffect(() => {
    setAllpasswordEntity(values);
  }, [values , formsubmited]);

  
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
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { pageIndex,  },
    gotoPage,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
  } = useTable(
    {
      columns: columns,
      data: data1,
      initialState: {
        pageIndex: currentPage,
      },
    },
    useSortBy,
    usePagination
  );
   const handlePageChange = (page) => {
     setCurrentPage(page);
   };
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
      
    })
    
  }
 

   const configureError = (first) => {

    console.log(first);
    
     }
  return (
    <>
      <div className="h-screen mt-9  dark:text-white transition-all">
        <div className="flex flex-col dark:bg-[#1A1A1A] dark:text-black w-full shadow-md px-1 py-2 rounded-lg">
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

        <div className="passwords mt-3 ">
          <h1 className="tracking-wider font-bold "> Your Passowrds</h1>
          {data1 && data1.length > 0 ? (
            <>
              <table
                className="dark:bg-[#1A1A1A] dark:text-white rounded-md"
                {...getTableProps()}
                style={
                  darkmode
                    ? {
                        width: "100%",
                        borderCollapse: "collapse",
                        backgroundColor: "dark:bg-[#1A1A1A]",
                        borderRadius: "0.375rem",
                      }
                    : { width: "100%", borderCollapse: "collapse" }
                }
              >
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                          className="dark:bg-[#1A1A1A] dark:text-white bg-[#EEEEEE]"
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

                <tbody
                  className="dark:text-black"
                  // {...getTableBodyProps()}
                >
                  {rows.map((row) => {
                    prepareRow(row);
                    return (
                      <tr
                        // {...row.getRowProps()}
                        style={{
                          background:
                            row.index % 2 === 0 ? "#ffffff" : "#F1F6FF",
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
                              // <input
                              //   style={{ width: "50%" }}
                              //   className="bg-transparent outline-none flex border-none "
                              //   readOnly
                              //   type="password"
                              //   value={cell.value}
                              // />
                              <span className="flex font-bold">
                                {cell.value && cell.value.replace(/./g, "*")}
                              </span>
                            ) : cellIndex === 2 ? (
                              <span className="text-ellipsis w-full">
                                {" "}
                                {cell.value}{" "}
                              </span>
                            ) : cellIndex === 4 ? (
                              <>
                                <div className="flex gap-4">
                                  <img
                                    onClick={() =>
                                      editpassword(cell.row.values)
                                    }
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
              <div className="pagination flex justify-between items-center">
                <div className=" mt-3 dark:text-white flex items-center gap-4 ">
                  <button
                    className=" previusbtn rounded-full flex items-center"
                    onClick={() => handlePageChange(pageIndex - 1)}
                    disabled={!canPreviousPage}
                    style={{}}
                  >
                    <svg
                      className="   hover:scale-90 transition-all p-2  bg-black  dark:bg-white dark:text-black"
                      width="2rem"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        backgroundColor: darkmode ? "#fff" : "#000",
                        color: darkmode ? "#000" : "#fff",
                        borderRadius: "50%",
                        padding: "0.5rem",
                      }}
                    >
                      <g id="SVGRepo_iconCarrier">
                        <path
                          d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z"
                          fill={`${darkmode ? "#000" : "#fff"}   `}
                        ></path>
                      </g>
                    </svg>
                  </button>
                  <span>
                    Page{" "}
                    <strong>
                      {pageIndex + 1} of {totalPages}
                    </strong>{" "}
                  </span>
                  <button
                    className="nextbtn rounded-full transition-all rotate-180"
                    onClick={() => handlePageChange(pageIndex + 1)}
                  >
                    <svg
                      className="rounded-full hover:scale-90 transition-all p-2"
                      width="2rem"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        backgroundColor: darkmode ? "#fff" : "#000",
                        color: darkmode ? "#000" : "#fff",
                      }}
                    >
                      <g id="SVGRepo_iconCarrier">
                        <path
                          d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z"
                          fill={darkmode ? "#000" : "#fff"}
                        ></path>
                      </g>
                    </svg>
                  </button>
                </div>
                <div className="font-bold px-3">
                  <h1>Showing 1 -{elemets.numberOfElements} of {elemets.totalElements} </h1>
                </div>
              </div>
            </>
          ) : (
            <span>No Password Found</span>
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
