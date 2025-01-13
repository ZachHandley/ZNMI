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

// Original PostRequest for query string responses
export const PostRequest = async (
  url: string,
  data: any,
  options?: any
): Promise<RequestResponse> => {
  try {
    const security_key = data.security_key;
    const formData = qs.stringify(data);

    const response = await ky.post(`${url}?security_key=${security_key}`, {
      body: formData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      ...options,
    });

    const responseText = await response.text();
    const responseData = parseQueryString(responseText);

    return {
      status: response.status,
      data: responseData,
      message: "Success",
    };
  } catch (error) {
    console.error("Error in PostRequest", error);
    throw error;
  }
};

// XML-specific request methods
export const PostRequestXML = async (
  url: string,
  data: any,
  options?: any
): Promise<string> => {
  try {
    const security_key = data.security_key;
    const formData = qs.stringify(data);

    const response = await ky
      .post(`${url}?security_key=${security_key}`, {
        body: formData,
        headers: {
          Accept: "application/xml",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        ...options,
      })
      .text();

    return response;
  } catch (error) {
    console.error("Error in PostRequestXML", error);
    return `<?xml version="1.0"?>
      <nm_response>
        <error_response>Error in PostRequestXML: ${
          error instanceof Error ? error.message : "Unknown error"
        }</error_response>
      </nm_response>`;
  }
};

export const GetRequestXML = async (
  url: string,
  options?: any
): Promise<string> => {
  try {
    const response = await ky
      .get(url, {
        headers: {
          Accept: "application/xml",
        },
        ...options,
      })
      .text();
    return response;
  } catch (error) {
    console.error("Error in GetRequestXML", error);
    return `<?xml version="1.0"?>
      <nm_response>
        <error_response>Error in GetRequestXML: ${
          error instanceof Error ? error.message : "Unknown error"
        }</error_response>
      </nm_response>`;
  }
};
