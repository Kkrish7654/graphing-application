import React, { useState } from "react";
import { useDrag } from "react-dnd";

const DataPoint = ({
  id,
  x,
  y,
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
        console.log(`dropped ${item.x}, ${item.y}`);
        // dropPoint(item);
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      ({x}, {y})
    </div>
  );
};

const DataPointList = ({
  dataPoints,
}: {
  dataPoints: { id: number; x: number; y: number }[];
}) => {
  const [list, setList] =
    useState<{ id: number; x: number; y: number }[]>(dataPoints);

  function dropPoint(item: { x: number; y: number }) {
    setList((prev) => prev.filter((p) => p.x !== item.x && p.y !== item.y));
  }

  return (
    <div>
      {list?.map((point, index: number) => (
        <DataPoint
          key={index}
          id={point.id}
          x={point.x}
          y={point.y}
          dropPoint={dropPoint}
        />
      ))}
    </div>
  );
};

export default DataPointList;
