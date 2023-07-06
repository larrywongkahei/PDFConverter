import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf, faImage, faArrowDown } from '@fortawesome/free-solid-svg-icons'
function App() {

  const [data, setData] = useState();

  function handleUpload(){
    document.getElementById('inputFile').click();
  }

  function handleToPdf(){
    let formData = new FormData();
    formData.append("file", data)
    fetch("http://localhost:8080/image/image", {
      method:"POST",
      body:formData
    }).then(
      response => {response.blob().then(dataToUrl => {
        const link = document.createElement('a');
        link.setAttribute('download', 'ImageToPdf')
        link.href = URL.createObjectURL(dataToUrl);
        link.click();
      })}
    )
  }

  function handleData(e){
    setData(e.target.files[0])
  }

  function handleDrop(e){
    e.preventDefault();
    setData(e.dataTransfer.files[0])
  }

  function handleDragOver(e){
    e.preventDefault();
  }

  return (
    <div className='container'>
      <div id='label-file-upload'  onDrop={handleDrop} onDragOver={handleDragOver}>
        <div className='uploadIntroduction'>
          <input type='file' id='inputFile' onChange={handleData} accept='image/*'/>
          {data ? 
          <div className='uploadedData'>
            <FontAwesomeIcon icon={faImage} className='imageIcon'/>
            <p>
              {data?.name}
            </p>
            <p>
              {data.size} bytes
            </p>
          </div> : 
          <p>
            Drag and frop your file here or
          </p> }
          <button onClick={handleUpload} className='uploadButton'>Upload</button>
          <p>
            Maximum 10MB
          </p>
          
        </div>
      </div>
      {data ? 
      <div className='downloadContainer'>
      <FontAwesomeIcon icon={faArrowDown} className='arrowDown' />
      <div id='download'>
        <p>
          Download
        </p>
      <FontAwesomeIcon icon={faFilePdf} className='pdfIcon' onClick={handleToPdf}/>
      </div>
      </div> : null }

    </div>
  );
}

export default App;
