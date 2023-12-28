import { redirect } from "react-router-dom";

export async function deleteTemplate({params, request}) {
    let data = await request.formData()
    let id = data.get("id")
    let token = localStorage.getItem("token")
    try {
        const response = await fetch("http://52.59.202.2:3000/api/mail-templates/"+id, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return true
    } catch(err) {
        console.log(err)
        return redirect("../")
    }
}