import React, { useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { Document, Page, pdfjs } from 'react-pdf';
import pdf from '../files/test.pdf';


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Pages = React.forwardRef((props, ref) => {
    return (
        <div className="demoPage" ref={ref} >
            <p>{props.children}</p>
            <p>Page number: {props.number}</p>
        </div>
    );
});

Pages.displayName = 'Pages';

function Flipbook() {

    const [numPages, setNumPages] = useState();

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <div className='h-screen w-screen p-0 m-0 flex flex-col justify-center items-center bg-gray-900 overflow-hidden'>
            <h1 className='text-3xl text-white text-center font-bold p-5'>Magazine</h1>
            <HTMLFlipBook width={460} height={600} maxShadowOpacity={0.4}>
                {
                    [...Array(numPages).keys()].map((pNum) => (
                        <Pages key={pNum} number={pNum + 1}>
                            <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
                                <Page pageNumber={pNum} width={400} renderAnnotationLayer={false} renderTextLayer={false} />
                            </Document>
                        </Pages>
                    ))
                }
            </HTMLFlipBook>
        </div>
    );
}

export default Flipbook;
