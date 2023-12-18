import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import EmailTemplate from "./EmailTemplate/EmailTemplate";
import "./EmailTemplates.css"
function EmailTemplates(props) {
    let templates = useLoaderData().data
    let [allInputsValue, setAllInputsValue] = useState(false)
    function changeAllInputsValues(e) {
        setAllInputsValue(e.target.checked)
    }
    return <div className="w-full p-4 bg-slate-100 dark:bg-gray-900" >
        <div className="">
            <button className="action-btn ">create</button>
            <button className="action-btn  ml-3">inspect</button>
            <button className="action-btn  ml-3">edit</button>
            <button className="action-btn delete-btn  ml-3">delete</button>
        </div>
        <table className="mt-3 text-gray-500 dark:text-gray-400">
            <thead>
                <tr>
                    <th className="email-templates__table-cell">
                        <input type="checkbox" onClick={changeAllInputsValues}/>
                    </th>
                    <th className="email-templates__table-cell">Id</th>
                    <th className="email-templates__table-cell">Name</th>
                    <th className="email-templates__table-cell">Link</th>
                </tr> 
            </thead>
            <tbody>
                {templates.map((template)=>{
                    return <EmailTemplate templateInfo={template} checked={allInputsValue}/>
                })}
            </tbody>
        </table>
    </div>
}

export default EmailTemplates