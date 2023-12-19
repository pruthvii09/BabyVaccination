import React, { useState } from "react";
import styles from "../styles/components/Form.module.css";
import { useDispatch } from "react-redux";
import usePostAPIData from "../hooks/postAPIData";
import { setHospital } from "../redux/hospitalSclice";
import Loader from "../components/Loader";
import { AlertCircle } from "lucide-react";

const Register = () => {
  const dispatch = useDispatch();
  // const { hospital } = useSelector((store) => store.hospital);
  const [data, setData] = useState({
    regNo: "",
    name: "",
    address: "",
    contact: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { loading, error, sendData } = usePostAPIData();
  const handleRegister = async () => {
    console.log(data);
    const response = await sendData(
      `${process.env.REACT_APP_BACKEND_URI}/hospital/signup`,
      null,
      { ...data }
    );
    if (response) {
      localStorage.setItem("hospital", JSON.stringify(response));
      dispatch(setHospital(response));
    }
  };

  return (
    <div className={styles.form_container}>
      {loading && <Loader />}
      <div className={styles.left_container}>
        <h1>Register your hospital</h1>
        <p>
          Register your hospital on Vaccination Scheduler platform which
          provides you a facility to manage vaccination of your patients.
        </p>
        <img src="/images/form.svg" alt="form_svg" />
      </div>

      <div className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="hospital_reg_no">Hosptial Reg. No.</label>
          <input
            type="text"
            id="hospital_reg_no"
            placeholder="Hosptial Reg. No."
            value={data.regNo}
            onChange={(e) => setData({ ...data, regNo: e.target.value })}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="hospital_name">Hosptial Name</label>
          <input
            type="text"
            id="hospital_name"
            placeholder="Hosptial Name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="hospital_address">Hosptial Address</label>
          <input
            type="text"
            id="hospital_address"
            placeholder="Hosptial Address"
            value={data.address}
            onChange={(e) => setData({ ...data, address: e.target.value })}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="hospital_contact">Hosptial Contact No.</label>
          <input
            type="text"
            id="hospital_contact"
            placeholder="Hosptial Contact No."
            value={data.contact}
            onChange={(e) => setData({ ...data, contact: e.target.value })}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="hospital_email">Hosptial Email</label>
          <input
            type="email"
            id="hospital_email"
            placeholder="Hosptial Email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="password">Password</label>
          <div className={styles.password_field}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
            {showPassword ? (
              <i
                className="fa-solid fa-eye-slash"
                onClick={() => setShowPassword(!showPassword)}
              ></i>
            ) : (
              <i
                className="fa-solid fa-eye"
                onClick={() => setShowPassword(!showPassword)}
              ></i>
            )}
          </div>
          {error && (
            <p className={styles.error}>
              <AlertCircle />
              {error}
            </p>
          )}
        </div>
        <button onClick={handleRegister}>Register</button>
        <p>
          Already have an account? <a href="/login">Click here to Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;

/*
Hospital Reg. No.
Name
Address
Contact No.
Email
Doctors Name
*/
