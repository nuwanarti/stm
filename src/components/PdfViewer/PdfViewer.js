import React, { useState } from 'react';
import { Document, Page, pdfjs} from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = 'pdf.worker.min.js';

const options = {
    cMapUrl: 'cmaps/',
    cMapPacked: true,
  };

const PdfViewer = () => {
const [file, setFile] = useState('./solids_on_soli.pdf');
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  }
//   const onDocumentLoadSuccess = ({ numPages }) => {
//     setNumPages(numPages);
//   }

  const onDocumentLoadSuccess = ({ numPages: nextNumPages }) => {
    setNumPages(nextNumPages);
  }

  return (
    <div className="Example">
    <header>
      <h1>react-pdf sample page</h1>
    </header>
    <div className="Example__container">
      <div className="Example__container__load">
        <label htmlFor="file">Load from file:</label>
        {' '}
        <input
          onChange={onFileChange}
          type="file"
        />
      </div>
      <div className="Example__container__document">
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          options={options}
        >
          {
            Array.from(
              new Array(numPages),
              (el, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                />
              ),
            )
          }
        </Document>
      </div>
    </div>
  </div>

  );
}

export default PdfViewer


    // {/* <div>
    //   <Document
    //     file={file}
    //     onLoadSuccess={onDocumentLoadSuccess}
    //   >
    //     <Page pageNumber={pageNumber} />
    //   </Document>
    //   <p>Page {pageNumber} of {numPages}</p>
    // </div> */}