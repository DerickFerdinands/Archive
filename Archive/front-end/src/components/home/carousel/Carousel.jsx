// import { Carousel } from "@material-tailwind/react";
import { Carousel } from 'flowbite-react';
import carouselImageOne  from '../../../assets/images/pexels-anastasia-shuraeva-5704410.jpg';
export const HeroCarousel = ()=>{
    return <>
        <div className={"relative h-full"}>
            <Carousel>
                <img
                    alt="..."
                    src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
                />
                <img
                    alt="..."
                    src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
                />
                <img
                    alt="..."
                    src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
                />
                <img
                    alt="..."
                    src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
                />
                <img
                    alt="..."
                    src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
                />
            </Carousel>
        </div>

    </>
}