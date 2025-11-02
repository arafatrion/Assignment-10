import React, {useContext } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const handleLogOut = () => {
        console.log("user trying to logout ");
        logOut().then(() => {
            alert("Sign-out successful.")
        }).catch((error) => {
            console.log(error)
        });
    };

    return (
        <div className="navbar p-0  bg-emerald-500  shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className=" cursor-pointer mr-2 lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>

                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li className='font-semibold'>
                            <NavLink to='/' className={({ isActive }) => isActive ? 'text-indigo-600' : ''}>All Recipes</NavLink>
                        </li>
                        <li className='font-semibold'>
                            <NavLink to='/add-recipes' className={({ isActive }) => isActive ? 'text-indigo-600' : ''} >Add Recipe</NavLink>
                        </li>
                        <li className='font-semibold'>
                            <NavLink to='/my-recipes' className={({ isActive }) => isActive ? 'text-indigo-600' : ''} >My Recipe</NavLink>
                        </li>
                        <li className='font-semibold'>
                            <NavLink to='/recipe-details' className={({ isActive }) => isActive ? 'text-indigo-600' : ''}>Recipe Details </NavLink>
                        </li>
                        <div className="login-btn  flex ">
                            {
                                user ? <button onClick={handleLogOut} className='btn px-10 bg-black text-white flex-1'>LogOut</button> : <Link to='/auth/login' className='btn px-10 bg-black text-white flex-1'>LogIn</Link >
                            }

                        </div>


                    </ul>
                </div>
                <Link to='/' className="font-bold p-5 text-xl">RECIPE BOOK</Link>
                <div className="">{user && user.email}</div>
            </div>


            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li className='font-semibold'>
                        <NavLink to='/' className={({ isActive }) => isActive ? 'text-indigo-600' : ''}>All Recipes</NavLink>
                    </li>
                    <li className='font-semibold'>
                        <NavLink to='/add-recipes' className={({ isActive }) => isActive ? 'text-indigo-600' : ''} >Add Recipe</NavLink>
                    </li>
                    <li className='font-semibold'>
                        <NavLink to='/my-recipes' className={({ isActive }) => isActive ? 'text-indigo-600' : ''} >My Recipe</NavLink>
                    </li>
                    <li className='font-semibold'>
                        <NavLink to='/recipe-details' className={({ isActive }) => isActive ? 'text-indigo-600' : ''}>Recipe Details </NavLink>
                    </li>
                </ul>
            </div>

            <div className="navbar-end  hidden lg:flex">
                <div className="login-btn ">
                    {
                        user ? <button onClick={handleLogOut} className='btn mx-20  bg-black text-white border-none px-10' >LogOut</button> : <Link to='/auth/login' className='btn mx-20  bg-black text-white border-none px-10'>LogIn</Link>
                    }

                </div>


            </div>
        </div>
    );
};

export default Navbar;