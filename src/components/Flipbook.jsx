import React, { useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";
import pdf from "../data/pdf/Cold-Wheels-August-2024.pdf";
import Loading from "./Loading";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
	"pdfjs-dist/build/pdf.worker.min.mjs",
	import.meta.url
).toString();

let pdf_name = pdf.split("/")[pdf.split("/").length - 1].replace(".pdf", "")
pdf_name = pdf_name.replace(/[-_]/g, ' ');

const Pages = React.forwardRef((props, ref) => {
	return (
		<div className="demoPage" ref={ref}>
			{props.children}
		</div>
	);
});

function FlipBook() {

    const [loading, setLoading] = useState(true);
	const [numPages, setNumPages] = useState(null);
    const [initialMargin, setInitialMargin] = useState("ml-[-40%]");

	const onDocumentLoadSuccess = ({ numPages }) => {
		setNumPages(numPages);
        setTimeout(()=>{

            setLoading(false);
        },1000)
	};

    const handleFirstPageClick = () => {
        if (initialMargin === "ml-[-40%]") {
            setInitialMargin("ml-[7%]");
        }
    };

    const handleFlip = (e) => {
        if (e.data === 0) {
            setInitialMargin("ml-[-40%]");
        } else if (e.data === numPages - 1) {
            setInitialMargin("ml-[55%]");
        } else {
            setInitialMargin("ml-[7%]");
        }
    };

	return (
        <section id="magazine" className="h-fit flex flex-col justify-end items-center md:justify-center scroll-mx-2 pb-20 overflow-hidden max-w-screen-xl mx-auto">
            {loading && <Loading loading = {loading} />}
            <div className="text-4xl font-bold p-5">
                <h1>{pdf_name}</h1>
            </div>
            <div className={`h-full w-full relative transition-all ${initialMargin} duration-200`}
				onClick={handleFirstPageClick}
			>
                <HTMLFlipBook width={595} height={769} showCover={true} flippingTime={800} maxShadowOpacity={0.6} onFlip={handleFlip}>
                    {[...Array(numPages).keys()].map((n) => (
                        <Pages key={n} number={`${n + 1}`}>
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
            </div>
        </section>
	);
}

export default FlipBook;
