import { useQuery } from "react-query";
import axios from "axios";


const useGetAllBeneficiaries = async () => {
  // fetch all
  const { data } = await axios({
    url: '/api/allBeneficiaries',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.jwt}`
    },
  });

  console.log(data);
  return data;
  //return data.accounts.slice(0).reverse();
};
export default function useApi() {
  return useQuery(["beneficiaries"], useGetAllBeneficiaries, {
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });
}