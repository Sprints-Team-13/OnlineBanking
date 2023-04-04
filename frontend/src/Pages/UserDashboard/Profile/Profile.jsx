import "./profile.scss"
import React from 'react'
import "../Transfer/transfer.scss";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import * as yup from 'yup'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useFormik } from "formik";
import popAction from "../../../helpers/popAction";
import apiCrud from "../../../api/apiCrud";
import useGetCurrentUser from '../../../hooks/queries/users/useGetCurrentUser'
import { useState } from 'react';

function Profile() {
  const {data: user} = useGetCurrentUser();
  const [EmirratesId, setFile] = useState(null);
  const [AADHAR, setFile2] = useState(null);

  const handleFileSelect = (event) => {
    setFile(event.target.files[0]);
  };
  const handleFileSelect2 = (event) => {
    setFile2(event.target.files[0]);
  };

  const handleFileUpload = () => {
    // Upload the file using an API or function
    console.log('Uploading file:', EmirratesId);
  };
  const schema = yup.object({
    fullName: yup.string()
      .required('Full Name is required'),
    phoneNumber: yup.string().required('phone is required'),
    emiratesID: yup.string().required('EID is required'),
    addhar: yup.string().required('Addhar is required'),
    securityQuestion: yup.string().required('Security Question is required'),
    securityAnswer: yup.string().required('Security Answer is required'),
  })

  const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullName: user?.fullName,
      phoneNumber: user?.phone,
      emiratesID: user?.emiratesID,
      addhar: user?.addhar,
      securityQuestion: user?.securityQuestion,
      securityAnswer: user?.securityAnswer,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      popAction(
        'Are you sure?', 
        `you are about to update your personal profile data`,
        'Proceed',
        ()=> apiCrud(`/api/updateProfile`, 'PUT', 'Successful transaction', {
          id: user._id,
          fullName: values.fullName,
          phone: values.phoneNumber,
          emiratesID: values.emiratesID,
          addhar: values.addhar,
          securityQuestion: values.securityQuestion,
          securityAnswer: values.securityAnswer,
        })()
      );
    },
  })

  return (
    <div className="profile">

      <div className="title">
        <h2>Profile</h2>
      </div>

      <div className="profile-contanier">

        <AccountBoxIcon className="icon-main"/>

        { user && 
        <div className="profile-details">

          <p>Full Name:</p>
          <h3>{user?.fullName}</h3>

          <p>Phone Number:</p>
          <h3>{user?.phone}</h3>

          <p>Email:</p>
          <h3>{user?.email}</h3>
        </div> }

        {
          user && (
            <div className="transfer">
          <div className="transfer-form">
          <form action="/" onSubmit={handleSubmit}>
            <div className="input-holder">
              <label>Customer ID</label>
              <input type="text" value={user._id} disabled />
            </div>
            <div className="input-holder">
              <label>Full Name</label>
              <input name="fullName" 
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.fullName}
                type="text" />
                {touched.fullName ? errors.fullName ? <p className="error">{errors.fullName}</p> : <CheckCircleIcon className='icon'/> : null}
            </div>
            <div className="input-holder">
              <label>Phone Number</label>
              <input name="phoneNumber" 
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phoneNumber}
                type="text" />
              {touched.phoneNumber ? errors.phoneNumber ? <p className="error">{errors.phoneNumber}</p> : <CheckCircleIcon className='icon'/> : null}
            </div>
            <div className="input-holder">
              <label>Emirates ID</label>
              <input type="text" 
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.emiratesID} name="emiratesID" />
                {touched.emiratesID ? errors.emiratesID ? <p className="error">{errors.emiratesID}</p> : <CheckCircleIcon className='icon'/> : null}
            </div>
            <div className="input-holder">

          <label htmlFor="file-upload"> Emirates Id File:</label>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
      />
      </div>
            <div className="input-holder">
              <label>ADDHAR</label>
              <input name="addhar" 
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.addhar} type="text" />
                {touched.addhar ? errors.addhar ? <p className="error">{errors.addhar}</p> : <CheckCircleIcon className='icon'/> : null}
            </div>
            <div className="input-holder">

<label htmlFor="file-upload"> AADHAR File:</label>
<input
id="file-upload"
type="file"
accept="image/*"
onChange={handleFileSelect2}
/>
</div>

            <div className="input-holder">
              <label>Security Question</label>
              <br/>
              <select name="securityQuestion" 
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.securityQuestion}
              style={{ borderRadius: 15, height: 45, display: 'inline-block', width: '300px', border: '0', padding: '0 10px' }}>
                <option value="1">Who is your favorite actor?</option>
                <option value="2">What was your first car?</option>
                <option value="3">What is your favorite movie?</option>
              </select>
              {touched.securityQuestion ? errors.securityQuestion ? <p className="error">{errors.securityQuestion}</p> : <CheckCircleIcon className='icon'/> : null}
            </div>
            <div className="input-holder">
              <label>Your Answer</label>
              <input name="securityAnswer" 
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.securityAnswer} type="text" />
                {touched.securityAnswer ? errors.securityAnswer ? <p className="error">{errors.securityAnswer}</p> : <CheckCircleIcon className='icon'/> : null}
            </div>
            <div>
    
    </div>
            <button id="sub_btn" type="submit">Save Profile</button>
          </form>

          
  

        </div>
        </div>)
        }

      </div>
    </div>
  )
}

export default Profile