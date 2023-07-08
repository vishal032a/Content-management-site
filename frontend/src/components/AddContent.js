import React, { useCallback, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { useDropzone } from 'react-dropzone'

const AddProduct = () => {
    const [Files, setFiles] = useState([]);
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [blog_name, setblog_name] = useState("");
    const [description, setdescription] = useState("");
    const[Error,setError] = useState(false);
    const navigate = useNavigate();

    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles?.length) {
            setFiles(previousFiles => [
                ...previousFiles,
                ...acceptedFiles.map(file =>
                    Object.assign(file, { preview: URL.createObjectURL(file) }))
            ])
        }
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    const removeFile = name => {
        setFiles(files => files.filter(file => file.name !== name))
    }

    const handle_content = async () => {

        if(!name || !email || !blog_name || !description || !Files){
            setError(true);
            return false;
        }
        const user_id = JSON.parse(localStorage.getItem('user'))._id;

        let names_of_files = [];
        for(let file of Files){
            names_of_files.push(file.name);
        }

        let result_da = await fetch('http://localhost:5000/add-content',{
            method:'post',
            body:JSON.stringify({name,email,blog_name,description,names_of_files}),
            headers:{
                "Content-Type":"application/json"
            }
        })

        result_da = await result_da.json();

        const content_id = result_da._id;

        const formData = new FormData();
        for (const file of Files) {
            formData.append('Files[]', file);
        }

        

        let result_up = await fetch(`http://localhost:5000/upload/${user_id}/${content_id}`, {
            method: 'POST',
            body: formData,
        });

        result_up = await result_up.json();



        if(result_da && result_up){
            navigate('/');
        }

        
    }
    return (
        <>
            <div className='add-content'>
                <h2 className='add'>Add Content</h2>
                <button className='sub_btn' onClick={handle_content}>Add</button>
                <input className='inputbox' type='text' placeholder='Enter your name' value={name} onChange={(e) => setname(e.target.value)} />
                {Error && !name && <span className='invalid-input'>Enter valid name</span>}
                <input className='inputbox' type='text' placeholder='Enter your email' value={email} onChange={(e) => setemail(e.target.value)} />
                {Error && !email && <span className='invalid-input'>Enter valid Email</span>}
                <input className='inputbox' type='text' placeholder='Enter your blog name' value={blog_name} onChange={(e) => setblog_name(e.target.value)} />
                {Error && !blog_name && <span className='invalid-input'>Enter valid blog name</span>}

                <textarea className='inputbox area' rows={10} cols={10} placeholder='enter your blog description' value={description} onChange={(e) => setdescription(e.target.value)} />
                {Error && !description && <span className='invalid-input'>Enter valid description</span>}
            </div>
            <form className='drop' encType="multipart/form-data">
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {
                        isDragActive ?
                            <p>Drop the files here ...</p> :
                            <p>Drag 'n' drop some files here, or click to select files</p>
                    }
                </div>
                {Error && Files && <span className='invalid-input'>Drop or select valid files</span>}
            </form>
            
            {/* preview */}

            <ul>
                {Files.map(file => (
                    <li className='file_list' key={file.preview}>
                        {file.name}
                        <button
                            type='button'
                            className='x_btn'
                            onClick={() => removeFile(file.name)}
                        >
                            x
                        </button>
                    </li>
                ))}
            </ul>
        </>

    )
}

export default AddProduct;