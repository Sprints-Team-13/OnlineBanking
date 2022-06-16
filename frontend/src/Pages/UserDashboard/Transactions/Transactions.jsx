import "./transactions.scss"
// import { DataGrid } from '@mui/x-data-grid';

import useApi from "../../../hooks/useApi";

function Transactions() {

  // fetch and cache all transactions
  const {data: transactions} = useApi('/api/transactions', 'GET')
  console.log(transactions)

  return (
    <div className="transactions">
      
    </div>
  )
}

export default Transactions