import React from "react";
import { useLoaderData } from "react-router-dom";
function EmailTemplates(props) {
    let templates = useLoaderData().data
    return <div>
        <h2>emailTemplates</h2>
        <span>{templates.map((template)=>{
            return <div>{template.id}</div>
        })}</span>
    </div>
}

export default EmailTemplates