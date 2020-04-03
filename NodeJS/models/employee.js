const mongoose = require('mongoose');

var Employee = mongoose.model('Employee', {
    empId : { type: Number},
    name : {type: String},
    designation : {type : String},
    salary : {type : Number}
});

module.exports = { Employee } ;