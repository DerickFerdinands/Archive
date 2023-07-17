import loginImage from '../../assets/images/pexels-amina-filkins-5409662.jpg';
import {GoogleLogin} from 'react-google-login';
import {Link, useNavigate} from "react-router-dom";

const Login = () => {

    let navigate = useNavigate();
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
                            <GoogleLogin
                                clientId="541200273937-3mtsu8oi6c7h1m0k3tp5kgjt0nt7vaff.apps.googleusercontent.com"
                                buttonText="Login"
                                onSuccess={(res) => {
                                    console.log(res)
                                }}
                                onFailure={(res) => {
                                    console.log(res)
                                }}
                                cookiePolicy={'single_host_origin'}
                            />
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
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password"
                                               className="font-poppins block text-sm font-medium leading-6 text-gray-900">
                                            PASSWORD
                                        </label>
                                        <div className="text-sm">
                                            <a href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                                Forgot password?
                                            </a>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <button
                                        onClick={()=>{
                                        navigate('/register')
                                        }}
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Login
                                    </button>
                                </div>
                            </form>

                            <p className="mt-3 text-start text-sm text-gray-500">
                                Don't have an account?{' '}
                                <Link to={"/register"}>
                                    <a href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                        Create An Account
                                    </a>
                                </Link>

                            </p>
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