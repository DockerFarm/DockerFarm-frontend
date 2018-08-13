import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

const SectionHeader = ({
    icon,
    title,
    ...rest
}) => (
    <Header as='h5' {...rest} color='grey'>
        {
            icon ?
            <Icon name={icon}/> :
            null
        }
        {title}
    </Header>
)

export default SectionHeader;