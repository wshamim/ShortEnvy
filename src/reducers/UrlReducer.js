import { SHORTENVY_POST, SHORTENVY_SUCCESS, SHORTENVY_FAILURE } from '../constants';

const INITIAL_STATE = {
  shortUrl: '',
  longUrl: '',
  error: '',
  msg: ''
};

export default function urls(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SHORTENVY_POST:
      return { ...state, msg: 'Generating short URL...', longUrl: action.longUrl };

    case SHORTENVY_SUCCESS:
      return { ...state, ...action };

    case SHORTENVY_FAILURE:
      return { ...state, ...action };

    default:
      return state;
  }
}
