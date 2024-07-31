/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDrag } from "react-dnd";

// ---------------------------- Dragable Data Point ---------------------------- //
const DataPoint = ({
  id,
  x,
  y,
  dropPoint,
}: {
  id: number;
  x: number;
  y: number;
  dropPoint: (item: { id: number; x: number; y: number }) => void;
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "DATAPOINT",
    item: { id, x, y },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        dropPoint(item);
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <tr
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1, border: "1px solid black" }}
    >
      <td style={{ border: "1px solid black", padding: "5px" }}>{x}</td>
      <td style={{ border: "1px solid black", padding: "5px" }}>{y}</td>
    </tr>
  );
};

// ------------------------------- Data Point List ------------------------------------ //
const DataPointList = ({
  dataPoints,
  setDataPoints,
}: {
  dataPoints: { id: number; x: number; y: number }[];
  setDataPoints: any;
}) => {
  function dropPoint(item: { id: number; x: number; y: number }) {
    setDataPoints((prev: any) => prev.filter((p: any) => p.id !== item.id));
  }
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>X</th>
            <th>Y</th>
          </tr>
        </thead>
        <tbody>
          {dataPoints.map((point) => (
            <DataPoint
              key={point.id}
              id={point.id}
              x={point.x}
              y={point.y}
              dropPoint={dropPoint}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataPointList;
