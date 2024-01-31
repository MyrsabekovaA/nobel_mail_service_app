import { redirect } from "react-router-dom";
import store from "/@/GlobalStates/store";
import { emailTemplatesActions } from "/@/GlobalStates/EmailTemplates";

let domain = "https://mail-service-412008.ey.r.appspot.com";

//email templates
export async function emailTemplatesLoader({ params }) {
  const page = Number(params.pageNumber);
  let token = localStorage.getItem("token");
  store.dispatch(emailTemplatesActions.changeEmailTemplatesPage({ page }));
  let templates = await fetch(
    `${domain}/api/mail-templates?${new URLSearchParams({
      page,
      pageSize: 5,
    })}
    `,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(templates);
  let data = await templates.json();
  console.log(data);
  console.log(2);
  return data;
}
