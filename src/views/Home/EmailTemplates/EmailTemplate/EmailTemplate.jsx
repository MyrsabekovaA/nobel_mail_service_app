import React from "react";

const EmailTemplate = (props) => {
    const APIinfo = props.templateInfo
    return <tr>
            <td className="email-templates__table-cell"><input type="checkbox" checked={props.checked?true:null}/></td>
            <td className="email-templates__table-cell">{APIinfo.id}</td>
            <td className="email-templates__table-cell">{APIinfo.name}</td>
            <td className="email-templates__table-cell"><a href={`https://docs.google.com/document/d/${APIinfo.googleDriveId}/edit`}>See in google docs</a></td>
        </tr>
}

export default EmailTemplate