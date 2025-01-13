import ky from "ky";
import qs from "qs";

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
  options?: any
): Promise<RequestResponse> => {
  try {
    const security_key = data.security_key;
    const formData = qs.stringify(data);

    const postResponse = await ky
      .post(`${url}?security_key=${security_key}`, {
        body: formData,
        headers: {
          Accept: "application/x-www-form-urlencoded",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        ...options,
      })
      .text(); // Get the raw text response because NMI returns query strings!

    // Always parse the response as it's always a query string from NMI
    const responseData = parseQueryString(postResponse);

    return {
      status: 200,
      data: responseData,
      message: responseData.responsetext || "Success!",
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
  options?: any
): Promise<RequestResponse> => {
  try {
    const getResponse = await ky.get(url, options).text(); // Same here, always get text
    const responseData = parseQueryString(getResponse);

    return {
      status: 200,
      data: responseData,
      message: responseData.responsetext || "Success!",
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
