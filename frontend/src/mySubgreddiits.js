import React, { useState } from "react";
import axios from "axios"
import { Navigate, useNavigate } from "react-router-dom";
export const MySubgreddiits = () => {
    const navigate=useNavigate()
    const storedJson = JSON.parse(localStorage.getItem('userJSON'));
    const userId = storedJson._id

    const [name, setName] = useState("");
    const [tags, setTags] = useState("");
    const [description, setDescription] = useState("");
    const [banned, setBanned] = useState("");

    const DisplaySubgreddiits = (e) => {
        e.preventDefault();

        var Array = []
        document.getElementById("mySubgreddiits").innerHTML = ""

        axios.get('/api/Greddiit/Subgreddiit/getOwner/' + userId)
            .then(res => {
                // Handle the successful response
                Array = res.data
                // console.log(Array.length)
                for (let i = 0; i < Array.length; i++) {

                    const name = document.createElement("li");
                    const name_l = document.createElement("li");
                    name_l.textContent = "Name :"
                    const description = document.createElement("li");
                    const description_l = document.createElement("li");
                    description_l.textContent = "Description :"
                    const numPeople = document.createElement("li");
                    const numPeople_l = document.createElement("li");
                    numPeople_l.textContent = "Number of people in the subGreddiit :"
                    const numPosts = document.createElement("li");
                    const numPosts_l = document.createElement("li");
                    numPosts_l.textContent = "Number of posts in the subGreddiit :"
                    const banned = document.createElement("li");
                    const banned_l = document.createElement("li");
                    banned_l.textContent = "Banned words :"

                    const break_l = document.createElement("hr");

                    const myDiv = document.createElement("div");

                    name.textContent = Array[i].name;
                    description.textContent = Array[i].description;
                    numPeople.textContent = Array[i].followers.length;
                    numPosts.textContent = Array[i].posts.length;
                    banned.textContent = Array[i].banned_keywords;

                    myDiv.appendChild(name_l)
                    myDiv.appendChild(name);
                    myDiv.appendChild(description_l)
                    myDiv.appendChild(description);
                    myDiv.appendChild(numPeople_l)
                    myDiv.appendChild(numPeople);
                    myDiv.appendChild(numPosts_l)
                    myDiv.appendChild(numPosts);
                    myDiv.appendChild(banned_l)
                    myDiv.appendChild(banned);


                    const button = document.createElement("button");
                    button.textContent = "Delete Subgreddiit";
                    button.onclick = function () {
                        // Handle the button click event here
                        console.log("Delete subgreddiit" + Array[i].name);
                        axios.post('/api/Greddiit/Subgreddiit/delete/'+ Array[i]._id)
                            .then(res => {
                                console.log(res.data);
                                alert('Subgreddiit deleted!');
                            
                            })
                            .catch(err => {
                                console.error(err);
                                alert('Subgreddit deletion failed. Please try again.');
                            });
                       
                    };
                    const button2 = document.createElement("button");
                    button2.textContent = "Open Subgreddiit";
                    button2.onclick = function () {
                        // Handle the button click event here
                        console.log("Open subgreddiit" + Array[i].name);
                        navigate('/mod/subgreddiit/'+Array[i].name)
                    };
                    myDiv.appendChild(button);
                    myDiv.appendChild(button2);

                    myDiv.appendChild(break_l);

                    document.getElementById("mySubgreddiits").appendChild(myDiv);
                }
            });

    }
    const handleSubmit = (event) => {
        event.preventDefault();

        const tagsArr = tags.split(",");

        console.log(tagsArr);
        const banArr = banned.split(",");
        console.log(banArr);

        const gred = {
            name: name,
            description: description,
            tags: tagsArr,
            banned_keywords: banArr,
            owner: userId,
            followers: [userId]
        };
        console.log(gred)

        axios.post('/api/Greddiit/Subgreddiit/add', gred)
            .then(res => {
                // Handle the successful response
                console.log(res.data);
                alert('Subgreddiit created!');
                // Optionally redirect to another page
                // window.location.href = '/dashboard';
            })
            .catch(err => {
                // Handle the error response
                console.error(err);
                alert('Subgreddit creation failed. Please try again.');
            });
    }
    function renderForm() {
        const cnt = document.getElementById("createSubgreddit");
        if (cnt.style.display === "none") {
            cnt.style.display = "block";
        } else {
            cnt.style.display = "none";
        }
    }

    return (
        <>
            <h1>These are your Subgreddiits</h1>
            <button id="myButton" onClick={renderForm}>Create Subgreddiits</button>
            <div id="createSubgreddit" style={{ display: "none" }}>
                <form onSubmit={handleSubmit} >
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    <label htmlFor="description">Description:</label>
                    <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    <label htmlFor="tags">Tags:</label>
                    <input type="tags" id="tags" placeholder="in csv no spaces" value={tags} onChange={(e) => setTags(e.target.value)} />
                    <label htmlFor="banned">Banned:</label>
                    <input type="banned" id="banned" placeholder="in csv no spaces" value={banned} onChange={(e) => setBanned(e.target.value)} />
                    <button type="submit">Submit</button>
                </form>
            </div>
            <button onClick={DisplaySubgreddiits}>My Subgreddiits</button>
            <div id="mySubgreddiits">

            </div>



        </>

    )
}