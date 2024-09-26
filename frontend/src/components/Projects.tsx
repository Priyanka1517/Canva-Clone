import React, { useEffect, useState } from 'react';
import Item from './Home/Item';
import api from '../utils/api';
import toast from 'react-hot-toast';

interface ProjectsProps {
  type?: any;
  design_id?: string;
}

interface Design {
  _id: string;
  [key: string]: any; // Use more specific types if you know the structure of the design object
}

const Projects: React.FC<ProjectsProps> = ({ type, design_id }) => {
  const [designs, setDesign] = useState<Design[]>([]);

  const get_user_design = async () => {
    try {
      const { data } = await api.get('/api/user-designs');
      setDesign(data.designs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    get_user_design();
  }, []);

  const delete_design = async (design_id: string) => {
    try {
      const { data } = await api.put(`/api/delete-user-image/${design_id}`);
      toast.success(data.message);
      get_user_design();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className='h-[88vh] overflow-x-auto flex justify-start items-start scrollbar-hide w-full'>
      <div className={type ? 'grid grid-cols-2 gap-2 mt-5 w-full' : 'grid grid-cols-4 gap-2 mt-5 w-full'}>
        {designs.map((d, i) => (
          d._id !== design_id && <Item key={i} design={d} type={type} delete_design={delete_design} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
