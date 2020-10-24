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
   * @param {array} selectors - Selectors grouped by project.
   * @param {array} projectNames - Map of project ids to project names.
   */
  generateProjectTitles = (selectors, projectNames) => {
    return selectors.map(project => {
      const titles = project.selectors.map(selector =>
        <span class='selector-title'>
          {selector.calendar.value + 
          (selector.endRange.value ? `- ${selector.endRange.value}` : '')}
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
    // generate titles for each project and it's selectors
    const titles = this.generateProjectTitles(this.props.selectors, projectNames);

    return (
      <h2>
        {titles}
      </h2>
    );
  }
}

ProjectTitles.defaultProps = {
  selectors: [],
  projects: []
}

ProjectTitles.propTypes = {
  selectors: PropTypes.arrayOf(PropTypes.object).isRequired,
  projects: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default ProjectTitles;