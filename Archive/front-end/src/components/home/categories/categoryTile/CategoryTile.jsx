import {styles} from "./styles";
import {Link,useNavigate} from "react-router-dom";
import {ArrowRightIcon} from "@heroicons/react/24/outline";

export const CategoryTile = ({tile, imageUrl, redirectUrl}) => {

    let navigate = useNavigate();

    return <>
        <div className={"flex flex-col relative h-full items-center justify-between"}>
            <h5 className={"self-start m-5"} style={styles.tileTitle}>{tile}</h5>
            <img style={styles.tileImage} src={imageUrl} alt=""/>
            <h5 className={"self-end m-5 flex items-center gap-1 hover:cursor-pointer"} style={styles.tileTitle}
                onClick={() => {
                    navigate(redirectUrl)
                }}
            >SHOP <ArrowRightIcon className={"h-3/4"}/></h5>

            <div
                onClick={() => {
                    navigate(redirectUrl)
                }}
                className={"flex justify-center items-center opacity-0 hover:opacity-80 transition-all hover:transition-all absolute inset-0 m-auto text-center h-full w-full bg-white"}>
                <h1 style={styles.hoverTitle} className={"h-max"} >{tile}</h1>
            </div>

        </div>
    </>
}
