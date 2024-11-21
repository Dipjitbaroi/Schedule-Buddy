import { Link, useLocation } from "react-router-dom";
import loginImage from "../assets/images/loginImage.png";
import AuthForm from "./AuthForm";
import clsx from "clsx";
const AuthPage = () => {
    const location = useLocation();

    return (
        <main className="hero min-h-screen bg-white">
            <section className="hero-content bg-white flex-col lg:flex-row md:w-[70%] w-full rounded-[1em]  h-full md:h-auto lg:h-[35em] shadow-2xl my-10">
                <section className="!w-full bg-[#EFF3FF] h-full flex items-center justify-center rounded-[1em]">
                    <img src={loginImage} className=" w-[17em] md:w-[30em]" alt="loginImage" />
                </section>
                <section className="card w-full max-w-sm shrink-0   ">
                    <div className="card-body">
                        <h1 className={clsx("text-[30px] font-bold text-center capitalize text-primary", location.pathname === '/login' && 'mb-[1em]')}>{location.pathname === '/login' ? 'LOGIN' : 'REGISTER'}</h1>
                        <AuthForm />
                        {location.pathname === '/login' ? <p className="text-gray-500 text-[12px] text-center mt-1">Don't have an account? <Link to={'/sign-up'} >Register Now</Link></p> : <p className="text-gray-500 text-[12px] text-center mt-1">Already have an account? <Link to={'/login'} >Login</Link></p>}
                    </div>
                </section>
            </section>
        </main>
    );
}

export default AuthPage;