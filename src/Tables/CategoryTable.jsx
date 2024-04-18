import React from 'react';
import './Table.css';
import categories from '../data/categories.json'

function Table({ deleteRecord }) {
    return (
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Name</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {categories.map((record) => (
                <tr key={record.id}>
                    <td>{record.id}</td>
                    <td>{record.type}</td>
                    <td>{record.name}</td>
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