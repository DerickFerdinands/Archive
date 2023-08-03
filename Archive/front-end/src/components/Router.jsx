import {BrowserRouter, Routes, Route, useLocation} from "react-router-dom";
import Login from "./login/Login";
import {Register} from "./register/Register";
import {HopePage} from "./home/HomePage";
import {ProductDetails} from "./product/ProductDetails";
import {Favourites} from "./product/Favourites";
import {Apparel, ProductScreen} from "./product/Apparel";
import {Nav} from "./home/nav/Nav";
import {useEffect, useRef, useState} from "react";
import {Checkout} from "./checkout/Checkout";
import {SortProducts} from "./product/SortProducts";
import {CheckoutRedirect} from "./checkout/CheckoutRedirect";
import {Dashboard} from './admin/Login'

export const Router = ()=>{


    const [open,setOpen] = useState(false);
    const [user,setUser] = useState({});
    const [isHidden,setIsHidden] = useState(true);
    const [cart, setCart] = useState([])
    const tempCart = useRef([]);

    useEffect(()=>{
        tempCart.current=cart;
        setCart(tempCart.current)

    })
return<>

        <BrowserRouter>
            <Nav cart={cart} setCart={setCart} userImageUrl={user?.userImageUrl} isHidden={isHidden} checkoutOpt={setOpen}/>
            <Checkout cart={cart} setCart={setCart} open={open} setOpen={setOpen}/>

            <Routes>
                <Route path={"/"} element={<Login user={user} setUser={setUser} setIsHidden={setIsHidden}/>}/>
                <Route path={"/register"} element={<Register user={user} setUser={setUser} setIsHidden={setIsHidden}/>}/>
                <Route path={"/home"} element={<HopePage setIsHidden={setIsHidden}/>}/>
                <Route path={"/product/:code"} element={<ProductDetails cart={cart} setCart={setCart} user={user} setUser={setUser} setIsHidden={setIsHidden}/>}/>
                <Route path={"/apparel"} element={<Apparel user={user} setUser={setUser} setIsHidden={setIsHidden}/>}/>
                <Route path={"/products/:category"} element={<SortProducts user={user} setUser={setUser} setIsHidden={setIsHidden}/>}/>
                <Route path={"/favourites"} element={<Favourites user={user} setUser={setUser} setIsHidden={setIsHidden}/>}/>
                <Route path={"/redirect/:status"} element={<CheckoutRedirect user={user} setUser={setUser} setIsHidden={setIsHidden}/>}/>
                <Route path={"/admin"} element={<Dashboard/>}/>
            </Routes>
        </BrowserRouter>
</>
}