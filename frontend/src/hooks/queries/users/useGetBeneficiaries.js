import { useQuery } from "react-query";
import axios from "axios";

const useGetBeneficiaries = async () => {
  // fetch all
  const { data } = await axios({
    url: '/api/beneficiaries',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.jwt}`
    },
  });

 
  return data;
  //return data.accounts.slice(0).reverse();
};

export default function useApi() {
  return useQuery(["beneficiaries"], useGetBeneficiaries, {
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });
}