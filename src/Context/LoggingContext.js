import React from 'react';
export default React.createContext({
  projects: [],
  currentProjectId: 0,
  updateCurrentProject: ()=>{},
  addProject: ()=>{},
  addLog: ()=>{},
});