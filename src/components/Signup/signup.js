import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Loading from '../Loading/loading'
import axios from 'axios';

const Signup = () => {
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [loading, setloading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        AOS.init({
            once: true
        });
    }, [])

    const handelclick = async () => {
        var register = {
            method: 'post',
            url: "https://task-manager-eight-blond.vercel.app/users/register",
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({
                "name": name,
                "email": email,
                "password": password
            }),
        };

        await axios(register)
            .then((res) => {
                console.log(res.data.data._id)
                if (res.status === 200) {
                    localStorage.setItem('token', res.data.token)
                    setloading(false);
                    navigate('/');
                    window.location.reload();
                }
            })
            .catch((err) => {
                console.log(err.response.data.msg);
                toast.error(err.response.data.msg);
            })
    }

    return ( 
        <div className="form-container">
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setname(e.target.value)} />
            <label>Email:</label>
            <input type="text" value={email} onChange={(e) => setemail(e.target.value)} />
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setpassword(e.target.value)} />
            <button type="submit" onClick={handelclick()}>Sign Up</button>
        </div>
    )
}

export default Signup