import React, {ErrorInfo, ReactNode} from "react";

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

interface ErrorBoundaryProps {
    children: ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {hasError: false, error: null};
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return {hasError: true, error};
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Возникла ошибка!", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <section className="m-4">
                    <h1>Что-то пошло не так :(</h1>
                    <p className="text text_type_main-default text_color_error">
                        В приложении произошла ошибка. Пожалуйста, перезагрузите страницу.
                    </p>
                </section>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
