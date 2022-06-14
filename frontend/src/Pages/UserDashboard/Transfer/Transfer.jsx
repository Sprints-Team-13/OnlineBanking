import "./transfer.scss"
import React from 'react'
import {useFormik} from 'formik'

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { transferSchema } from "../../../schemas/transferSchema";
import popAction from "../../../helpers/popAction";
import apiCrud from "../../../api/apiCrud";

function Transfer() {

  // handle user inputs
	const { values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
		initialValues: {
			accountNumber: '',
			amount: '',
			destinationAccountNumber: '',
		},
		validationSchema: transferSchema,
		onSubmit: (values)=> { 
      popAction(
        'Are you sure?', 
        `$${values.amount} will be tranfered from account ${values.accountNumber} to account ${values.destinationAccountNumber}`,
        'Proceed!',
        ()=>apiCrud(`/api/transfer`, 'POST', 'Successful transaction', {
          accountNumber: values.accountNumber,
          amount: values.amount,
          destinationAccountNumber: values.destinationAccountNumber,
        })()
      )
		}
})

  const transferForm =(
		<main className='transfer-form'>
      <form action="/home" onSubmit={handleSubmit}>

        <div className="input-holder">
          <label>Account Number<span style={{color: 'red'}}> (From)</span></label><br/>
          <input 
          type="text" 
          name="accountNumber"
          required 
          placeholder={'Enter an account number'} 
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.accountNumber}
          />
          {touched.accountNumber 
            ? 
              errors.accountNumber 
              ? <p className="error">{errors.accountNumber}</p> 
              : <CheckCircleIcon className='icon'/>
            :
            null
          }
        </div>

        <div className="input-holder">
          <label>Amount</label><br/>
          <input 
          type="text" 
          name="amount" 
          required
          placeholder={'Enter transfer amount'}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.amount}
          />							
          {touched.amount 
            ? 
              errors.amount 
              ? <p className="error">{errors.amount}</p> 
              : <CheckCircleIcon className='icon'/>
            :
            null
          }
        </div>

        <div className="input-holder">
          <label>Account Number<span style={{color: 'green'}}> (Recipient)</span></label><br/>
          <input 
          type="text" 
          name="destinationAccountNumber"
          required 
          placeholder={'Enter an account number'} 
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.destinationAccountNumber}
          />
          {touched.destinationAccountNumber 
            ? 
              errors.destinationAccountNumber 
              ? <p className="error">{errors.destinationAccountNumber}</p> 
              : <CheckCircleIcon className='icon'/>
            :
            null
          }
        </div>

        <div className="input-holder">
          <input type="checkbox" name="checkbox" id="checkbox" required /> <span>I agree to the <a href="https://google.com" target="_blank" rel="noopener noreferrer">terms of use</a></span>.
        </div>

        <button id="sub_btn" type="submit">Transfer</button>

      </form>
		</main>
	)

  return (
    <div className="transfer">

      <div className="title">
        <h2>Money Transfer</h2>
      </div>

      {transferForm}

    </div>
  )
}

export default Transfer