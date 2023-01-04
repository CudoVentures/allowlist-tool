// version 3.0.0
import React, { MouseEvent, useEffect, useRef } from 'react';
import { observer } from 'mobx-react';

import S from '../../utilities/Main';
import ModalStore from '../stores/ModalStore';

import SvgClose from '../../../public/assets/vectors/modal-close.svg';
import '../styles/modal-window.css';

const outerClose = false;
let modalCounter = 0;

export interface ModalWindowProps {
    className?: string;
    hasClose?: boolean;
    isRemovable?: boolean;
    contentFullscreen?: boolean;
    contentFullscreenBlack?: boolean;
    contentPadding?: boolean;
    contentBox?: boolean;
    modalStore: ModalStore;
}

const ModalWindow = (props: React.PropsWithChildren < ModalWindowProps >) => {

    const scrollableCntRef = useRef(null);
    const selfRef = useRef({
        visibleFlag: false,
        onWheelTime: S.NOT_EXISTS,
        onWheelTargetY: S.NOT_EXISTS,
    })

    const { modalStore } = props;

    useEffect(() => {
        const self = selfRef.current;

        if (self.visibleFlag === modalStore.visible) {
            return;
        }

        self.visibleFlag = modalStore.visible;
        if (self.visibleFlag === true) {
            if (++modalCounter === 1) {
                S.CSS.addClass(document.documentElement, 'OverflowHiddenModal');
                S.CSS.addClass(document.documentElement.querySelector('.ReactBody > .Page'), 'BlurModal');
            }
        } else if (--modalCounter === 0) {
            S.CSS.removeClass(document.documentElement, 'OverflowHiddenModal');
            S.CSS.removeClass(document.documentElement.querySelector('.ReactBody > .Page'), 'BlurModal');
        }
    });

    const onClickClose = (e: MouseEvent) => {
        e.stopPropagation();
        modalStore.hide();
    }

    const onWheel = (e: React.WheelEvent < HTMLElement >) => {
        e.preventDefault();

        // 100 ms interval is just a randaom value, after which we should apply normal scrolling
        const now = Date.now();
        const self = selfRef.current;
        let scrollTop = self.onWheelTime + 100 >= now ? self.onWheelTargetY : scrollableCntRef.current.scrollTop;
        scrollTop += e.deltaY;
        scrollableCntRef.current.scrollTop = scrollTop;
        self.onWheelTargetY = scrollTop;
        self.onWheelTime = now;
    }

    const renderClose = () => {
        if (props.hasClose === false) {
            return null;
        }

        return (
            <div
                className = { 'Close SVG Clickable' }
                onClick = { onClickClose }
                dangerouslySetInnerHTML = {{ __html: SvgClose }} />
        )
    }

    const renderContent = () => {
        if (modalStore.visible === false) {
            return null;
        }

        return (
            <div className = { 'ModalWindowContent' }>
                { props.children };
            </div>
        )
    }

    const cssClassVisible = S.CSS.getActiveClassName(modalStore.visible);
    const cssClassContentFullScreen = S.CSS.getClassName(props.contentFullscreen, 'ModalFullScreen');
    const cssClassContentFullScreenBlack = S.CSS.getClassName(props.contentFullscreenBlack, 'ModalFullScreenBlack');
    const cssClassContentPadding = S.CSS.getClassName(props.contentPadding, 'ModalPadding');
    const cssClassContentBox = S.CSS.getClassName(props.contentBox, 'ModalBox');
    return (
        <div
            className = { `ModalWindowWrapper ${props.className} Transition ActiveVisibilityHidden ${cssClassVisible} ${cssClassContentFullScreen} ${cssClassContentFullScreenBlack} ${cssClassContentPadding} ${cssClassContentBox}`}
            onClick = { props.isRemovable === true ? modalStore.hide : undefined }
            onWheel = { onWheel } >

            { outerClose === true && props.hasClose === true && renderClose() }

            <div ref = { outerClose === true ? scrollableCntRef : undefined } className = { 'ModalWindow Scrolls' } onClick = { S.stopPropagation } onWheel = { S.stopPropagation } >

                { outerClose === true && renderContent() }
                { outerClose === false && (
                    <>
                        { renderClose() }
                        <div ref = { outerClose === false ? scrollableCntRef : undefined } className = { 'ScrollableWrapper Scrolls' } >

                            { renderContent() }

                        </div>
                    </>
                ) }

            </div>

        </div>
    );

}

export default observer(ModalWindow);

ModalWindow.defaultProps = {
    className: S.Strings.EMPTY,
    hasClose: true,
    isRemovable: false,
    contentFullscreen: false,
    contentFullscreenBlack: false,
    contentPadding: true,
    contentBox: true,
};
