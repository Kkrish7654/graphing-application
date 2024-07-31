import { useState } from "react";
import { DndProvider } from "react-dnd";
import DataPointList from "./components/Datapoint";
import GraphCanvas from "./components/GraphCanvas";
import { HTML5Backend } from "react-dnd-html5-backend";

export type DataPoint = {
  id: number;
  x: number;
  y: number;
};

const dataPoints: DataPoint[] = [
  { id: 1, x: 1, y: 2 },
  { id: 2, x: 2, y: 4 },
  { id: 3, x: 3, y: 6 },
  { id: 4, x: 4, y: 8 },
  { id: 5, x: 5, y: 10 },
  { id: 6, x: 6, y: 12 },
  { id: 7, x: 7, y: 14 },
  { id: 8, x: 8, y: 16 },
  { id: 9, x: 9, y: 18 },
  { id: 10, x: 10, y: 20 },
  { id: 11, x: 11, y: 22 },
  { id: 12, x: 12, y: 24 },
  { id: 13, x: 13, y: 26 },
  { id: 14, x: 14, y: 28 },
  { id: 15, x: 15, y: 30 },
];

const App = () => {
  const [list, setList] =
    useState<{ id: number; x: number; y: number }[]>(dataPoints);

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            gap: "10rem",
          }}
        >
          <DataPointList dataPoints={list} setDataPoints={setList} />
          <GraphCanvas dataList={list} setDataList={setList} />

          <section>
            <h1 style={{ color: "red" }}>Graphing Application</h1>

            <ul
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <li>Drag data points from the left table to the right graph.</li>
              <li>
                Click on Point in the graph to perform update and delete
                actions.
              </li>
              <li>
                Once you click on a point, a popup will appear with options to
                either update or delete the selected point.
              </li>
              <li>
                The selected point will be removed from the graph. If the point
                does not already exist in the available data points list, it
                will be added back to this list.
              </li>
              <li>
                The graph will update in real-time as you add or remove points.
              </li>
              <li>
                The List will be update correctly as you add or remove points or
                update points.
              </li>
            </ul>
          </section>
        </div>
      </DndProvider>
    </>
  );
};

export default App;
