import axios from 'axios'
import popAlert from '../helpers/popAlert'

async function apiCrud(url, method, message, data, action) {

  await axios({
    url: url,
    method: method,
    headers: {
      Authorization: `Bearer ${localStorage.jwt}`
    },
    data: data && data
  })
  .then((res) => {
    console.log(res.data)
    message && popAlert(message)
    setTimeout(()=> window.location.reload(), 1500) 
    action && action()
    return res.data
  })
  .catch(
    (error) => {
      console.log('error', error.response)
      popAlert('Somthing went wrong', 'error')
    }
  )
}

export default apiCrud