import {Nav} from "./nav/Nav";
import {Hero} from "./hero/Hero";
import {Categories} from "./categories/Categories";
import {HeroCarousel} from "./carousel/Carousel";

export const HopePage = () => {
    return <>
        <Nav/>
        <HeroCarousel/>
        <Categories/>
        <Hero/>

    </>
}