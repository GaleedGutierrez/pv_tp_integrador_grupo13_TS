import type { ErrorInfo, JSX, ReactNode } from 'react';
import { Component } from 'react';

interface ErrorBoundaryState {
	hasError: boolean;
}

interface ErrorBoundaryProperties {
	children: ReactNode;
	fallback?: ReactNode;
	onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

/**
 * This componente captures errors in the child component tree
 * and shows an alternative UI when an error occurs.
 */
export class ErrorBoundary extends Component<
	ErrorBoundaryProperties,
	ErrorBoundaryState
> {
	/**
	 * Static method that updates the state when an error occurs
	 */
	public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		// We log the error for debugging
		console.error('[ErrorBoundary] Error detectado:', error);

		return { hasError: true };
	}

	constructor(properties: ErrorBoundaryProperties) {
		super(properties);
		this.state = { hasError: false };
	}

	/**
	 * Method that runs when an error is caught
	 */
	public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		const { onError } = this.props;

		// You can also log the error to an error reporting service
		console.error('[ErrorBoundary] Error:', {
			error,
			componentStack: errorInfo.componentStack,
		});
		this.setState({ hasError: true });

		// If there is a custom error handler, we run it
		if (onError) {
			onError(error, errorInfo);
		}
	}

	/**
	 * Reset the error state and show the normal content again
	 */
	private handleResetErrorBoundary(): void {
		this.setState({ hasError: false });
	}

	/**
	 * Default UI when an error occurs
	 */
	private defaultErrorUi(): JSX.Element {
		return (
			<div className="error-boundary-container">
				<h1>¡Ups! Algo salió mal</h1>
				<button
					className="error-boundary-button"
					onClick={this.handleResetErrorBoundary.bind(this)}
				>
					Volver a intentar
				</button>
			</div>
		);
	}

	public render(): ReactNode {
		const { hasError } = this.state;
		const { children, fallback } = this.props;

		if (!hasError) {
			return children;
		}

		if (fallback) {
			return fallback;
		}

		return this.defaultErrorUi();
	}
}
