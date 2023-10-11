import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Loading from '../Loading/loading'
import axios from 'axios';
import './signup.css';

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
        setloading(true);
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
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('id', res.data.user._id)
                setloading(false);
                navigate('/');
            })
            .catch((err) => {
                setloading(false);
                console.log(err);
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
            <button onClick={() => handelclick()}>Sign Up</button>
            {loading && <Loading />}
        </div>
    )
}

export default Signup