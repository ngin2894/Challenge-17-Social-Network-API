import { Thought, User } from '../models/index.js';

export const getAllThoughts = async (req, res) => {
    try {
        const thoughts = await Thought.find().sort({ createdAt: -1 });
        res.json(thoughts);
    } catch (err) {
        res.status(400).json(err);
    }
};

export const getThought = async (req, res) => {
    try {
        const thought = await Thought.findById(params.thoughtId);
        if (!thought) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        } else {
            res.json(thought);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

export const createThought = async (req, res) => {
    try {
        const thought = await Thought.create(req.body);
        if (req.body.userId) {
            await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: thought._id } },
                { new: true }
            ); 
        }
        res.json(thought);
    }
    catch (err) {
        res.status(400).json(err);
    }
};

export const updateThought = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true } 
        );
        if (!thought) {
            res.status(404).json({ message: 'No thought found with this id'});
        } else {
            res.json(thought);
        }
        } catch (err) {
            res.status(500).json(err);
        }
    };

export const deleteThought = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndDelete({ _id: req.params.thoughtId });
        if (!thought) {
            res.status(404).json({ message: 'No thought found with this id' });
            return;
        }
        if (thought.userId) {
            await User.findOneAndUpdate(
                { _id: thought.userId },
                { $pull: { thoughts: thought._id } }
            );
        }
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const addReaction = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { new: true, runValidators: true }
        );
        if (!thought) {
            res.status(404).json({ message: 'No thought found with this ID' });
        } else {
            res.json(thought);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

export const deleteReaction = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        );
        if (!thought) {
            res.status(404).json({ message: 'No thought found with this ID' });
        } else {
            res.json(thought);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};