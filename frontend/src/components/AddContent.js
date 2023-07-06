import React from 'react'

const AddProduct = ()=>{
    return(
        <div className='add-content'>
            <h2 className='add'>Add Content</h2>
            <button className='sub_btn'>Submit</button>
            <input className='inputbox' type='text' placeholder='Enter your name'/>
            <input className='inputbox' type='text' placeholder='Enter your email'/>
            <input className='inputbox' type='text' placeholder='Enter your blog name'/>

            <textarea className='inputbox area' rows={10} cols={10} placeholder='enter your blog description' resize/>
        </div>
    )
}

export default AddProduct;