import React, { useEffect } from "react";
import { emailTemplatesActions } from "/@/GlobalStates/EmailTemplates";
import { useDispatch, useSelector } from "react-redux";

const EmailTemplate = (props) => {
  const { id, name, googleDriveFileId } = props.templateInfo;
  const dispatch = useDispatch();
  const emailTemplates = useSelector(
    (state) => state.emailTemplates.selectedTemplates
  );
  console.log(emailTemplates);
  //counting if checked
  let checked = emailTemplates.some((template) => template.id === id) || null;
  const handleChange = (e) => {
    if (e.target.checked === true) {
      dispatch(
        emailTemplatesActions.emailTemplatesSelectedPush({
          id,
          name,
          googleDriveFileId,
        })
      );
    } else {
      console.log(1);
      dispatch(emailTemplatesActions.emailTemplatesSelectedRemove({ id }));
      console.log(checked);
      console.log(emailTemplates.some((template) => template.id === id));
    }
  };
  return (
    <tr>
      <td className="email-templates__table-cell">
        <input
          type="checkbox"
          checked={checked ? true : null}
          onChange={handleChange}
        />
      </td>
      <td className="email-templates__table-cell">{id}</td>
      <td className="email-templates__table-cell">{name}</td>
      <td className="email-templates__table-cell">
        <a
          href={`https://docs.google.com/document/d/${googleDriveFileId}/edit`}
        >
          See in google docs
        </a>
      </td>
    </tr>
  );
};

export default EmailTemplate;
