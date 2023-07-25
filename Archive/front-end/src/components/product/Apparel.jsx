import {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import {Nav} from "../home/nav/Nav";
import {ProductList} from "./ProductList";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

export const Apparel = ({setOpen, userImageUrl,setIsHidden}) => {

    const navigate = useNavigate();

    const [products,setProducts] = useState([]);

    useEffect(() => {
        // let category = this.props.match;
        setIsHidden(false)

        axios({
            method: 'post',
            url: `http://localhost:3001/api/v1/product/filter`,
            data:{
                filterOption:'apparel'
            }
        }).then((response)=>{
            console.log(response)
            setProducts(response.data.data)
        }).catch((err)=>{
            console.log(err.response.data.message)
        })
    },[])

    return <>

        <h1 style={{fontFamily: 'Poppins', fontWeight: 500}}
            className="mt-5 text-center text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">APPAREL</h1>
        <div className={"relative flex h-3/4 gap-0 justify-center"}>
            <div
                onClick={()=>{
                    navigate('/products/men')
                }
                }
                className={"hover:opacity-80 relative m-5 h-full w-full bg-gray-100"}>
                <img className={"w-full h-ful "}
                     src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_906,c_limit/d1b680aa-e30c-4801-97e2-3e9f502b8823/men-s-shoes-clothing-accessories.png"
                     alt=""/>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    margin: 'auto',
                    height: 'max-content',
                    color: 'white'
                }}
                     className={"absolute flex flex-col justify-center items-center"}>
                    <h1 style={{
                        fontFamily: 'Poppins',
                        fontWeight: 500,
                        height: 'max-content',
                        color: 'white'
                    }}
                        className=" mt-5 text-center text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">MEN</h1>

                    <h5>Shop Collection</h5>

                </div>
            </div>
            <div
                onClick={()=>{
                    navigate('/products/women')
                }
                }
                className={"hover:opacity-80  relative m-5 h-full w-full bg-gray-200"}>
                <img className={"w-full h-ful "}
                     src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_906,c_limit/0d3d3582-f629-4c33-93bb-6222ccc9cdc7/women-s-shoes-clothing-accessories.jpg"
                     alt=""/>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    margin: 'auto',
                    height: 'max-content',
                    color: 'white'
                }}
                     className={"absolute flex flex-col justify-center items-center"}>
                    <h1 style={{
                        fontFamily: 'Poppins',
                        fontWeight: 500,
                        height: 'max-content',
                        color: 'white'
                    }}
                        className=" mt-5 text-center text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">WOMEN</h1>

                    <h5>Shop Collection</h5>

                </div>

            </div>
        </div>

        <ProductList products={products}/>
    </>
}