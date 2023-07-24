import {Nav} from "./nav/Nav";
import {Hero} from "./hero/Hero";
import {Categories} from "./categories/Categories";
import {NewAndFeatured} from "./newAndFeatured/NewAndFeatured";
import {Partners} from "./partners/Partners";
import {useEffect, useState} from "react";
import {Checkout} from "../checkout/Checkout";
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

export const HopePage = () => {
    const {state} = useLocation();

    const [open, setOpen] = useState(false)
    const [userImageUrl, setUserImageUrl] = useState("")

    useEffect(()=>{
        setUserImageUrl(Cookies.get('userImageUrl'))
        console.log("UserImageUrl",userImageUrl)
    },[])
    return <>
        <Nav checkoutOpt={setOpen} userImageUrl={userImageUrl} />
        <Hero/>
        <Categories/>
        <NewAndFeatured/>
        <Partners/>
        <Checkout open={open} setOpen={setOpen}/>
    </>
}