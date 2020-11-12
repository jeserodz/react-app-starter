import React from "react";
import { useQuery } from "react-query";
import { AxiosInstance } from "axios";
import { useScreenRequests } from "../hooks/useScreenRequests";
import { Photo } from "../api";

export function PhotosScreen() {
  const requests = useScreenRequests(screenRequests);

  const photos = useQuery("getPhotos", requests.getPhotos, {
    onError: (error) => alert(error),
  });

  return (
    <div>
      <h2>Photos Screen</h2>
      {photos.data &&
        photos.data.map((photo) => (
          <div key={photo.id}>
            <img src={photo.thumbnailUrl} alt={photo.title} width={200} height={200} />
          </div>
        ))}
    </div>
  );
}

const screenRequests = (apiClient: AxiosInstance) => ({
  getPhotos: () => apiClient.get("/photos?_limit=10").then((res) => res.data as Photo[]),
});
