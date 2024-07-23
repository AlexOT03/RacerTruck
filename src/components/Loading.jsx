import { useState, useEffect } from "react";
import "../css/Loading.css";

const LoadingScreen = () => {
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const loadingTimeout = setTimeout(() => {
			setLoading(true);
		}, 500);

		return () => clearTimeout(loadingTimeout);
	}, []);

	return (
		<div
			className={`absolute w-full h-full flex items-center justify-center bg-neutral-100 z-50 transition-colors duration-1000 ${
				loading ? "animate-fade-out" : "animate-blurred-fade-in"
			}`}
		>
			<span className="loading"></span>
		</div>
	);
};

export default LoadingScreen;
