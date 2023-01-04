import React from 'react';

import S from '../../utilities/Main';

import SvgLoading from '../../../public/assets/vectors/loading.svg';
import '../styles/loading-indicator.css';

interface Props {
    className?: string;
    margin: string;
    size?: string;
}

const LoadingIndicator = (props: Props) => {

    const style = {
        'marginTop': props.margin,
        'marginBottom': props.margin,
    };
    const svgStyle = {};

    if (props.size !== null) {
        svgStyle.width = props.size;
        svgStyle.height = props.size;
    }

    return (
        <div
            className = { `LoadingIndicator FlexSingleCenter ${props.className}` }
            style = { style } >

            <div className = { 'SVG Size' } style = { svgStyle } dangerouslySetInnerHTML = {{ __html: SvgLoading }} />

        </div>
    );

}

export default LoadingIndicator;

LoadingIndicator.defaultProps = {
    className: S.Strings.EMPTY,
    size: null,
}
