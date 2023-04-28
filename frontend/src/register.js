import React, { useState } from "react";
import axios from 'axios'
export const Register = (props) => {
    const [username, setUsername] = useState('')
    const [pass, setPass] = useState('')
    const [first_name, setfirstName] = useState('')
    const [last_name, setlastName] = useState('')
    const [email, setEmail] = useState('')
    const [age, setAge] = useState('')
    const [contact, setContact] = useState('')
    const Submission_Handler = (e) => {
        e.preventDefault();
        const newUser = {
            "firstname": first_name,
            "lastname": last_name,
            "username": username,
            "email": email,
            "age": age,
            "contact": contact,
            "password": pass,
            "numFollowing":"2",
            "numFollowers":"2"
        };
        axios.post('/api/Greddiit/Users/add', newUser)
        .then(res => {
            // Handle the successful response
            console.log(res.data);
            alert('Registration successful!');
            // Optionally redirect to another page
            // window.location.href = '/dashboard';
        })
        .catch(err => {
            // Handle the error response
            console.error(err);
            alert('Registration failed. Please try again.');
        });
        console.log(username)
    }
    return (
        <>
            <form onSubmit={Submission_Handler}>
                <label htmlFor="first_name" >first name</label>
                <input type="first_name" placeholder="first_name" id="first_name" name="first_name" onChange={(e) => setfirstName(e.target.value)}/>
                <label htmlFor="last_name" >last_name</label>
                <input type="last_name" placeholder="last_name" id="last_name" name="last_name" onChange={(e) => setlastName(e.target.value)}/>
                <label htmlFor="email">email</label>
                <input type="email" placeholder="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)}/>
                <label htmlFor="username">username</label>
                <input type="username" placeholder="username" id="username" name="username" onChange={(e) => setUsername(e.target.value)} />
                <label htmlFor="pass">password</label>
                <input type="pass" placeholder="********" id="pass" name="pass" onChange={(e) => setPass(e.target.value)}/>
                <label htmlFor="age">age</label>
                <input type="age" placeholder="age" id="age" name="age" onChange={(e) => setAge(e.target.value)}/>
                <label htmlFor="contact">contact</label>
                <input type="contact" placeholder="contact" id="contact" name="contact"onChange={(e) => setContact(e.target.value)} />
                <button type="submit">Register</button>
            </form>
            <button onClick={()=>props.SwitchForm('login')}>Login here</button>
        </>
    )
}
// link to navigate react 