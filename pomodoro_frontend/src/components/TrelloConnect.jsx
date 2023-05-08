import axios from "../axios";
import { useState, useEffect } from "react";

const connectTrello = () => {
  axios
    .get("/api/oauth/trello/endpoint")
    .then((response) => {
      console.log(response.data.endpoint);
      window.open(response.data.endpoint, "_blank");
    })
    .catch(function (error) {
      console.log(error);
      let response = error.response.data;
      let errorMessage = response.errors;

      if (typeof errorMessage !== "string") {
        errorMessage = response.errors[Object.keys(response.errors)[0]];
      }

      alert(errorMessage);
    });
};

const isConnected = () => {
  return axios
    .get("/api/users/me")
    .then((response) => {
      return response.data.linked_providers.includes("trello");
    })
    .catch(function (error) {
      console.log(error);
      let response = error.response.data;
      let errorMessage = response.errors;

      if (typeof errorMessage !== "string") {
        errorMessage = response.errors[Object.keys(response.errors)[0]];
      }

      alert(errorMessage);
      return false;
    });
};

export const TrelloConnect = () => {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    isConnected().then((isConnected) => setConnected(isConnected));
  }, []);

  return (
    <>
      {!connected && (
        <button onClick={connectTrello}> Connect Your Trello Account </button>
      )}
    </>
  );
};
