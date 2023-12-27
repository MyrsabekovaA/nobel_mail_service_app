import { useState } from "react"
import { Form, Link } from "react-router-dom"

//can't bring to global due to possible optimisation issue

const CreateEmailTemplateForm = (props) => {
    const [selectedFiles, setSelectedFiles] = useState([])
    const handleAdding = (e) => {
        const file = e.target.files[0]
        setSelectedFiles([...selectedFiles, file])
        e.target.value = ""
    }
    const onDrop = (e) => {
        e.preventDefault()
        const files = e.dataTransfer.files
        setSelectedFiles([...selectedFiles, ...files])
    }
    const handleDragOver = (e)=>{
        e.preventDefault()
    }
    const handleRemoving = (index) => {
        setSelectedFiles(selectedFiles.filter((el,i)=>i!==index))
    }
    const  handleSubmit = async () => {
        let token = localStorage.getItem('token')
        let formData = new FormData()
        selectedFiles.forEach((selectedFile, i) => {
            console.log(selectedFile)
            formData.append(selectedFile.name, selectedFile);
        })
        const req = await fetch("http://52.59.202.2:3000/api/mail-templates", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        })
        if(req.status===200) {
            setSelectedFiles([])
        }
        const json = await req.json()
        console.log(json)
    }
    return <div onDrop={onDrop}
                onDragOver={handleDragOver}
                className="absolute top-0 left-0 w-full h-full bg-slate-100 dark:bg-gray-900 text-gray-500 dark:text-gray-400">
        <Link className="action-btn delete-btn" to="../">Back</Link>
        <Form onSubmit={handleSubmit}>
            <label htmlFor="files" className="cursor-pointer action-btn">Select Files
            <input type="file"
                   accept=".html"
                   id="files"
                   name="files"
                   className="hidden"
                   onChange={handleAdding}/>
            </label>
            <input type="submit" 
                   className="action-btn delete-btn"/>
        </Form>
        {selectedFiles.map((file, i)=>{
            return <div key={i}>
                    <p>Filename: {file.name}</p>
                    <p>File size: {file.size} bytes</p>
                    <button onClick={() => handleRemoving(i)} className="action-btn delete-btn">Remove</button>
                </div>
        })}
    </div>
}

export default CreateEmailTemplateForm