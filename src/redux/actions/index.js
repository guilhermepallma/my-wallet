import USER_EMAIL from './actionTypes';

export const emailAction = (email) => ({
  type: USER_EMAIL,
  email,
});

export default emailAction;
