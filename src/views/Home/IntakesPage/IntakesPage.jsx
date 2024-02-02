import React, { useEffect, useState } from "react";
import IntakesCreateModal from "./IntakesCreateModal/IntakesCreateModal";
import IntakesList from "./IntakesList/IntakesList";
import { useDispatch, useSelector } from "react-redux";
import { fetchIntakes } from "../../../GlobalStates/Intakes";
import IntakesEditModal from "./IntakesEditModal/IntakesEditModal";

function IntakesPage() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isEditModalOpen = useSelector((state) => state.intakes.isEditModalOpen);
  const [programType, setProgramType] = useState("");
  const intakes = useSelector((state) => state.intakes.intakes);

  const handleDisplayState = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    dispatch(fetchIntakes());
  }, [dispatch]);

  return (
    <div>
      <div className="container mx-auto p-4">
        <div className="flex gap-2 flex-wrap mb-4">
          <button
            onClick={() => setIsModalOpen(!isModalOpen)}
            className="flex gap-2 items-center text-compdark dark:text-whiten bg-whiten dark:bg-meta-4 hover:bg-gray-3 dark:hover:bg-graydark shadow-lg border border-gray/50 font-medium py-2 px-4 rounded transition-all duration-200;"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add New
          </button>
          <select
            onChange={(e) => setProgramType(e.target.value)}
            className="cursor-pointer flex gap-2 items-center text-compdark dark:text-whiten bg-whiten dark:bg-meta-4 hover:bg-gray-3 dark:hover:bg-graydark shadow-lg border border-gray/50 font-medium py-2 px-4 rounded transition-all duration-200;"
          >
            <option disabled selected>
              Intake Status
            </option>
            <option value="CLOSED">SUBSCRIBE</option>
            <option value="UNSUBSCRIBE">OPENED</option>
          </select>
        </div>
        <div>
          <IntakesList intakes={intakes} />
        </div>
      </div>
      {isModalOpen && <IntakesCreateModal displayState={handleDisplayState} />}
      {isEditModalOpen && <IntakesEditModal />}
    </div>
  );
}

export default IntakesPage;
