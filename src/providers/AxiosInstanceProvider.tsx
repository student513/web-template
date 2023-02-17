import axios from "axios";
import constate from "constate";

const BASE_URL = process.env.BASE_URL;
const _useAxiosInstance = () => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
  });

  return {
    axiosInstance,
  };
};

export const [AxiosInstanceProvider, useAxiosInstance] = constate(
  _useAxiosInstance,
  ({ axiosInstance }) => axiosInstance
);
