import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ProjectTitles.css';

class ProjectTitles extends Component {
  render() {
    const titles = this.props.projects.map(project => {
      const picked = project.picked.map(selection =>
        <span class='project-picked'>{selection.value}</span>);
      return (
        <>
          <span class='project-title'>`+ ${project.name}`</span>
          {picked}
        </>
      );
    });

    return (
      <h2>
        {titles}
      </h2>
    );
  }
}

ProjectTitles.defaultProps = {
  projects: []
}

ProjectTitles.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object)
}

export default ProjectTitles;