import { data } from "autoprefixer"

let domain = "http://52.59.202.2:3000"

//email templates
export async function emailTemplatesLoader() {
    let token = localStorage.getItem('token')
 let templates = await fetch(`${domain}/api/mail-templates`, {
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