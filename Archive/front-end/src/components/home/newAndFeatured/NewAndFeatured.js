import {styles} from "../categories/categoryTile/styles";
import {ArrowRightIcon} from "@heroicons/react/24/outline";
import {useNavigate} from "react-router-dom";


export const NewAndFeatured = ({products})=>{
    let navigate = useNavigate();
    return <>
        <div className="bg-white">
            <div className="flex flex-col mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-full lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">New & Featured</h2>

                <div style={{scrollbarWidth:0}} className="flex flex-nowrap mt-6 gap-x-6 gap-y-10  xl:gap-x-8 overflow-x-scroll scroll-smooth">
                    {products.map((product) => (
                        <div key={product.code} className="flex-col group relative flex-nowrap ">
                            <div
                                style={{width:'20vw'}}
                                className="aspect-h-1 aspect-w-1 overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-auto">
                                <img
                                    src={product.imageUrls[2]}
                                    alt={product.imageUrls[2]}
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <h5 onClick={()=>{
                                            navigate(`/product/${product.code}`)
                                        }}>
                                            <span aria-hidden="true" className="absolute inset-0"/>
                                            {product.name}
                                        </h5>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                                </div>
                                <p className="text-sm font-medium text-gray-900">{product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    </>
}