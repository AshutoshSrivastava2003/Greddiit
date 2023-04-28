import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"
import {Profile } from './profile.js'
import {Users} from "./users.js"
import { Requests } from "./requests.js";
import {MySubgreddiits } from './mySubgreddiits.js'
import {Subgreddiits } from './Subgreddiits.js'
import {SavedPosts} from './SavedPosts.js'
import { Reports } from "./reports.js";
export const ModSubgreddiits = (props) => {
    var storedJson = JSON.parse(localStorage.getItem('userJSON'));
    const userId = storedJson ? storedJson._id : null

    const [subgreddiits, setSubgreddiits] = useState([]);
    const { name } = useParams();
    const [subgreddiitExists, setSubgreddiitExists] = useState(true);

    const [component, setComponent] = useState('homepage');

    const handleUsers = () => {
        setComponent('Users');
        console.log(component)
    }
    const handleStats = () => {
        setComponent('Stats');
        console.log(component)
    }
    const handleRequests = () => {
        setComponent('Requests');
        console.log(component)
    }
    const handleReports = () => {
        setComponent('Reports');
        console.log(component)
    }

    useEffect(() => {
        axios.get(`/api/Greddiit/Subgreddiit/${name}`)
            .then((res) => {
                setSubgreddiits(res.data);
                setSubgreddiitExists(res.data.length > 0);
            })
            .catch((error) => {
                console.error(error);
                setSubgreddiitExists(false);
            });
    }, [name]);

    return (
        <>

            {subgreddiitExists ? (
                <>

                    {subgreddiits.length === 0 && <p>Loading...</p>}
                    {subgreddiits.length > 0 && (
                        <>
                            <h1>subgreddiit for {name}</h1>
                            {/* render subgreddiits here */}

                            <button onClick={handleUsers}>Users</button>
                            <button onClick={handleStats}>Stats</button>
                            <button onClick={handleRequests}>Requests</button>
                            <button onClick={handleReports}>Reports</button>
                            {/* <button onClick={HandleLogout}>Logout</button> */}
                            {component === 'Users' && <Users subgreddiitName={name} />}
                            {component === 'Stats' && <MySubgreddiits />}
                            {component === 'Requests' && <Requests  subgreddiitName={name}/>}
                            {component === 'Reports' && <Reports subgreddiitName={name} />}
                        </>
                    )}
                </>
            ) : (
                <p>Subgreddiit does not exist.</p>
            )}
        </>

    )
}