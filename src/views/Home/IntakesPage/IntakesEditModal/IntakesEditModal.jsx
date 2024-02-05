import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editIntake, toggleModalEdit } from "../../../../GlobalStates/Intakes";
import CustomDatepicker from "../../../../components/CustomDatepicker/CustomDatepicker";

function IntakesEditModal() {
  const dispatch = useDispatch();
  const intakeData = useSelector((state) => state.intakes.selectedIntake);
  //   const [intakeId, setIntakeId] = useState(intakeData.id);
  const [updatedIntake, setUpdatedIntake] = useState({
    eventDate: intakeData.eventDate,
    orientationEventDateTime: intakeData.orientationEventDateTime,
    firstInternshipClassDateTime: intakeData.firstInternshipClassDateTime,
    programType: intakeData.programType,
    status: intakeData.status,
  });

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const handleDateChange = (id, newDate) => {
    setUpdatedIntake((prevContact) => ({
      ...prevContact,
      [id]: newDate,
    }));
  };
  useEffect(() => {
    console.log(intakeData.id);
  }, [intakeData]);
  return (
    <div
      onClick={() => dispatch(toggleModalEdit())}
      className="fixed inset-0 z-50 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center"
    >
      <div
        onClick={handleModalClick}
        className="bg-whiten dark:bg-compdark rounded-lg shadow-xl p-4 md:w-[500px] 2xsm:w-80"
      >
        <h2 className="text-xl text-compdark dark:text-whiten font-medium mb-8 text-center block">
          Edit Intake
        </h2>
        <form>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="eventDate">Event Date</label>
              <CustomDatepicker
                id="eventDate"
                initialDate={updatedIntake.eventDate}
                onDateChange={(newDate) =>
                  handleDateChange("eventDate", newDate)
                }
                timeOptionOn={true}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="orientationEventDateTime">
                Orientation Event Time
              </label>
              <CustomDatepicker
                id="orientationEventDateTime"
                initialDate={updatedIntake.orientationEventDateTime}
                onDateChange={(newDate) =>
                  handleDateChange("orientationEventDateTime", newDate)
                }
                timeOptionOn={true}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="firstInternshipClassDateTime">
                First Class Time
              </label>
              <CustomDatepicker
                id="firstInternshipClassDateTime"
                initialDate={updatedIntake.firstInternshipClassDateTime}
                onDateChange={(newDate) =>
                  handleDateChange("firstInternshipClassDateTime", newDate)
                }
                timeOptionOn={true}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="programType">Program Type</label>
              <select
                id="programType"
                value={updatedIntake.programType}
                onChange={() => setUpdatedIntake(updatedIntake.programType)}
                className="bg-whiten border border-gray/50 text-graydark text-sm rounded-lg focus:ring-meta-5 focus:border-meta-5 block w-full p-2.5 dark:bg-compdark dark:border-gray/50 dark:placeholder-gray/50 dark:text-whiten dark:focus:ring-meta-5 dark:focus:border-green300"
              >
                <option disabled selected>
                  Select Program Type
                </option>
                <option value="WEEKDAY">Weekday</option>
                <option value="WEEKEND">Weekend</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="status">Program Status</label>
              <select
                id="status"
                value={updatedIntake.status}
                onChange={() => setUpdatedIntake(updatedIntake.status)}
                className="bg-whiten border border-gray/50 text-graydark text-sm rounded-lg focus:ring-meta-5 focus:border-meta-5 block w-full p-2.5 dark:bg-compdark dark:border-gray/50 dark:placeholder-gray/50 dark:text-whiten dark:focus:ring-meta-5 dark:focus:border-green300"
              >
                <option disabled selected>
                  Select Program Type
                </option>
                <option value="CLOSED">Closed</option>
                <option value="OPENED">Opened</option>
              </select>
            </div>
          </div>
        </form>
        <div className="flex justify-end mt-6">
          <button
            onClick={() =>
              dispatch(
                editIntake({ id: intakeData.id, payload: updatedIntake })
              )
            }
            className="bg-green300 text-meta-2 dark:bg-success hover:bg-green300 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg  outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
          >
            Create
          </button>
          <button
            onClick={() => dispatch(toggleModalEdit())}
            className="bg-gray/50 text-whiten font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ml-1 mb-1 ease-linear transition-all duration-150"
            type="button"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default IntakesEditModal;
