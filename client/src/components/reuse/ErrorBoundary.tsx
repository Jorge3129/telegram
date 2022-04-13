import React, { Component, ErrorInfo, ReactNode } from "react";
import ErrorFallback from "./ErrorFallback";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
    errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({ error, errorInfo });
    }

    public render() {
        const { hasError, error} = this.state;
        const { children } = this.props;
        return hasError ? <ErrorFallback error={error}/> : children;
    }
}

export default ErrorBoundary;
