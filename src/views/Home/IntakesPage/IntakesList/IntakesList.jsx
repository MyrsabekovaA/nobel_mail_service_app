import React from "react";
import IntakeItem from "../IntakeItem/IntakeItem";

function IntakesList({ intakes }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-gray/20 text-gray dark:text-gray-400">
        <thead className="text-xs uppercase whitespace-nowrap">
          <tr className="dark:bg-graydark">
            <th scope="col" className="px-4 py-3 text-center">
              Actions
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              EduQuest Date
            </th>
            <th scope="col" className="px-4 py-3 text-center">
              Orientation Day Date
            </th>
            <th scope="col" className="px-4 py-3 text-center">
              First Class Date
            </th>
            <th scope="col" className="px-4 py-3 text-center">
              Program Type
            </th>
            <th scope="col" className="px-4 py-3 text-center">
              Program Status
            </th>
          </tr>
        </thead>
        <tbody>
          {intakes.map((item) => (
            <IntakeItem key={item.id} intake={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default IntakesList;
