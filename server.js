const express = require('express');
 const mongoose = require('mongoose');
 const cors = require('cors');
 const app = express();
 app.use(cors());
 app.use(express.json());
 mongoose.connect('mongodb://localhost:27017/jobboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true
 });
 const db = mongoose.connection;
 db.on('error', console.error.bind(console, 'connection error:'));
 db.once('open', () => console.log('Connected to MongoDB'));
 const jobSchema = new mongoose.Schema({
  position: String,
  company: String,
  location: String,
  type: String,
  description: String
 });
 const Job = mongoose.model('Job', jobSchema);
 app.get('/jobs', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).send(error.message);
  }
 });
 app.post('/jobs', async (req, res) => {
  try {
    const newJob = new Job(req.body);
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    res.status(400).send(error.message);
  }
 });
 app.put('/jobs/:id', async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedJob);
  } catch (error) {
    res.status(400).send(error.message);
  }
 });
 app.delete('/jobs/:id', async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
 });
 const PORT = 4000;
 app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
