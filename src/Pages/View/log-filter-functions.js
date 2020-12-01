/** 
 * Given a list of logs and a dictionary of project ids to selectors,
 * filter logs by the selectors.
 */

/**
 * Map a log's id to it's project's id.
 */
export function mapIds(currentProjects) {
  let idMap = {};
  for (const project in currentProjects) {
    project.logIds.forEach(logId => idMap[logId] = project);
  }
  return idMap;
};

/**
 * Group logs by their projects
 */
export function getLogsByProject(currentProjects, logs) {
  const logsByProject = {};
  const idMap = this.mapIds(currentProjects);
  logs.forEach(log => {
    logsByProject[idMap[log.id]].push(log);
  });
  return logsByProject;
};

/**
 * Get ids of logs filtered by selectors.
 */
export function updateSelectedLogIds() {
  const selectorsByProject = this.formatSelectors(this.state.selectors);
  const mergedSelectorsByProject = this.mergeSelectors(selectorsByProject);
  let logsByProject = this.getLogsByProject(this.state.currentProjects, this.state.logs);
  const selectedLogIds = this.getSelectedIds(mergedSelectorsByProject, logsByProject);
  this.setState({ selectedLogIds });
};

/**
 * Get logs given their ids and a list of logs.
 */
export function getLogsFromIds() {
  let selectedLogs = [];
  let logsToSelect = {};
  this.state.selectedLogs.forEach(logId => logsToSelect[logId] = true);
  selectedLogs = this.state.logs.filter(log => logsToSelect[log.id]);
  return selectedLogs;
};