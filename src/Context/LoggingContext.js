import React from 'react';

export default React.createContext({
  projects: [],
  currentProjectId: null,
  updateCurrentProject: ()=>{},
  addProject: ()=>{},
  loggerStartTime: null,
  toggleLogger: ()=>{},
});