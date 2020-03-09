export const API = Symbol('API');

export default baseURL => store => next => action => {

  if (action[API]) {
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      'method': action[API].method,
      'body': action[API].body && JSON.stringify(action[API].body)
    };
    fetch(`${baseURL}${action[API].path}`, options)
      .then(res => res.json())
      .then(data => console.log(action[API]) || data)
      .then(data => {
        const newAction = {
          ...action,
          type: action.type + '_SUCCESS',
          data
        };
        delete newAction[API];
        try {
          store.dispatch(newAction);
        } catch (e) {
          console.log(e)
        }
      })
      .catch(e => e)
  }
  next(action);
};