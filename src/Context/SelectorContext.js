import React from 'react'

export default React.createContext({
  projects: [],
  selectors: {},
  dayRanges: {},
  addSelector: ()=>{},
  addEndRange: () => {},
  deleteSelector: () => {},
  updateSelector: () => {},
  updateEndRange: () => {}
});