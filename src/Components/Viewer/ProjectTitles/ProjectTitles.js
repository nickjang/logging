import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ProjectTitles.css';

class ProjectTitles extends Component {
  /**
   * Generate titles for each selected project 
   * and it's selectors, if it has any.
   */
  generateProjectTitles = (selectors, projects) => {
    return selectors.map(project => {
      const titles = project.selectors.map(selector =>
        <span key={`selector-${selector.id}`} className='selector-title'>
          {selector.calendar.value + 
          (selector.endRange.value ? `${selector.endRange.value}` : '')}
        </span>
      );

      return (
        <React.Fragment key={project.projectId}>
          <span className='project-title'>{`+ ${projects[project.projectId].name}`}</span>
          {titles}
        </React.Fragment>
      );
    });
  }

  render() {
    const titles = this.generateProjectTitles(this.props.selectors, this.props.projects);

    return (
      <h2 className='project-titles group-col'>
        {titles}
      </h2>
    );
  }
}

ProjectTitles.defaultProps = {
  selectors: [],
  projects: {}
}

ProjectTitles.propTypes = {
  selectors: PropTypes.arrayOf(PropTypes.object).isRequired,
  projects: PropTypes.object.isRequired
}

export default ProjectTitles;