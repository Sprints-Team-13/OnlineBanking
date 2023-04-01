import "../Transfer/transfer.scss";
import { useFormik } from "formik";
import apiCrud from "../../../api/apiCrud";
import popAction from "../../../helpers/popAction";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup'

const schema = yup.object({
  initialBalance: yup.number()
    .positive('Enter a vaild amount')
    .required('Amount is required'),
})

const OpenAccount = () => {
  const navigate = useNavigate();

  const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
    initialValues: {
      initialBalance: 0,
      accountType: 'checking',
    },
    validationSchema: schema,
    onSubmit: (values)=> { 
      popAction(
        'Are you sure?', 
        `this will open a new ${values.accountType} account`,
        'Proceed',
        ()=> apiCrud(`/api/createAccount`, 'POST', 'Successful transaction', {
          accountBalance: values.initialBalance,
          accountType: values.accountType,
        }, navigate('/userdashboard/accounts'))
      );
		},
  })

  const form = (
    <main className="transfer-form">
      <form onSubmit={handleSubmit}>

      <div className="input-holder">
        <label>Initial Deposit</label><br/>
        <input name="initialBalance"
        type="text" required 
        placeholder="enter initial deposit"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.initialBalance} />
        {touched.initialBalance
            ? 
              errors.initialBalance 
              ? <p className="error">{errors.initialBalance}</p> 
              : <CheckCircleIcon className='icon'/>
            :
            null
          } 
      </div>

      <div className="input-holder">
          <label>Account Type<span style={{color: 'red'}}> (From)</span></label><br/>
          <select placeholder={'Select source Account'}
            name="accountType"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.accountType}
            style={{ borderRadius: 15, height: 45, display: 'inline-block', width: '300px', border: '0', padding: '0 10px', color: '#999' }}
            required >
            <option value="checking" key="checking">Checking Account</option>
            <option value="saving" key="saving">Saving Account</option>
          </select>
          {touched.accountType 
            ? 
              errors.accountType 
              ? <p className="error">{errors.accountType}</p> 
              : <CheckCircleIcon className='icon' style={{ float: 'right' }} />
            :
            null
          }
      </div>
        <button id="sub_btn" type="submit">Submit</button>
      </form>
    </main>
  )

  return (
    <div className="transfer">
      <div className="title">
        <h2>Open Account</h2>
      </div>

    { form }
    </div>
  )
}

export default OpenAccount;