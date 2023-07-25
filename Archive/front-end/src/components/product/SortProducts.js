import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {ProductList} from "./ProductList";
import axios from "axios";

export const SortProducts = () => {
    let {category} = useParams();

    const [heroImg, setHeroImg] = useState("");
    const [products, setProducts] = useState([]);

    useEffect(() => {

        axios({
            method: 'post',
            url: `http://localhost:3001/api/v1/product/filter`,
            data:{
                filterOption:category
            }
        }).then((response)=>{
            console.log(response)
            setProducts(response.data.data)
        }).catch((err)=>{
            console.log(err.response.data.message)
        })

        switch (category) {
            case "men":
                setHeroImg("https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_1824,c_limit/7ad4f039-9a7b-4853-a905-f0157868457e/men-s-shoes-clothing-accessories.jpg")
                break;
            case "women":
                setHeroImg("https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_1824,c_limit/000b7794-65f8-4ea8-9b34-ec7031ad491f/women-s-shoes-clothing-accessories.jpg")
                break;
            case "electronics":
                setHeroImg("https://www.apple.com/v/ipad-pro/am/images/overview/chip/performance_hero__cxya4f2p5euu_large.jpg")
                break;
            case "shoes":
                setHeroImg("https://reebok.bynder.com/transform/c797aa98-6f3b-44da-ae82-c6a604096e24/RB0039_FW23_PumpTZ_L_FD_Masthead_HP_DT?fm=jpg&q=90&fit=fill&w=1200p")
                break;
            default:
                return "";
        }
    },[])

    return <>
        <div className={"mt-4 relative flex justify-center items-center w-full h-3/4 "}>
            <img className={"w-11/12 h-auto"} src={heroImg} alt=""/>

            <div style={{inset:0,margin:'auto'}}
                className={"absolute flex justify-center items-center"}>
                <h1 style={{
                    fontFamily: 'Poppins',
                    fontWeight: 500,
                    height: 'max-content',
                    color: 'white',
                    fontSize:'50px'
                }}
                    className=" mt-5 text-center text-7xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">{category}</h1>
            </div>
        </div>
        <ProductList products={products}/>
    </>
}