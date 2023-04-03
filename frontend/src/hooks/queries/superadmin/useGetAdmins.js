import { useQuery } from "react-query";
import axios from "axios";

const useGetAdmins = async () => {

  // fetch all users

  const { data } = await axios({
    url: '/api/listAdmins',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.jwt}`
    },
  });
  return data.users.slice(0).reverse();
};

export default function useApi() {
  return useQuery(["users"], useGetAdmins, {
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });
}