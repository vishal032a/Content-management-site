import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

const AddProduct = () => {
    const [Files, setFiles] = useState([]);
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [blog_name, setblog_name] = useState("");
    const [description, setdescription] = useState("");

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
        const userid = JSON.parse(localStorage.getItem('user'))._id;

        const formData = new FormData();
        for (const file of Files) {
            formData.append('Files[]', file);
        }

        let names_of_files = [];
        for(let file of Files){
            names_of_files.push(file.name);
        }
        console.log(names_of_files);

        let result_up = await fetch(`http://localhost:5000/upload/${userid}`, {
            method: 'POST',
            body: formData,
        });

        result_up = await result_up.json();
        console.log(result_up);

        let result_da = await fetch('http://localhost:5000/add-content',{
            method:'post',
            body:JSON.stringify({name,email,blog_name,description,names_of_files}),
            headers:{
                "Content-Type":"application/json"
            }
        })

        result_da = await result_da.json();
        console.log(result_da);

        
    }
    return (
        <>
            <div className='add-content'>
                <h2 className='add'>Add Content</h2>
                <button className='sub_btn' onClick={handle_content}>Add</button>
                <input className='inputbox' type='text' placeholder='Enter your name' value={name} onChange={(e) => setname(e.target.value)} />
                <input className='inputbox' type='text' placeholder='Enter your email' value={email} onChange={(e) => setemail(e.target.value)} />
                <input className='inputbox' type='text' placeholder='Enter your blog name' value={blog_name} onChange={(e) => setblog_name(e.target.value)} />

                <textarea className='inputbox area' rows={10} cols={10} placeholder='enter your blog description' value={description} onChange={(e) => setdescription(e.target.value)} />
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