import {
  GET_MESSAGES,
  GET_MESSAGE,
  MESSAGE_ERROR,
  ADD_MESSAGE,
} from '../actions/types';

const initialState = {
  messages: [],
  message: null,
  loading: true,
  chatRoomId: null,
  error: {},
  doctor: localStorage.getItem('doctor'),
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_MESSAGES:
      return {
        ...state,
        messages: payload,
        loading: false,
        doctor: localStorage.getItem('doctor'),
      };
    case GET_MESSAGE:
      return {
        ...state,
        message: payload,
        loading: false,
        doctor: localStorage.getItem('doctor'),
      };

    case ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, payload],
        loading: false,
        doctor: localStorage.getItem('doctor'),
      };

    case MESSAGE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        doctor: localStorage.getItem('doctor'),
      };

    default:
      return state;
  }
}
