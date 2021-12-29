import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const Demo = () => {

    const [files, setFiles] = useState([]);

    const onInputChange = (e) => {
        setFiles(e.target.files)
    };
    const onSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();

        for(let i = 0; i < files.length; i++) {
            data.append('file', files[i]);
        }

        axios.post('http://localhost:8080/api/uploadFile', data)
            .then((response) => {
                toast.success('Upload Success');
                
            })
            .catch((e) => {
                toast.error('Upload Error')
            })
    };
    return(
        <form onSubmit={onSubmit}>
        <div className="form-group files">
            <label>Upload Your File </label>
            <input type="file"
                   onChange={onInputChange}
                   className="form-control"
                   multiple/>
        </div>

        <button>Submit</button>
    </form>
);
}

export default Demo