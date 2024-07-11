import React from 'react';
import HTMLFlipBook from 'react-pageflip';

const Page = React.forwardRef((props, ref) => {
    return (
        <div className="demoPage" ref={ref}>
            {props.children}
        </div>
    );
});

function Flipbook(props) {
    const imagePaths = [
        props.path + '0001.jpg',
        props.path + '0002.jpg',
        props.path + '0003.jpg',
        props.path + '0004.jpg',
        props.path + '0005.jpg',
        props.path + '0006.jpg',
        props.path + '0007.jpg',
        props.path + '0008.jpg',
        props.path + '0009.jpg',
        props.path + '0010.jpg',
        props.path + '0011.jpg',
    ];

    const pages = imagePaths.map((path, index) => (
        <Page key={index} number={index + 1}>
            <img className='h-full' src={path} alt={`Page ${index + 1}`} />
        </Page>
    ));

    return (
        <HTMLFlipBook width={385} height={500} showCover={true} mobileScrollSupport={false}>
            {pages}
        </HTMLFlipBook>
    );
}

export default Flipbook;
