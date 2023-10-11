import { useState } from "react";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

async function parseResponse(res) {
  const responseText = await res.text();
  let responseData;
  try {
    responseData = JSON.parse(responseText);
  } catch (err) {
    responseData = { message: responseText };
  }

  responseData = Object.assign(responseData, {
    responseStatus: res.status,
  });

  return responseData;
}

function useBackendRequest(endpoint, token, method, body) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const headers = {};
  if (body) headers["Content-Type"] = "application/json";
  if (token) headers["Authorization"] = "Bearer " + token;

  const options = {
    method: method || "GET",
    headers,
    body: JSON.stringify(body),
    mode: "cors",
  };

  const execute = async () => {
    setLoading(true);
    try {
      const response = await fetch(baseUrl + endpoint, options);
      const responseData = await parseResponse(response);

      if (response.status >= 400) {
        setData(undefined);
        setError(responseData);
        return;
      }

      setData(responseData);
      setError(undefined);
    } catch (err) {
      setData(undefined);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return [data, loading, error, execute];
}

export default useBackendRequest;
