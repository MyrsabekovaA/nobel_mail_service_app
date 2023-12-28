import { useState } from "react"
import { useSelector } from "react-redux"
import { Link, useSubmit } from "react-router-dom"

const EmailTemplatesDeletePopup = (props) => {
    const selectedTemplates = useSelector(state=>state.emailTemplates.selectedTemplates)
    const submit = useSubmit()
    const [agree, setAgree] = useState(false)
    function handleAgreeInputChange(e) {
        setAgree(e.target.checked)
    }
    const selectedTemplatesIds = selectedTemplates.map(template=>template.id)
    async function handleSubmit(e) {
            e.preventDefault()
            if(!agree) {
                alert("Please set checkbox to continue")
                return
            }
            await selectedTemplatesIds.forEach(async (id) => {
                await submit({id}, {
                    method: "post",
                    action: `/home/emailTemplates/1/delete/${id}`
                })
            });
    }
    return (
        <div>
            <div>
                <Link to="../">X</Link>
            </div>
            <input type="checkbox" checked={agree} onChange={handleAgreeInputChange}/>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default EmailTemplatesDeletePopup;