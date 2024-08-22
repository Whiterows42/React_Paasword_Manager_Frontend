import { useState, useCallback, useEffect, useRef, memo } from "react";
import { toast } from "react-toastify";
const PasswordGen = () => {
  const [length, setLenght] = useState(8);
  const [numverAllow, setNumberAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef();

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
 
    if (numverAllow) str += "0123456789";

    if (charAllow) str += "@#$%^&*()_+{}[];:,.<>?/'";
    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numverAllow, charAllow, setPassword]);

  const Copyfild = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current.select();
      document.execCommand("copy"); // Older method but widely supported
      toast("Copied to clipboard");
    }
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numverAllow, charAllow, passwordGenerator]);
  return (
    <div className="  rounded-md mt-2  ">
      <div className="flex text-center    p-2 rounded-xl flex-col  ">
        <h1 className="  font-bold text-start dark:text-white mb-2 text-black leading-3  w-full">
          Password Generator
        </h1>
        <div className="w-full flex gap-3 rounded-lg">
          <input
            className=" text-black font-bold border focus:border-orange-400 border-blue-600 p-2 w-[80%] rounded-md"
            placeholder="password"
            readOnly
            value={password}
            type="text"
            ref={passwordRef}
          />
          <button
            onClick={Copyfild}
            className="py-2 p-2 rounded-md outline-none text-white font-bold bg-blue-500 focus:bg-blue-950 "
          >
            Copy
          </button>
        </div>
        <div className="flex items-center  gap-3 text-orange-400 ">
          <div className="flex gap-2">
            <input
              type="range"
              className="cursor-pointer "
              min={6}
              max={100}
              value={length}
              onChange={(e) => setLenght(e.target.value)}
            />
            <label className="text-sm">Length:{length} </label>
          </div>

          <div className="flex  items-center">
            <input
              type="checkbox"
              defaultChecked={numverAllow}
              onChange={() => {
                setNumberAllow((prev) => !prev);
              }}
            />
            <label className="text-sm"> Number</label>
          </div>
          <div className="flex items-center ">
            <input
              type="checkbox"
              defaultChecked={charAllow}
              onChange={() => {
                setCharAllow((prev) => !prev);
              }}
            />
            <label className="text-sm">Character</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo( PasswordGen);
