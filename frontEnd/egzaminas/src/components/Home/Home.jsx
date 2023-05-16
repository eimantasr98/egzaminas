import React from 'react';
import { Outlet, Link } from 'react-router-dom';



export default function Home({isLoggedIn}) {


  

  return (
    <div>
        
        {
          
            isLoggedIn() && 
        <ul>
            <li><Link to={'/new-client'}>Register New Client</Link></li>
            <li><Link to={'/created-clients'}>Registered Clients</Link></li>
        </ul>
        }
        <Outlet />
    </div>
  )
}
