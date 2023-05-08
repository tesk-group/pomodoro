import axios from "../axios";
import { useEffect, useState } from "react";
import PieChart from 'react-pie-graph-chart';
import { slide as Menu } from 'react-burger-menu';
import { TrelloParser } from "../components/TrelloParser";
import { TrelloConnect } from "../components/TrelloConnect";


export default function Statistics() {
  const [taskID, setID] = useState();
  const [taskName, setName] = useState();
  const [connected, setConnected] = useState(false);
  const [data, setData] = useState({
    finished: 0,
    interrupted: 0,
    abandoned: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const updateTaskID = (id) => {
    setID(id);
  };
  const updateTaskName = (name) => {
    setName(name);
  };

  useEffect(() => {
    connectStatistics();
    isConnected().then((isConnected) => setConnected(isConnected));
    console.log("Task ID changed to" + taskID);
    if (taskID) {
      axios
      .get("/api/statistics/tasks/" + taskID)
      .then((response) => {
        console.log(response.data);  
        setData({
          finished: response.data.finished,
          interrupted: response.data.interrupted,
          abandoned: response.data.abandoned,
        });
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        let response = error.response.data;
        let errorMessage = response.errors;

        if (typeof errorMessage !== "string") {
          errorMessage = response.errors[Object.keys(response.errors)[0]];
        }

        alert(errorMessage);
        setIsLoading(false);
      });
    }
  }, [taskID, taskName]);

  const connectStatistics = () => {
    setIsLoading(true);
    axios
      .get("/api/statistics")
      .then((response) => {
        console.log(response.data);  
        setData({
          finished: response.data.finished,
          interrupted: response.data.interrupted,
          abandoned: response.data.abandoned,
        });
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        let response = error.response.data;
        let errorMessage = response.errors;

        if (typeof errorMessage !== "string") {
          errorMessage = response.errors[Object.keys(response.errors)[0]];
        }

        alert(errorMessage);
        setIsLoading(false);
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

  const chartData = [
    {
      type: "Finished: " + data.finished + " Pomodoro ",
      value: data.finished,
      color: '#62B880'
    },
    {
      type: "Interrupted: " + data.interrupted + " Pomodoro ",
      value: data.interrupted,
      color: '#FCF8E8'
    },
    {
      type: "Abandoned: " + data.abandoned + " Pomodoro ",
      value: data.abandoned,
      color: '#FCC0D0'
    },
  ];

  return (
      <>
        <p className="chart_header"> {taskID ? `Previous Two Week Task ${taskName} Statistics` : "Previous Two Week Overall Statistics"} </p>
        <Menu>
          {connected && (
            <button onClick={connectStatistics} id="overall_view"> Overall View </button>
          )}
          <TrelloConnect />
          <TrelloParser updateTaskID={updateTaskID} updateTaskName={updateTaskName} />
        </Menu>
        <div className="chart_container">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <PieChart key={JSON.stringify(chartData)} data={chartData} />
          )}
        </div>
    </>
  );
};
