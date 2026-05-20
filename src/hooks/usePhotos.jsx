import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

export const usePhotos = () => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ["photos"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/photos");
      return data;
    },
  });
};