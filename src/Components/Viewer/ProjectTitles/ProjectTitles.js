import React, { Component } from 'react';
import SelectorContext from '../../../Context/SelectorContext';
import './ProjectTitles.css';

class ProjectTitles extends Component {
  static contextType = SelectorContext;

  /**
   * Generate titles for each selected project 
   * and it's selectors, if it has any.
   */
  generateProjectTitles = (selectors, projects) => {
    return projects.map(project => {
      const selectorTitles = selectors[project.id].map(selector =>
        <span key={`selector-${selector.id}`} className='selector-title'>
          {selector.calendar.value + 
          (selector.endRange.value ? `${selector.endRange.value}` : '')}
        </span>
      );

      return (
        <React.Fragment key={project.id}>
          <span className='project-title'>{`+ ${project.title}`}</span>
          {selectorTitles}
        </React.Fragment>
      );
    });
  }

  render() {
    const titles = this.generateProjectTitles(this.context.selectors, this.context.projects);

    return (
      <h2 className='project-titles group-col'>
        {titles}
      </h2>
    );
  }
}

export default ProjectTitles;