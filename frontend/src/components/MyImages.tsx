import React, { useEffect, useState, ChangeEvent } from 'react';
import Image from './Image';
import api from '../utils/api';
import BarLoader from 'react-spinners/BarLoader';
import toast from 'react-hot-toast';

interface MyImagesProps {
  add_image: (image: string) => void;
}

interface ImageType {
  _id: string;
  url: string;
}

const MyImages: React.FC<MyImagesProps> = ({ add_image }) => {
  const [images, setImages] = useState<ImageType[]>([]);
  const [loader, setLoader] = useState<boolean>(false);

  const image_upload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const formData = new FormData();
      formData.append('image', e.target.files[0]);

      try {
        setLoader(true);
        const { data } = await api.post('/api/add-user-image', formData);
        setImages((prevImages) => [...prevImages, data.userImage]);
        setLoader(false);
      } catch (error: any) {
        setLoader(false);
        toast.error(error.response?.data?.message || 'An error occurred');
      }
    }
  };

  useEffect(() => {
    const get_images = async () => {
      try {
        const { data } = await api.get('/api/get-user-image');
        setImages(data.images);
      } catch (error) {
        console.error(error);
      }
    };
    get_images();
  }, []);

  return (
    <div>
      <div className='w-full h-[40px] flex justify-center items-center bg-purple-500 rounded-sm text-white mb-3'>
        <label className='text-center cursor-pointer' htmlFor="image">Upload image</label>
        <input readOnly={loader} onChange={image_upload} type="file" id='image' className='hidden' />
      </div>
      {loader && (
        <div className='flex justify-center items-center mb-2'>
          <BarLoader color='#fff' />
        </div>
      )}
      <div className='h-[80vh] overflow-x-auto flex justify-start items-start scrollbar-hide'>
        <Image add_image={add_image} images={images} type={undefined} setImage={undefined} />
      </div>
    </div>
  );
};

export default MyImages;
