import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import AppLoadingIndicator from './AppLoadingIndicator';

describe('AppLoadingIndicator', () => {
    it('renders the loading indicator when loading is true', () => {
        render(<AppLoadingIndicator loading={true} size={30}/>);
        const loader = screen.getByTestId('app-loader');
        expect(loader).toBeInTheDocument();
    });

    it('does not render the loading indicator when loading is false', () => {
        render(<AppLoadingIndicator loading={false} size={30}/>);
        const loader = screen.queryByTestId('app-loader');
        expect(loader).toBeNull();
    });

    it('applies the correct size and border width based on the size prop', () => {
        const size = 45;
        const spinnerWidth = Math.round(size / 3);
        render(<AppLoadingIndicator loading={true} size={size}/>);
        const loader = screen.getByTestId('app-loader');
        expect(loader).toHaveStyle(`width: ${size}px`);
        expect(loader).toHaveStyle(`height: ${size}px`);
        expect(loader).toHaveStyle(`border-width: ${spinnerWidth}px`);
        expect(loader).toHaveStyle(`border-top-width: ${spinnerWidth}px`);
    });

    it('renders with default size when size prop is not provided', () => {
        render(<AppLoadingIndicator loading={true}/>);
        const loader = screen.getByTestId('app-loader');
        expect(loader).toHaveStyle('width: 30px');
        expect(loader).toHaveStyle('height: 30px');
    });
});