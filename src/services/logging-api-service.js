import moment from 'moment';
import TokenService from './token-service';
import config from '../config';

const LoggingApiService = {
  getProjects() {
    return fetch(`${config.API_ENDPOINT}/projects`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  getProject(projectId) {
    return fetch(`${config.API_ENDPOINT}/projects/${projectId}`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  getProjectLogs(projectId) {
    return fetch(`${config.API_ENDPOINT}/projects/${projectId}/logs`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  postProject(title) {
    const data = { title };
    return fetch(`${config.API_ENDPOINT}/projects`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(data),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  postProjectLog(projectId) {
    return fetch(`${config.API_ENDPOINT}/logs`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        start_time: (new Date()).toISOString(),
        project_id: projectId
      }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  endProjectLog(logId) {
    return fetch(`${config.API_ENDPOINT}/logs/${logId}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        end_time: (new Date()).toISOString()
      }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  getCurrentDayLogs() {
    let start = new Date();
    start.setHours(0, 0, 0, 0);

    let end = new Date(start);
    end.setDate(end.getDate() + 1);

    start = start.toISOString();
    end = end.toISOString();

    const params = `?filter=range&start=${start}&end=${end}`;

    return fetch(`${config.API_ENDPOINT}/logs${params}`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      }
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  // get ranges of days with logs for each project
  getDayRanges() {
    let params = '?part=day-ranges&time_zone='
      + Intl.DateTimeFormat().resolvedOptions().timeZone;

    return fetch(`${config.API_ENDPOINT}/projects${params}`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      }
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  getLogsBySelectors(selectorsByProject) {
    let params = '?filter=projects-and-ranges';
    for (let projectId in selectorsByProject) {
      const selectors = selectorsByProject[projectId];
      for (let i = 0; i < selectors.length; i++) {
        params += `&selectors[${String(projectId)}][][${i}][]=${selectors[i][0]}`;
        params += `&selectors[${String(projectId)}][][${i}][]=${selectors[i][1]}`;
      }
    }

    return fetch(`${config.API_ENDPOINT}/logs${params}`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      }
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  }
}

export default LoggingApiService
