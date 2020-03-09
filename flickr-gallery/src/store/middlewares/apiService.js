export const API = Symbol('API');

export default baseURL => store => next => action => {
  
  if (action[API]) {
    console.log('here');
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      'method': action[API].method,
      'body': action[API].tag && JSON.stringify(action[API].tag)
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