import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"
import { SearchBar } from "./searchbar.js"
import { Navigate, useNavigate } from "react-router-dom"

export const Subgreddiits = (props) => {
    const navigate = useNavigate()
    const [data, setData] = useState([]);
    const [name, setName] = useState("asc");
    // var data=[]
    const [searchResults, setSearchResults] = useState([]);
    var storedJson = JSON.parse(localStorage.getItem('userJSON'));
    const userId = storedJson ? storedJson._id : null
    // var Array=[]
    const sortName = () => {
        if (name == "asc") setName("desc");
        else {
            setName("asc")
        }
        // console.log(component)
    }
    const DisplaySubgreddiits = (e) => {
        e.preventDefault();

        var Array = []
        document.getElementById("joinedSubgreddiits").innerHTML = ""

        axios.get('/api/Greddiit/Subgreddiit/followed/' + userId)
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
                    button.textContent = "Leave Subgreddiit";
                    // if (userId != Array[i].owner) {

                        button.onclick = function () {
                            // Handle the button click event here
                            console.log("Leave subgreddiit" + Array[i].name);
                            axios.post('/api/Greddiit/Subgreddiit/unfollow/' + Array[i]._id + '/' + userId)
                                .then(res => {
                                    console.log(res.data);
                                    alert('Subgreddiit unfollowed!');

                                })
                                .catch(err => {
                                    console.error(err);
                                    alert('Subgreddit deletion failed. Please try again.');
                                });

                        };
                    // }
                    const button2 = document.createElement("button");
                    button2.textContent = "Subgreddiit posts";
                    button2.onclick = function () {
                        // Handle the button click event here
                        console.log("Open subgreddiit" + Array[i].name);
                        navigate('/subgreddiit/'+Array[i].name)
                    };
                    myDiv.appendChild(button);
                    myDiv.appendChild(button2);

                    myDiv.appendChild(break_l);

                    document.getElementById("joinedSubgreddiits").appendChild(myDiv);
                }
            });

    }
    const DisplayRemSubgreddiits = (e) => {
        e.preventDefault();

        var Array = []
        document.getElementById("remSubgreddiits").innerHTML = ""

        axios.get('/api/Greddiit/Subgreddiit/not_followed/' + userId)
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
                    // const button = document.createElement("button");
                    // button.textContent = "Leave Subgreddiit";
                    // // if (userId != Array[i].owner) {

                    //     button.onclick = function () {
                    //         // Handle the button click event here
                    //         console.log("Leave subgreddiit" + Array[i].name);
                            // axios.post('/api/Greddiit/Subgreddiit/unfollow/' + Array[i]._id + '/' + userId)
                            //     .then(res => {
                            //         console.log(res.data);
                            //         alert('Subgreddiit unfollowed!');

                            //     })
                            //     .catch(err => {
                            //         console.error(err);
                            //         alert('Subgreddit deletion failed. Please try again.');
                            //     });

                    //     };
                    // // }
                    const button = document.createElement("button");
                    button.textContent = "Join";
                    button.onclick = function () {
                        // Handle the button click event here
                        console.log("Join subgreddiit" + Array[i].name);
                        axios.post('/api/Greddiit/Subgreddiit/request/' + Array[i]._id + '/' + userId)
                                .then(res => {
                                    console.log(res.data);
                                    alert('request sent!');

                                })
                                .catch(err => {
                                    console.error(err);
                                    alert('Subgreddit req failed. Please try again.');
                                });
                        // navigate('/subgreddiit/'+Array[i].name)

                    };
                    myDiv.appendChild(button);
                    // myDiv.appendChild(button2);

                    myDiv.appendChild(break_l);

                    document.getElementById("remSubgreddiits").appendChild(myDiv);
                }
            });

    }
    useEffect(() => {
        axios.get(`/api/Greddiit/Subgreddiit`)
            .then((res) => {
                // Array=res.data
                setData(res.data.map((item) => item.name));
                // setData(res.data)
            })
            .catch((error) => {
                console.error(error);

            });
        // for (let i = 0; i < Array.length; i++) {
        //     data.push(Array[i].name)
        // }
        // console.log(data)
    }, []);
    console.log(data)


    return (
        <>
            <h3>Search Subgreddiits </h3>

            <div>
                <SearchBar data={data} setSearchResults={setSearchResults} />
                <button onClick={sortName}>Name</button>
                {/* <button onClick={sortFollowers}>Followers</button>
                <button onClick={sortdate}>Creation Date</button> */}
                {name == "desc" && searchResults
                    .sort((a, b) => b.localeCompare(a)).map(result => (
                        <div key={result}>{result}</div>
                    ))}
                {name == "asc" && searchResults
                    .sort((a, b) => a.localeCompare(b)).map(result => (
                        <div key={result}>{result}</div>
                    ))}
            </div>
            <h3>Joined Subgreddiits </h3>
            <button onClick={DisplaySubgreddiits}>Joined Subgreddiits</button>
            <div id="joinedSubgreddiits">
            </div>
            <h3>Remaining Subgreddiits </h3>
            <button onClick={DisplayRemSubgreddiits}>Remaining Subgreddiits</button>
            <div id="remSubgreddiits">
            </div>
        </>


    )
}