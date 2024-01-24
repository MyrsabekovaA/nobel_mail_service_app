import React from "react";
import AutomationItem from "../AutomationItem/AutomationItem";

function AutomationList({ automations, templates }) {
  return (
    <div className="grid gap-8 2xsm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {automations.map((item) => (
        <AutomationItem key={item.id} automation={item} templates={templates} />
      ))}
    </div>
  );
}

export default AutomationList;
