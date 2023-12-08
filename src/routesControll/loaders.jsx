import { data } from "autoprefixer"

let domain = "http://localhost:3000"

//email templates
export async function emailTemplatesLoader() {
 let templates = await fetch(`${domain}/api/mail-templates`, {
    "headers": {
        'content-type': "aplication/json"
    }
 })
 console.log(templates)
 let data =  await templates.json()
 console.log(data)
 return data
}