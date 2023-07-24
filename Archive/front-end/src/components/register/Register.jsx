import regImage from "../../assets/images/pexels-gabriela-guerino-1839904.jpg";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import Cookies from "js-cookie";
// import Alert from '@mui/material/Alert';

export const Register = () => {
    let navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {

        console.log(firstName, lastName, address, email, contactNumber, password)
    })

    function handleCallbackResponse(response) {
        console.log("Encoded JWT ID Token: " + response.credential)
        var userObj = jwtDecode(response.credential)
        console.log(userObj)

        axios({
            method: 'post',
            url: 'http://localhost:3001/api/v1/user/gis',
            data: {
                g_jwt_token: response.credential
            }
        }).then((res) => {
                console.log(res)
            Cookies.set("accessToken",response.data.data.accessToken,{expires:7})
            Cookies.set("refreshToken",response.data.data.refreshToken)

            navigate('/home')
            }
        ).catch((err) => {
            alert(err)
        })
    }

    const registerUser = (e) => {
        axios({
            method: 'post',
            url: 'http://localhost:3001/api/v1/user',
            data: {
                user: {
                    "userFirstName": firstName,
                    "userLastName": lastName,
                    "userAddress": address,
                    "userEmail": email,
                    "userContactNumber": contactNumber,
                    "userPassword": password
                }
            }
        }).then(
            (res) => {
                console.log(res)
                navigate('/home')
            }
        ).catch((err) => {
            alert(err.message)
        })
    }

    useEffect(() => {
        /*global google*/
        google.accounts.id.initialize({
                client_id: "541200273937-mln6ru48vhhgo6tqsfv1rkgvj3n7vkdk.apps.googleusercontent.com",
                callback: handleCallbackResponse
            }
        )
        google.accounts.id.renderButton(
            document.getElementById("createAccountBtn"),
            {
                theme: "outline",
            }
        )
        google.accounts.id.prompt();
    }, [])
    return <>
        <div className=" flex h-screen">
            <div className="pl-5 pr-5 justify-center flex flex-1 w-2/4 sm:w-screen">
                <form onSubmit={(e) => e.preventDefault()} method="post"
                      className={" flex flex-col justify-center items-center h-screen"}>
                    <div className="space-y-12">


                        <div className="flex flex-col  pb-12">
                            <h1 className="text-center text-4xl mb-10"
                                style={{fontFamily: "Poppins, sans-serif", fontWeight: 400}}>Create Your Account</h1>
                            <button
                                id="createAccountBtn"
                                style={{
                                    fontFamily: "Poppins, sans-serif",
                                    fontWeight: 400,
                                    borderWidth: '1px',
                                    borderColor: 'grey'
                                }}
                                type="submit"
                                className="mb-10 flex justify-center items-center gap-2 border-solid  flex w-full justify-center rounded-md bg-white  px-3 py-1.5 text-sm font-semibold leading-6  shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                <img
                                    className=" h-5 w-auto"
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2008px-Google_%22G%22_Logo.svg.png"
                                    alt="Your Company"
                                />
                                LOGIN WITH GOOGLE
                            </button>


                            <h2 className="border-t pt-10 border-gray-900/10 text-base font-semibold leading-7 text-gray-900">Personal
                                Information</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can
                                receive
                                mail.</p>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label htmlFor="first-name"
                                           className="block text-sm font-medium leading-6 text-gray-900">
                                        First name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            onChange={(e) => setFirstName(e.target.value)}
                                            type="text"
                                            name="first-name"
                                            id="first-name"
                                            autoComplete="given-name"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="last-name"
                                           className="block text-sm font-medium leading-6 text-gray-900">
                                        Last name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            onChange={(e) => setLastName(e.target.value)}
                                            type="text"
                                            name="last-name"
                                            id="last-name"
                                            autoComplete="family-name"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-4">
                                    <label htmlFor="email"
                                           className="block text-sm font-medium leading-6 text-gray-900">
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            onChange={(e) => setEmail(e.target.value)}
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>


                                <div className="col-span-full">
                                    <label htmlFor="street-address"
                                           className="block text-sm font-medium leading-6 text-gray-900">
                                        Street address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            onChange={(e) => setAddress(e.target.value)}
                                            type="text"
                                            name="street-address"
                                            id="street-address"
                                            autoComplete="street-address"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2 sm:col-start-1">
                                    <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                        Contact number
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            onChange={(e) => setContactNumber(e.target.value)}
                                            type="text"
                                            name="contactNumber"
                                            id="contactNumber"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="region"
                                           className="block text-sm font-medium leading-6 text-gray-900">
                                        Password
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            onChange={(e) => setPassword(e.target.value)}
                                            type="password"
                                            name="password"
                                            id="password"
                                            autoComplete="address-level1"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="postal-code"
                                           className="block text-sm font-medium leading-6 text-gray-900">
                                        Confirm password
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            id="confirmPassword"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>


                    <button
                        onClick={registerUser}
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Register
                    </button>
                    <h5 className="flex gap-1 items-center self-start mt-3 text-start text-sm text-gray-500">
                        Already have an account?{' '}
                        <Link to={"/"}>
                            <h5  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                Login
                            </h5>
                        </Link>

                    </h5>
                </form>
            </div>
            <div className="pl-5 pr-5 justify-center items-center  w-2/4 hidden md:flex lg:flex xl:flex 2xl:flex ">
                <img
                    className="mx-auto h-4/5 rounded-ss-3xl rounded-ee-3xl "
                    src={regImage}
                    alt="Your Company"
                />
            </div>
        </div>
    </>
}