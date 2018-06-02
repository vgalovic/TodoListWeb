var router = require('express').Router();
var bodyParser = require('body-parser');
var todo = require('../models/task');

module.exports = router; 

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var idUpdateButton;

router
    .get('/',  (req, res) =>{
        todo.find({}).then((results) => {
            res.render('index', {tasks: results});
        });
    })

    .post('/insert', (req, res) => {
        let newDate = new Date(req.body.date); 
        var newDateWOTZ = newDate.getMonth() + "/" + newDate.getDate() + "/" + newDate.getFullYear();

        let newTask = new todo({title: req.body.title, descripcion: req.body.descripcion,date: newDate, dateWOTZ: newDateWOTZ, _id: req.body.id});

        newTask
            .save()
            .then(() => {res.redirect('/')});
    })
        
    .delete('/delete', (req, res) => {  
       var idDeleteButton = req.body.buttonDelete;
       
        todo
            .remove({_id: idDeleteButton})
            .then(() => {res.redirect('/')});
    })  

    .post('/post-updateID', (req, res) => {
        idUpdateButton = req.body.buttonUpdate;
        todo.find({}).then((all) => {
            todo.find({_id: idUpdateButton}).then((current) => { 
                res.render('index', {tasks: all, updateTask: current });
            });
        });
       
    })

    .put('/put', (req, res) => {
        let newUpdateDate = new Date(req.body.newDate);
        var newUpdateDateWOTZ =  newUpdateDate.getMonth() + "/" + newUpdateDate.getDate() + "/" + newUpdateDate.getFullYear();

        todo
            .update({_id: idUpdateButton},{title: req.body.newTitle, descripcion: req.body.newDescripcion, date: newUpdateDate, dateWOTZ: newUpdateDateWOTZ})
            .then(() => {res.redirect('/')});
    }); 