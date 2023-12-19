import React, { useState } from "react";
import styles from "../styles/components/Form.module.css";
import Loader from "../components/Loader";
import usePostAPIData from "../hooks/postAPIData";
import { setHospital } from "../redux/hospitalSclice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    regNo: "",
    password: "",
  });
  const { loading, error, sendData } = usePostAPIData();

  const hanldeLogin = async () => {
    if (loading) {
      return;
    }
    console.log(data);
    const response = await sendData(
      `${process.env.REACT_APP_BACKEND_URI}/hospital/login`,
      null,
      { ...data }
    );
    if (response) {
      console.log("response -> ", response);
      dispatch(setHospital(response));
      localStorage.setItem("hospital", JSON.stringify(response));
      navigate("/dashboard");
    }
  };

  return (
    <div className={styles.form_container}>
      {loading && <Loader />}
      <div className={styles.left_container}>
        <h1>Login to your hospital dashboard</h1>
        <p>
          Enter Hospital Reg. No. and Password to login to your hospital
          dashboard
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
          {error && <p styles={{ color: "red" }}>{error}</p>}
        </div>
        <button onClick={hanldeLogin}>Login</button>
        <p>
          Don't have an account? <a href="/register">Click here to Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
