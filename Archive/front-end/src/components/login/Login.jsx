import loginImage from '../../assets/images/pexels-amina-filkins-5409662.jpg';
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import jwtDecode from "jwt-decode";
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from "sweetalert2";


const Login = ({user, setUser, setIsHidden}) => {

    let navigate = useNavigate();
    // let history = useHistory();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    const [emailErr, setEmailErr] = useState("hidden");
    const [passwordErr, setPasswordErr] = useState("hidden");


    function handleCallbackResponse(response) {
        console.log("Encoded JWT ID Token: " + response.credential)
        var userObj = jwtDecode(response.credential)
        console.log(userObj)

        axios({
                method: 'post',
                url: `http://localhost:3001/api/v1/user/login/gis`,
                data: {
                    g_jwt_token: response.credential
                }
            }
        ).then(response => {

            Cookies.set("accessToken", response.data.data.accessToken, {expires: 7})
            Cookies.set("refreshToken", response.data.data.refreshToken)
            Cookies.set("userImageUrl", response.data.data.user.userImageUrl,{expires:7})

            console.log('OK')
            setUser(response.data.data.user)
            console.log('OK')
            navigate('/home', {state: {user:response.data.data.user}})
            console.log('OK')

        }).catch((err) => {
            console.log(err.response.data.message)
        })
    }

    useEffect(() => {
        /*global google*/
        google.accounts.id.initialize({
            client_id: "541200273937-mln6ru48vhhgo6tqsfv1rkgvj3n7vkdk.apps.googleusercontent.com",
            callback: handleCallbackResponse
        });
        google.accounts.id.renderButton(
            document.getElementById("signInBtn"),
            {
                theme: "outline",
            }
        )
        google.accounts.id.prompt();
    }, [])

    useEffect(()=>{
        setIsHidden(true)
    })

    const handleLogin = (e) => {
        e.preventDefault()

        try {
            let mailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            let passwordRegex = /^[A-Za-z]\w{7,14}$/;

            if (!username.match(mailRegex)) {
                setEmailInput("border-2 border-rose-500")
                setEmailErr("")
                throw new Error('Invalid Email')
            } else if (!password.match(passwordRegex)) {
                setPasswordInput("border-2 border-rose-500")
                setPasswordErr("")
                throw new Error('Invalid Password')
            } else {
                axios({
                        method: 'post',
                        url: `http://localhost:3001/api/v1/user/login`,
                        data: {
                            user: {
                                userEmail: username,
                                userPassword: password
                            }
                        }
                    }
                ).then(response => {

                    Cookies.set("accessToken", response.data.data.accessToken, {expires: 7})
                    Cookies.set("refreshToken", response.data.data.refreshToken)

                    console.log(Cookies.get('accessToken'), Cookies.get('refreshToken'))
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    }).fire({
                        icon: 'success',
                        title: 'Signed in successfully'
                    })

                    console.log(response.data.data.user)
                    setUser(response.data.data.user)

                    navigate('/home', {state: {user:response.data.data.user}})
                })
            }

        } catch (err) {
            alert(err.message)
        }

    }

    return (<>
            <div className=" flex h-screen">
                <div className=" flex flex-1 w-2/4 sm:w-screen">
                    <div className="flex w-full flex-1 flex-col align-center justify-center px-6 py-12 lg:px-8">
                        <div className=" flex flex-col gap-6 w-full sm:mx-auto sm:w-full sm:max-w-sm md:max-w-lg">

                            {/*<h1 className="text-center text-5xl" style={{fontFamily:"Poppins, sans-serif",fontWeight:600}}>ARCHIVE</h1>*/}
                            <h1 className="text-center text-4xl"
                                style={{fontFamily: "Poppins, sans-serif", fontWeight: 400}}>Hi... Welcome Back :)</h1>
                            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
                                style={{fontFamily: "Poppins, sans-serif", fontWeight: 400}}>
                                Login to your account
                            </h2>
                            <button
                                id="signInBtn"
                                style={{
                                    fontFamily: "Poppins, sans-serif",
                                    fontWeight: 400,
                                    borderWidth: '1px',
                                    borderColor: 'grey'
                                }}
                                type="submit"
                                className="flex justify-center items-center gap-2 border-solid  flex w-full justify-center rounded-md bg-white  px-3 py-1.5 text-sm font-semibold leading-6  shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                <img
                                    className=" h-5 w-auto"
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2008px-Google_%22G%22_Logo.svg.png"
                                    alt="Your Company"
                                />
                                LOGIN WITH GOOGLE
                            </button>
                            <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
                                style={{
                                    fontFamily: "Poppins, sans-serif",
                                    fontWeight: 400,
                                    borderBottom: '1px solid black',
                                    borderColor: 'grey'
                                }}>

                            </h2>
                        </div>

                        <div className="mt-10 w-full sm:mx-auto sm:w-full sm:max-w-sm md:max-w-lg">
                            <form className="space-y-6 w-full" action="#" method="POST">
                                <div>
                                    <label htmlFor="email"
                                           className="block text-sm font-medium leading-6 text-gray-900">
                                        EMAIl
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            onChange={(e) => setUsername(e.target.value)}
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${emailInput}`}
                                        />
                                        <h5 className={`text-rose-500 text-sm font-regular ${emailErr} leading-6`}>Invalid
                                            Email</h5>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password"
                                               className="font-poppins block text-sm font-medium leading-6 text-gray-900">
                                            PASSWORD
                                        </label>
                                        <div className="text-sm">
                                            <h5
                                                className="font-semibold text-indigo-600 hover:text-indigo-500">
                                                Forgot password?
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            onChange={(e) => setPassword(e.target.value)}
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            required
                                            className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${passwordInput}`}/>
                                    </div>
                                    <h5 className={`text-rose-500 text-sm font-regular ${passwordErr} leading-6`}>Invalid
                                        Password</h5>
                                </div>

                                <div>
                                    <button
                                        onClick={handleLogin}
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Login
                                    </button>
                                </div>
                            </form>

                            <h5 className="flex items-center gap-1 mt-3 text-start text-sm text-gray-500">
                                Don't have an account?{' '}
                                <Link to={"/register"}>
                                    <h5
                                        className="flex font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                        Create An Account
                                    </h5>
                                </Link>

                            </h5>
                        </div>
                    </div>
                </div>
                <div className=" justify-center items-center  w-2/4 hidden md:flex lg:flex xl:flex 2xl:flex ">
                    <img
                        className="mx-auto h-4/5 rounded-ss-3xl rounded-ee-3xl "
                        src={loginImage}
                        alt="Your Company"
                    />
                </div>
            </div>
        </>

    )

}

export default Login;