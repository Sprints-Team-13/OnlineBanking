import { useQuery } from "react-query";
import axios from "axios";

const useGetAccounts = async () => {

  // fetch all accounts

  const { data } = await axios({
    url: '/api/listAccounts/',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.jwt}`
    },
  });
  return data.accounts.slice(0).reverse();
};

export default function useApi() {
  return useQuery(["accounts"], useGetAccounts, {
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });
}