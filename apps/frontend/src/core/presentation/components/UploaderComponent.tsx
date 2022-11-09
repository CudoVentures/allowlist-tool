import React, { useEffect, useRef, useState } from 'react';
import S from '../../utilities/Main';
import Uploader from '../../utilities/Uploader';

interface Props {
    className?: string;
    id: any;
    params: any;
}

const UploaderComponent = (props: Props) => {
    const inputRef = useRef < HTMLInputElement >(null);
    const [initedId, setInitedId] = useState(null);
    const [uploader, setUploader] = useState(null);

    useEffect(() => {
        let uploaderCache: Uploader = uploader;
        if (uploaderCache === null || props.id !== initedId) {
            const params = Object.assign(props.params, {
                'node': inputRef.current,
            });
            uploaderCache = Uploader.newInstance(params);
            setUploader(uploaderCache);
            setInitedId(props.id);
        } else {
            uploaderCache.connect();
        }

        return () => {
            uploaderCache.disconnect();
        };
    });

    return (
        <input ref = { inputRef } className = { props.className } type = { 'file' } />
    );
}

export default UploaderComponent;

UploaderComponent.defaultProps = {
    'className': S.Strings.EMPTY,
};
