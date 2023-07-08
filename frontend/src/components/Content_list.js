import React, { useEffect, useState } from 'react'

const ContentList = () => {
    const [Content, setContent] = useState([]);

    const auth = localStorage.getItem('user');

    const userid = JSON.parse(auth)._id;

    useEffect(() => {
        getContent();
    }, [])

    const getContent = async () => {
        let result = await fetch('http://localhost:5000/content')

        result = await result.json();

        setContent(result);
    }

    const deletecontent = async (content_id)=>{
        let result = await fetch(`http://localhost:5000/delete/${userid}/${content_id}`,{
            method:'delete'
        })

        result = await result.json();
        if(result){
            getContent();
        }
    }
    return (
            <div>
                <h3>Content List</h3>
                {
                    Content.length?(
                        Content.map((item) =>
                        <ul className='content_list'>
                            <li>id: {item._id}</li>
                            <li>name : {item.name}</li>
                            <li>email : {item.email}</li>
                            <li>blog name : {item.blog_name}</li>
                            <li>description : {item.blog_description}</li>
                            <li>Files : {
                                item.names_of_files.map(item=>
                                    <ul>
                                        <li>{item}</li>
                                    </ul>
                                    )
                                }
                            </li>
                            <li className='del_item'><button className='del_btn' onClick={()=>deletecontent(item._id)}>Delete</button></li>
                        </ul>
                        )
                    ):(<h1>Content list is empty</h1>)
                    
                }

            </div>

    )
}

export default ContentList;