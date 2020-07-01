import React, { useState } from 'react'

const review = () => {
    const [form,setForm] = useState({
        name : "",
        rev : ''
    })
    return (
        <form action="">
            <input 
            type="text"
            placeholder="Your name!"
            value={}
            onChange={}
            />
            <textarea 
            rows="4"
            value={}
            onChange={}/>
        </form>
    )
}

export default review
