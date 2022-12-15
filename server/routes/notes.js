var express = require('express');
var router = express.Router();
var sequenceGenerator = require('./sequenceGenerator');

const Note = require('../models/note');

function returnError(res, error) {
    res.status(500).json({
      message: 'An error occurred',
      error: error
    });
  }
  

router.get('/', (req, res, next) => {
    Note.find()
      .then(notes => {
        res.status(200).json({
          message:'Notes successfully fetched',
          notes: notes
        });
      })
      .catch(error => {
        returnError(res, error);
      });
    }
  );

router.post('/', (req, res, next) => {
    const maxNoteId = sequenceGenerator.nextId("notes");
  
    const note = new Note({
      id: maxNoteId,
      name: req.body.name,
      subject: req.body.subject,
      noteText: req.body.noteText
    });
  
    note.save()
      .then(createdNote => {
        res.status(201).json({
          message: 'Note added successfully',
          note: createdNote
        });
      })
      .catch(error => {
        returnError(res, error);
      });
  });

  router.put('/:id', (req, res, next) => {
    Note.findOne({ id: req.params.id })
      .then(note => {
        Note.name = req.body.name;
        Note.subject = req.body.subject;
        Note.noteText = req.body.noteText;
  
        Note.updateOne({ id: req.params.id }, note)
          .then(result => {
            res.status(204).json({
              message: 'Note updated successfully'
            })
          })
          .catch(error => {
            returnError(res, error);
          });
      })
      .catch(error => {
        res.status(500).json({
          message: 'Note not found.',
          error: { note: 'Note not found'}
        });
      });
  });

  router.delete("/:id", (req, res, next) => {
    Note.findOne({ id: req.params.id })
      .then(note => {
        Note.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({ message: "Note deleted successfully" });
          })
          .catch(error => {
            returnError(res, error);
          })
      })
      .catch(error => {
        returnError(res, error);
      });
  });

module.exports = router; 