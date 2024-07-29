import { useState, useCallback, forwardRef, memo } from "react";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";
import pdf from "../data/pdf/Cold-Wheels-August-2024.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
	"pdfjs-dist/build/pdf.worker.min.mjs",
	import.meta.url
).toString();


let pdfName = pdf.split("/").pop().replace(".pdf", "").replace(/[-_]/g, ' ');

const Pages = memo(
    forwardRef((props, ref) => (
        <div className="page" ref={ref}>
            {props.children}
        </div>
    ))
);

Pages.displayName = 'Pages';

function FlipBook() {

	const [numPages, setNumPages] = useState(null);

    const onDocumentLoadSuccess = useCallback(({ numPages }) => {
        setNumPages(numPages);
    }, []);

	return (
        <section id="magazine" className="h-full flex flex-col ml- justify-end items-center md:justify-center scroll-mx-2 pb-20 overflow-hidden max-w-screen-xl mx-auto">
            <div className="text-4xl font-bold p-5">
                <h1>{pdfName}</h1>
            </div>
            <HTMLFlipBook 
                width={550}
                height={711}
                showCover={true} 
                flippingTime={800} 
                maxShadowOpacity={0.6} 
                mobileScrollSupport={true} 
                autoSize={true}>
                    {[...Array(numPages).keys()].map((n) => (
                        <Pages key={n}>
                            <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
                                <Page
                                    pageNumber={n + 1}
                                    width={550}
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
