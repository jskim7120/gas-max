import React, { useState } from "react";
import axios from "axios";

function Upload() {
  const [file, setFile] = useState(null);

  const UPLOAD_ENDPOINT =
    "http://localhost/react-php-file-upload/backend/upload.php";

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let res = await uploadFile(file);
    console.log(res.data);
  };

  const uploadFile = async (file: any) => {
    const formData = new FormData();
    formData.append("avatar", file);

    return await axios.post(UPLOAD_ENDPOINT, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
  };

  const handleOnChange = (e: any) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleOnChange} />
      <button type="submit">Upload File</button>
    </form>
  );
}

export default Upload;
