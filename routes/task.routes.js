const {Router} = require('express');
const Task = require('../models/Task');
//const authMiddleware = require('../middleware/auth.middleware');

const router = Router();

router.post('/add', async (req, res) => {
    const {title, description, priority, dueDate} = req.body;
    const task = new Task({
        title,
        description,
        priority,
        dueDate,
        ownerId: req.user.userId
    });
    try {
        const existing = await Task.findOne({ title });

        if (existing) {
            return res.json({ task: existing });
        }
        
        await task.save();
        res.status(200).json({task});
    } catch (err) {
        res.status(500).json({
            message: 'Something went wrong, try again',
        });
    }
});

router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find({ ownerId: req.user.userId});
        res.json(tasks);
    } catch (err) {
        res.status(500).json({
            message: 'Something went wrong, try again',
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        res.json(task);
    } catch (err) {
        res.status(500).json({
            message: 'Something went wrong, try again',
        });
    }
});

router.post('/remove', async (req, res) => {
    try {
        await Task.deleteOne({ _id: req.body.id });
        res.status(200).json({
            message: 'Successfully deleted one task',
        });
    } catch (err) {
        res.status(500).json({
            message: 'Something went wrong, try again',
        });
    }
});

router.post('/edit', async (req, res) => {
    try {
        const { id } = req.body;
        delete req.body.id; 
        await Task.findByIdAndUpdate(id, req.body);
        res.status(200).json({
            message: 'Successfully edited task',
        });
    } catch (err) {
        res.status(500).json({
            message: 'Something went wrong, try again',
        });
    }
});

router.post('/edit/isDone', async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.body.id });
        task.isDone = !task.isDone;
        await task.save();
        res.status(200).json({
            message: 'Successfully edited task',
        });
    } catch (err) {
        res.status(500).json({
            message: 'Something went wrong, try again',
        });
    }
});

module.exports = router;
