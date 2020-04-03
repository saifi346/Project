const express = require('express');
const router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

const { Employee } = require('../models/employee');

router.get('/', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) {
            res.send(docs);
        }
        else {
            console.log('Error in Retreiving Employees: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No record with given id: ${req.params.id}`);
    }
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);
        }
        else {
            console.log('Error in Retreiving Employee: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

router.post('/', (req, res) => {
    var emp = new Employee({
        empId: req.body.empId,
        name: req.body.name,
        designation: req.body.designation,
        salary: req.body.salary
    });
    emp.save((err, doc) => {
        if (!err) {
            res.json({
                "message": "published successfully",
                "result": doc
            });
        }
        else {
            console.log('Error in storing Employee: ' + JSON.stringify(err, undefined, 2));
        }
    })
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No record with given id: ${req.params.id}`);
    }

    var emp = {
        empId: req.body.empId,
        name: req.body.name,
        designation: req.body.designation,
        salary: req.body.salary
    };
    Employee.findByIdAndUpdate(req.params.id ,{ $set: emp }, { new: true }, (err, doc) => {
        if (!err) {
            res.send(doc);
        }
        else {
            console.log('Error in updating Employee: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No record with given id: ${req.params.id}`);
    }
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);
        }
        else {
            console.log('Error in Deleting Employee: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

module.exports = router;