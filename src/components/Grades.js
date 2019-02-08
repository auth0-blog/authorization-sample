import React, { useState } from 'react';

function Grades() {
  const [grades, setGrades] = useState([]);
  setTimeout(() => {
    setGrades([
      { name: 'Bruno Krebs', value: 10 },
      { name: 'Lena Vettoretti', value: 9.5 },
    ])
  }, 1500);
  if (grades.length === 0) return (<div>Loading...</div>);
  return (
    <ul>
      {
        grades.map(grade => (
          <li>{grade.name}: {grade.value}</li>
        ))
      }
    </ul>
  );
}

export default Grades;
