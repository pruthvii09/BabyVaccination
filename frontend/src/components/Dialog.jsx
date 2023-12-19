import React from "react";
import { XCircle } from "lucide-react";
import styles from "../styles/components/Dialog.module.css";

const Dialog = ({ openDialog, setOpenDialog, title, children }) => {
  return (
    <div
      className={
        openDialog ? `${styles.dialog} ${styles.opened}` : styles.dialog
      }
    >
      <div className={styles.dialogContent}>
        <div className={styles.dialogHeader}>
          <XCircle onClick={() => setOpenDialog(!openDialog)} />
          <h4>{title}</h4>
        </div>

        <div className={styles.contentWrapper}>{children}</div>
      </div>

      <div
        className={styles.dialogMask}
        onClick={() => setOpenDialog(!openDialog)}
      ></div>
    </div>
  );
};

export default Dialog;
