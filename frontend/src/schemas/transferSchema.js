import * as yup from 'yup'

export const transferSchema = yup.object({
  accountNumber: yup.string()
    .min(10, 'Minimum  characters allowed are 11')
    .max(10, 'Maximum characters allowed are 11')
    .required('Account number is required'),
  amount: yup.number()
    .positive('Enter a vaild amount')
    .required('Amount is required'),
  destinationAccountNumber: yup.string()
    .min(10, 'Minimum  characters allowed are 11')
    .max(10, 'Maximum characters allowed are 11')
    .required('Account number is required'),
})