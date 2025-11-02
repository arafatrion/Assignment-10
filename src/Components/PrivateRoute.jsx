import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Navigate, useLocation } from 'react-router';
import Loding from '../pages/Loding';

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();

   //  console.log(location)
    
     if(loading){
        return <Loding></Loding>


     }

    if(user && user?.email){
       return children 
    }
    return <Navigate state={location.pathname} to="/auth/login"></Navigate>
    
};

export default PrivateRoute;