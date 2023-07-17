import {styles} from './styles';
import {CategoryTile} from "./categoryTile/CategoryTile";

export const Categories = () => {
    return <>
        <div  className={"relative flex flex-wrap h-7/12 bg-white m-10"}>
            <div style={styles.bgF2F2F2} className="basis-1/3 h-full">
                <CategoryTile
                    tile={"Clothing"}
                    imageUrl={"https://storage.googleapis.com/archive_product_image_bucket/bb798622-9b09-4ac1-ae37-e7ef56fb689a.webp"}
                    redirectUrl={'/'}
                />
            </div>
            <div style={{backgroundColor:'#F7F7F7'}} className="basis-1/3 h-full">
                <CategoryTile
                    tile={"Shoes"}
                    imageUrl={"https://storage.googleapis.com/archive_product_image_bucket/719c0ba8-a675-48d3-b7e4-89e9ed98f9bb.webp"}
                    redirectUrl={'/'}
                />
            </div>
            <div style={styles.bgF2F2F2} className="relative basis-1/3 h-auto">
                <CategoryTile
                    tile={"Electronics"}
                    imageUrl={"https://storage.googleapis.com/archive_product_image_bucket/Google-Pixel-7-Pro-Hazel-for-the-best-price-in-Sri-Lanka-removebg-preview.png"}
                    redirectUrl={'/'}
                />
            </div>

        </div>
    </>
}