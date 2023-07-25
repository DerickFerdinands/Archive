import {useState} from "react";


export const useData = ()=>{
     const [open, setOpen] = useState(false)
     const [user, setUser] = useState({})

    return {open,setOpen, user,setUser}
}