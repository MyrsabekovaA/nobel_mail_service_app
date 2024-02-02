import React from "react";
import IntakeItem from "../IntakeItem/IntakeItem";

function IntakesList({ intakes }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-gray/20 text-gray dark:text-gray-400">
        <thead className="text-xs uppercase whitespace-nowrap">
          <tr className="dark:bg-graydark">
            <th scope="col" className="px-4 py-3">
              Edit
            </th>
            <th scope="col" className="px-6 py-3 ">
              <div className="flex gap-1 items-center justify-center">
                EduQuest Date
              </div>
            </th>
            <th scope="col" className="px-4 py-3">
              <div className="flex gap-1 items-center">
                Orientation Day Date
              </div>
            </th>
            <th scope="col" className="px-4 py-3">
              <div className="flex gap-1 items-center">First Class Date</div>
            </th>
            <th scope="col" className="px-4 py-3">
              <div className="flex gap-1 items-center">Program Type</div>
            </th>
            <th scope="col" className="px-4 py-3">
              <div className="flex gap-1 items-center">Program Status</div>
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
