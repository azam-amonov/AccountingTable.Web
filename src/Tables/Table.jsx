// Table.jsx
import React from 'react';
import './Table.css';

function Table({ data, deleteRecord }) {
    return (
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Category</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {data.map((record) => (
                <tr key={record.id}>
                    <td>{record.id}</td>
                    <td>{record.type}</td>
                    <td>{record.category}</td>
                    <td>{record.date}</td>
                    <td>{record.amount}</td>
                    <td>{record.comment}</td>
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