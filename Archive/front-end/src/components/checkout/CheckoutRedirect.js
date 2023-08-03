import {useNavigate, useParams} from 'react-router-dom'
import {useEffect, useState} from "react";
import {CustomizeCart} from "../../data/cart";
export const CheckoutRedirect = ({setIsHidden})=>{
    let {status} = useParams();
    const navigate = useNavigate();
    const handleCart = new CustomizeCart();

    let [imageUrl,setImageUrl] = useState('');
    useEffect(()=>{
        setIsHidden(false)
        switch (status) {
            case 'success':setImageUrl('https://cdn3d.iconscout.com/3d/premium/thumb/payment-successful-7940652-6294950.png?f=webp');
            handleCart.clearCart();
            break;
            case 'failed':setImageUrl('https://cdn3d.iconscout.com/3d/premium/thumb/transaction-failed-9297332-7628726.png?f=webp');

            break;
        }
    },[])

    return <>
        <div className={"h-screen w-screen flex flex-col justify-center items-center gap-6"}>
            {/*<img src="https://cdn.dribbble.com/userupload/5965925/file/original-df8ee2dfcfa63e7b36af75261c6dd570.jpg?resize=1024x768" alt="Success Img"/>*/}

            <img src={imageUrl} alt=""/>
            <h1 style={{fontFamily:'Poppins',fontSize:'50px'} }>PAYMENT {status.toUpperCase()}!</h1>
            <h1 onClick={()=>navigate('/home')} className={"hover:cursor-pointer"} style={{fontFamily:'Poppins',fontSize:'20px',color:'blue'} }>Return To Home -></h1>
        </div>

    </>
}