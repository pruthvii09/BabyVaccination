import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../styles/pages/Profile.module.css";
import useGetAPIData from "../hooks/getAPIData";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";
import SignleVaccine from "../components/SignleVaccine";
const Profile = () => {
  const { _id } = useParams();
  const { hospital } = useSelector((store) => store.hospital);
  const [baby, setBaby] = useState(null);
  const { data, loading, getError } = useGetAPIData(
    `${process.env.REACT_APP_BACKEND_URI}/baby/${_id}`,
    {
      headers: {
        Authorization: `Bearer ${hospital.token}`,
      },
    }
  );
  useEffect(() => {
    if ((!loading, !getError)) {
      setBaby(data?.baby);
    }
  }, [data, loading, getError]);

  return (
    <div className={styles.profile_container}>
      {loading && <Loader />}
      <div className={styles.information_container}>
        <div className={styles.back_button}>
          <a href="/dashboard">
            <i className="fa-solid fa-arrow-left-long"></i> &nbsp;Back To
            Dashboard
          </a>
        </div>
        <div className={styles.information_innercontainer}>
          <div className={styles.image_container}>
            <img src="/images/child.png" alt={baby?.name} />
          </div>
          <h3>
            {baby?.name} <i className="fa-solid fa-pen-to-square"></i>
          </h3>
          <span>Age: 6</span>
          <em>Reg. No. {baby?._id}</em>
        </div>
        <div className={styles.information}>
          <h4>Information:</h4>
          <p>
            <span>Mother Name:</span>
            <div>
              <strong> {baby?.mother}</strong>
              <i className="fa-solid fa-pen-to-square"></i>
            </div>
          </p>
          <p>
            <span>Father Name:</span>
            <div>
              <strong> {baby?.father}</strong>
              <i className="fa-solid fa-pen-to-square"></i>
            </div>
          </p>
          <p>
            <span>Weight:</span>
            <div>
              <strong> {baby?.weight}</strong>
              <i className="fa-solid fa-pen-to-square"></i>
            </div>
          </p>
          <p>
            <span>Gender:</span>
            <div>
              <strong> {baby?.gender}</strong>
              <i className="fa-solid fa-pen-to-square"></i>
            </div>
          </p>
          <p>
            <span>Blood Group:</span>
            <div>
              <strong> A+</strong>
              <i className="fa-solid fa-pen-to-square"></i>
            </div>
          </p>
          <p>
            <span> Phone Number:</span>
            <div>
              <a href={`tel:+91${baby?.contact}`}>{baby?.contact}</a>
              <i className="fa-solid fa-pen-to-square"></i>
            </div>
          </p>
          <p>
            <span> Email</span>
            <div>
              <a href={`mailto:${baby?.email}`}>{baby?.email}</a>
              <i className="fa-solid fa-pen-to-square"></i>
            </div>
          </p>
        </div>
      </div>

      <SignleVaccine />
    </div>
  );
};

export default Profile;
