import axios from 'axios';
import { setAlert } from './alert';
import { GET_MESSAGES, GET_MESSAGE, MESSAGE_ERROR, ADD_MESSAGE } from './types';

// Get messages
export const getMessages = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/chat/chat-room');
    // res.data = res.data.filter(it=>it.chatRoomId==selectedChatRoomId)
    dispatch({
      type: GET_MESSAGES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: MESSAGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add message
export const addMessage = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post('/api/chat/chat-room', formData, config);

    dispatch({
      type: ADD_MESSAGE,
      payload: res.data,
    });

    dispatch(setAlert('Message Added', 'success'));
  } catch (err) {
    dispatch({
      type: MESSAGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get message
export const getMessage = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/chat/chat-room/${id}`);

    dispatch({
      type: GET_MESSAGE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: MESSAGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
