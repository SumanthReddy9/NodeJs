const Note = require('../models/note.model');

exports.create = (req, res) => {
    if(!req.body.content){
        return res.status(400).send({
            message: "Note content cannot be empty"
        });
    }

    const note = new Note({
        title: req.body.title || "Untitled Note",
        content: req.body.content
    });

    note.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured"
        });
    });
};

exports.findAll = (req, res) => {
    Note.find().then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some Eroor occured"
        });
    });
};

exports.findOne = (req, res) => {
    Note.find({title:req.params.title}).then(note => {
        if(!note){
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId'){
            res.status(404).send({
                message: "Note not found with this id " + req.params.noteId
            });
        }
        return res.status(500).send({
            message: "Error occured with id " + req.params.noteId
        });
    });
};

exports.update = (req, res) => {
    if(!req.body.content){
        return res.status(400).send({
            message: "Note is empty"
        });
    }
    Note.findByIdAndUpdate(req.params.noteId, {
        title: req.params.title || "Untitlted note",
        content: req.body.content
    }, {new: true}).then(note => {
        console.log("Hello");
        if(!note){
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        return res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId'){
            res.status(404).send({
                message: "Note not found with this id " + req.params.noteId
            });
        }
        return res.status(500).send({
            message: "Error occured with id " + req.params.noteId
        });
    });
};

exports.delete = (req, res) => {
    Note.findByIdAndDelete(req.params.noteId).then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send({
            message: "Note has been removed " + req.params.noteId
        });
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.kind === 'NotFound'){
            return res.status(404).send({
                message: "Note not found with id " + nreq.params.noteId
            });
        }
        return res.status(404).send({
            message: "Could not delete note with id " + req.params.noteId
        });
    });
};