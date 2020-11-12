import { useState, useEffect } from "react";
import { AxiosInstance } from "axios";
import { useStoreState } from "../store";

export function useScreenRequests<T>(requestsFactory: (apiClient: AxiosInstance) => T) {
  const apiClient = useStoreState((state) => state.apiClient);
  const [requests, setRequests] = useState(requestsFactory(apiClient));

  useEffect(() => {
    setRequests(requestsFactory(apiClient));
  }, [requestsFactory, apiClient]);

  return requests;
}
