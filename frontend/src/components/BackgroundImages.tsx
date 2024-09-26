import React, { useState, useEffect } from 'react'
import Image from './Image'
import api from '../utils/api'

const BackgroundImages = ({ setImage, type }: { setImage: any, type: any }) => {

    const [images, setImages] = useState([])

    useEffect(() => {
        const get_images = async () => {
            try {
                const token = localStorage.getItem('token'); // or however you're storing the token

                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data' // Adjust if you're sending a file
                    }
                };
                const { data } = await api.get('/background-images', config)
                setImages(data.images)
            } catch (error) {
                console.log(error)
            }
        }
        get_images()
    }, [])

    return (
        <Image add_image={null} setImage={setImage} type={type} images={images} />
    )
}

export default BackgroundImages