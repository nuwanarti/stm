import React from 'react'
import SinglePagePDFViewer from "../../components/PdfViewer/SinglePage"

import samplePDF from "./solids_on_soli.pdf";

// import PdfViewer from '../../components/PdfViewer/PdfViewer'
import './home.css'

const Home = (props) => {
    return (<SinglePagePDFViewer pdf={samplePDF} />)
    // return (<PdfViewer pdf={samplePDF} />)
}

export default Home;