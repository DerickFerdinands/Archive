import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from "./login/Login";
import {Register} from "./register/Register";
import {HopePage} from "./home/HomePage";

export const Router = ()=>{
return<>
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Login/>}/>
                <Route path={"/register"} element={<Register/>}/>
                <Route path={"/home"} element={<HopePage/>}/>
            </Routes>
        </BrowserRouter>
</>
}