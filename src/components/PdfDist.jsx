import React, { useEffect, useState } from 'react';
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist/webpack';
// import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.mjs';

// GlobalWorkerOptions.workerSrc = pdfjsWorker;

const PDFViewer = ({ pdfUrl }) => {
  const [pdf, setPdf] = useState(null);
  const [page, setPage] = useState(1);
  const [numPages, setNumPages] = useState(null);

  useEffect(() => {
    const loadPdf = async () => {
      const loadingTask = getDocument(pdfUrl);
      const pdfDoc = await loadingTask.promise;
      setPdf(pdfDoc);
      setNumPages(pdfDoc.numPages);
    };

    loadPdf();
  }, [pdfUrl]);

  const renderPage = async (pageNum) => {
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale: 1.5 });
    const canvas = document.getElementById('pdf-canvas');
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };
    page.render(renderContext);
  };

  useEffect(() => {
    if (pdf) {
      renderPage(page);
    }
  }, [pdf, page]);

  return (
    <div>
      <canvas id="pdf-canvas"></canvas>
      <div>
        <button onClick={() => setPage(page - 1)} disabled={page <= 1}>
          Previous
        </button>
        <button onClick={() => setPage(page + 1)} disabled={page >= numPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PDFViewer;
