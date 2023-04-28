import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"
export const SavedPosts = (props) => {
    var storedJson = JSON.parse(localStorage.getItem('userJSON'));
    const userId = storedJson ? storedJson._id : null

    // const [subgreddiits, setSubgreddiits] = useState([]);
    // const { name } = useParams();
    const [text, setText] = useState("");
    // const [subgreddiitExists, setSubgreddiitExists] = useState(true);

    // useEffect(() => {
        // axios.get(`/api/Greddiit/Subgreddiit/${name}`)
        //     .then((res) => {
        //         setSubgreddiits(res.data);
        //         setSubgreddiitExists(res.data.length > 0);
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //         setSubgreddiitExists(false);
        //     });
    // }, [name]);
    // const handleSubmit = (event) => {
    //     event.preventDefault();



    //     const post = {
    //         text: text,
    //         posted_by: userId,
    //         posted_in: name,
    //         upvotes: 0,
    //         downvotes: 0
    //     };
    //     console.log(post)

    //     axios.post('/api/Greddiit/Posts/add', post)
    //         .then(res => {
    //             // Handle the successful response
    //             console.log(res.data);
    //             alert('Post created!');
    //             // Optionally redirect to another page
    //             // window.location.href = '/dashboard';
    //         })
            // .catch(err => {
            //     // Handle the error response
            //     console.error(err);
            //     alert('Post creation failed. Please try again.');
            // });
    // }
    const DisplaySavedPosts = (e) => {
        e.preventDefault();
        var Array = []
        document.getElementById("posts").innerHTML = ""

        axios.get('/api/Greddiit/Users/getId/' + userId)
            .then(res => {
                // Handle the successful response
                Array = res.data.saved
                console.log(Array.length)
                console.log(Array)
                for (let i = 0; i < Array.length; i++) {
                    axios.get('/api/Greddiit/Posts/getId/' + Array[i])
                        .then(res2 => {
                            // console.log('/api/Greddiit/Posts/getId/' + Array[i])
                            console.log('hello')
                            console.log(res2.data)
                            const name = document.createElement("li");

                            const break_l = document.createElement("hr");

                            const myDiv = document.createElement("div");

                            name.textContent = res2.data.text;

                            myDiv.appendChild(name);
                            myDiv.appendChild(break_l);
                            document.getElementById("posts").appendChild(myDiv);
                            // alert('Upvoted!');
                            

                        })
                        .catch(err => {
                            console.error(err);
                            alert("Couldn't get post");
                        });

                }
            })
            .catch(err => {
                // Handle the error response
                console.error(err);
                alert('Post creation failed. Please try again.');
            });
    }
    const handleSubmit = (event) => {
        event.preventDefault();
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
            <div>
                <h1>Saved Posts</h1>
                {/* <img src="./Reddit.jpeg" alt="red"></img> */}
                {/* <h3>Description:{subgreddiits[0].description}</h3> */}

                {/* <button id="myButton" onClick={renderForm}>Create Post</button> */}
                {/* <div id="createPost" style={{ display: "none" }}>
                    <form onSubmit={handleSubmit} >
                        <label htmlFor="Text Content">Post Content:</label>
                        <input type="text" id="text" value={text} onChange={(e) => setText(e.target.value)} />
                        <button type="submit">Submit Post</button>
                    </form>
                </div> */}
                <button onClick={DisplaySavedPosts}>Display Posts</button>
                <div id="posts">

                </div>
            </div>

        </>

    )
}