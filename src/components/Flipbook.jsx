import React from 'react';
import HTMLFlipBook from 'react-pageflip';


const PageCover = React.forwardRef((props, ref) => {
    return (
      <div className="page page-cover h-full w-auto bg-white" ref={ref} data-density="hard">
        <div className="page-content">
          <h2>{props.children}</h2>
        </div>
      </div>
    );
});

const Page = React.forwardRef((props, ref) => {
    return (
        <div className="page" ref={ref}>
            <div className='page-content'>
                {props.children}
                <div className="page-footer">{props.number + 1}</div>
            </div>
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
        <HTMLFlipBook
        width={385} 
        height={500} 
        size="stretch"
        maxShadowOpacity={0.5}
        showCover={true}
        mobileScrollSupport={true}>
        {pages}
        <PageCover>Final</PageCover>
    </HTMLFlipBook>
    );
}

export default Flipbook;
