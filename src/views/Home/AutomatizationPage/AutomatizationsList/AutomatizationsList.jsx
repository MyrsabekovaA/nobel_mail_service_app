import React from "react";
import AutomatizationItem from "../AutomatizationItem/AutomatizationItem";

function AutomatizationList({ automatizations }) {
  return (
    <div className="grid mxsm:grid-cols-2 md:grid-cols-3">
      {automatizations.map((item) => (
        <AutomatizationItem automatization={item} />
      ))}
    </div>
  );
}

export default AutomatizationList;
