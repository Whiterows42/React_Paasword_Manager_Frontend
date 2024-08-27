import React, { memo, useEffect, useRef, useState } from "react";
function OptBox({ lenght , onOtpSubmit = () => {} }) {
  const [opt, setOpt] = useState(new Array(lenght).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...opt];

    newOtp[index] = value.substring(value.length - 1);
    setOpt(newOtp);

    const combineOtp = newOtp.join("");
    if (combineOtp.length === lenght) onOtpSubmit(combineOtp);

    // move the cursro next field
    if (value && index < lenght - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };
  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !opt[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    }
  };
  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    if (index > 0 && !opt[index - 1]) {
      inputRefs.current[opt.indexOf("")];
    }
  };

  return (
    <div className=" flex gap-3">


      {opt.map((value, index) => {
        return (
          <input
            type="text"
            key={index}
            ref={(input) => (inputRefs.current[index] = input)}
            value={value}
            onChange={(e) => handleChange(index, e)}
            onClick={() => handleClick(index)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="OtpInput w-10 text-center  h-14 border rounded-sm border-blue-500 dark:bg-[#1A1A1A] dark:text-white"
          />
        );
      })}
    </div>
  );
}

export default  memo(OptBox);
