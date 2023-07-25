import {useEffect} from "react";
import {useParams} from 'react-router-dom';
import {Nav} from "../home/nav/Nav";

export const ProductScreen = ({setOpen, userImageUrl}) => {

    let {category} = useParams();

    useEffect(() => {
        // let category = this.props.match;
        console.log(category)
    })

    return <>
        <Nav checkoutOpt={setOpen} userImageUrl={userImageUrl} />
        <h1 style={{fontFamily:'Poppins',fontWeight:500}} className="mt-5 text-center text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">APPAREL</h1>
        <div className={"flex h-3/4 gap-0 justify-center"}>
            <div className={"m-5 h-full w-full bg-gray-100"}>
                <img className={"w-full h-ful "} src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_906,c_limit/d1b680aa-e30c-4801-97e2-3e9f502b8823/men-s-shoes-clothing-accessories.png" alt=""/>

            </div>
            <div className={"m-5 h-full w-full bg-gray-200"}>
                <img className={"w-full h-ful "} src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_906,c_limit/0d3d3582-f629-4c33-93bb-6222ccc9cdc7/women-s-shoes-clothing-accessories.jpg" alt=""/>
            </div>
        </div>
    </>
}