import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addMessage, getMessages } from '../../actions/chat';

const MessageForm = ({
  addMessage,
  getMessages,
  auth: { user },
  chat: { chatRoomId },
}) => {
  const [text, setText] = useState('1');
  // const [chatRoomId, setChatRoomId] = useState('');
  const myEmail = user.email;
  const otherEmail = 'ivo@fesb.hr';
  const sortedMails = [myEmail, otherEmail].sort((a, b) => a.localeCompare(b));
  const newChatroomId = sortedMails[0] + '/' + sortedMails[1];

  console.log(newChatroomId);

  useEffect(() => {
    getMessages(newChatroomId);
  }, [getMessages, newChatroomId]);

  return (
    <Fragment>
      <form id='chat-form'>
        <input
          id='msg'
          type='text'
          placeholder='Enter Message'
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          autoComplete='off'
        />
        <button
          className='btn'
          onClick={(e) => {
            e.preventDefault();
            addMessage({
              text,
              chatRoomId: newChatroomId,
            });
            setText(' ');
          }}
        >
          <i className='fas fa-paper-plane'></i> Send
        </button>
      </form>
    </Fragment>
  );
};
MessageForm.propTypes = {
  addMessage: PropTypes.func.isRequired,
  getMessages: PropTypes.func.isRequired,
  chat: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  chat: state.chat,
  auth: state.auth,
});

export default connect(mapStateToProps, { addMessage, getMessages })(
  MessageForm
);
