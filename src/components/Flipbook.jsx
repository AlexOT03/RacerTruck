import { useState, useCallback, forwardRef, memo, useRef, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import LoadingScreen from "./Loading";
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


let pdfName = pdf.split("/").pop().replace(".pdf", "").replace(/[-_]/g, ' ').replace(/[.EjtfBa73]/g, '');

const Pages = memo(
    forwardRef((props, ref) => (
        <div className="page" ref={ref}>
            {props.children}
        </div>
    ))
);

Pages.displayName = 'Pages';

function FlipBook() {

    const [loading, setLoading] = useState(true);
	const [numPages, setNumPages] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [initialMargin, setInitialMargin] = useState("lg:ml-[-40%]");
    const flipBookRef = useRef(null);

    const onDocumentLoadSuccess = useCallback(({ numPages }) => {
        setNumPages(numPages);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    const handleFlip = (e) => {
        setCurrentPage(e.data + 1);
        if (e.data === 0) {
            setInitialMargin("lg:ml-[-40%]");
        } else if (e.data === numPages - 1) {
            setInitialMargin("lg:ml-[45%]");
        } else {
            setInitialMargin("lg:ml-[0%]");
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
        <section id="magazine" className="h-fit flex flex-col justify-end items-center md:justify-center scroll-mx-2 pb-20 overflow-hidden max-w-screen-xl mx-auto">
            {loading && <LoadingScreen loading={loading} />}
            <div className="text-4xl text-center font-bold">
                <h1>{pdfName}</h1>
            </div>
            <div className={`h-full w-full m-0 lg:px-20 py-10 transition-all ml-0 ${initialMargin} duration-200 overflow-hidden`}>
                <HTMLFlipBook 
                    ref={flipBookRef}
                    width={550}
                    height={711}
                    showCover={true} 
                    flippingTime={500} 
                    maxShadowOpacity={0.6} 
                    mobileScrollSupport={true} 
                    autoSize={true}
                    onFlip={handleFlip}>
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
            </div>
            <div className="flex flex-col items-center">
                <div className="inline-flex items-center mt-2 xs:mt-0">
                    <button className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900" onClick={prevButtonClick}>
                        <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
                        </svg>
                        {t('flipbook.prev')}
                    </button>
                    <div className="text-sm text-gray-700 px-3">
                          {t('flipbook.page')} <span className="font-semibold text-gray-900">{currentPage}</span> {t('flipbook.of')} <span className="font-semibold text-gray-900">{numPages}</span> {t('flipbook.pages')}
                    </div>
                    <button className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900" onClick={nextButtonClick}>
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
