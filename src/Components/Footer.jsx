import React from 'react';
import { FaFacebookF, FaYoutube } from 'react-icons/fa';
import { TbBrandTwitterFilled } from 'react-icons/tb';
import { NavLink } from 'react-router';

const Footer = () => {
    return (
        <div className="footer footer-horizontal   footer-center  bg-emerald-500 text-base-content rounded p-10">
            <div className="flex flex-col md:flex-row gap-8">
                <div className='font-semibold'>
                    <NavLink to='/' className={({ isActive }) => isActive ? 'text-indigo-600' : ''}>All Recipes</NavLink>
                </div>
                <div className='font-semibold'>
                    <NavLink to='/add-recipes' className={({ isActive }) => isActive ? 'text-indigo-600' : ''} >Add Recipe</NavLink>
                </div>
                <div className='font-semibold'>
                    <NavLink to='/my-recipes' className={({ isActive }) => isActive ? 'text-indigo-600' : ''} >My Recipe</NavLink>
                </div>
                <div className='font-semibold'>
                    <NavLink to='/recipe-details' className={({ isActive }) => isActive ? 'text-indigo-600' : ''}>Recipe Details </NavLink>
                </div>
            </div>
            <div>
                <div className="grid grid-flow-col gap-4">
                    
                        <TbBrandTwitterFilled />
                  
               
                        <FaYoutube />
                    
                    
                        <FaFacebookF />
                    
                </div>
            </div>
            <aside>
                <p>Copyright © {new Date().getFullYear()} - All right reserved by Recipe Book</p>
            </aside>
        </div>
    );
};

export default Footer;