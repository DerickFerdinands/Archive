import {PhotoIcon} from "@heroicons/react/20/solid";
import {useEffect, useState} from "react";
import axios from "axios";
import {AdminProductList} from "./AdminProductList";

export const Dashboard = () => {

    const [categories, setCategories] = useState([]);
    const [options, setOptions] = useState([]);
    const [name, setName] = useState("");
    const [qty, setQty] = useState(0);

    const [code, setCode] = useState('');
    const [productName, setProductName] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [images, setImages] = useState([]);

    const [products, setProducts] = useState([]);
    useEffect(() => {
        // let category = this.props.match;
        getProducts();
    }, [])

    function getProducts(){

        axios({
            method: 'get',
            url: `http://localhost:3001/api/v1/product`,

        }).then((response) => {
            console.log(response.data.products)
            setProducts(response.data.products)
        }).catch((err) => {
            console.log(err.response.data.message)
        })
    }

    function handleProductOnClick(code, name, brand, categories, description, options, price, imageUrls) {
        setCode(code)
        setProductName(name)
        setBrand(brand)
        setCategories(categories)
        setDescription(description)
        setOptions(options)
        setPrice(+price)
        setImages(imageUrls)
        console.log(code, name, brand, categories, description, options, price, imageUrls)
    }

    return <>
        <form onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-12 xl:w-screen flex justify-center items-center gap-5 h-screen">

                <div className="w-2/4 p-5 border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Product Information</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Fill Product Information.</p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="code" className="block text-sm font-medium leading-6 text-gray-900">
                                Product Code
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={(e) => setCode(e.target.value)}
                                    value={code}
                                    type="text"
                                    name="code"
                                    id="code"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="productName" className="block text-sm font-medium leading-6 text-gray-900">
                                Product Name
                            </label>
                            <div className="mt-2">
                                <input
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                    type="text"
                                    name="productName"
                                    id="productName"

                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="productBrand" className="block text-sm font-medium leading-6 text-gray-900">
                                Product Brand
                            </label>
                            <div className="mt-2">
                                <input
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                    id="productBrand"
                                    name="productBrand"
                                    type="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                                Category
                            </label>
                            <div className="mt-2">
                                <input
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && e.target.value.length > 0) {
                                            setCategories([e.target.value, ...categories])
                                            e.target.value = ''
                                        }
                                    }}
                                    type="text"
                                    id="category"
                                    name="category"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                />
                            </div>
                            <div className={"flex gap-1 w-2/4"}>
                                {
                                    categories.length > 0 && categories.map(category =>
                                        <div style={{
                                            height: 'max-content',
                                            width: 'max-content',
                                            borderRadius: '10px',
                                            fontFamily: 'Poppins'
                                        }}
                                             className={"ps-2 pe-2 flex items-center gap-1 justify-center mt-2 bg-gray-200"}>
                                            <h5>{category}</h5>
                                            <svg className={"hover:cursor-pointer"} onClick={() => {
                                                categories.splice(categories.indexOf(category), 1)
                                                setCategories([...categories])
                                            }} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                                <path
                                                    d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/>
                                            </svg>
                                        </div>
                                    )

                                }
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                Description
                            </label>
                            <div className="mt-2">
                                <input
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    type="text"
                                    name="description"
                                    id="description"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div style={{border: '1px solid #D2D5DB', borderRadius: '5px'}} className="p-5 sm:col-span-6">
                            <label htmlFor="option" className="block text-sm font-medium leading-6 text-gray-900">
                                Options
                            </label>
                            <div className="mt-2 flex gap-x-3">
                                <div className={"w-2/4"}>
                                    <label htmlFor="optionName"
                                           className="block text-sm font-medium leading-6 text-gray-900">
                                        Option Name
                                    </label>
                                    <input
                                        onChange={(e) => {
                                            setName(e.target.value)
                                        }}
                                        type="text"
                                        name="optionName"
                                        id="optionName"
                                        value={name}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>

                                <div className={"w-1/4"}>
                                    <label htmlFor="optionQty"
                                           className="block text-sm font-medium leading-6 text-gray-900">
                                        Option Qty
                                    </label>
                                    <input
                                        onChange={(e) => {
                                            setQty(e.target.value)
                                        }}
                                        type="number"
                                        name="optionQty"
                                        id="optionQty"
                                        value={qty}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                <button
                                    onClick={(e) => {
                                        if (name.length > 0 && qty > 0) {
                                            setOptions([{optionName: name, optionQty: qty}, ...options])
                                            setName('')
                                            setQty(0)
                                        }
                                    }}
                                    type="button"
                                    className="mt-5 self-end rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Save Option
                                </button>


                            </div>
                            <div className={"flex gap-1 w-2/4"}>
                                {
                                    options.length > 0 && options.map(option =>
                                        <div style={{
                                            height: 'max-content',
                                            width: 'max-content',
                                            borderRadius: '10px',
                                            fontFamily: 'Poppins'
                                        }}
                                             className={"ps-2 pe-2 flex items-center gap-1 justify-center mt-2 bg-gray-200"}>
                                            <h5>{option.optionName}</h5>
                                            <h5>- </h5>
                                            <h5>{option.optionQty}</h5>
                                            <svg className={"hover:cursor-pointer"} onClick={() => {
                                                options.splice(options.indexOf(option), 1)
                                                setOptions([...options])
                                            }} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                                <path
                                                    d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/>
                                            </svg>
                                        </div>
                                    )

                                }
                            </div>
                        </div>

                        <div className="sm:col-span-2 sm:col-start-1">
                            <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                Price
                            </label>
                            <div className="mt-2">
                                <input
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    type="number"
                                    name="price"
                                    id="price"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>


                    </div>
                    <div
                        className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        <div className="text-center">
                            <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true"/>
                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                <label
                                    htmlFor="file-upload"
                                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                >
                                    <span>Upload a file</span>
                                    <input onChange={(e) => setImages([...e.target.files])} id="file-upload"
                                           name="file-upload" type="file" className="sr-only" multiple/>
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                            {
                                images.map((image) => <h5>{image.name}</h5>)
                            }
                        </div>

                    </div>
                    <button
                        onClick={(event => {

                            if (
                                code.length > 0 &&
                                productName.length > 0 &&
                                brand.length > 0 &&
                                categories.length > 0 &&
                                description.length > 0 &&
                                price > 0 &&
                                options.length > 0 &&
                                images.length === 5
                            ) {

                                let formData = new FormData();
                                formData.append('code', code)
                                formData.append('name', productName)
                                formData.append('brand', brand)
                                categories.forEach((category) => formData.append('category', category))
                                formData.append('description', description)
                                formData.append('price', price)
                                options.forEach((option) => formData.append('options', JSON.stringify(option)))
                                images.forEach((image) => formData.append('productImages', image))

                                console.log(code, productName, brand, categories, description, price, options, images)

                                axios({
                                    method: "post",
                                    url: "http://localhost:3001/api/v1/product",
                                    data: formData,
                                    headers: {"Content-Type": "multipart/form-data"},
                                }).then(function (response) {
                                    //handle success
                                    console.log(response);

                                    setCode('')
                                    setProductName('')
                                    setBrand('')
                                    setCategories([])
                                    setDescription('')
                                    setPrice(0)
                                    setOptions([])
                                    setImages([])

                                    getProducts();
                                })
                                    .catch(function (response) {
                                        //handle error
                                        console.log(response);
                                    });
                            }


                        })}

                        type="button"
                        className="mt-5 self-end rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Save
                    </button>

                    <button
                        onClick={async () => {
                            console.log({
                                code: code,
                                name: name,
                                brand: brand,
                                category: categories,
                                description: description,
                                price: price,
                                options: options,
                                imageUrls: images
                            })
                            await axios({
                                method: "put",
                                url: "http://localhost:3001/api/v1/product/withoutImages",
                                data: {
                                    code: code,
                                    name: productName,
                                    brand: brand,
                                    category: categories,
                                    description: description,
                                    price: price,
                                    options: options,
                                    imageUrls: images
                                }
                            }).then(function (response) {
                                //handle success
                                console.log(response);

                                setCode('')
                                setProductName('')
                                setBrand('')
                                setCategories([])
                                setDescription('')
                                setPrice(0)
                                setOptions([])
                                setImages([])

                                getProducts();
                            }).catch(function (response) {
                                //handle error
                                console.log(response);
                            });
                        }
                        }
                        type="button"
                        style={{backgroundColor: '#ffff5e', color: 'black'}}
                        className="ms-2 mt-5 self-end rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Update
                    </button>
                    <button
                        onClick={async () => {
                            await axios({
                                method: "delete",
                                url: `http://localhost:3001/api/v1/product/${code}`,
                            }).then(function (response) {
                                //handle success
                                console.log(response);

                                setCode('')
                                setProductName('')
                                setBrand('')
                                setCategories([])
                                setDescription('')
                                setPrice(0)
                                setOptions([])
                                setImages([])

                                getProducts();
                            }).catch(function (response) {
                                //handle error
                                console.log(response);
                            });
                        }}
                        type="button"
                        style={{backgroundColor: '#a30a23', color: 'white'}}
                        className="ms-2 mt-5 self-end rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Delete
                    </button>
                    <button
                        onClick={()=>{
                            setCode('')
                            setProductName('')
                            setBrand('')
                            setCategories([])
                            setDescription('')
                            setPrice(0)
                            setOptions([])
                            setImages([])
                        }}
                        type="button"
                        style={{backgroundColor: '#1cddf1', color: 'black'}}
                        className="ms-2 mt-5 self-end rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Cancel
                    </button>
                </div>
                <div className={"w-2/4 h-screen overflow-scroll"}>
                    <AdminProductList products={products} handleProductOnClick={handleProductOnClick}/>
                </div>
            </div>


        </form>
    </>
}