/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useDrop } from "react-dnd";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { DataPoint } from "../App";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  BarElement,
  Tooltip,
  Title,
  CategoryScale
);

const GraphCanvas = ({
  dataList,
  setDataList,
}: {
  dataList: DataPoint[];
  setDataList: any;
}) => {
  const [dataPoints, setDataPoints] = useState<
    { id: number; x: number; y: number }[]
  >([]);

  const [chartType, setChartType] = useState<"line" | "bar">("line");
  const [index, setIndex] = useState<{
    id: number;
    x: number;
    y: number;
  } | null>(null);
  const [popup, setPopup] = useState<boolean>(false);
  const [selectedPoint, setSelectedPoint] = useState<{
    id: number;
    x: number;
    y: number;
  } | null>(null);

  // -------------- Add Data Point -------------- //
  const addDataPoint = (point: { id: number; x: number; y: number }) => {
    setDataPoints((prevPoints) => [...prevPoints, point]);
  };

  // -------------- Remove Data Point -------------- //
  const removeDataPoint = (point: { id: number; x: number; y: number }) => {
    setDataPoints((prev) => prev.filter((p) => p.id !== point.id));
    const pointExists = dataList.some(
      (p) => p.x === point.x && p.y === point.y
    );

    if (!pointExists) {
      setDataList((prev: any) => [...prev, point]);
    }
    setPopup(false);
  };

  // -------------- Update Data Point -------------- //
  const updateDataPoint = (point: { id: number; x: number; y: number }) => {
    setDataPoints((prev) => prev.map((p) => (p.id === point.id ? point : p)));

    const pointExists = dataList.some(
      (p) => p.x === index?.x && p.y === index?.y
    );

    if (!pointExists) {
      setDataList((prev: any) => [...prev, index]);
    }
    setPopup(false);
  };

  // -------------- Droped Item -------------- //
  const [, drop] = useDrop(() => ({
    accept: "DATAPOINT",
    drop: (item: { id: number; x: number; y: number }) => addDataPoint(item),
  }));

  // --------------------- Chart Options --------------------- //
  const data = {
    labels: dataPoints.map((point) => point.x),
    datasets: [
      {
        label: "Data Points",
        data: dataPoints.map((point) => point.y),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const options = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClick: function (_e: any, elements: any) {
      if (elements.length > 0) {
        const { index } = elements[0];
        setIndex(dataPoints[index]);
        setPopup(true);
      }
    },
  };
  // --------------------- Chart Options --------------------- //

  return (
    // ===================== Popup Section =================== //
    <div>
      {popup && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            border: "1px solid black",
          }}
        >
          <h1>Update or Delete</h1>

          <select
            onChange={(e) => {
              const [x, y] = e.target.value.split(",").map(Number);
              setSelectedPoint({ id: index!.id, x, y });
            }}
          >
            {dataList.map((item, i) => (
              <option key={i} value={`${item.x},${item.y}`}>
                {item.x} {item.y}
              </option>
            ))}
          </select>

          <button onClick={() => setPopup(false)}>Cancel</button>
          <button
            onClick={() => {
              if (selectedPoint) {
                updateDataPoint(selectedPoint);
              }
            }}
          >
            Update
          </button>
          <button
            onClick={() => {
              if (index) removeDataPoint(index);
            }}
          >
            Delete
          </button>
        </div>
      )}

      {/* ================Chart Section ==================*/}
      <select onChange={(e) => setChartType(e.target.value as "bar" | "line")}>
        <option value="line">Line</option>
        <option value="bar">Bar</option>
      </select>
      <div
        ref={drop}
        style={{ width: "500px", height: "400px", border: "1px solid black" }}
      >
        {dataPoints.length === 0 ? (
          <p>Drop data points here</p>
        ) : (
          <>
            <div>
              {chartType === "line" ? (
                <Line data={data} options={options} />
              ) : chartType === "bar" ? (
                <Bar data={data} options={options} />
              ) : (
                <></>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GraphCanvas;
