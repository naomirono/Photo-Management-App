import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPhoto, updatePhotoTitle } from '../../Services/api';
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

const PhotoPage = () => {
  const { photoId } = useParams();
  const [photo, setPhoto] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const photoData = await getPhoto(photoId);
        setPhoto(photoData);
      } catch (error) {
        console.error('Error fetching photo:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhoto();
  }, [photoId]);

  const handleTitleEdit = async () => {
    try {
      await updatePhotoTitle(photoId, editedTitle);
      setIsEditing(false);
      const updatedPhotoData = await getPhoto(photoId);
      setPhoto(updatedPhotoData);
    } catch (error) {
      console.error('Error updating photo title:', error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    
      <div className="relative bg-cover bg-center h-screen" style={{ backgroundImage: 'url("https://neyoportfolio.s3.eu-north-1.amazonaws.com/joanna-kosinska-spAkZnUleVw-unsplash.jpg")', position: 'relative' }}>

        <div className="absolute inset-0 bg-black bg-opacity-70"></div>

        <div className="max-w-[1000px] mx-auto p-8 relative z-10">

          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl font-bold font-fira text-white">Photo <span className='text-[var(--primary)]'>Details</span></h1>
            <HomeIcon />
          </div>

          <div className="bg-[#FFFFFF] border-1 border-[#E0E0E0] p-4 rounded-lg shadow">
            <img src={photo.url} alt={`Photo ${photo.id}`} className="mb-3 w-full h-[60vh] rounded-md object-cover" />
            <div className="flex flex-col items-center sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className='font-inter text-gray-900'><span className='font-fira font-medium text-[var(--secondary)]'>Title:</span> {editedTitle || photo.title}</p>
                <p className='font-inter text-gray-900'><span className='font-fira font-medium text-[var(--secondary)]'>Photo ID:</span> {photo.id}</p>
              </div>
              <div className="mt-3 sm:mt-0 flex  items-center">
                {isEditing ? (
                  <div className="flex  items-center">
                    <input
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      className="border p-2 mr-2"
                    />
                    <button onClick={handleTitleEdit} className="bg-[var(--primary)] text-white py-2 px-4 rounded-full hover:bg-[var(--primary)]">
                      Save
                    </button>
                  </div>
                ) : (
                  <button onClick={() => setIsEditing(true)} className="bg-[var(--primary)] text-white py-1 px-4 rounded-full hover:bg-[var(--primary)]">
                    Edit Title
                  </button>
                )}
              </div>
           </div>
         </div>

        </div>
      </div>
  
  );
};

export default PhotoPage;
