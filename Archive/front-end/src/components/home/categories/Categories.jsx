import {styles} from './styles';
import {CategoryTile} from "./categoryTile/CategoryTile";

export const Categories = () => {
    return <>
        <div  className={"flex gap-1 h-screen bg-white m-10"}>
            <div style={styles.bgF2F2F2} className="w-2/4 h-full">
                <CategoryTile
                    tile={"Clothing"}
                    imageUrl={"https://storage.googleapis.com/archive_product_image_bucket/bb798622-9b09-4ac1-ae37-e7ef56fb689a.webp"}
                    redirectUrl={'/'}
                />
            </div>
            <div className="flex flex-col gap-1 w-2/4">
                <div style={{backgroundColor:'#F7F7F7'}} className={"h-2/4"}>
                    <CategoryTile
                        tile={"Shoes"}
                        imageUrl={"https://storage.googleapis.com/archive_product_image_bucket/719c0ba8-a675-48d3-b7e4-89e9ed98f9bb.webp"}
                        redirectUrl={'/'}
                    />
                </div>
                <div style={styles.bgF2F2F2} className={"h-2/4"}>
                    <CategoryTile
                        tile={"Electronics"}
                        imageUrl={"https://storage.googleapis.com/archive_product_image_bucket/Group%203.png"}
                        redirectUrl={'/'}
                    />
                </div>
            </div>
        </div>
    </>
}