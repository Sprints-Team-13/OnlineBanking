import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

//-- use swal for pop messages

// icons: success / error / warning / info / question

const MySwal = withReactContent(Swal)

function popAction(tittle, text, conText, action) {

  MySwal.fire({
    title: tittle,
    text: text,
    showCancelButton: action ? true : false,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: conText
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        action(),
      )
    }
  })
}

export default popAction