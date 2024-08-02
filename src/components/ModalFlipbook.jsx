import { useState, useCallback, forwardRef, memo, useRef, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";
import pdf from "../data/pdf/Cold-Wheels-August-2024.pdf";
import { useTranslations } from "../i18n/utils";

var lang = window.location.pathname.split("/")[1];
if (!lang || lang !== "es") lang = "en";
const t = useTranslations(lang);

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
	"pdfjs-dist/build/pdf.worker.min.mjs",
	import.meta.url
).toString();

function procesarString(input) {
    let partes = input.split('/');
    let nombreArchivo = partes[partes.length - 1];
    return nombreArchivo.split('.pdf')[0].replace(/[-_]/g, ' ');
}
let pdfName = procesarString(pdf);

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
    const [currentPage, setCurrentPage] = useState(1);
    const [initialMargin, setInitialMargin] = useState("lg:ml-[-5.5%]");
    const flipBookRef = useRef(null);

    const onDocumentLoadSuccess = useCallback(({ numPages }) => {
        setNumPages(numPages);
    }, []);

    const handleFlip = (e) => {
        setCurrentPage(e.data + 1);
        if (e.data === 0) {
            setInitialMargin("lg:ml-[-5.5%]");
        } else if (e.data === numPages - 1) {
            setInitialMargin("lg:ml-[65%]");
        } else {
            setInitialMargin("lg:ml-[30%]");
        }
    };

    const nextButtonClick = () => {
        if (flipBookRef.current) {
            flipBookRef.current.pageFlip().flipNext();
        }
    };

    const prevButtonClick = () => {
        if (flipBookRef.current) {
            flipBookRef.current.pageFlip().flipPrev();
        }
    };

    const handleKeyDown = useCallback((event) => {
        if (event.key === 'ArrowRight') {
            nextButtonClick();
        } else if (event.key === 'ArrowLeft') {
            prevButtonClick();
        }
    }, [nextButtonClick, prevButtonClick]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

	return (
        <section className="h-full flex flex-col items-center justify-center overflow-hidden max-w-screen-xl mx-auto">
            <div className="fixed left-7 top-7 pointer-events-none z-10 p-0 m-0">
                <h1 className="text-white text-2xl font-bold">{pdfName}</h1>
            </div>
            <div className={`h-fit w-full pt-3 transition-all duration-200 overflow-hidden ${initialMargin} z-0`}>
                <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
                    <HTMLFlipBook 
                            ref={flipBookRef}
                            width={450}
                            height={582}
                            showCover={true} 
                            flippingTime={500} 
                            maxShadowOpacity={0.6} 
                            mobileScrollSupport={true} 
                            autoSize={true}
                            onFlip={handleFlip}>
                                {[...Array(numPages).keys()].map((n) => (
                                    <Pages key={n}>
                                        <Page
                                            pageNumber={n + 1}
                                            width={450}
                                            renderAnnotationLayer={false} 
                                            renderTextLayer={false} 
                                        />
                                    </Pages>
                                ))}
                    </HTMLFlipBook>
                </Document>
            </div>
            <div className="flex flex-col items-center pt-2">
                <div className="inline-flex items-center">
                    <button className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-sm hover:bg-gray-900" onClick={prevButtonClick}>
                            <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
                            </svg>
                            {t('flipbook.prev')}
                    </button>
                    <div className="text-sm text-white px-3">
                        {t('flipbook.page')} <span className="font-semibold text-neutral-50">{currentPage}</span> {t('flipbook.of')} <span className="font-semibold text-neutral-50">{numPages}</span> {t('flipbook.pages')}
                    </div>
                    <button className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-sm border-gray-700 rounded-e hover:bg-gray-900" onClick={nextButtonClick}>
                            {t('flipbook.next')}
                            <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                    </button>
                </div>
            </div>
        </section>
	);
}

export default FlipBook;
