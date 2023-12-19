import React from "react";
import styles from "../../styles/components/Baby.module.css";

const Baby = ({ data }) => {
  return (
    <div className={styles.baby}>
      <b className={styles.regno}>Reg. No. {data._id}</b>
      <div className={styles.image_container}>
        <b>Reg. No. {data._id}</b>
        <img src="/images/child.png" alt={data.name} />
      </div>
      <div className={styles.information}>
        <h2>{data.name}</h2>
        <p>
          <span>Mother Name</span> <strong> {data.mother}</strong>
        </p>
        <p>
          <span>Father Name</span> <strong> {data.father}</strong>
        </p>
        <p>
          <span>Weight</span> <strong> {data.weight}</strong>
        </p>
        <p>
          <span>Gender</span> <strong> {data.gender}</strong>
        </p>
        <p>
          <span>Blood Group</span> <strong> A+</strong>
        </p>
        <p>
          <div>
            <i className="fa-solid fa-calendar-day"></i>
            <span> Date Of Birth</span>
          </div>
          <strong> {data.dob}</strong>
        </p>
        <a href={`tel:+91${data.contact}`}>
          <div>
            <i className="fa-solid fa-phone"></i>
            <span> Phone Number</span>
          </div>
          <strong>{data.contact}</strong>
        </a>
        <a href={`mailto:${data.email}`}>
          <div>
            <i className="fa-solid fa-envelope"></i>
            <span> Email</span>
          </div>
          <strong>{data.email}</strong>
        </a>
      </div>
      <div className={styles.button_container}>
        <button>
          <a href={`/dashboard/${data._id}`}>View Profile</a>
        </button>
      </div>
    </div>
  );
};

export default Baby;

/* 

Mother's Name
Father's Name
Baby's Name
DOB
Contact No.
Email

*/
