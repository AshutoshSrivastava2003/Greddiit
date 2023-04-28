import React, { useState } from "react";
import axios from 'axios'
export const Requests = (props) => {
    var storedJson = JSON.parse(localStorage.getItem('userJSON'));
    const userId = storedJson._id

    const DisplayRequests = (e) => {
        e.preventDefault();
        const myDiv = document.createElement("div");
        document.getElementById("requests").innerHTML = ""
        var Array = []
        axios.get(`/api/Greddiit/Subgreddiit/${props.subgreddiitName}`)
            .then((res) => {
                // console.log(`/api/Greddiit/Subgreddiit/${props.subgreddiitName}`)
                Array = res.data[0].requests
                for (let i = 0; i < Array.length; i++) {
                    // console.log("/api/Greddiit/Users/getId/" + Array[i])
                    axios.get("/api/Greddiit/Users/getId/" + Array[i])
                        .then((res) => {

                            // const newItem = document.createElement("li");
                            const line = document.createElement("hr");
                            // const newButton = document.createElement("button");
                            const name = document.createElement("li");
                            name.textContent = res.data.firstname
                            const name_l = document.createElement("li");
                            name_l.textContent = "First Name :"
                            const username = document.createElement("li");
                            username.textContent = res.data.username
                            const description_l = document.createElement("li");
                            description_l.textContent = "Username :"
                            myDiv.appendChild(name_l)
                            myDiv.appendChild(name);
                            myDiv.appendChild(description_l)
                            myDiv.appendChild(username);

                            var gredid;
                            axios.get(`/api/Greddiit/Subgreddiit/${props.subgreddiitName}`)
                                .then((res) => { gredid = res.data[0]._id })

                            const button = document.createElement("button");
                            button.textContent = "Accept";
                            button.onclick = function () {

                                axios.post("/api/Greddiit/Subgreddiit/join/" + gredid + "/" + res.data._id)
                                    .then((res) => {
                                        alert('Accepted');
                                    })
                                    .catch(err => {
                                        // Handle the error response
                                        console.error(err);
                                        alert('Failed');
                                    });
                            };
                            const button2 = document.createElement("button");
                            button2.textContent = "Decline";
                            button2.onclick = function () {
                                axios.post("/api/Greddiit/Subgreddiit/remove/" + gredid + "/" + res.data._id)
                                    .then((res) => {
                                        alert('Rejected');
                                    })
                                    .catch(err => {
                                        // Handle the error response
                                        console.error(err);
                                        alert('Failed');
                                    });

                            };
                            myDiv.appendChild(button)
                            myDiv.appendChild(button2)
                            myDiv.appendChild(line)
                        })
                }
            })
            .catch((error) => {
                console.error(error);
                // setSubgreddiitExists(false);
            });
        document.getElementById("requests").appendChild(myDiv);
    }
    return (
        <>
            <h3>Requests to join the subgreddiit</h3>
            <button onClick={DisplayRequests}>Display Requests</button>
            <div id="requests">

            </div>
        </>

    )
}