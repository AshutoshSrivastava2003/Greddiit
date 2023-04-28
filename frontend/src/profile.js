import React, { useState } from "react";
import axios from 'axios'
export const Profile = () => {
    var storedJson = JSON.parse(localStorage.getItem('userJSON'));
    const userId = storedJson._id
    const [followers,setFollowers]=useState(storedJson.followers.length)
    const [following,setFollowing]=useState(storedJson.following.length)
    const HandleFollowers = (e) => {
        e.preventDefault();
        const Array = storedJson.followers
        const myDiv = document.createElement("div");
        document.getElementById("followers-div").innerHTML = ""
        // myDiv.appendChild(<p>Followers</p>);
        // Loop over the array and create a new HTML element for each item
        Array.forEach(item => {
            const newItem = document.createElement("li");
            const newButton = document.createElement("button");
            newButton.textContent = "remove";
            axios.get('/api/Greddiit/Users/getId/' + item)
                .then(res => {
                    // Handle the successful response
                    // console.log(res.data);
                    // newItem.textContent=''
                    newItem.textContent = res.data.username;
                    // console.log(newItem);
                });
            newButton.addEventListener("click", () => {
                axios.get(('/api/Greddiit/Users/unfollow/' + userId + '/' + item))
                    .then(res => {
                        // console.log('/api/Greddiit/Users/unfollow/' + userId + '/' + item)
                        axios.get('/api/Greddiit/Users/getId/' + userId)
                            .then(res => {
                                setFollowers(res.data.followers.length)
                                setFollowing(res.data.following.length)
                                localStorage.setItem("userJSON", JSON.stringify(res.data))
                                storedJson = JSON.parse(localStorage.getItem('userJSON'))
                                console.log(storedJson)
                            })
                            .catch(err => {
                                console.error(err);
                            });
                    })
                    .catch(err => {
                        console.error(err)
                    });


            })
            myDiv.appendChild(newItem);
            myDiv.appendChild(newButton);
            // myDiv.appendChild(<button>remove</button>)
        });
        // Add the div element to the HTML document
        document.getElementById("followers-div").appendChild(myDiv);
    }
    const HandleFollowing = (e) => {
        e.preventDefault();
        const Array = storedJson.following
        const myDiv = document.createElement("div");
        document.getElementById("following-div").innerHTML = ""
        // myDiv.appendChild(<p>Followers</p>);
        // Loop over the array and create a new HTML element for each item
        Array.forEach(item => {
            const newItem = document.createElement("li");
            const newButton = document.createElement("button");
            newButton.textContent = "unfollow";
            axios.get('/api/Greddiit/Users/getId/' + item)
                .then(res => {
                    // Handle the successful response
                    // console.log(res.data);
                    // newItem.textContent=''
                    newItem.textContent = res.data.username;
                    // console.log(newItem);
                });
            newButton.addEventListener("click", () => {
                axios.get(('/api/Greddiit/Users/unfollowed/' + userId + '/' + item))
                    .then(res => {
                        console.log('/api/Greddiit/Users/unfollowed/' + userId + '/' + item)
                        axios.get('/api/Greddiit/Users/getId/' + userId)
                            .then(res => {
                                localStorage.setItem("userJSON", JSON.stringify(res.data))
                                storedJson = JSON.parse(localStorage.getItem('userJSON'))
                                console.log(storedJson)
                            })
                            .catch(err => {
                                console.error(err);
                            });
                    })
                    .catch(err => {
                        console.error(err)
                    });
            })
            myDiv.appendChild(newItem);
            myDiv.appendChild(newButton);
            // myDiv.appendChild(<button>remove</button>)
        });
        // Add the div element to the HTML document
        document.getElementById("following-div").appendChild(myDiv);
    }
    

    // console.log(storedJson)

    const [username, setUsername] = useState(storedJson.username)
    // const [pass, setPass] = useState('')
    const [first_name, setfirstName] = useState(storedJson.firstname)
    const [last_name, setlastName] = useState(storedJson.lastname)
    // const [email, setEmail] = useState('')
    const [age, setAge] = useState(storedJson.age)
    const [contact, setContact] = useState(storedJson.contact)

    // username=
    const Submission_Handler = (e) => {
        e.preventDefault();
        // setUsername(storedJson.username)
        const newUser = {
            "firstname": first_name,
            "lastname": last_name,
            "username": username,
            "age": age,
            "contact": contact,
        };
        axios.post('/api/Greddiit/Users/update/' + userId, newUser)
            .then(res => {
                // Handle the successful response
                // console.log(res.data);
                alert('Update successful!');
                // localStorage.clear()
                // localStorage.setItem("SignedIn", 'true');
                localStorage.setItem("userJSON", JSON.stringify(res.data))
                storedJson = JSON.parse(localStorage.getItem('userJSON'))
                console.log(storedJson)
                // handleStorageChange()

                // Optionally redirect to another page
                // window.location.href = '/dashboard';
            })
            .catch(err => {
                // Handle the error response
                console.error(err);
                alert('Update failed. Please try again.');
                setUsername(storedJson.username)
                setfirstName(storedJson.firstname)
                setlastName(storedJson.lastname)
                setAge(storedJson.age)
                setContact(storedJson.contact)
            });
    }

    return (
        <>
            <h1>Hello User</h1>
            <ul >
                <li >First Name : {first_name}</li>
                <li>Last Name : {last_name}</li>
                <li>Username : {username}</li>
                <li>Age : {age}</li>
                <li>Contact : {contact}</li>
            </ul>
            <form onSubmit={Submission_Handler}>
                <label htmlFor="first_name" >first name</label>
                <input type="first_name" placeholder={storedJson.firstname} id="first_name" name="first_name" onChange={(e) => setfirstName(e.target.value)} />
                <label htmlFor="last_name" >last_name</label>
                <input type="last_name" placeholder={storedJson.lastname} id="last_name" name="last_name" onChange={(e) => setlastName(e.target.value)} />
                <label htmlFor="username">username</label>
                <input type="username" placeholder={storedJson.username} id="username" name="username" onChange={(e) => setUsername(e.target.value)} />
                <label htmlFor="age">age</label>
                <input type="age" placeholder={storedJson.age} id="age" name="age" onChange={(e) => setAge(e.target.value)} />
                <label htmlFor="contact">contact</label>
                <input type="contact" placeholder={storedJson.contact} id="contact" name="contact" onChange={(e) => setContact(e.target.value)} />
                <button type="submit">Update</button>
            </form>

            <button onClick={HandleFollowers}>Followers {storedJson.followers.length}</button>
            <button onClick={HandleFollowing}>Following {storedJson.following.length}</button>
            <div>Followers:<div id="followers-div"></div></div>
            <div>Following:<div id="following-div"></div></div>
        </>

    )
}