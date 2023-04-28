// const { Password } = require("@mui/icons-material");
const express=require("express")
// const mongoose=require('mongoose')
const ReportsRoutes=express.Router()
const Reports=require('../models/report.js')

ReportsRoutes.route('/').get(function(req, res) {
    Reports.find(function(err, Reportss) {
        if (err) {
            console.log(err);
        } else {
            res.json(Reportss);
        }
    });
});
ReportsRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Reports.findById(id, function(err, Reports) {
        res.json(Reports);
    });
});
ReportsRoutes.route('/update/:id').post(function(req, res) {
    Reports.findById(req.params.id, function(err, Reports) {
        if (!Reports)
            res.status(404).send("data is not found");
        else
            Reports.Reportsname = req.body.Reportsname;
            Reports.email = req.body.email;
            Reports.password = req.body.password;
            // Reports.created = req.body.created;
            Reports.save().then(Reports => {
                res.json('Reports updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});
ReportsRoutes.route('/add').post(function(req, res) {
    let Reportss = new Reports(req.body);
    Reportss.save()
        .then(Reportss => {
            res.status(200).json({'Reports': 'Reports added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new Reports failed');
        });
});
module.exports=ReportsRoutes;