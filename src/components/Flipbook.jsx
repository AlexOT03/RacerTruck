import React from "react";
import HTMLFlipBook from "react-pageflip";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
// import pdf from "/pdf/all-conditional.pdf";
import pdf from "/pdf/SMPLANTAS.pdf";
import { useTranslations } from "../i18n/utils";

var lang = window.location.pathname.split("/")[1];
if (!lang || lang !== "es") lang = "en";
const t = useTranslations(lang);

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
	"pdfjs-dist/build/pdf.worker.min.mjs",
	import.meta.url
).toString();

const Pages = React.forwardRef((props, ref) => {
	return (
		<div className="demoPage" ref={ref}>
			{props.children}
		</div>
	);
});

function FlipBook() {

	const [numPages, setNumPages] = useState(null);

	const onDocumentLoadSuccess = ({ numPages }) => {
		setNumPages(numPages);
	};

    // pagina grande
    // width 595
    // height 872
    // ---------------
    // pagina mediana
    // width 485
    // height 711
    // ---------------
    // pagina pequeña
    // width 395
    // height 579

	return (
        <section id="magazine" className="h-fit flex flex-col justify-end items-center md:justify-center scroll-mx-2 overflow-hidden pb-20">
            <div className="text-4xl font-bold p-5">
                <h1>{t('flipbook.title')}</h1>
            </div>
            <HTMLFlipBook width={595} height={872} showCover={true} maxShadowOpacity={0.4}>
                {[...Array(numPages).keys()].map((n) => (
                    <Pages number={`${n + 1}`}>
                        <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
                            <Page
                                pageNumber={n + 1}
                                width={595}
                                renderAnnotationLayer={false} 
                                renderTextLayer={false}
                            />
                        </Document>
                    </Pages>
                ))}
            </HTMLFlipBook>
        </section>
	);
}

export default FlipBook;
