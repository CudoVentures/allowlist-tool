import React from 'react';

import Dimmer from './Dimmer';
import DisableActions from './DisableActions';
import PageLoadingIndicator from './PageLoadingIndicator';
import Alert from './Alert';

import '../styles/main.css';
import '../styles/content.css';
import '../styles/fonts.css';
import '../styles/page-layout-component.css';

interface Props {
    className?: string;
    modals?: any[],
    alert?: React.Component | null,
}

const PageLayoutComponent = (props: React.PropsWithChildren < Props >) => {
    return (
        <div className = { `ReactBody ${props.className}` } >

            <div className = { 'Page Transition' } >
                { props.children }
            </div>

            <Dimmer />
            { props.modals }
            { props.alert }
            <DisableActions />
            <PageLoadingIndicator />
        </div>
    )
}

PageLayoutComponent.defaultProps = {
    className: '',
    modals: null,
    alert: <Alert />,
};

export default PageLayoutComponent;
