import { useFormik } from 'formik';
import React from 'react';
// import "./transfer.scss";

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import apiCrud from "../../../api/apiCrud";
import popAction from "../../../helpers/popAction";
import useGetAllBeneficiaries from "../../../hooks/queries/users/useGetAllBeneficiaries";
import useGetAccounts from '../../../hooks/queries/admin/useGetAccounts'
import { transferSchema } from "../../../schemas/transferSchema";
function Transfer() {
  // const { data: beneficiaryList } = useGetAllBeneficiaries();
  
    // fetch and cache all accounts
  const { data: accountsdb} = useGetAccounts()

  const accounts = accountsdb?.filter(
    o => o.accountStatus === 'active'
  );

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
          <label>From Account<span style={{color: 'red'}}> (Sender)</span></label><br/>
          <select placeholder={'Select source Account'}  
          name="accountNumber"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.accountNumber}
          style={{ borderRadius: 15, height: 45, display: 'inline-block', width: '300px', border: '0', padding: '0 10px', color: '#000' }}
          required >
             <option disabled key="empty" value="">Select an account</option>
            {
              accounts && accounts.map((account) => 
                <option value={account.accountNumber} key={account._id}>{account.accountType} {account.accountNumber} - AED {account.accountBalance}</option>
              )
            }
          </select>
          {touched.accountNumber 
            ? 
              errors.accountNumber 
              ? <p className="error">{errors.accountNumber}</p> 
              : <CheckCircleIcon className='icon' style={{ float: 'right' }} />
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
          <label>To Account<span style={{color: 'green'}}> (Recipient)</span></label><br/>
          <select placeholder={'Select Beneficiary'} classNamePrefix="select"
          name="destinationAccountNumber"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.destinationAccountNumber}
          style={{ borderRadius: 15, height: 45, display: 'inline-block', width: '300px', border: '0', padding: '0 10px', color: '#000' }}
          required >
         <option disabled key="empty" value="">Select an account</option>

            {/* {
              beneficiaryList && beneficiaryList.list?.map((beneficiary) => 
                <option value={beneficiary.accountNumber} key={beneficiary._id}>{beneficiary.name} - {beneficiary.accountNumber}</option>
              ) */}
              {
              accounts && accounts.map((account) => 
                <option value={account.accountNumber} key={account._id}>{account.accountType} {account.accountNumber} - AED {account.accountBalance}</option>
              )
            }

          </select>
          {touched.destinationAccountNumber 
            ? 
              errors.destinationAccountNumber 
              ? <p className="error">{errors.destinationAccountNumber}</p> 
              : <CheckCircleIcon className='icon'/>
            :
            null
          }

        </div>

        {/* <div className="input-holder">
          <input type="checkbox" name="checkbox" id="checkbox" required /> <span>I agree to the <a href="https://google.com" target="_blank" rel="noopener noreferrer">terms of use</a></span>.
        </div> */}

        <button id="sub_btn" type="submit">Transfer</button>

      </form>
		</main>
	)

  return (
    <div className="transfer">

      <div className="title">
        <h2>Credit/Debit Amount</h2>
      </div>

      {transferForm}

    </div>
  )
}

export default Transfer