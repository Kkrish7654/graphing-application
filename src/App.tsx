import React from "react";
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
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <GraphCanvas dataList={dataPoints} />
        <DataPointList dataPoints={dataPoints} />
      </DndProvider>
    </>
  );
};

export default App;
