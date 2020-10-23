import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ProjectTitles.css';

class ProjectTitles extends Component {
  /**
   * Map project ids to project names.
   */
  mapProjectIdsToNames = (projects) => {
    const projectNames = {};

    projects.forEach(project =>
      projectNames[project.id] = project.name
    );
  }

  /**
   * Generate titles for each selected project 
   * and it's filters, if it has any.
   * @param {array} picked - Filters to search logs by, grouped by project.
   * @param {array} projectNames - Map of project ids to project names.
   */
  generateProjectTitles = (picked, projectNames) => {
    return picked.map(project => {
      const titles = project.picks.map(pick =>
        <span class='pick-title'>
          {pick.calendar.value + 
          (pick.endRange.value ? `- ${pick.endRange.value}` : '')}
        </span>
      );

      return (
        <>
          <span class='project-title'>{`+ ${projectNames[project.projectId]}`}</span>
          {titles}
        </>
      );
    });
  }

  render() {
    const projectNames = this.mapProjectIdsToNames(this.props.projects);
    // generate titles for each picked project and it's picks
    const titles = this.generateProjectTitles(this.props.picked, projectNames);

    return (
      <h2>
        {titles}
      </h2>
    );
  }
}

ProjectTitles.defaultProps = {
  picked: [],
  projects: []
}

ProjectTitles.propTypes = {
  picked: PropTypes.arrayOf(PropTypes.object).isRequired,
  projects: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default ProjectTitles;