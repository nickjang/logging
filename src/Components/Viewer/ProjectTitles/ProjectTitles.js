import React, { Component } from 'react';
import PropTypes from 'prop-types'
import SelectorContext from '../../../Context/SelectorContext';
import './ProjectTitles.css';

class ProjectTitles extends Component {
  static contextType = SelectorContext;

  /**
   * Generate titles for each selected project 
   * and it's selectors, if it has any.
   */
  generateProjectTitles = (selectors, projects) => {
    let titles = [];
    for (const project of projects) {
      // if project has no selectors, continue
      if (!selectors[project.id]) continue;

      // generate selector titles
      const selectorTitles = selectors[project.id].map((selector, index) => {
        if (selector === 'project') return null;
        let start = new Date(selector[0]);
        let end = new Date(selector[1]);

        // end is not inclusive
        end.setDate(end.getDate() - 1);

        start = `${start.getMonth() + 1}/${start.getDate()}/${start.getFullYear()}`;
        end = `${end.getMonth() + 1}/${end.getDate()}/${end.getFullYear()}`;

        return (
          <span
            key={`selector-${project.id}-${index}`}
            className='selector-title'
          > {`{${start} - ${end}}`}
          </span>
        );
      });

      titles.push(
        <React.Fragment key={project.id}>
          <span className='project-title'>{`+ ${project.title}`}</span>
          {selectorTitles}
        </React.Fragment>
      );
    }
    return titles;
  }

  render() {
    // if logs have not been fetched yet, display instructions to fetch them
    if (!Object.keys(this.props.selectors).length) {
      return (
        <p className='project-title-instructions note'>
          To view logs, open the side bar and choose where/when to get logs from
        </p>
      );
    } else {
      const titles = this.generateProjectTitles(this.props.selectors, this.context.projects);
      return (
        <h3 className='project-titles group-col'>
          {titles}
        </h3>
      );
    }
  }
}

ProjectTitles.defaultProps = {
  selectors: {}
};

ProjectTitles.propTypes = {
  selectors: PropTypes.object.isRequired
}

export default ProjectTitles;