import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {Profile } from './profile.js'
import {MySubgreddiits } from './mySubgreddiits.js'
import {Subgreddiits } from './Subgreddiits.js'
import {SavedPosts} from './SavedPosts.js'
import "./home.css"
export const Home = () => {
    const navigate = useNavigate();
    const [component, setComponent] = useState('homepage');

    const handleProfile = () => {
        setComponent('profile');
        console.log(component)
    }
    const handlemySubgreddiits = () => {
        setComponent('mySubgreddiits');
        console.log(component)
    }
    const handleSubgreddiits = () => {
        setComponent('Subgreddiits');
        console.log(component)
    }
    const handlePosts = () => {
        setComponent('Saved Posts');
        console.log(component)
    }
    // const { isOpen, onOpen, onClose } = useDisclosure()
    const HandleLogout = (e) => {
        e.preventDefault();
        localStorage.clear();
        navigate('/auth');
        // const storedJson = JSON.parse(localStorage.getItem('userJSON'));
        // console.log(storedJson);
    }

    return (
        <>
            <h1>Greddiit</h1>
            <button onClick={handleProfile}>Profile</button>
            <button onClick={handlemySubgreddiits}>My Subgreddiits</button>
            <button onClick={handleSubgreddiits}>Subgreddiits</button>
            <button onClick={handlePosts}>Saved Posts</button>
            <button onClick={HandleLogout}>Logout</button>
            {component === 'profile' && <Profile />}
            {component === 'mySubgreddiits' && <MySubgreddiits />}
            {component === 'Subgreddiits' && <Subgreddiits />}
            {component === 'Saved Posts' && <SavedPosts />}
            {/* {component === 'Subgreddiits' && <Subgreddiits />} */}

        </>

    )
}