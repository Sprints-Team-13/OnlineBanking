import { useQuery } from "react-query";
import axios from "axios";

const useGetCurrentUser = async () => {
  const { data } = await axios({
    url: '/api/me',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.jwt}`
    },
  });

  return data.user;
};

export default function useApi() {
  return useQuery(["me"], useGetCurrentUser, {
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });
}