// const { Password } = require("@mui/icons-material");
const express = require("express")
// const mongoose=require('mongoose')
const SubgreddiitRoutes = express.Router()
const Subgreddiit = require('../models/subgreddiit.js')

SubgreddiitRoutes.route('/').get(function (req, res) {
    Subgreddiit.find(function (err, Subgreddiits) {
        if (err) {
            console.log(err);
        } else {
            res.json(Subgreddiits);
        }
    });
});
SubgreddiitRoutes.route('/getOwner/:owner').get(function (req, res) {
    let ownerid = req.params.owner;
    let query = {}
    query["owner"] = ownerid;
    Subgreddiit.find(query, function (err, Subgreddiit) {
        if (err) {
            console.log(err);
            res.status(500).send('Error retrieving user');
        } else { res.json(Subgreddiit); }
    });
});
SubgreddiitRoutes.route('/:name').get(function (req, res) {
    let names = req.params.name;
    let query = {}
    query["name"] = names;
    Subgreddiit.find(query, function (err, Subgreddiit) {
        if (err) {
            console.log(err);
            res.status(500).send('Error retrieving subgreddiit');
        } else { res.json(Subgreddiit); }
    });
});
SubgreddiitRoutes.route('/followed/:id').get(function (req, res) {
    let id_f = req.params.id;
    // let query = {}
    // query["followers"] = id_f;
    let query = { followers: { $in: [id_f] } };
    Subgreddiit.find(query, function (err, Subgreddiit) {
        if (err) {
            console.log(err);
            res.status(500).send('Error retrieving user');
        } else { res.json(Subgreddiit); }
    });
});
SubgreddiitRoutes.route('/not_followed/:id').get(function (req, res) {
    let id_f = req.params.id;
    let query = { followers: { $nin: [id_f] } };
    Subgreddiit.find(query, function (err, Subgreddiit) {
        if (err) {
            console.log(err);
            res.status(500).send('Error retrieving user');
        } else { res.json(Subgreddiit); }
    });
});
SubgreddiitRoutes.route('/update/:id').post(function (req, res) {
    Subgreddiit.findById(req.params.id, function (err, Subgreddiit) {
        if (!Subgreddiit)
            res.status(404).send("data is not found");
        else
            Subgreddiit.Subgreddiitname = req.body.Subgreddiitname;
        Subgreddiit.email = req.body.email;
        Subgreddiit.password = req.body.password;
        // Subgreddiit.created = req.body.created;
        Subgreddiit.save().then(Subgreddiit => {
            res.json('Subgreddiit updated!');
        })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});
SubgreddiitRoutes.route('/unfollow/:gredid/:userid').post(function (req, res) {
    Subgreddiit.findById(req.params.gredid, function (err, Subgreddiit) {
        if (!Subgreddiit)
            res.status(404).send("data is not found");
        else
            // Subgreddiit.Subgreddiitname = req.body.Subgreddiitname;
            // Subgreddiit.email = req.body.email;
            // Subgreddiit.password = req.body.password;
            // Subgreddiit.followers
            var updatedFollowers
            updatedFollowers = Subgreddiit.followers.filter(id => id !== req.params.userid);
        Subgreddiit.followers = updatedFollowers;
        // Subgreddiit.created = req.body.created;
        Subgreddiit.save().then(Subgreddiit => {
            res.json('Subgreddiit updated!');
        })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});
// SubgreddiitRoutes.route('/request/:gredid/:userid').post(function (req, res) {
//     Subgreddiit.findById(req.params.gredid, function (err, Subgreddiit) {
//         if (!Subgreddiit)
//             res.status(404).send("data is not found");
//         else {
//             if (Subgreddiit.requests.includes(req.params.userid)) {
//                 res.status(400).send("User has already sent request");
//             }
//             else {
//                 request1 = Subgreddiit.requests;
//                 reequest1.push(req.params.userid)
//                 Subgreddiit.requests = requst1;
//                 // Subgreddiit.created = req.body.created;
//                 Subgreddiit.save().then(Subgreddiit => {
//                     res.json('Reques sent!');
//                 })
//                     .catch(err => {
//                         res.status(400).send("Request not sent");
//                     });
//             }
//         }
//     });
// });
SubgreddiitRoutes.route('/request/:gredid/:userid').post(function (req, res) {
    Subgreddiit.findById(req.params.gredid, function (err, subgreddiit) {
        if (!subgreddiit)
            res.status(404).send("Data is not found");
        else {
            if (subgreddiit.requests.includes(req.params.userid)) {
                res.status(400).send("User has already sent a request");
            }
            else {
                var requestsArr
                requestsArr = subgreddiit.requests;
                requestsArr.push(req.params.userid)
                subgreddiit.requests = requestsArr;
                subgreddiit.save().then(subgreddiit => {
                    res.json('Request sent!');
                })
                    .catch(err => {
                        res.status(400).send("Request not sent");
                    });
            }
        }
    });
});
SubgreddiitRoutes.route('/join/:gredid/:userid').post(function (req, res) {
    Subgreddiit.findById(req.params.gredid, function (err, subgreddiit) {
        if (err) {
            console.log(err);
            res.status(500).send('Error retrieving subgreddiit');
        } else {
            var followerArr
            var requestsArr
            followerArr = subgreddiit.followers;
            followerArr.push(req.params.userid)
            subgreddiit.followers = followerArr;
            requestsArr = subgreddiit.requests.filter((item) => item !== req.params.userid);
            subgreddiit.requests = requestsArr

            subgreddiit.save().then(subgreddiit => {
                res.json('Accepting into greddiit!');
            }).catch(err => {
                res.status(400).send("Request not sent");
            });
        }

    });
});
SubgreddiitRoutes.route('/remove/:gredid/:userid').post(function (req, res) {
    Subgreddiit.findById(req.params.gredid, function (err, subgreddiit) {
        if (err) {
            console.log(err);
            res.status(500).send('Error retrieving subgreddiit');
        } else {
            // followerArr = subgreddiit.followers;
            // followerArr.push(req.params.userid)
            // subgreddiit.followers = followerArr;
            var requestsArr
            requestsArr = subgreddiit.requests.filter((item) => item !== req.params.userid);
            subgreddiit.requests = requestsArr

            subgreddiit.save().then(subgreddiit => {
                res.json('Removing from greddiit!');
            }).catch(err => {
                res.status(400).send("Request not sent");
            });
        }

    });
});

SubgreddiitRoutes.route('/delete/:id').post(function (req, res) {
    Subgreddiit.findByIdAndRemove(req.params.id, function (err, Subgreddiit) {
        if (!Subgreddiit)
            res.status(404).send("data is not found");
        else
            res.json('Subgreddiit deleted')
    });
});
// SubgreddiitRoutes.route('/followed/:id').post(function(req, res) {

//     Subgreddiit.findById(req.params.id, function(err, Subgreddiit) {
//         if (!Subgreddiit)
//             res.status(404).send("data is not found");
//         else
//             res.json('Subgreddiit deleted')
//     });
// });
SubgreddiitRoutes.route('/add').post(function (req, res) {
    let Subgreddiits = new Subgreddiit(req.body);
    Subgreddiits.save()
        .then(Subgreddiits => {
            res.status(200).json({ 'Subgreddiit': 'Subgreddiit added successfully' });
        })
        .catch(err => {
            res.status(400).send('adding new Subgreddiit failed');
        });
});
module.exports = SubgreddiitRoutes;