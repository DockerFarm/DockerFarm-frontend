import React, { Component } from 'react';
import { Button, Icon, List } from 'semantic-ui-react';
import { LinkTitle } from 'components/base/ui';
import { If } from 'components/hoc';

const ImageSearchResult = ({
    list,
    onItemClick,
    onClear
}) => (
    <If
        condition={list.length > 0}
        then={
            <List divided>
                {
                    list.map( v => (
                        <List.Item key={v.name}>
                            <List.Icon name='clone' size='large' verticalAlign='middle'/>
                            <List.Content>
                                <List.Header as='h4'>
                                    <LinkTitle
                                        onClick={ _ => onItemClick(v)}
                                        label={v.name}
                                    />
                                </List.Header>
                                <List.Description>
                                    {v.description}
                                </List.Description>
                            </List.Content>
                        </List.Item>
                    ))
                }
                <List.Item>
                    <Button
                        size='tiny'
                        type='button'
                        onClick={onClear}
                    >
                        <Icon name='sync'/>
                        Clear
                    </Button>
                </List.Item>
            </List>
        }
    />
);

export default ImageSearchResult;