import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { contactsActions } from '/@/GlobalStates/Contacts';


function MyComponent() {
    //subscribes to all changes in state.contacts
    let contacts = useSelector((state)=>state.contacts)
    console.log(contacts)
    //finding values
    let pageNumber = contacts.page
    let selected = contacts.selected
    //for calling actions
    const dispatch = useDispatch();
    
    //decorator
    const changePage = (newPageNumber) => {
      dispatch(contactsActions.contactsSelectPage({ page: newPageNumber }));
    };
    return (
      <div>
        {pageNumber}
        {selected.map((id, i)=>(<div key={i}>{id}</div>))}
        <button onClick={() => changePage(2)}>Go to Page 2</button>
        {/*calling without decorator*/}
        <button onClick={() => dispatch(contactsActions.contactsPushSelected({ contact: 4}))}>select 4</button>
      </div>
    );
  }
  
  export default MyComponent;
  