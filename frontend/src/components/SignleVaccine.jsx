import React, { useEffect, useState } from "react";
import styles from "../styles/components/SignleVaccine.module.css";
import { useParams } from "react-router-dom";
import useGetAPIData from "../hooks/getAPIData";
import { useSelector } from "react-redux";
import useUpdateAPIData from "../hooks/updateAPIData";
import Loader from "./Loader";
import Dialog from "./Dialog";
import VaccinePDF from "./VaccinePDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
const SignleVaccine = () => {
  const { hospital } = useSelector((store) => store.hospital);
  const [openDialog, setOpenDialog] = useState(false);
  const { _id } = useParams();
  const [vaccines, setVaccines] = useState(null);
  //   console.log(_id);
  const { data, loading, getError } = useGetAPIData(
    `${process.env.REACT_APP_BACKEND_URI}/vaccine/${_id}`,
    {
      headers: {
        Authorization: `Bearer ${hospital.token}`,
      },
    }
  );
  useEffect(() => {
    if ((!loading, !getError)) {
      setVaccines(data[0]);
    }
  }, [loading, getError, data]);
  const { getloading, error, updateData } = useUpdateAPIData();

  const hanldeVaccine = async (vaccineId) => {
    if (getloading) {
      return;
    }
    const response = await updateData(
      `${process.env.REACT_APP_BACKEND_URI}/vaccine/${vaccineId}`,
      {
        headers: {
          Authorization: `Bearer ${hospital.token}`,
        },
      },
      null
    );
    if (response) {
      window.location.reload();
      console.log(response);
    }
    if (!response) {
    }
  };
  return (
    <div className={styles.vaccination}>
      {getloading && <Loader />}
      <div className={styles.heading}>
        <h4>Vaccinations</h4>
        <PDFDownloadLink document={<VaccinePDF />} fileName="Certificate">
          {({ loading }) =>
            loading ? <button>Loading..</button> : <button>Generate PDF</button>
          }
        </PDFDownloadLink>
      </div>
      <table>
        <tr>
          <th>Vaccine</th>
          <th>Date</th>
          <th>Given Date</th>
          <th>Status</th>
        </tr>
        {vaccines?.vaccine.map((vaccine) => (
          <tr key={vaccine._id}>
            <td>
              <i className="fa-solid fa-syringe"></i> {vaccine.name}
            </td>
            <td>{vaccine.date.slice(0, 10)}</td>
            <td>{vaccine.givenDate}</td>
            <td>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <div
                  className={
                    vaccine.status ? styles.completed : styles.incompleted
                  }
                ></div>
                <i
                  onClick={() => hanldeVaccine(vaccine._id)}
                  className={`fa-solid fa-pen-to-square ${styles.vaccineEdit}`}
                ></i>
              </div>
            </td>
          </tr>
        ))}
      </table>
      <Dialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        title={error}
        children={
          <div>
            <p>Some Error Occoured</p>
          </div>
        }
      />
    </div>
  );
};

export default SignleVaccine;
