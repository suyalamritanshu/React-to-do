import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import './login.css'; // custom CSS file
import toast, { Toaster } from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Loading from '../Loading/loading'



const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
    const [loading, setloading] = useState(false);


    const navigate = useNavigate();


    useEffect(() => {
        AOS.init({
            once: true

        });
    }, [])

    const handelclick = async () => {
        var login = {
            method: 'post',
            url: "https://task-manager-eight-blond.vercel.app/users/login",
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({
                "email": email,
                "password": password
            }),
        };

        await axios(login)
            .then(async (res) => {
                localStorage.setItem('token', res.data.token)
                setloading(false);
            })
            .catch((err) => {
                console.log(err);
                setloading(false);
                toast.error("Username or password is incorrect");
            })

    }


    return (
        <div className="form-container">

            <label>Email:</label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setpassword(e.target.value)} />
            <button type="submit" onClick={handelclick()}>Login</button>

        </div>



    )
}

export default Login