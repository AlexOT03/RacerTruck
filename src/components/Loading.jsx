import { useState, useEffect } from "react";
import { useTranslations } from "../i18n/utils";
import "../css/Loading.css";

var lang = window.location.pathname.split("/")[1];
if (!lang || lang !== "es") lang = "en";
const t = useTranslations(lang);

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
			className={`absolute w-full h-full flex flex-col items-center justify-center bg-neutral-100 z-50 transition-colors duration-1000 ${
				loading ? "animate-fade-out" : "animate-blurred-fade-in"
			}`}
		>
			<span className="loading"></span>
			<span>{t('loading.title')}</span>
		</div>
	);
};

export default LoadingScreen;
