import React, { useEffect, useState } from "react";
import IntakesCreateModal from "./IntakesCreateModal/IntakesCreateModal";
import Pagination from "../../../components/Pagination/Pagination";
import IntakesList from "./IntakesList/IntakesList";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchIntakes,
  setCurrentPage,
  setIntakesPerPage,
} from "../../../GlobalStates/Intakes";
import IntakesEditModal from "./IntakesEditModal/IntakesEditModal";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import LoadingOverlay from "../../../components/LoadingOverlay/LoadingOverlay";

function IntakesPage() {
  const dispatch = useDispatch();

  const intakes = useSelector((state) => state.intakes.intakes);
  const isEditModalOpen = useSelector((state) => state.intakes.isEditModalOpen);
  const currentPage = useSelector((state) => state.intakes.page);
  const totalIntakes = useSelector((state) => state.intakes.totalIntakes);
  const totalPages = useSelector((state) => state.intakes.totalPages);
  const intakesPerPage = useSelector((state) => state.intakes.pageSize);

  const isLoading = useSelector((state) => state.intakes.isLoading);
  const isLoadingOverlay = useSelector(
    (state) => state.intakes.isLoadingOverlay
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [programStatus, setProgramStatus] = useState("");

  const handleDisplayState = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handlePageChange = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
  };

  useEffect(() => {
    dispatch(
      fetchIntakes({
        page: currentPage,
        pageSize: intakesPerPage,
        status: programStatus,
      })
    );
  }, [dispatch, programStatus, currentPage, intakesPerPage]);

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
            onChange={(e) => setProgramStatus(e.target.value)}
            className="cursor-pointer flex gap-2 items-center text-compdark dark:text-whiten bg-whiten dark:bg-meta-4 hover:bg-gray-3 dark:hover:bg-graydark shadow-lg border border-gray/50 font-medium py-2 px-4 rounded transition-all duration-200;"
          >
            <option disabled selected>
              Intake Status
            </option>
            <option value="CLOSED">Closed</option>
            <option value="OPENED">Opened</option>
          </select>
        </div>
        <div className="flex flex-col">
          <IntakesList intakes={intakes} />
          {isLoading && <LoadingSpinner />}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onChange={handlePageChange}
            itemsPerPage={intakesPerPage}
            totalItems={totalIntakes}
          />
          {totalIntakes > 20 && (
            <div className="flex justify-end mt-4 items-center gap-2">
              <label
                htmlFor="contacts-per-page"
                className="text-slate-800 text-slate-200"
              >
                Intakes per page:
              </label>
              <select
                id="contacts-per-page"
                onChange={(e) =>
                  dispatch(setIntakesPerPage(Number(e.target.value)))
                }
                className="bg-whiten border border-gray/50 text-graydark text-sm rounded-lg focus:ring-meta-5 focus:border-meta-5 p-2.5 dark:bg-compdark dark:border-gray/50 dark:placeholder-gray/50 dark:text-whiten dark:focus:ring-meta-5 dark:focus:border-green300"
              >
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </div>
          )}
        </div>
      </div>
      {isModalOpen && <IntakesCreateModal displayState={handleDisplayState} />}
      {isEditModalOpen && <IntakesEditModal />}
      {isLoadingOverlay && <LoadingOverlay />}
    </div>
  );
}

export default IntakesPage;
