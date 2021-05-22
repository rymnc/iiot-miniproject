import React, { useContext, useState } from "react";
import { CaretUpFilled, CaretDown, CaretUp, CaretDownFilled } from "./Carets";
import { DeviceContext } from "./DeviceContext";

const headings = ["Id", "Device Name", "Device Type", "Healthy?", "Added on"];

const initialState = [null, null];

const Headings = () => {
  const { sortBy } = useContext(DeviceContext);
  const [currentOrdered, setCurrentOrdered] = useState(initialState);

  const modifier = (header, order) => {
    setCurrentOrdered([header, order]);
    if (header === null) {
      sortBy("Id", "asc");
    } else sortBy(header, order);
  };

  const isHighlighted = (header, order) => {
    return currentOrdered[0] === header && currentOrdered[1] === order;
  };

  const activate = (header, order) => {
    return {
      onClick: () => modifier(header, order),
      style: { cursor: "pointer" },
    };
  };

  const deactivate = () => {
    return {
      onClick: () => modifier(...initialState),
      style: { cursor: "pointer" },
    };
  };

  return headings.map((header, i) => (
    <th className="text-center" key={i}>
      {header}
      {isHighlighted(header, "asc") ? (
        <CaretUpFilled {...deactivate()} />
      ) : (
        <CaretUp {...activate(header, "asc")} />
      )}
      {isHighlighted(header, "desc") ? (
        <CaretDownFilled {...deactivate()} />
      ) : (
        <CaretDown {...activate(header, "desc")} />
      )}
    </th>
  ));
};

export default Headings;
