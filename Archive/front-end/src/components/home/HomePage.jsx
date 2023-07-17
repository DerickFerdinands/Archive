import {Nav} from "./nav/Nav";
import {Hero} from "./hero/Hero";
import {Categories} from "./categories/Categories";
import {HeroCarousel} from "./carousel/Carousel";
import {NewAndFeatured} from "./newAndFeatured/NewAndFeatured";
import {Partners} from "./partners/Partners";
import {useState} from "react";
import {Checkout} from "../checkout/Checkout";

export const HopePage = () => {
    const [open, setOpen] = useState(true)

    return <>
        <Nav checkoutOpt={setOpen}/>
        <Hero/>
        <Categories/>
        <NewAndFeatured/>
        <Partners/>
        <Checkout open={open} setOpen={setOpen}/>
    </>
}