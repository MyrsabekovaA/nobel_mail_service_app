import React, { useEffect, useState } from "react";
import { Link, redirect, useLoaderData, useNavigate, useParams, Outlet} from "react-router-dom";
import EmailTemplate from "./EmailTemplate/EmailTemplate";
import "./EmailTemplates.css"
import { emailTemplatesActions } from "/@/GlobalStates/EmailTemplates";
import { useDispatch, useSelector } from "react-redux";
function EmailTemplates(props) {
    let templates = useLoaderData()
    console.log(templates)
    let [allInputsValue, setAllInputsValue] = useState(false)
    let [paginationActive, setPaginationActive] = useState(false)
    const params = useParams()
    const page = Number(params.pageNumber)
    console.log(page)
    let [inputPageValue, setInputPageValue] = useState(page)
    console.log(inputPageValue)
    const navigate = useNavigate()
    useEffect(() => {
        setInputPageValue(page);
    }, [page])
    function changeAllInputsValues(e) {
        setAllInputsValue(e.target.checked)
    }
    return <div className="relative w-full p-4 bg-slate-100 dark:bg-gray-900 text-gray-500 dark:text-gray-400" >
        <div className="">
            <Link className="action-btn" to="create">create</Link>
            <Link className="action-btn  ml-3" to="read">inspect</Link>
            <Link className="action-btn  ml-3" to="update">edit</Link>
            <Link className="action-btn delete-btn  ml-3" to="delete">delete</Link>
        </div>
        <table className="mt-3 ">
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
                    return <EmailTemplate key={template.id} templateInfo={template} checked={allInputsValue}/>
                })}
            </tbody>
        </table>
        <div className="flex">
                {page<=1||
                <Link className="" to={`/home/emailTemplates/${page-1}`}>{true&&"<"}</Link>}
                                    {paginationActive?
                                    <input type="number" 
                                           min="1" 
                                           value={inputPageValue} 
                                           onChange={(e)=>setInputPageValue(e.target.value)}
                                           onBlur={(e)=>{
                                            setPaginationActive(false)
                                            navigate(`/home/emailTemplates/${e.target.value}`)
                                           }}/>:
                                    <div className="" onClick={()=>setPaginationActive(true)}>
                                    {page}
                                    </div>}
                
                <Link className="" to={`/home/emailTemplates/${page+1}`}>{true&&">"}</Link>
        </div>
        <Outlet/>
    </div>
}

export default EmailTemplates