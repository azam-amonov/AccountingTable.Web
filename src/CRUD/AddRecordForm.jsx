// AddRecordForm.jsx
import React, { useState } from 'react';

function AddRecordForm({ addRecord }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = Date.now(); // Generate unique ID
        addRecord({ id, name, email });
        setName('');
        setEmail('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Add Record</button>
        </form>
    );
}

export default AddRecordForm;
