import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from "./login/Login";

export const Router = ()=>{
return<>
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Login/>}></Route>
                <Route path={"/register"} element={<Login/>}></Route>
            </Routes>
        </BrowserRouter>
</>
}