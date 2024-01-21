import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListsList from "./ListsList/ListsList";
import AddModal from "./AddModal/AddModal";
import { fetchLists } from "/@/GlobalStates/Lists";
import { fetchAutomations } from "/@/GlobalStates/Automation";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

function ListsPage() {
  const dispatch = useDispatch();

  const isOpen = useSelector((state) => state.lists.isModalOpen);
  const isLoading = useSelector((state) => state.lists.isLoading);
  const lists = useSelector((state) => state.lists.eqLists);
  const automations = useSelector((state) => state.automations.automations);

  useEffect(() => {
    dispatch(fetchLists());
    dispatch(fetchAutomations());
  }, []);

  return (
    <div>
      <div className="container mx-auto px-4">
        <div className="flex flex-col">
          <ListsList lists={lists} />
          {isLoading && <LoadingSpinner className="text-center" />}
        </div>
      </div>
      {isOpen && <AddModal automations={automations} />}
    </div>
  );
}

export default ListsPage;
