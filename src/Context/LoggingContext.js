import React from 'react';

export default React.createContext({
  account: {
    email: 'email'
  },
  projects: [{id: 'example-project-id', name: 'example'}]
});