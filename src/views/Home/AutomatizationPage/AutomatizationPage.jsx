import React, { useState } from "react";
import AutomatizationList from "./AutomatizationsList/AutomatizationsList";

function AutomatizationPage() {
  const [automatizations, setAutomatizations] = useState(["item1", "item2"]);
  return (
    <div>
      <div className="container mx-auto px-4">
        {/* <div className="flex items-center gap-2 flex-wrap">
            <button></button>
         </div> */}
        <AutomatizationList automatizations={automatizations} />
      </div>
    </div>
  );
}

export default AutomatizationPage;
