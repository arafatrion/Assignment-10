import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
// import { useState } from 'react';

const Login = () => {
    // const [error,setError] = useState();
    const {signIn} = useContext(AuthContext)
    const location = useLocation();
    const Navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log({email,password});
        signIn(email,password)
        .then(result => {
            const user = result.user;
            console.log(user);
            Navigate(`${location.state? location.state :"/"}`);
        }).catch((error) =>{
            const errorMessage = error.message;
            console.log(errorMessage);
        });





    }
    return (
        <div className="flex justify-center min-h-screen items-center ">
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5">
                <h2 className='font-semibold text-2xl text-center'>Login Your Account</h2>
                <form onSubmit={handleLogin} className="card-body">
                    <fieldset className="fieldset">
                        <label className="label">Email</label>
                        {/* email */}
                        <input name='email' type="email" className="input" placeholder="Email" />
                        <label className="label">Password</label>
                        {/* password */}
                        <input name='password' type="password" className="input" placeholder="Password" />
                        <div><a className="link link-hover">Forgot password?</a></div>
                        <button type='submit' className="btn btn-neutral mt-4">Login</button>
                        <p className='font-semibold text-center pt-5'>Don't have an Account ?<Link className='text-red-500' to='/auth/register'> Register</Link> </p>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default Login;