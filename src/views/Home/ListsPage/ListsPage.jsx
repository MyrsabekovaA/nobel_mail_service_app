import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListsList from "./ListsList/ListsList";
import AddModal from "./AddModal/AddModal";
import { fetchLists } from "/@/GlobalStates/Lists";
import { fetchAutomatizations } from "/@/GlobalStates/Automatization";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

function ListsPage() {
  const dispatch = useDispatch();

  const isOpen = useSelector((state) => state.lists.isModalOpen);
  const isLoading = useSelector((state) => state.lists.isLoading);
  const lists = useSelector((state) => state.lists.eqLists);
  const automatizations = useSelector(
    (state) => state.automatization.automatizations
  );

  useEffect(() => {
    dispatch(fetchLists());
    dispatch(fetchAutomatizations());
  }, []);

  return (
    <div>
      <div className="container mx-auto px-4">
        <div className="flex flex-col">
          <ListsList lists={lists} />
          {isLoading && <LoadingSpinner className="text-center" />}
        </div>
      </div>
      {isOpen && <AddModal automatizations={automatizations} />}
    </div>
  );
}

export default ListsPage;
