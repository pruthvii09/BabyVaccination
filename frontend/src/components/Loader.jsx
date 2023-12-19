import React from "react";
import styles from "../styles/components/Loader.module.css";
const Loader = () => {
  return (
    <div className={styles.overlay}>
      <span className={styles.loader}></span>
    </div>
  );
};

export default Loader;
