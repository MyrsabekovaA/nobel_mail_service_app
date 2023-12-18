import { data } from "autoprefixer"

let domain = "http://52.59.202.2:3000"

//email templates
export async function emailTemplatesLoader() {
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ODAyZTMwYzc2ZGVjZWVlMjA4ZTYwNSIsImlhdCI6MTcwMjg5OTI2NSwiZXhwIjoxNzAyOTcxMjY1fQ.qAoB2MseeWBzBBEKjppxzu6ZZpjLE2y4BIREHD3rW-U'
 let templates = await fetch(`${domain}/api/mail-templates`, {
    method: "GET",
    "headers": {
        Authorization: `Bearer ${token}`,
    }
 })
 console.log(templates)
 let data =  await templates.json()
 console.log(data)
 return data
}