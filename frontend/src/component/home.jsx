import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Admin from "./Admin/admin";
import User from "./User/user";

const Home = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');


  const callHomePage = async () => {
    try {
      const cookieValue = Cookies.get('token');

      const res = await fetch('/home', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + cookieValue,
        },
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Failed to fetch user data');
       
      }

      const data = await res.json();
      setName(data.name);
    } catch (err) {
      navigate("/");
      console.log(err);
    }
  };

  useEffect(() => {
    callHomePage();
  }, []);

  return (
    <div className="Home">
  
      {
        name === 'Admin' ?
           <Admin />
          :
          <User />
      }
        
      
    </div>
  );
};

export default Home;
