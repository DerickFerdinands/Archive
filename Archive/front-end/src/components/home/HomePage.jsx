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
import {ProductList} from "../product/ProductList";
import axios from "axios";

export const HopePage = ({setOpen,open,setUser,user, setIsHidden}) => {

    const {state} = useLocation();
    const [products, setProducts] = useState([])


    useEffect(()=>{
        console.log("User", user)
        setIsHidden(false)

        axios({
            method: 'get',
            url: `http://localhost:3001/api/v1/product`
        }).then((response)=>{
            console.log(response)
            setProducts(response.data.products)
        }).catch((err)=>{
            console.log(err.response.data.message)
        })
    })

    return <>
        <Hero/>
        <Categories/>
        <NewAndFeatured products={products}/>
        <Partners/>
    </>
}