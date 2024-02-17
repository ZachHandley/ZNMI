import axios, { type AxiosRequestConfig } from "axios";
import qs from "qs"; // Assuming you have qs installed for query string parsing

export interface RequestResponse {
  status: number;
  data: any;
  message?: string;
}

const parseQueryString = (responseString: string): any => {
  return qs.parse(responseString, { ignoreQueryPrefix: true });
};

export const PostRequest = async (
  url: string,
  data: any,
  options?: AxiosRequestConfig
): Promise<RequestResponse> => {
  try {
    const security_key = parseQueryString(data).security_key;
    const postResponse = await axios.post(
      (url = `${url}?security_key=${security_key}`),
      (data = qs.stringify(data)),
      (options = options ?? {
        headers: {
          Accept: "application/x-www-form-urlencoded",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
    );
    if (postResponse.status !== 200) {
      console.error("Error in PostRequest", postResponse.data);
      return {
        status: postResponse.status,
        data: postResponse.data,
        message: "Error in PostRequest",
      };
    }
    // Parse the response data if it's a string
    const responseData =
      typeof postResponse.data === "string"
        ? parseQueryString(postResponse.data)
        : postResponse.data;
    return {
      status: postResponse.status,
      data: responseData,
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
    // Parse the response data if it's a string
    const responseData =
      typeof getResponse.data === "string"
        ? parseQueryString(getResponse.data)
        : getResponse.data;
    return {
      status: getResponse.status,
      data: responseData,
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
