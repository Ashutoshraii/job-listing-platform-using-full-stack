 import React, { useEffect, useState } from 'react';
 import './App.css';
 const App = () => {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({ position: '', company: '', location: '', type: '',
 description: '' });
  const [editJob, setEditJob] = useState(null);
  const [errors, setErrors] = useState({});
  const fetchJobs = () => {
    fetch('http://localhost:4000/jobs')
      .then(res => res.json())
      .then(setJobs);
  };
  useEffect(() => { fetchJobs(); }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    const currentForm = editJob ? editJob : form;
    const updatedForm = { ...currentForm, [name]: value };
    if (editJob) setEditJob(updatedForm);
    else setForm(updatedForm);
    setErrors({ ...errors, [name]: '' });
  };
  const validate = (data) => {
    const errs = {};
    ['position', 'company', 'location', 'type', 'description'].forEach(key => {
      if (!data[key]) errs[key] = `${key} is required.`;
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };
  const addJob = () => {
    if (!validate(form)) return;
    fetch('http://localhost:4000/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(() => {
        fetchJobs();
        setForm({ position: '', company: '', location: '', type: '', description: '' });
      });
  };
  const updateJob = () => {
    if (!validate(editJob)) return;
    fetch(`http://localhost:4000/jobs/${editJob._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editJob)
    })
      .then(() => {
        fetchJobs();
        setEditJob(null);
      });
  };
  const deleteJob = (id) => {
    if (window.confirm('Are you sure?')) {
      fetch(`http://localhost:4000/jobs/${id}`, { method: 'DELETE' })
        .then(fetchJobs);
    }
  };
  return (
    <div className="container">
      <h1 className="title">Job Listings Board</h1>
      {/* Job Table and Form Rendering */}
    </div>
  );
 };
export default App;
