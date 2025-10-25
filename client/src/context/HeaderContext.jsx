import { createContext, useContext, useState } from "react";

const HeaderContext = createContext()

const defaultHeader = {
    title: ""
}

export const HeaderContextProivder = ({children}) => {
    const [header,setHeader] = useState(defaultHeader)
    return (<HeaderContext.Provider value={{header,setHeader}}>{children}</HeaderContext.Provider>)
}

export const useHeader = () => useContext(HeaderContext)

