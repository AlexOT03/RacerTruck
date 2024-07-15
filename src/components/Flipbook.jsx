import React from 'react';
import HTMLFlipBook from 'react-pageflip';
import { useTranslations } from '../i18n/utils';

var lang = window.location.pathname.split('/')[1];
if (!lang || lang !== 'es') lang = 'en';
const t = useTranslations(lang);


const PageCover = React.forwardRef((props, ref) => {
    return (
        <div className="page page-cover bg-white" ref={ref} data-density="hard">
            <div className="page-content flex flex-col justify-center items-center text-center">
                <h2>{props.children}</h2>
            </div>
        </div>
    );
});

const Page = React.forwardRef((props, ref) => {
    return (
        <div className="page bg-white" ref={ref} >
            <div className='page-content flex justify-center items-center'>
                {props.children}
            </div>
        </div>
    );
});

function Flipbook() {

    const imagePaths = [
        '/magazines/project-pdf/test_page-0001.jpg',
        '/magazines/project-pdf/test_page-0002.jpg',
        '/magazines/project-pdf/test_page-0003.jpg',
        '/magazines/project-pdf/test_page-0004.jpg',
        '/magazines/project-pdf/test_page-0005.jpg',
        '/magazines/project-pdf/test_page-0006.jpg',
        '/magazines/project-pdf/test_page-0007.jpg',
        '/magazines/project-pdf/test_page-0008.jpg',
        '/magazines/project-pdf/test_page-0009.jpg',
        '/magazines/project-pdf/test_page-0010.jpg',
        '/magazines/project-pdf/test_page-0011.jpg',
    ];

    const pages = imagePaths.map((path, index) => (
        <Page key={index}>
            <img src={path} alt={`Page ${index + 1}`} className="object-contain h-full w-full" />
        </Page>
    ));

    return (
        <div className='h-full w-full p-5 flex flex-col justify-center items-center overflow-hidden'>
            <h1 className='text-3xl text-center font-bold pb-5'>{t('flipbook.title')}</h1>
            <HTMLFlipBook width={460} height={600} maxShadowOpacity={0.3} showCover={true}>
                {pages}
            </HTMLFlipBook>
        </div>
    );
}

export default Flipbook;
