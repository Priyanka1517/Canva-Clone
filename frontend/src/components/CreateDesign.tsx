import React, { useEffect, useRef, useState } from 'react'
import * as htmlToImage from 'html-to-image';
import { useLocation, useNavigate } from 'react-router-dom'
import { RotateLoader } from 'react-spinners'
import api from '../utils/api'

import CreateComponent from './CreateComponent'

const CreateDesign = () => {

    const ref = useRef<HTMLDivElement>(null)

    const { state } = useLocation()

    const navigate = useNavigate()


    const obj = {
        name: "main_frame",
        type: "rect",
        id: Date.now(),
        height: state.height,
        width: state.width,
        z_index: 1,
        color: '#fff',
        image: ""
    }

    const [loader, setLoader] = useState(false)


    const create_design = async () => {

        const image = ref.current ? await htmlToImage.toBlob(ref.current) : null;

        const design = JSON.stringify(obj)

        const token = localStorage.getItem('token'); // or however you're storing the token

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data' // Adjust if you're sending a file
            }
        };
        

        if (image) {

            const formData = new FormData()
            formData.append('design', design)
            formData.append('image', image)
            // Log the FormData contents to verify
            for (let pair of formData.entries()) {
                console.log(`${pair[0]}:`, pair[1]);
            }
            try {
                setLoader(true)
                const { data } = await api.post('/create-user-design', formData, config)
                navigate(`/design/${data.design._id}/edit`)
                setLoader(false)
            } catch (error) {
                setLoader(false)
                console.log((error as any).response.data)
            }
        }

    }

    useEffect(() => {
        if (state && ref.current) {
            create_design()
        } else {
            navigate('/')
        }
    })
    return (
        <div className='w-screen h-screen flex justify-center items-center relative'>
            <div ref={ref} className='relative w-auto h-auto overflow-auto'>
                <CreateComponent info={{ ...obj, moveElement: () => { }, setCurrentComponent: () => { } }} current_component={{}} removeComponent={undefined} selectItem={''} setSelectItem={function (value: React.SetStateAction<string>): void {
                    throw new Error('Function not implemented.');
                } } />
            </div>
            {
                loader && <div className='left-0 top-0 w-full h-full flex justify-center items-center bg-black absolute'><RotateLoader color='white' /></div>
            }
        </div>
    )
}

export default CreateDesign