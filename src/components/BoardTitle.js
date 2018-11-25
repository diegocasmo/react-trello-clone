import React, { Component } from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import Button from './Button';

import { Icon, Menu, Dropdown, Input } from 'antd';

export default class BoardTitle extends Component {
  state = {
    edit: false,
    title: ''
  };

  handleEnableEdit = () => {
    this.setState({
      edit: true,
      boardTitle: this.props.title
    });
  };

  handleDisableEdit = () => {
    this.setState({
      edit: false
    });
  };

  handleBoardTitleChange = event => {
    this.setState({
      boardTitle: event.target.value
    });
  };

  handleSubmitForm = (event, callback, boardKey, title) => {
    event.preventDefault();
    if (!title) {
      return;
    }
    callback(boardKey, { title }).then(() => {
      this.setState({
        edit: false
      });
    });
  };

  render() {
    const {
      title,
      favorite,
      boardKey,
      onAddToFavorites,
      deleteBoard,
      updateBoard
    } = this.props;

    const { edit, boardTitle } = this.state;
    return (
      <StyledBoardTitle>
        <Title>
          {edit ? (
            <Form
              onSubmit={event =>
                this.handleSubmitForm(event, updateBoard, boardKey, boardTitle)
              }
              onBlur={this.handleDisableEdit}
            >
              <Input
                value={boardTitle}
                onChange={this.handleBoardTitleChange}
                autoFocus
              />
            </Form>
          ) : (
            <Button onClick={this.handleEnableEdit}>{title}</Button>
          )}
        </Title>
        <Favorite>
          <StyledButton onClick={onAddToFavorites} active={favorite}>
            <StyledIcon type="star" className={favorite && 'active'} />
          </StyledButton>
        </Favorite>
        <ShowMenuButton>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="0" onClick={() => deleteBoard(boardKey)}>
                  Delete board
                </Menu.Item>
              </Menu>
            }
            trigger={['click']}
          >
            <Button>
              <Icon type="ellipsis" />
              <MenuButtonText>Show menu</MenuButtonText>
            </Button>
          </Dropdown>
        </ShowMenuButton>
      </StyledBoardTitle>
    );
  }
}

const Form = styled.form`
  margin-right: 5px !important;
`;

const StyledBoardTitle = styled.div`
  margin-top: -20px;
  background: #026aa7;
  display: flex;
  position: relative;
  padding: 8px 8px 2px;
`;

const Title = styled.h3``;

const Favorite = styled.div``;

const ShowMenuButton = styled.div`
  color: white;
  position: absolute;
  right: 0;
  text-decoration: underline;
  div {
    font-weight: normal;
  }
`;

const StyledIcon = styled(Icon)`
  &.active {
    color: #f2d600;
  }
`;

const MenuButtonText = styled.span`
  padding-left: 5px;
`;

const StyledButton = styled(Button)`
  background: ${props => (props.active ? darken(0.05, '#026aa7') : '')};
`;
