var express = require('express');
var router = express.Router();

const notes = require('../controllers/note.controllers.js');


/**
 * @swagger
 * /notes:
 *   get:
 *     tags:
 *       - notes
 *     description: Returns all notes
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of notes
 *         schema:
 *              properties:
 *                  title:
 *                      type: string
 *                  content:
 *                      type: string
 *                  createdAt:
 *                      type: string
 *                  updatedAt:
 *                      type: string
 */
router.get('/notes', notes.findAll);

/**
 * @swagger
 * /notes/{title}:
 *   get:
 *     tags:
 *       - notes
 *     description: Returns a single notes
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: title
 *         description: Name
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A single note
 *         schema:
 *              properties:
 *                  title:
 *                      type: string
 *                  content:
 *                      type: string
 *                  createdAt:
 *                      type: string
 *                  updatedAt:
 *                      type: string
 */

router.get('/notes/:title', notes.findOne);

/**
 * @swagger
 * /notes:
 *   post:
 *     tags:
 *       - notes
 *     description: Creates a new note
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: note
 *         description: New object
 *         in: body
 *         required: true
 *         schema:
 *              properties:
 *                  title:
 *                      type: string
 *                  content:
 *                      type: string
 *     responses:
 *          200:
 *            description: Successfully created
 *            schema:
 *                 properties:
 *                     title:
 *                         type: string
 *                     content:
 *                         type: string
 *                     createdAt:
 *                         type: string
 *                     updatedAt:
 *                         type: string
 */
router.post('/notes', notes.create);

/**
 * @swagger
 * /notes/{_id}:
 *   put:
 *     tags:
 *       - notes
 *     description: Creates a new note
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: _id
 *         description: ID
 *         in: path
 *         required: true
 *         type: string
 *       - name: note
 *         description: New object
 *         in: body
 *         required: true
 *         schema:
 *              properties:
 *                  title:
 *                      type: string
 *                  content:
 *                      type: string
 *     responses:
 *       200:
 *         description: Successfully updated
 */
router.put('/notes/:noteId', notes.update);

/**
 * @swagger
 * /notes/{_id}:
 *   delete:
 *     tags:
 *       - notes
 *     description: Deletes a single note
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: _id
 *         description: note id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully deleted
 */

router.delete('/notes/:noteId', notes.delete);

module.exports = router;