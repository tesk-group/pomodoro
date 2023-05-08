import axios from "../axios";
import { useEffect, useState } from "react";
import PieChart from 'react-pie-graph-chart';
import { slide as Menu } from 'react-burger-menu';

export const Statistics = () => {
  const [data, setData] = useState({
    finished: 0,
    interrupted: 0,
    abandoned: 0,
  });

  useEffect(() => {
    const connectStatistics = () => {
      axios
        .get("/api/statistics")
        .then((response) => {
          console.log(response.data);  
          setData({
            finished: response.data.finished,
            interrupted: response.data.interrupted,
            abandoned: response.data.abandoned,
          });
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

    connectStatistics();
  }, []);

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
        <Menu>
        </Menu>
        <div className="chart_container">
            {data.finished !== 0 || data.interrupted !== 0 || data.abandoned !== 0 ?
            <PieChart data={chartData}/>
            :
            <p>Loading...</p>
            }
        </div>
    </>
  );
};
