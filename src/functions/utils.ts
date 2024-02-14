import axios, { type AxiosRequestConfig } from "axios";

export interface RequestResponse {
  status: number;
  data: any;
  message?: string;
}

export const PostRequest = async (
  url: string,
  data: any,
  options?: AxiosRequestConfig
): Promise<RequestResponse> => {
  try {
    const postResponse = await axios.post(url, data, options);
    if (postResponse.status !== 200) {
      console.error("Error in PostRequest", postResponse.data);
      return {
        status: postResponse.status,
        data: postResponse.data,
        message: "Error in PostRequest",
      };
    }
    return {
      status: postResponse.status,
      data: postResponse.data,
      message: "Success!",
    };
  } catch (error) {
    console.error("Error in PostRequest", error);
    return {
      status: 500,
      data: error,
      message: "Error in PostRequest",
    };
  }
};

export const GetRequest = async (
  url: string,
  options?: AxiosRequestConfig
): Promise<RequestResponse> => {
  try {
    const getResponse = await axios.get(url, options);
    if (getResponse.status !== 200) {
      console.error("Error in GetRequest", getResponse.data);
      return {
        status: getResponse.status,
        data: getResponse.data,
        message: "Error in GetRequest",
      };
    }
    return {
      status: getResponse.status,
      data: getResponse.data,
      message: "Success!",
    };
  } catch (error) {
    console.error("Error in GetRequest", error);
    return {
      status: 500,
      data: error,
      message: "Error in GetRequest",
    };
  }
};
