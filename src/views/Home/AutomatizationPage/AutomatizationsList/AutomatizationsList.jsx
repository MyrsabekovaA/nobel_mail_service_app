import React from "react";
import AutomatizationItem from "../AutomatizationItem/AutomatizationItem";

function AutomatizationList({ automatizations, templates, onDelete, onCopy }) {

  return (
    <div className="grid gap-8 md:grid-cols-3">
      {automatizations.map((item) => (
        <AutomatizationItem
          key={item.id}
          automatization={item}
          templates={templates}
          onDelete={onDelete}
          onCopy={onCopy}
        />
      ))}
    </div>
  );
}

export default AutomatizationList;
