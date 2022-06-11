import { useQuery } from "react-query";
import axios from "axios";

const useGetUsers = async () => {

  const { data } = await axios({
    url: '/api/admin/list',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.jwt}`
    },
  });
  return data.users.slice(0).reverse();
};

export default function useApi() {
  return useQuery(["users"], useGetUsers, {
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });
}