import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../../src/styles/components/Layout.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setHospital } from "../redux/hospitalSclice";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const { hospital } = useSelector((store) => store.hospital);
  console.log(hospital);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <div>
      <nav className={styles.navbar}>
        <div className={styles.header}>
          <a href="/">
            <img src="/images/logo.svg" alt="logo" />
          </a>
          <i
            className={
              open
                ? `fa-solid fa-xmark ${styles.hamburger}`
                : `fa-solid fa-bars-staggered ${styles.hamburger}`
            }
            onClick={() => {
              setOpen(!open);
            }}
          ></i>
        </div>
        <div
          className={
            open
              ? `${styles.nav_container} ${styles.active}`
              : `${styles.nav_container}`
          }
        >
          <div className={styles.button_container}>
            {hospital && (
              <button
                className={styles.symbol_button}
                onClick={() => navigate("/dashboard")}
              >
                <i className={`fa-solid fa-user ${styles.button_icon} `}></i>
                <a href="/dashboard">Dashboard</a>
              </button>
            )}
            {!hospital ? (
              <>
                <button onClick={() => navigate("/login")}>
                  <a href="/login" onClick={() => setOpen(false)}>
                    Login
                  </a>
                </button>
                <button
                  className={styles.button_filled}
                  onClick={() => navigate("/register")}
                >
                  <a href="/register" onClick={() => setOpen(false)}>
                    Register
                  </a>
                </button>
              </>
            ) : (
              <>
                <button
                  className={styles.button_filled}
                  onClick={() => {
                    localStorage.clear();
                    dispatch(setHospital(null));
                    navigate("/login");
                  }}
                  // onClick={() => navigate("/register")}
                >
                  <a href="/login" onClick={() => setOpen(false)}>
                    Logout
                  </a>
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      <div className={styles.container}>{children}</div>

      <footer className={styles.footer}>
        <p>&copy; 2022 | Pruthviraj Auti</p>
      </footer>
    </div>
  );
};

export default Layout;
