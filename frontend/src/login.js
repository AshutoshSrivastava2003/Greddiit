
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from 'axios'
// localStorage.setItem("SignedIn",'false');
export const Login = (props) => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');


    const Submission_Handler = (e) => {
        // e.preventDefault();
        // if (username === "admin" && pass === "admin") {
        //     console.log("passed");
        //     localStorage.setItem("SignedIn", 'true');
        //     // let isSignedIn = localStorage.getItem("SignedIn")
        //     // console.log(isSignedIn);
        //     // console.log('SignedIn');
        //     navigate("/home")
        // }
        // console.log(username)
        e.preventDefault();

        let jsondata;
        // const response= await axios('api/Users/'+username)
        axios.get('/api/Greddiit/Users/' + username)
            .then(res => {
                jsondata = res.data;
                console.log(jsondata)
                // console.log(jsondata[0].password)
                // try {
                    if (jsondata[0].password === pass) {
                        console.log("pass");
                        navigate("/home");
                        localStorage.setItem("SignedIn", 'true');
                        localStorage.setItem("userJSON", JSON.stringify(jsondata[0]))
                    }
                    else{
                        alert("Incorrect email/password")
                    }
                // }
                // catch (error) {
                //     console.log("Incorrect password")
                // }
            });



    }
    return (
        <>
            <form onSubmit={Submission_Handler}>

                <label htmlFor="username">email</label>
                <input type="username" placeholder="username" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <label htmlFor="password">password</label>
                <input type="password" placeholder="********" id="password" name="password" value={pass} onChange={(e) => setPass(e.target.value)} />
                <button type="submit" >Log In</button>
            </form>
            <button onClick={() => props.SwitchForm('register')}>Register here</button>
        </>
    )
}
