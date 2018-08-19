import React from 'react';
import { Image } from 'semantic-ui-react';
import styled from 'styled-components';

const Img = styled(Image)`
    min-height:100px;
    background-color:black !important;
    background-repeat:no-repeat;
    background-position:center;
    background-image:url(/img/loading.gif);
`
const ImageLoader = ({
    brokenImage,
    ...rest
}) => {

    const onLoad = e => {
        e.target.style='background:none !important; min-height:0'
    }
    const onError = e => e.target.src = brokenImage;
    return (

        <Img 
            {...rest}
            onLoad={onLoad}
            onError={onError}
        />
    )
}

export default ImageLoader;