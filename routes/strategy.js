const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('./cors');
const Strategies = require('../models/strategies');

const strategyRouter = express.Router();
strategyRouter.use(bodyParser.json());

strategyRouter.route('/')
.options(cors.corsWithOptions , (req, res, next) => res.statusCode = 200)
.post(cors.cors, (req, res, next) => {
    console.log('req.body' , req.body); 
    Strategies.create({Name : req.body.Name , Nodes : req.body.Nodes , Links: req.body.Links})
    .then((strategy) => {
        if(strategy){
            res.statusCode = 200;
            res.setHeader('Content-Type' , 'application/json');
            res.json(strategy);
        }
        else{
            res.statusCode = 200;
            res.setHeader('Content-Type' , 'text/plain');
            res.end('empty');
        }
        
    }, (err) =>{ console.log('errrr', err);next(err);})
    .catch((err) => { console.log('err chatch', err);next(err);});
});
strategyRouter.route('/:strategyName')
.options(cors.corsWithOptions , (req, res, next) => res.statusCode = 200)
.get(cors.corsWithOptions, (req, res, next) => {
    console.log('req.params.strategyNamr' , req.params.strategyName);
    Strategies.findOne({Name : req.params.strategyName}, (err, resp) =>{
        if(err){
            console.log('eerr' , err);
            return next(err);
        }
        else{
            console.log('resp', JSON.stringify(resp));
            res.statusCode = 200;
            res.setHeader('Content-Type' , 'application/json');
            res.json(resp);
        }
    })
    
});

module.exports = strategyRouter;