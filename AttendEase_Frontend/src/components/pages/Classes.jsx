import React from 'react';
import '../css-files/Classes.css';

const Students = () => {
  const students = [
    { id: 1, name: 'Rahul Sharma', roll: '101', course: 'BSc CS', sem: '6' },
    { id: 2, name: 'Priya Patel', roll: '102', course: 'BSc CS', sem: '6' },
    { id: 3, name: 'Arjun Verma', roll: '103', course: 'BSc CS', sem: '6' },
  ];

  return (
    <div className="students-page">
      <header className="students-header">
        <div>
          <h1 className="students-title">Students</h1>
          <p className="students-subtitle">Manage and view all enrolled students</p>
        </div>
        <button className="students-add-btn">+ Add Student</button>
      </header>

      <div className="students-list-wrapper">
        <table className="students-table">
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Name</th>
              <th>Course</th>
              <th>Semester</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id}>
                <td>{s.roll}</td>
                <td>{s.name}</td>
                <td>{s.course}</td>
                <td>{s.sem}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Students;
