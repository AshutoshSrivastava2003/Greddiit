import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"
export const PostSubgreddiits = (props) => {
    var storedJson = JSON.parse(localStorage.getItem('userJSON'));
    const userId = storedJson ? storedJson._id : null

    const [subgreddiits, setSubgreddiits] = useState([]);
    const { name } = useParams();
    const [text, setText] = useState("");
    const [subgreddiitExists, setSubgreddiitExists] = useState(true);

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
    const handleSubmit = (event) => {
        event.preventDefault();

        const post = {
            text: text,
            posted_by: userId,
            posted_in: name,
            upvotes: 0,
            downvotes: 0
        };
        console.log(post)

        axios.post('/api/Greddiit/Posts/add', post)
            .then(res => {
                // Handle the successful response
                console.log(res.data);
                alert('Post created!');
                // Optionally redirect to another page
                // window.location.href = '/dashboard';
            })
            .catch(err => {
                // Handle the error response
                console.error(err);
                alert('Post creation failed. Please try again.');
            });
    }
    const DisplayPosts = (e) => {
        e.preventDefault();
        var Array = []
        document.getElementById("posts").innerHTML = ""

        axios.get('/api/Greddiit/Posts/' + name)
            .then(res => {
                // Handle the successful response
                Array = res.data
                // console.log(Array.length)
                for (let i = 0; i < Array.length; i++) {

                    const name = document.createElement("li");
                    
                    const break_l = document.createElement("hr");

                    const myDiv = document.createElement("div");

                    name.textContent = Array[i].text;

                    myDiv.appendChild(name);


                    const button = document.createElement("button");
                    button.textContent = "Upvote";
                    button.onclick = function () {
                        axios.post('/api/Greddiit/Posts/' + Array[i]._id+'/upvote')
                            .then(res => {
                                console.log(res.data);
                                alert('Upvoted!');

                            })
                            .catch(err => {
                                console.error(err);
                                alert("Couldn't upvote");
                            });
                    };
                    const button2 = document.createElement("button");
                    button2.textContent = "Downvote";
                    button2.onclick = function () {
                        // Handle the button click event here
                        axios.post('/api/Greddiit/Posts/' + Array[i]._id+'/downvote')
                            .then(res => {
                                console.log(res.data);
                                alert('Downvoted!');

                            })
                            .catch(err => {
                                console.error(err);
                                alert("Couldn't downvote");
                            });
                    };
                    const button3 = document.createElement("button");
                    button3.textContent = "Save";
                    button3.onclick = function () {
                        // Handle the button click event here
                        axios.post('/api/Greddiit/Users/Save/' + Array[i]._id+'/'+userId)
                            .then(res => {
                                console.log(res.data);
                                alert('Post Saved!');

                            })
                            .catch(err => {
                                console.error(err);
                                alert("Couldn't save post");
                            });
                    };
                    const button4 = document.createElement("button");
                    button4.textContent = "Follow";
                    button4.onclick = function () {
                        // Handle the button click event here
                        axios.get('/api/Greddiit/Users/follow/' + Array[i].posted_by+'/'+userId)
                            .then(res => {
                                console.log(res.data);
                                alert('Followed!');

                            })
                            .catch(err => {
                                console.error(err);
                                alert("Couldn't follow");
                            });
                    };
                    myDiv.appendChild(button);
                    myDiv.appendChild(button2);
                    myDiv.appendChild(button3);
                    myDiv.appendChild(button4);
                    myDiv.appendChild(break_l);

                    document.getElementById("posts").appendChild(myDiv);
                }
            });

    }
    function renderForm() {
        const cnt = document.getElementById("createPost");
        if (cnt.style.display === "none") {
            cnt.style.display = "block";
        } else {
            cnt.style.display = "none";
        }
    }
    return (
        <>

            {subgreddiitExists ? (
                <>

                    {subgreddiits.length === 0 && <p>Loading...</p>}
                    {subgreddiits.length > 0 && (
                        <div>
                            <h1>user side subgreddiit for {name}</h1>
                            <img src="./Reddit.jpeg" alt="red"></img>
                            <h3>Description:{subgreddiits[0].description}</h3>

                            <button id="myButton" onClick={renderForm}>Create Post</button>
                            <div id="createPost" style={{ display: "none" }}>
                                <form onSubmit={handleSubmit} >
                                    <label htmlFor="Text Content">Post Content:</label>
                                    <input type="text" id="text" value={text} onChange={(e) => setText(e.target.value)} />
                                    <button type="submit">Submit Post</button>
                                </form>
                            </div>
                            <button onClick={DisplayPosts}>Display Posts</button>
                            <div id="posts">

                            </div>
                        </div>

                    )}
                </>
            ) : (
                <p>Subgreddiit does not exist.</p>
            )}
        </>

    )
}