// const { Password } = require("@mui/icons-material");
const express = require("express")
// const mongoose=require('mongoose')
const UserRoutes = express.Router()
const User = require('../models/users.js')

UserRoutes.route('/').get(function (req, res) {
    User.find(function (err, Users) {
        if (err) {
            console.log(err);
        } else {
            res.json(Users);
        }
    });
});
UserRoutes.route('/getId/:id').get(function (req, res) {
    let id = req.params.id;
    User.findById(id, function (err, User) {
        res.json(User);
    });
    // User.findby
});
UserRoutes.route('/:email').get(function (req, res) {
    let email1 = req.params.email;
    let query = {}
    query["email"] = email1;
    User.find(query, function (err, User) {
        if (err) {
            console.log(err);
            res.status(500).send('Error retrieving user');
        } else { res.json(User); }
    });
});
UserRoutes.route('/unfollow/:id1/:id2').get(function (req, res) {
    let id1 = req.params.id1;
    let id2 = req.params.id2;
    User.findById(id1, function (err, User) {
        if (!User)
            res.status(404).send("data is not found");
        else {
            // User.numFollowers = User.numFollowers - 1
            const followers = User.followers
            const index = followers.indexOf(id2);
            // console.log(index)
            if (index !== -1) {
                followers.splice(index, 1);
            }
            User.numFollowers = followers.length
            User.followers = followers

            User.save().then(User => {
                res.json(User);
            })
                .catch(err => {
                    res.status(400).send("Update not possible");
                });
            // res.json(User)
        }
    })


        ;

});
UserRoutes.route('/unfollowed/:id1/:id2').get(function (req, res) {
    let id1 = req.params.id1;
    let id2 = req.params.id2;
    User.findById(id1, function (err, User) {
        if (!User)
            res.status(404).send("data is not found");
        else {
            // User.numFollowers = User.numFollowers - 1
            const following = User.following
            const index = following.indexOf(id2);
            // console.log(index)
            if (index !== -1) {
                following.splice(index, 1);
            }
            User.numFollowing = following.length
            User.following = following

            User.save().then(User => {
                res.json(User);
            })
                .catch(err => {
                    res.status(400).send("Update not possible");
                });
            // res.json(User)
        }
    })
})
UserRoutes.route('/follow/:id1/:id2').get(function (req, res) {
    let id1 = req.params.id1;
    let id2 = req.params.id2;
    User.findById(id1, function (err, User1) {
        if (!User1)
            res.status(404).send("data is not found");
        else {
            User.findById(id2, function (err, User2) {
                if (!User2)
                    res.status(404).send("data is not found");
                else {
                    if (User1.followers.includes(id2)) {
                        res.status(400).send("User is already following this user");
                    }
                    else {
                        var arr
                        arr = User2.following
                        arr.push(id1)
                        User2.following = arr
                        User2.save().then(User2 => {
                            // res.json(User2);
                        })
                        var arr1
                        arr1 = User1.followers
                        arr1.push(id2)
                        User1.followers = arr1
                        User1.save().then(User => {
                            res.json("followed");
                        })
                            .catch(err => {
                                res.status(400).send("Update not possible");
                            });
                    }
                }
            })

            // res.json(User)
        }
    })
})
UserRoutes.route('/Save/:postId/:userId').post(function (req, res) {
    User.findById(req.params.userId, function (err, User) {
        if (!User)
            res.status(404).send("data is not found");
        else
            if (User.saved.includes(req.params.postId)) {
                res.json('Post already saved!');
            } else {
                var Arr
                Arr = User.saved
                Arr.push(req.params.postId)
                User.saved = Arr;
                User.save().then(User => {
                    res.json(User);
                })
                    .catch(err => {
                        res.status(400).send("Update not possible");
                    });
            }
    });
});
UserRoutes.route('/update/:id').post(function (req, res) {
    User.findById(req.params.id, function (err, User) {
        if (!User)
            res.status(404).send("data is not found");
        else
            User.firstname = req.body.firstname;
        User.lastname = req.body.lastname;
        User.username = req.body.username;
        User.age = req.body.age;
        User.contact = req.body.contact;
        // User.saved=req.body.saved;
        User.save().then(User => {
            res.json(User);
        })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});
UserRoutes.route('/add').post(function (req, res) {
    let Users = new User(req.body);
    Users.save()
        .then(Users => {
            res.status(200).json({ 'User': 'User added successfully' });
        })
        .catch(err => {
            res.status(400).send('adding new User failed');
        });
});
module.exports = UserRoutes;