import React, {  useContext } from 'react';

import { Link, Navigate, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';

const Register = () => {
    const { createUser ,setUser} = useContext(AuthContext)
      const location = useLocation();
     const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        //   console.log(e.target);
          const form = e.target;
          const name = form.name.value;
          const photo = form.photo.value;
          const email = form.email.value;
          const password = form.password.value;
          console.log({name,photo,email,password});
          createUser(email,password)
          .then(result => {
            const user = result.user;
            setUser(user);
              navigate(`${location.state? location.state :"/"}`);
            
          }).catch ((error) => {
            
            const errorMessage = error.message;
            alert(errorMessage)
          })
          
    };
    return (
        <div>
            <div className="flex justify-center min-h-screen items-center ">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5">
                    <h2 className='font-semibold text-2xl text-center'>Register Your Account</h2>
                    <form  onSubmit={handleRegister} className="card-body">
                        <fieldset className="fieldset">
                            {/* name */}
                            <label className="label">Name</label>
                            <input type="text" name='name' className="input" placeholder="Name" required />
                            {/* photo URL */}
                            <label className="label">Photo URL</label>
                            <input type="text" name='photo' className="input" placeholder="Photo URL" required />
                            {/* email */}
                            <label className="label">Email</label>
                            <input type="email" name='email' className="input" placeholder="Email" required />
                            {/* password */}
                            <label className="label">Password</label>
                            <input type="password" name='password' className="input" placeholder="Password" required/>

                            <button type='submit' className="btn btn-neutral mt-4">Register</button>
                            <p className='font-semibold text-center pt-5'>Already have an Account ? <Link className='text-red-500' to='/auth/login'>Login</Link> </p>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;