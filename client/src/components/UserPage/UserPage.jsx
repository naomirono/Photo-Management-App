import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../Loader/Loader';

const HomeIcon = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link to="/home" className="text-white flex items-center relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {isHovered && <span className="mr-2 font-fira text-md">Home</span>}
      <div className='bg-white p-1 rounded-full overflow-hidden'>
        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 512 512"> 
         <path fill="#2a6476" d="M261.56 101.28a8 8 0 0 0-11.06 0L66.4 277.15a8 8 0 0 0-2.47 5.79L63.9 448a32 32 0 0 0 32 32H192a16 16 0 0 0 16-16V328a8 8 0 0 1 8-8h80a8 8 0 0 1 8 8v136a16 16 0 0 0 16 16h96.06a32 32 0 0 0 32-32V282.94a8 8 0 0 0-2.47-5.79Z"></path> 
         <path fill="#2a6476" d="m490.91 244.15l-74.8-71.56V64a16 16 0 0 0-16-16h-48a16 16 0 0 0-16 16v32l-57.92-55.38C272.77 35.14 264.71 32 256 32c-8.68 0-16.72 3.14-22.14 8.63l-212.7 203.5c-6.22 6-7 15.87-1.34 22.37A16 16 0 0 0 43 267.56L250.5 69.28a8 8 0 0 1 11.06 0l207.52 198.28a16 16 0 0 0 22.59-.44c6.14-6.36 5.63-16.86-.76-22.97"></path>
        </svg>
      </div>
    </Link>
  );
};

const UserPage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(response => setUser(response.data))
      .catch(error => console.error('Error fetching user:', error))
      .finally(() => setLoading(false));

    axios.get(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
      .then(response => setAlbums(response.data))
      .catch(error => console.error('Error fetching albums:', error));
  }, [userId]);

  if (loading) {
    return <Loader />;
  }

  return (
      <div className="relative flex justify-center items-center w-full bg-cover bg-center h-full" style={{ backgroundImage: 'url("https://neyoportfolio.s3.eu-north-1.amazonaws.com/joanna-kosinska-spAkZnUleVw-unsplash.jpg")', position: 'relative' }}>

        <div className="absolute inset-0 bg-black bg-opacity-80"></div>

        <div className="max-w-[1100px] mx-auto p-8 z-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-bold font-fira text-white">{user.name}</h1>
          <HomeIcon />
        </div>

          <div className="bg-white border-1 border-[#E0E0E0] p-4 rounded shadow">
            <h2 className="text-lg font-bold font-fira text-[var(--primary)] mb-2">User Information</h2>
            <p className='font-inter cursor-pointer text-gray-900'><span className='font-fira font-medium text-[var(--secondary)]'>Email:</span> {user.email}</p>
            <p className='font-inter cursor-pointer text-gray-900'><span className='font-fira font-medium text-[var(--secondary)]'>Username:</span> {user.username}</p>
            <p className='font-inter cursor-pointer text-gray-900'><span className='font-fira font-medium text-[var(--secondary)]'>Website:</span> {user.website}</p>
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4 font-fira text-white">Albums</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {albums.map(album => (
                <Link to={`/album/${album.id}`} key={album.id} className="text-black flex">
                  <div className="bg-white border-1 border-[#E0E0E0] p-4 rounded shadow cursor-pointer flex flex-col w-full">
                    <h3 className="text-lg font-bold font-fira mb-2">{album.title}</h3>
                    <p className='font-inter'><span className='font-fira font-medium text-[var(--primary)]'>Album ID:</span> {album.id}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
};

export default UserPage;
