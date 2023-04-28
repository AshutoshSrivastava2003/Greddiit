import React, { useState } from "react";
import axios from 'axios'
export const Reports = (props) => {
    var storedJson = JSON.parse(localStorage.getItem('userJSON'));
    const userId = storedJson._id

    const DisplayBlockedUsers = (e) => {
        e.preventDefault();
    }
    const DisplayUsers = (e) => {
        e.preventDefault();
        const myDiv = document.createElement("div");
        document.getElementById("reports").innerHTML = ""
        var Array = []
        axios.get(`/api/Greddiit/Subgreddiit/${props.subgreddiitName}`)
            .then((res) => {
                console.log(`/api/Greddiit/Subgreddiit/${props.subgreddiitName}`)
                Array = res.data[0].followers
                for (let i = 0; i < Array.length; i++) {
                    console.log("/api/Greddiit/Users/getId/" + Array[i])
                    axios.get("/api/Greddiit/Users/getId/" + Array[i])
                        .then((res) => {

                            const newItem = document.createElement("li");
                            // const newButton = document.createElement("button");
                            newItem.textContent = res.data.username;
                            myDiv.appendChild(newItem)
                        })
                }
            })
            .catch((error) => {
                console.error(error);
                // setSubgreddiitExists(false);
            });
            document.getElementById("reports").appendChild(myDiv);
    }
    return (
        <>
            <h3>Reports in the subgreddiit</h3>
            {/* <but></> */}
            <button onClick={DisplayUsers}>Display Reports</button>
            <div id="reports">

            </div>
            {/* <button onClick={DisplayBlockedUsers}>Display Blocked Users</button>
            <div id="blocked-users">

            </div> */}
        
        </>

    )
}