import { createContext, useState, useContext } from "react";
const DetailContext = createContext();

export const DetailProvider = ({children}) => {
  const [mobileNumber,setMobileNumber] = useState("");
  console.log("mobileNumber in store :",mobileNumber)

  return (
    <DetailContext.Provider 
    value={{
      mobileNumber,
      setMobileNumber,
    }}
    >
      {children}
    </DetailContext.Provider>
  );
};

export const useDetail = () => useContext(DetailContext);