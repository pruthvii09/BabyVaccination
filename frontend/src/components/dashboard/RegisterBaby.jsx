import React, { useState } from "react";
import formStyles from "../../styles/components/Form.module.css";
import usePostAPIData from "../../hooks/postAPIData";
import { useSelector } from "react-redux";
import Loader from "../Loader";
import Dialog from "../Dialog";

const RegisterBaby = () => {
  const { hospital } = useSelector((store) => store.hospital);
  const [data, setData] = useState({
    mother: "",
    father: "",
    name: "",
    dob: "",
    weight: "",
    gender: "Female",
    contact: "",
    email: "",
  });
  const [openDialog, setOpenDialog] = useState(false);
  const { loading, error, sendData } = usePostAPIData();
  const handleBaby = async () => {
    console.log(data);
    const response = await sendData(
      `${process.env.REACT_APP_BACKEND_URI}/baby`,
      {
        headers: {
          Authorization: `Bearer ${hospital?.token}`,
        },
      },
      { ...data }
    );
    if (response) {
      console.log(response);
      setOpenDialog(true);
      setData({
        mother: "",
        father: "",
        name: "",
        dob: "",
        weight: "",
        gender: "Female",
        contact: "",
        email: "",
      });
    }
  };
  return (
    <div>
      <div className={formStyles.form}>
        {loading && <Loader />}
        <h1>Register new baby</h1>
        <div className={formStyles.field}>
          <label htmlFor="mother_name">Mother's Name</label>
          <input
            type="text"
            id="mother_name"
            placeholder="Mother's Name"
            value={data.mother}
            onChange={(e) => setData({ ...data, mother: e.target.value })}
          />
        </div>
        <div className={formStyles.field}>
          <label htmlFor="father_name">Father's Name</label>
          <input
            type="text"
            id="father_name"
            placeholder="Father's Name"
            value={data.father}
            onChange={(e) => setData({ ...data, father: e.target.value })}
          />
        </div>
        <div className={formStyles.field}>
          <label htmlFor="baby_name">Child Name</label>
          <input
            type="text"
            id="baby_name"
            placeholder="Baby's Name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
        </div>
        <div className={formStyles.field}>
          <label htmlFor="date">Date Of Birth</label>
          <input
            type="date"
            id="date"
            value={data.dob}
            onChange={(e) => setData({ ...data, dob: e.target.value })}
          />
        </div>
        <div className={formStyles.field}>
          <label htmlFor="weight">Weight</label>
          <input
            type="text"
            id="weight"
            placeholder="Baby's Weight"
            value={data.weight}
            onChange={(e) => setData({ ...data, weight: e.target.value })}
          />
        </div>
        <div className={formStyles.field}>
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            value={data.gender}
            onChange={(e) => setData({ ...data, gender: e.target.value })}
          >
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>
        </div>
        <div className={formStyles.field}>
          <label htmlFor="contact_no">Contact No.</label>
          <input
            type="text"
            id="contact_no"
            placeholder="Contact No."
            value={data.contact}
            onChange={(e) => setData({ ...data, contact: e.target.value })}
          />
        </div>
        <div className={formStyles.field}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div>
        <button onClick={handleBaby}>Register</button>
      </div>
      <Dialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        title={"Baby Added!"}
        children={
          <div>
            <p>Baby Added Successfully!!</p>
            {/* <button className={styles.button}>
              <Link to="/profile" style={{ color: "white" }}>
                Profile
              </Link>
            </button> */}
          </div>
        }
      />
    </div>
  );
};

export default RegisterBaby;

/*

gender
weight

*/
