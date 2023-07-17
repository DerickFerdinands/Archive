import {Nav} from "./nav/Nav";
import {Hero} from "./hero/Hero";
import {Categories} from "./categories/Categories";
import {HeroCarousel} from "./carousel/Carousel";
import {NewAndFeatured} from "./newAndFeatured/NewAndFeatured";

export const HopePage = () => {
    return <>
        <Nav/>
        <Hero/>
        <Categories/>
        <NewAndFeatured/>
    </>
}