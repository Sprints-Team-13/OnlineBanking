import { useFormik } from 'formik';
import React from 'react';
import "./transfer.scss";

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import apiCrud from "../../../api/apiCrud";
import popAction from "../../../helpers/popAction";
import useGetBeneficiaries from "../../../hooks/queries/users/useGetBeneficiaries";
import useGetUsersAccounts from "../../../hooks/queries/users/useGetUserAccounts";
import { transferSchema } from "../../../schemas/transferSchema";

function Transfer() {
  const { data: beneficiaryList } = useGetBeneficiaries();
    // fetch and cache all accounts
  const { data: accounts} = useGetUsersAccounts()

  console.log(accounts)

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
          <label>Account<span style={{color: 'red'}}> (From)</span></label><br/>
          <select placeholder={'Select source Account'}
          name="accountNumber"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.accountNumber}
          style={{ borderRadius: 15, height: 45, display: 'inline-block', width: '300px', border: '0', padding: '0 10px', color: '#999' }}
          required >
            {
              accounts && accounts.map((account) => 
                <option value={account.accountNumber} key={account._id}>{account.accountType} {account.accountNumber} {account.accountBalance}</option>
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
          <label>Beneficiary<span style={{color: 'green'}}> (Recipient)</span></label><br/>
          <select placeholder={'Select Beneficiary'}
          name="destinationAccountNumber"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.destinationAccountNumber}
          style={{ borderRadius: 15, height: 45, display: 'inline-block', width: '300px', border: '0', padding: '0 10px', color: '#999' }}
          required >
            {
              beneficiaryList && beneficiaryList.list?.map((beneficiary) => 
                <option value={beneficiary.accountNumber} key={beneficiary._id}>{beneficiary.name} ${beneficiary.accountNumber}</option>
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
                        <Select options={options}  className="basic-single"  classNamePrefix="select"/>

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