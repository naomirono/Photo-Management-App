import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));

    axios.get('https://jsonplaceholder.typicode.com/albums')
      .then(response => setAlbums(response.data))
      .catch(error => console.error('Error fetching albums:', error));
  }, []);

  return (
      <div className="relative flex justify-center items-center  w-full bg-cover bg-center h-full" style={{ backgroundImage: 'url("https://neyoportfolio.s3.eu-north-1.amazonaws.com/joanna-kosinska-spAkZnUleVw-unsplash.jpg")', position: 'relative' }}>

        <div className="absolute inset-0 bg-black bg-opacity-80"></div>

        <div className="max-w-[1100px] mx-auto p-8 z-10">
          <h1 className="text-4xl font-bold mb-6 font-fira text-white pt-8">All <span className='text-[var(--primary)]'>Users</span></h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map(user => (
              <Link to={`/user/${user.id}`} key={user.id} className="text-decoration-none">
                <div className="bg-white border-1 border-[#E0E0E0] p-4 rounded shadow cursor-pointer">
                  <h2 className="text-lg font-bold mb-2 font-fira text-[var(--primary)]">{user.name}</h2>
                  <p className='font-inter text-gray-900'><span className='font-fira font-medium text-[var(--secondary)]'>Email:</span> {user.email}</p>
                  <p className='font-inter text-gray-900'><span className='font-fira font-medium text-[var(--secondary)]'>Username:</span> {user.username}</p>
                  <p className='font-inter text-gray-900'><span className='font-fira font-medium text-[var(--secondary)]'>Number of Albums:</span> {albums.filter(album => album.userId === user.id).length}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
  );
};

export default HomePage;
