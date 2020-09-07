import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getMessages } from '../../actions/chat';
import { getUsers } from '../../actions/auth';

import MessageItem from './MessageItem';
import MessageForm from './MessageForm';

const ChatRoom = ({
  getMessages,
  getUsers,
  auth: { user, users },

  chat: { _id, text, name, messages, date, loading },
}) => {
  useEffect(() => {
    getMessages();
    getUsers();
  }, [getMessages, getUsers]);

  let allUsers = [];

  for (let i = 0; i < users.length; i++) {
    allUsers += users[i].name + ',  ';
  }

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='chat-container'>
        <header className='chat-header'>
          <h1>
            <i className='fas fa-user-md text-dark'></i>{' '}
            <i className='fas fa-heartbeat text-dark'></i> eZdravstvo Chat{' '}
          </h1>
          <button type='submit' className='btn'>
            <Link to='/chat'> Leave Room</Link>
          </button>
        </header>
        <main className='chat-main'>
          <div className='chat-sidebar'>
            {/* <h3><i className="fas fa-comments text-primary"></i> Room Name:</h3>
        <h2 id="room-name">{room}</h2> */}

            <h3> Welcome {user && user.name} </h3>
            <h3>
              <i className='fas fa-users text-primary'></i> Users
            </h3>

            <ul id='users'>
              <li>{allUsers}</li>
            </ul>
          </div>
          <div className='chat-messages'>
            {messages.map((chat) => (
              <MessageItem key={chat._id} chat={chat} />
            ))}
          </div>
        </main>
        <div className='chat-form-container'>
          <MessageForm />
        </div>
      </div>
    </Fragment>
  );
};

ChatRoom.propTypes = {
  getMessages: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  chat: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  chat: state.chat,
  users: state.auth.users,
});

export default connect(mapStateToProps, { getMessages, getUsers })(ChatRoom);
