import { useState, useEffect } from "react";

interface WindowSize {
	width: number | undefined;
	height: number | undefined;
}

export function useWindowSize(): WindowSize {
	const [windowSize, setWindowSize] = useState<WindowSize>({
		width: undefined,
		height: undefined,
	});

	useEffect(() => {
		function handleResize() {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		}

		window.addEventListener("resize", handleResize);
		handleResize();

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return windowSize;
}

export function useIsMobile(): boolean {
	const { width } = useWindowSize();
	return width !== undefined && width <= 768;
}
