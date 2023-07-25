import {Nav} from "./nav/Nav";
import {Hero} from "./hero/Hero";
import {Categories} from "./categories/Categories";
import {NewAndFeatured} from "./newAndFeatured/NewAndFeatured";
import {Partners} from "./partners/Partners";
import {useEffect, useState} from "react";
import {Checkout} from "../checkout/Checkout";
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import {useData} from "../../hooks/data";

export const HopePage = ({setOpen,open,setUser,user, setIsHidden}) => {

    const {state} = useLocation();



    useEffect(()=>{
        console.log("User", user)
        setIsHidden(false)
    })

    return <>
        <Hero/>
        <Categories/>
        <NewAndFeatured/>
        <Partners/>
    </>
}