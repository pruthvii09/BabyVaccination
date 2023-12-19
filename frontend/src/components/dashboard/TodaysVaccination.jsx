import React from 'react';
import Vacination from './Vacination';

const data = [
  {
    regno: '250801',
    motherName: 'Savita Auti',
    fatherName: 'Dattatray Auti',
    babyName: 'Pruthviraj Auti',
    weight: '7Kg',
    gender: 'Male',
    bloodGroup: 'A+',
    dob: '15/09/2002',
    contact: '9856325410',
    email: 'autipruthviraj@gmail.com',
  },
  {
    regno: '250802',
    motherName: 'Karuna Bhoir',
    fatherName: 'Jayendra Bhoir',
    babyName: 'Aditya Bhoir',
    weight: '7Kg',
    gender: 'Male',
    bloodGroup: 'A+',
    dob: '18/04/2022',
    contact: '9356497470',
    email: 'bhoiraditya23@gmail.com',
  },
  {
    regno: '250803',
    motherName: 'Savita Dubewar',
    fatherName: 'Prathmesh Dubewar',
    babyName: 'Samaira Dubewar',
    weight: '3.5Kg',
    gender: 'Female',
    bloodGroup: 'A+',
    dob: '19/04/2022',
    contact: '6585859696',
    email: 'dubewarsamaira@gmail.com',
  },
  {
    regno: '250804',
    motherName: 'Gita Gokhale',
    fatherName: 'Appasaheb Gokhale',
    babyName: 'Pradnya Gokhale',
    weight: '7Kg',
    gender: 'Male',
    bloodGroup: 'A+',
    dob: '11/04/2022',
    contact: '9856565656',
    email: 'pradnyagokhale@gmail.com',
  },
  {
    regno: '250805',
    motherName: 'Kshitija Funde',
    fatherName: 'Sambhaji Funde',
    babyName: 'Pratyush Funde',
    weight: '7Kg',
    gender: 'Male',
    bloodGroup: 'A+',
    dob: '11/04/2022',
    contact: '9856565656',
    email: 'pratyush@gmail.com',
  },
  {
    regno: '250806',
    motherName: 'Mira Gawande',
    fatherName: 'Sanjay Gawande',
    babyName: 'Shruti Gawande',
    weight: '2Kg',
    gender: 'Female',
    bloodGroup: 'A+',
    dob: '23/09/2003',
    contact: '9856325410',
    email: 'gawandeshruti@gmail.com',
  },
];

const TodaysVaccination = () => {
  return (
    <div>
      {data.map((data) => (
        <Vacination data={data} />
      ))}
    </div>
  );
};

export default TodaysVaccination;
