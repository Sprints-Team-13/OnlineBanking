import * as yup from 'yup'

export const registerSchema = yup.object({
  fullName: yup.string()
    .max(30, 'Maximum characters allowed are 30')
    .required('Full name is required'),
  phone: yup.string()
    .min(11, 'Minimum  characters allowed are 11')
    .max(11, 'Maximum characters allowed are 11')
    .required('A phone number is required'),
  email: yup.string()
    .email('Invalid email')
    .required('A valid email is required'),
  hash_password: yup.string()
    .min(8, 'Minimum  characters allowed are 8')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, 'Must contain uppercase, lowercase, number and special character')
    .required('Password is required'),
  passwordConfirm: yup.string()
    .oneOf([yup.ref('hash_password'), null], 'Passwords must match')
    .required('Password is required'),
})