import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function ViewEmailTemplatePopUp() {
  const [templateNumber, setTemplateNumber] = useState(0);
  const SelectedTemplates = useSelector(
    (state) => state.emailTemplates.selectedTemplates
  );
  const currentId = SelectedTemplates[templateNumber]?.id;
  const [template, setTemplate] = useState(null);
  useEffect(() => {
    // Fetch template data when templateNumber or SelectedTemplates change
    const token = localStorage.getItem("token");
    const fetchTemplate = async () => {
      if (SelectedTemplates.length > 0) {
        const response = await fetch(
          `https://mail-service-412008.ey.r.appspot.com/api/mail-templates/${currentId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.text();
        console.log(data);
        setTemplate(data);
      }
    };

    fetchTemplate();
  }, [templateNumber, SelectedTemplates]);
  return (
    <>
      {templateNumber > 0 && (
        <button onClick={() => setTemplateNumber(templateNumber - 1)}>
          {"<"}
        </button>
      )}
      <div dangerouslySetInnerHTML={{ __html: template }}></div>
      {templateNumber + 1 < SelectedTemplates.length && (
        <button onClick={() => setTemplateNumber(templateNumber + 1)}>
          {">"}
        </button>
      )}
    </>
  );
}

export default ViewEmailTemplatePopUp;
