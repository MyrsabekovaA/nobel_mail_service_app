import React from "react";
import AutomationItem from "../AutomationItem/AutomationItem";

function AutomationList({ automations, templates, onDelete, onCopy }) {
  return (
    <div className="grid gap-8 grid-cols-3">
      {automations.map((item) => (
        <AutomationItem
          key={item.id}
          automation={item}
          templates={templates}
          onDelete={onDelete}
          onCopy={onCopy}
        />
      ))}
    </div>
  );
}

export default AutomationList;
