const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nodeSchema = new Schema({
    id : {
        type : String,
        required: true,
        
    },
    name : {
        type : String,
        required : true
    },
    NodeX  : {
        type : Number ,
        required : true,
    },
    NodeY : {
        type : Number,
        required : true , 
    }
} );

const linkSchema = new Schema ({
    source : {
        type : String,
        required:true
    },
    target : {
        type : String,
        required : true
    } 
});

const strategySchema = new Schema({
    Name : {
        type : String , 
        required: true,
        unique : true
    },
    Nodes : [nodeSchema] ,
    Links : [linkSchema]
}, {timestamps : true});

module.exports = mongoose.model('Strategy' , strategySchema);