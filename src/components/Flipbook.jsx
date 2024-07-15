import React from 'react'
import HTMLFlipBook from 'react-pageflip';
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import pdf from '/pdf/all-conditional.pdf';
import { useTranslations } from '../i18n/utils';

var lang = window.location.pathname.split('/')[1];
if (!lang || lang !== 'es') lang = 'en';
const t = useTranslations(lang);

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
  ).toString();

const PageCover = React.forwardRef((props, ref) => {
    return (
        <div className="page page-cover bg-white" ref={ref} data-density="hard">
            <div className="page-content flex flex-col justify-center items-center text-center">
                <h2>{props.children}</h2>
            </div>
        </div>
    );
});

const Pages = React.forwardRef((props, ref) => {
    return (
        <div className="page" ref={ref} >
            <p>{props.children}</p>
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
        <div className='h-full w-full p-5 flex flex-col justify-center items-center overflow-hidden'>
            <h1 className='text-3xl text-center font-bold pb-5'>{t('flipbook.title')}</h1>
            <HTMLFlipBook width={460} height={600} maxShadowOpacity={0.3} showCover={true}>
                {
                    [...Array(numPages).keys()].map((pNum) => (
                        <Pages key={pNum} number={pNum + 1}>
                            <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
                                <Page pageNumber={pNum+1} width={460} renderAnnotationLayer={false} renderTextLayer={false} />
                            </Document>
                        </Pages>
                    ))
                }
            </HTMLFlipBook>
        </div>
    );
}

export default Flipbook