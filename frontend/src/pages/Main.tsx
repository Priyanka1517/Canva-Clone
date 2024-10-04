import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useParams } from 'react-router-dom';
import { BsGrid1X2, BsFillImageFill, BsFolder } from 'react-icons/bs';
import { FaShapes, FaCloudUploadAlt, FaTrash } from 'react-icons/fa';
import { IoDuplicateOutline } from "react-icons/io5";
import { TfiText } from 'react-icons/tfi';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { RxTransparencyGrid } from 'react-icons/rx';
import TemplateDesign from '../components/main/TemplateDesign';
import MyImages from '../components/MyImages';
import Projects from '../components/Projects';
import CreateComponent from '../components/CreateComponent';
import api from '../utils/api';
import InitialImage from '../components/InitialImage';
import BackgroundImages from '../components/BackgroundImages';

interface Component {
    name: string;
    type: string;
    id: number;
    height: number;
    width: number;
    z_index: number;
    color: string;
    image: string;
    rotate: number; // Add the 'rotate' property
    setCurrentComponent: (a: string | null) => void;
}

interface ShowState {
    status: boolean;
    name: string;
}

const Main: any = () => {

    const [selectItem, setSelectItem] = useState<string>('');
    const { design_id }: any = useParams();
    const [state, setState] = useState<string>('');
    const [current_component, setCurrentComponent] = useState<any | null>(null);
    const [color, setColor] = useState<string>('');
    const [image, setImage] = useState<string>('');
    const [rotate, setRotate] = useState<number>(0);
    const [left, setLeft] = useState<number | string>('');
    const [top, setTop] = useState<number | string>('');
    const [width, setWidth] = useState<number | Number>(0);
    const [height, setHeight] = useState<number | string>('');
    const [opacity, setOpacity] = useState<any | string>('');
    const [zIndex, setzIndex] = useState<number | string>('');

    const [padding, setPadding] = useState<number | string>('');
    const [font, setFont] = useState<string>('');
    const [weight, setWeight] = useState<string>('');
    const [text, setText] = useState<string>('');
    const [radius, setRadius] = useState<number>(0);

    const [show, setShow] = useState<ShowState>({
        status: true,
        name: ''
    });

    const [components, setComponents] = useState<any[]>([
        {
            name: "main_frame",
            type: "rect",
            id: Math.floor((Math.random() * 100) + 1),
            height: 450,
            width: 650,
            z_index: 1,
            color: '#fff',
            image: "",
            opacity: 1,
            setCurrentComponent: (a: string) => setCurrentComponent(a),
        }
    ]);

    const setElements = (type: string, name: string) => {
        setState(type);
        setShow({
            status: false,
            name
        });
    };

    const moveElement = (id: number, currentInfo: any) => {
        console.log("movingelement", id, currentInfo);
        setCurrentComponent(currentInfo);
        let isMoving = true;

        const currentDiv = document.getElementById(id.toString());

        const mouseMove = ({ movementX, movementY }: MouseEvent) => {
            // setSelectItem('');
            const getStyle = window.getComputedStyle(currentDiv!);
            const left = parseInt(getStyle.left);
            const top = parseInt(getStyle.top);
            if (isMoving) {
                currentDiv!.style.left = `${left + movementX}px`;
                currentDiv!.style.top = `${top + movementY}px`;
            } 
            console.log("mousemove", currentDiv!.style.left, currentDiv!.style.top);
        };

        const mouseUp = (e: MouseEvent) => {
            // setSelectItem(currentInfo.id.toString());
            console.log("mouseup", current_component);
            isMoving = false;
            window.removeEventListener('mousemove', mouseMove);
            window.removeEventListener('mouseup', mouseUp);
            setLeft(parseInt(currentDiv!.style.left));
            setTop(parseInt(currentDiv!.style.top));


            // setColor('');
            // setWidth(0);
            // setHeight(0);
            // setTop(0);
            // setLeft(0);
            // setRotate(0);
            // setOpacity(0);
            // setzIndex(0);
            // setText('');

        };

        window.addEventListener('mousemove', mouseMove);
        window.addEventListener('mouseup', mouseUp);
        currentDiv!.ondragstart = function () {
            return false;
        };
    };

    const resizeElement = (id: string | number, currentInfo: any) => {
    setCurrentComponent(currentInfo);

    let isMoving = true;

    const currentDiv = document.getElementById(id.toString());

    const mouseMove = (event: MouseEvent) => {
        if (!currentDiv) return;  // Ensure currentDiv exists
        const getStyle = window.getComputedStyle(currentDiv);
        const width = parseInt(getStyle.width);
        const height = parseInt(getStyle.height);
        
        if (isMoving) {
            currentDiv.style.width = `${width + event.movementX}px`;
            currentDiv.style.height = `${height + event.movementY}px`;
        }
    };

    const mouseUp = (event: MouseEvent) => {
        isMoving = false;
        window.removeEventListener('mousemove', mouseMove);
        window.removeEventListener('mouseup', mouseUp);
        console.log("Mouse up: color: ", color);
        // setColor('');
        // setWidth(0);
        // setHeight(0);
        // setTop(0);
        // setLeft(0);
        // setRotate(0);
        // setOpacity(0);
        // setzIndex(0);
        // setText('');

        if (currentDiv) {
            setWidth(parseInt(currentDiv.style.width));
            setHeight(parseInt(currentDiv.style.height));
        }
    };

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseup', mouseUp);

    if (currentDiv) {
        currentDiv.ondragstart = function () {
            return false;
        };
    }
    };

    const rotateElement = (id: string | number, currentInfo: any) => {
        setCurrentComponent(currentInfo);
    
        const target = document.getElementById(id.toString());
    
        const mouseMove = (event: MouseEvent) => {
            if (!target) return;
    
            const getStyle = window.getComputedStyle(target);
            const trans = getStyle.transform;
    
            const values = trans.split('(')[1].split(')')[0].split(',');
    
            const angle = Math.round(Math.atan2(parseFloat(values[1]), parseFloat(values[0])) * (180 / Math.PI));
    
            let deg = angle < 0 ? angle + 360 : angle;
    
            if (event.movementX) {
                deg = deg + event.movementX;
            }
    
            target.style.transform = `rotate(${deg}deg)`;
        };
    
        const mouseUp = (event: MouseEvent) => {
            if (!target) return;
    
            window.removeEventListener('mousemove', mouseMove);
            window.removeEventListener('mouseup', mouseUp);
    
            const getStyle = window.getComputedStyle(target);
            const trans = getStyle.transform;
            const values = trans.split('(')[1].split(')')[0].split(',');
            const angle = Math.round(Math.atan2(parseFloat(values[1]), parseFloat(values[0])) * (180 / Math.PI));
    
            let deg = angle < 0 ? angle + 360 : angle;
            setRotate(deg);
        };
    
        window.addEventListener('mousemove', mouseMove);
        window.addEventListener('mouseup', mouseUp);
    
        if (target) {
            target.ondragstart = function () {
                return false;
            };
        }
    };

    const removeComponent = (id: number) => {
        const temp = components.filter(c => c.id !== id);
        setCurrentComponent(null);
        setComponents(temp);
    };
    
    const duplicate = (current: Component | null) => {
        if (current) {
            setComponents([...components, { ...current, id: Date.now() }]);
        }
    };
    
    const remove_background = () => {
        const com = current_component ? components.find(c => c.id === current_component.id) : null;
        const temp = components.filter(c => current_component && c.id !== current_component.id);
        if (com) {
            com.image = '';
            setImage('');
            setComponents([...temp, com]);
        }
    };
    
    const opacityHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOpacity(parseFloat(e.target.value));
    };

    
    const createShape = (name: string, type: string) => {
        setCurrentComponent(null);
        const id: any = Date.now();
        const style: any = {
            id: id,
            name: name,
            type,
            left: 10,
            top: 10,
            opacity: 1,
            width: 200,
            height: 150,
            rotate,
            z_index: 2,
            color: '#3c3c3d',
            setCurrentComponent: (a: any) => setCurrentComponent(a),
            moveElement,
            resizeElement,
            rotateElement,
        };
        setSelectItem(id);
        setCurrentComponent(style);
        setComponents([...components, style]);
    };
    
    const add_text = (name: string, type: string) => {
        setCurrentComponent(null);
        const id: any = Date.now();
        const style: any = {
            id: id,
            name: name,
            type,
            left: 10,
            top: 10,
            opacity: 1,
            rotate,
            z_index: 10,
            padding: 6,
            font: 22,
            title: "Add text",
            weight: 400,
            color: '#3c3c3d',
            setCurrentComponent: (a: any) => setCurrentComponent(a),
            moveElement,
            resizeElement,
            rotateElement,
        };
    
        setWeight('');
        setFont('');
        setSelectItem(id);
        setCurrentComponent(style);
        setComponents([...components, style]);
    };
    
    const add_image = (img: string) => {
        setCurrentComponent(null);
        const id: any = Date.now();
        const style: any = {
            id: id,
            name: 'image',
            type: 'image',
            left: 10,
            top: 10,
            opacity: 1,
            width: 200,
            height: 150,
            rotate,
            z_index: 2,
            ratius: 0, // Assuming this should be "radius"; consider renaming for clarity
            image: img,
            setCurrentComponent: (a: any) => setCurrentComponent(a),
            moveElement,
            resizeElement,
            rotateElement,
        };
    
        setSelectItem(id);
        setCurrentComponent(style);
        setComponents([...components, style]);
    };

    useEffect(() => {
        if (current_component) {
            const index = components.findIndex(c => c.id === current_component.id);
            const temp = components.filter(c => c.id !== current_component.id);

            // Update properties based on the component type
            if (current_component.name !== 'shape') {
                components[index].width = width !== null ? width : current_component.width;
                components[index].height = height !== null ? height : current_component.height;
                components[index].rotate = rotate !== null ? rotate : current_component.rotate;
            }

            if (current_component.name === 'text') {
                components[index].font = font !== '' ? font : current_component.font;
                components[index].padding = padding !== null ? padding : current_component.padding;
                components[index].weight = weight !== '' ? weight : current_component.weight;
                components[index].title = text !== '' ? text : current_component.title;
            }

            if (current_component.name === 'image') {
                components[index].radius = radius !== null ? radius : current_component.radius;
            }

            if (current_component.name === 'main_frame' && image) {
                components[index].image = image !== '' ? image : current_component.image;
            }
            // console.log('Current component color:', current_component);
            // console.log("color: ", color);
            if (components[index]){
                components[index].color = color !== '' ? color : current_component.color;
            }   

            if (current_component.name !== 'main_frame') {
                components[index].left = left !== null ? left : current_component.left;
                components[index].top = top !== null ? top : current_component.top;
                components[index].opacity = opacity !== null ? opacity : current_component.opacity;
                components[index].z_index = zIndex !== null ? zIndex : current_component.z_index;
            }

            setComponents([...temp, components[index]]);
            // Reset state variables
            
            setColor(current_component.color);
            setWidth(current_component.width);
            setHeight(current_component.height);
            setTop(current_component.top);
            setLeft(current_component.left);
            setRotate(current_component.rotate);
            setOpacity(current_component.opacity);
            setzIndex(current_component.z_index);
            setText('');
            // console.log('Current component:', current_component);


            // setColor('');
            // setWidth(0);
            // setHeight(0);
            // setTop(0);
            // setLeft(0);
            // setRotate(0);
            // setOpacity(0);
            // setzIndex(0);
            // setText('');
        }
        // console.log('Current component:', current_component);
    }, [color, image, left, top, width, height, opacity, zIndex, padding, font, weight, text, radius, rotate]);

    useEffect(() => {
        const get_design = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data' // Adjust if you're sending a file
                    }
                };
                const { data } = await api.get(`/user-design/${design_id}`, config);
                console.log(data);

                const { design } = data;

                const updatedDesign: Component[] = design.map((item: any) => {
                    return {
                        ...item,
                        setCurrentComponent: (a: any) => setCurrentComponent(a),
                        moveElement,
                        resizeElement,
                        rotateElement,
                        remove_background,
                    };
                });

                setComponents(updatedDesign);
            } catch (error) {
                console.error('Error fetching design:', error);
            }
        };

        get_design();
    }, [design_id]);

    return (
        <div className='min-w-screen h-screen bg-black'>
            <Header components={components} design_id={design_id} />
            <div className='flex h-[calc(100%-60px)] w-screen'>
                <div className='w-[80px] bg-[#18191B] z-50 h-full text-gray-400 overflow-y-auto'>
                    <div onClick={() => setElements('design', 'design')} className={` ${show.name === 'design' ? 'bg-[#252627]' : ''} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                        <span className='text-2xl'><BsGrid1X2 /></span>
                        <span className='text-xs font-medium'>Design</span>
                    </div>

                    <div onClick={() => setElements('shape', 'shape')} className={`${show.name === 'shape' ? 'bg-[#252627]' : ''} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                        <span className='text-2xl'><FaShapes /></span>
                        <span className='text-xs font-medium'>Shapes</span>
                    </div>

                    <div onClick={() => setElements('image', 'uploadImage')} className={`${show.name === 'uploadImage' ? 'bg-[#252627]' : ''} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                        <span className='text-2xl'><FaCloudUploadAlt /></span>
                        <span className='text-xs font-medium'>Upload</span>
                    </div>

                    <div onClick={() => setElements('text', 'text')} className={`${show.name === 'text' ? 'bg-[#252627]' : ''} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                        <span className='text-2xl'><TfiText /></span>
                        <span className='text-xs font-medium'>Text</span>
                    </div>

                    <div onClick={() => setElements('project', 'projects')} className={`${show.name === 'projects' ? 'bg-[#252627]' : ''} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                        <span className='text-2xl'><BsFolder /></span>
                        <span className='text-xs font-medium'>Project</span>
                    </div>

                    <div onClick={() => setElements('initImage', 'images')} className={`${show.name === 'images' ? 'bg-[#252627]' : ''} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                        <span className='text-2xl'><BsFillImageFill /></span>
                        <span className='text-xs font-medium'>Images</span>
                    </div>

                    <div onClick={() => setElements('background', 'background')} className={`${show.name === 'background' ? 'bg-[#252627]' : ''} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                        <span className='text-2xl'><RxTransparencyGrid /></span>
                        <span className='text-xs font-medium'>Background</span>
                    </div>
                </div>
                <div className='h-full w-[calc(100%-75px)]'>
                    <div className={`${show.status ? 'p-0 -left-[350px]' : 'px-8 left-[75px] py-5'} bg-[#252627] h-full fixed transition-all w-[350px] z-30 duration-700`}>
                        <div onClick={() => setShow({ name: '', status: true })} className='flex absolute justify-center items-center bg-[#252627] w-[20px] -right-2 text-slate-300 top-[40%] cursor-pointer h-[100px] rounded-full'>< MdKeyboardArrowLeft /></div>
                        {
                            state === 'design' && <div>
                                <TemplateDesign type='main' />
                            </div>
                        }
                        {
                            state === 'shape' && <div className='grid grid-cols-3 gap-2'>
                                <div onClick={() => createShape('shape', 'rect')} className='h-[90px] bg-[#3c3c3d] cursor-pointer'></div>
                                <div onClick={() => createShape('shape', 'circle')} className='h-[90px] bg-[#3c3c3d] cursor-pointer rounded-full'></div>
                                <div onClick={() => createShape('shape', 'trangle')} style={{ clipPath: 'polygon(50% 0,100% 100%,0 100%)' }} className='h-[90px] bg-[#3c3c3d] cursor-pointer'></div>
                            </div>
                        }
                        {
                            state === 'image' && <MyImages add_image={add_image} />
                        }
                        {
                            state === 'text' && <div>
                                <div className='grid grid-cols-1 gap-2'>
                                    <div onClick={() => add_text('text', 'title')} className='bg-[#3c3c3d] cursor-pointer font-bold p-3 text-white text-xl rounded-sm'>
                                        <h2>Add a Text</h2>
                                    </div>
                                </div>
                            </div>
                        }

                        {
                            state === 'project' && <Projects type='main' design_id={design_id} />
                        }
                        {
                            state === 'initImage' && <div className='h-[88vh] overflow-x-auto flex justify-start items-start scrollbar-hide'>
                                <InitialImage add_image={add_image} />
                            </div>
                        }
                        {
                            state === 'background' && <div className='h-[88vh] overflow-x-auto flex justify-start items-start scrollbar-hide'>
                                <BackgroundImages type='background' setImage={setImage} />
                            </div>
                        }
                    </div>

                    <div className='w-full flex h-full'>
                        <div className={`flex justify-center relative items-center h-full ${!current_component ? 'w-full' : "w-[calc(100%-250px)] overflow-hidden"}`}>
                            <div className='m-w-[650px] m-h-[480px] flex justify-center items-center overflow-hidden'>
                                <div id='main_design' className='w-auto relative h-auto overflow-hidden select-none'>
                                    {
                                        components.map((c, i) => <CreateComponent selectItem={selectItem} setSelectItem={setSelectItem} key={i} info={c} current_component={current_component} removeComponent={removeComponent} />)
                                    }
                                </div>
                            </div>
                        </div>
                        {
                            current_component && <div className='h-full w-[250px] text-gray-300 bg-[#252627] px-3 py-2'>
                                <div className='flex gap-6 flex-col items-start h-full px-3 justify-start pt-4'>
                                    {
                                        current_component.name !== 'main_frame' && <div className='flex justify-start items-center gap-5'>
                                            <div onClick={() => removeComponent(current_component?.id)} className='w-[30px] flex justify-center items-center rounded-md cursor-pointer h-[30px] bg-slate-700 hover:bg-slate-800'><FaTrash /></div>
                                            <div onClick={() => duplicate(current_component)} className='w-[30px] flex justify-center items-center rounded-md cursor-pointer h-[30px] bg-slate-700 hover:bg-slate-800'><IoDuplicateOutline /></div>
                                        </div>
                                    }
                                    <div className='flex gap-4 justify-start items-start'>
                                        <span>Color : </span>
                                        <label className='w-[30px] h-[30px] cursor-pointer rounded-sm' style={{ background: `${current_component.color && current_component.color !== '#fff' ? current_component.color : 'gray'}` }} htmlFor="color"></label>
                                        <input onChange={(e) => setColor(e.target.value)} type="color" className='invisible' id='color' />
                                    </div>
                                    {
                                        (current_component.name === 'main_frame' && current_component.image) && <div>
                                            <button className='p-[6px] bg-slate-700 text-white rounded-sm' onClick={remove_background}>Remove background</button>
                                        </div>
                                    }

                                    {
                                        current_component.name !== 'main_frame' && <div className='flex gap-6 flex-col'>
                                            <div className='flex gap-1 justify-start items-start'>
                                                <span className='text-md w-[70px]'>Opacity : </span>
                                                <input onChange={opacityHandle} className='w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md' type="number" step={0.1} min={0.1} max={1} value={current_component.opacity} />
                                            </div>
                                            <div className='flex gap-1 justify-start items-start'>
                                                <span className='text-md w-[70px]'>Z-Index : </span>
                                                <input onChange={(e) => setzIndex(parseInt(e.target.value))} className='w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md' type="number" step={1} value={current_component.z_index} />
                                            </div>
                                            {
                                                current_component.name === 'image' && <div className='flex gap-1 justify-start items-start'>
                                                    <span className='text-md w-[70px]'>Radius : </span>
                                                    <input onChange={(e) => setRadius(parseInt(e.target.value))} className='w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md' type="number" step={1} value={current_component.radius} />
                                                </div>
                                            }
                                            {
                                                current_component.name === 'text' && <>
                                                    <div className='flex gap-1 justify-start items-start'>
                                                        <span className='text-md w-[70px]'>Padding : </span>
                                                        <input onChange={(e) => setPadding(parseInt(e.target.value))} className='w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md' type="number" step={1} value={current_component.padding} />
                                                    </div>
                                                    <div className='flex gap-1 justify-start items-start'>
                                                        <span className='text-md w-[72px]'>Font size : </span>
                                                        <input onChange={(e) => setFont(e.target.value)} className='w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md' type="number" step={1} value={current_component.font} />
                                                    </div>
                                                    <div className='flex gap-1 justify-start items-start'>
                                                        <span className='text-md w-[70px]'>Weight : </span>
                                                        <input onChange={(e) => setWeight(e.target.value)} className='w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md' type="number" step={100} min={100} max={900} value={current_component.weight} />
                                                    </div>

                                                    <div className='flex gap-2 flex-col justify-start items-start'>
                                                        <input onChange={(e) => setCurrentComponent({
                                                            ...current_component,
                                                            title: e.target.value
                                                        })} className='border border-gray-700 bg-transparent outline-none p-2 rounded-md' type="text" value={current_component.title} />
                                                        <button onClick={() => setText(current_component.title)} className='px-4 py-2 bg-purple-500 text-xs text-white rounded-sm'>Add</button>
                                                    </div>
                                                </>
                                            }
                                        </div>
                                    }
                                </div>
                            </div>

                        }
                    </div>

                </div>
            </div>
        </div>
    )
}


export default Main;