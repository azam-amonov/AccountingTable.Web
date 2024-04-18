// Table.js
import React from 'react';
import './Table.css'
function Table({ data, deleteRecord }) {
    return (
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {data.map((record) => (
                <tr key={record.id}>
                    <td>{record.id}</td>
                    <td>{record.name}</td>
                    <td>{record.email}</td>
                    <td>
                        <button onClick={() => deleteRecord(record.id)}>Delete</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default Table;
