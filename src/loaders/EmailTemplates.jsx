import { redirect } from "react-router-dom"
import store from "/@/GlobalStates/store"
import {emailTemplatesActions} from "/@/GlobalStates/EmailTemplates"

let domain = "http://52.59.202.2:3000"

//email templates
export async function emailTemplatesLoader({params}) {
    const page = Number(params.pageNumber)
    let token = localStorage.getItem('token')
    store.dispatch(emailTemplatesActions.changeEmailTemplatesPage({page}))
    let templates = await fetch(`${domain}/api/mail-templates?${
        new URLSearchParams({
            page,
            pageSize: 1
        })}
        `, {
        method: "GET",
        "headers": {
            Authorization: `Bearer ${token}`,
        }
    })
    console.log(templates)
    let data =  await templates.json()
    console.log(data)
    console.log(2)
    return data
}