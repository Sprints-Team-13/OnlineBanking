import { useQuery } from "react-query";
import axios from "axios";

const useGetTransactions = async () => {

  // fetch all transactions

  const { data } = await axios({
    url: '/api/listTransactions/',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.jwt}`
    },
  });
  return data.transactions.slice(0).reverse();
};

export default function useApi() {
  return useQuery(["transactions"], useGetTransactions, {
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });
}