// const { Password } = require("@mui/icons-material");
const express=require("express")
// const mongoose=require('mongoose')
const PostsRoutes=express.Router()
const Posts=require('../models/posts.js')

PostsRoutes.route('/').get(function(req, res) {
    Posts.find(function(err, Postss) {
        if (err) {
            console.log(err);
        } else {
            res.json(Postss);
        }
    });
});
PostsRoutes.route('/:gredname').get(function(req, res) {
    let gred = req.params.gredname;
    let query = {}
    query["posted_in"] = gred;
    // Posts.findById(id, function(err, Posts) {
    //     res.json(Posts);
    // });
    Posts.find(query, function (err, Posts) {
        if (err) {
            console.log(err);
            res.status(500).send('Error retrieving posts');
        } else { res.json(Posts); }
    });
});
PostsRoutes.route('/getId/:id').get(function(req, res) {
    Posts.findById(req.params.id, function(err, Posts) {
        if (err) {
            console.log(err);
            res.status(500).send('Error retrieving post');
        } else { res.json(Posts); }
    });
});
PostsRoutes.route('/:id/upvote').post(function(req, res) {
    Posts.findById(req.params.id, function(err, Posts) {
        if (!Posts)
            res.status(404).send("data is not found");
        else
            // Posts.text = req.body.text;
            var upvotes;
            upvotes=Posts.upvotes;
            Posts.upvotes=upvotes+1
            Posts.save().then(Posts => {
                res.json('Post upvoted!');
            })
            .catch(err => {
                res.status(400).send("Upvote not possible");
            });
    });
});
PostsRoutes.route('/:id/downvote').post(function(req, res) {
    Posts.findById(req.params.id, function(err, Posts) {
        if (!Posts)
            res.status(404).send("data is not found");
        else
            // Posts.text = req.body.text;
            var downvotes;
            downvotes=Posts.downvotes;
            Posts.downvotes=downvotes+1
            Posts.save().then(Posts => {
                res.json('Post upvoted!');
            })
            .catch(err => {
                res.status(400).send("Upvote not possible");
            });
    });
});

PostsRoutes.route('/add').post(function(req, res) {
    let Postss = new Posts(req.body);
    Postss.save()
        .then(Postss => {
            res.status(200).json({'Posts': 'Posts added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new Posts failed');
        });
});
module.exports=PostsRoutes;