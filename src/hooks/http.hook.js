import { useCallback, useState } from "react";

export const useHttp = () => {
  const [statusRequest, setStatusRequest] = useState("loading");

  const getData = useCallback(
    async (
      url,
      method = "GET",
      body = null,
      headers = { "Content-Type": "application/json" }
    ) => {
      try {
        const response = await fetch(url, { method, body, headers });

        if (!response.ok) {
          throw new Error(`Could not fetch ${url}, status: ${response.status}`);
        }

        setStatusRequest("loaded");
        const data = await response.json();

        return data;
      } catch (e) {
        setStatusRequest("error");
        throw e;
      }
    },
    []
  );

  const patchData = useCallback(
    async (
      url,
      method = "PATCH",
      body = null,
      headers = { "Content-Type": "application/json" }
    ) => {
      try {
        const response = await fetch(url, { method, body, headers });

        if (!response.ok) {
          throw new Error(`Could not fetch ${url}, status: ${response.status}`);
        }

        setStatusRequest("loaded");
        const data = await response.json();

        return data;
      } catch (e) {
        setStatusRequest("error");
        throw e;
      }
    },
    []
  );

  const postData = useCallback(
    async (
      url,
      method = "POST",
      body = null,
      headers = { "Content-Type": "application/json" }
    ) => {
      try {
        const response = await fetch(url, { method, body, headers });

        if (!response.ok) {
          throw new Error(`Could not fetch ${url}, status: ${response.status}`);
        }

        setStatusRequest("loaded");
        const data = await response.json();

        return data;
      } catch (e) {
        setStatusRequest("error");
        throw e;
      }
    },
    []
  );

  const deleteData = useCallback(
    async (
      url,
      method = "DELETE",
      body = null,
      headers = { "Content-Type": "application/json" }
    ) => {
      try {
        const response = await fetch(url, { method, body, headers });

        if (!response.ok) {
          throw new Error(`Could not fetch ${url}, status: ${response.status}`);
        }

        setStatusRequest("loaded");
        const data = await response.json();

        return data;
      } catch (e) {
        setStatusRequest("error");
        throw e;
      }
    },
    []
  );

  return {
    statusRequest,
    setStatusRequest,
    getData,
    patchData,
    postData,
    deleteData,
  };
};
