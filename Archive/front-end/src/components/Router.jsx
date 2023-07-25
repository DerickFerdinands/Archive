import {BrowserRouter, Routes, Route, useLocation} from "react-router-dom";
import Login from "./login/Login";
import {Register} from "./register/Register";
import {HopePage} from "./home/HomePage";
import {ProductDetails} from "./product/ProductDetails";
import {Favourites} from "./product/Favourites";
import {Apparel, ProductScreen} from "./product/Apparel";
import {Nav} from "./home/nav/Nav";
import {useState} from "react";
import {Checkout} from "./checkout/Checkout";

export const Router = ()=>{


    const [open,setOpen] = useState(false);
    const [user,setUser] = useState({});
    const [isHidden,setIsHidden] = useState(true);
return<>

        <BrowserRouter>
            <Nav userImageUrl={user?.userImageUrl} isHidden={isHidden} checkoutOpt={setOpen}/>
            <Checkout open={open} setOpen={setOpen}/>

            <Routes>
                <Route path={"/"} element={<Login user={user} setUser={setUser} setIsHidden={setIsHidden}/>}/>
                <Route path={"/register"} element={<Register user={user} setUser={setUser} setIsHidden={setIsHidden}/>}/>
                <Route path={"/home"} element={<HopePage setIsHidden={setIsHidden}/>}/>
                <Route path={"/product/:code"} element={<ProductDetails user={user} setUser={setUser} setIsHidden={setIsHidden}/>}/>
                <Route path={"/apparel"} element={<Apparel user={user} setUser={setUser} setIsHidden={setIsHidden}/>}/>
                <Route path={"/favourites"} element={<Favourites user={user} setUser={setUser} setIsHidden={setIsHidden}/>}/>
            </Routes>
        </BrowserRouter>
</>
}