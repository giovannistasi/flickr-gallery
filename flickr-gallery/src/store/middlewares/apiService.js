export const API = Symbol('API');

export default baseURL => store => next => action => {
  console.log('action', action);
  
  if (action[API]) {
    console.log('action[API]', action[API]);
    
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      'method': action[API].method,
      'body': JSON.stringify(action[API].body)
    };
    fetch(`${baseURL}${action[API].path}`, options)
      .then(res => res.json())
      .then(data => {
        const newAction = {
          ...action,
          type: action.type + '_SUCCESS',
          data
        };
        console.log('newaction[API]', newAction[API]);
        
        delete newAction[API];
        store.dispatch(newAction);
      })
      .catch(e => e)
  }
  next(action);
};