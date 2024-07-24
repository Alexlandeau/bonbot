import { FC } from "react";
import "./LoadingSpinner.css";

interface LoadingSpinnerProps {}

const LoadingSpinner: FC<LoadingSpinnerProps> = () => (
	<span className="loader"></span>
);

export default LoadingSpinner;
