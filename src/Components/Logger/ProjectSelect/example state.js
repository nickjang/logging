const state = {
  currentProjects: { 'example-project-id': { name: 'example', logIds: [] } },
  logs: [
    { id: 'example-log-id1', start: '10-27-2020 12:00:00', end: '10-27-2020 14:00:00' },
    { id: 'example-log-id2', start: '10-27-2020 12:00:00', end: '10-27-2020 14:00:00' },
    { id: 'example-log-id3', start: '10-27-2020 12:00:00', end: '10-27-2020 14:00:00' }
  ], //sorted by start time //add logs on addSelector, deactivate days there are no logs
  selectors: [
    {
      projectId: 'example-project-id',
      selectors: [
        {
          id: '',
          type: 'day',
          calendar: { value: '00-00-0000', open: false },
          endRange: { value: '', open: false }
        }
      ]
    }
  ]
};