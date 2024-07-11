import HTMLFlipBook from 'react-pageflip';

const Flipbook = () => {
    return (
        <HTMLFlipBook width={300} height={500}>
            <div className="demoPage bg-gray-400">Page 1</div>
            <div className="demoPage bg-gray-400">Page 2</div>
            <div className="demoPage bg-gray-400">Page 3</div>
            <div className="demoPage bg-gray-400">Page 4</div>
            <div className="demoPage bg-gray-400">Page 5</div>
            <div className="demoPage bg-gray-400">Page 6</div>
            <div className="demoPage bg-gray-400">Page 7</div>
            <div className="demoPage bg-gray-400">Page 8</div>
            <div className="demoPage bg-gray-400">Page 9</div>
            <div className="demoPage bg-gray-400">Page 10</div>
            <div className="demoPage bg-gray-400">Page 11</div>
        </HTMLFlipBook>
    )
};

export default Flipbook;