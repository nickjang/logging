import React, { Component } from 'react';
import ExportOption from '../ExportOption/ExportOption';

class Exporter extends Component {
  state = {
    orientation: '',
    selectedOptions: [],
    exporting: false,
    fetchError: {
      code: '',
      message: ''
    }
  }

  orientationRef = React.createRef();

  updateOrientation = (orientation) => {
    this.setState({ orientation });
  }

  updateSelectedOptions = (option) => {
    this.setState({ 
      selectedOptions: [...this.state.selectedOptions, option] 
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    //exporting/error
    //this.props.exportLogs(orientation, selectedOptions)
  }

  /**
   * Render radio button for row and column
   * options.
   */
  renderOrientationOptions = () => {
    return ['As columns', 'As rows']
      .map(option => {
        return (
          <ExportOption
            key={option}
            type='radio'
            ref={this.orientationRef}
            option={option}
            name='orientation'
            form='export-form'
            selected={this.state.orientation}
            update={this.updateOrientation}
            role='presentation' />
        );
      });
  }

  /**
   * Render checkbox for each export format.
   */
  renderExportOptions = () => {
    const exportOptions = [
      'Excel', 'SQL', 'Dataframe',
      'TXT', 'Array', 'Formatted String',
      'Object', 'CSV', 'JSON'
    ].map(option => {
      return (
        <ExportOption
          key={option}
          type='checkbox'
          option={option}
          name='export-options'
          form='export-form'
          selected={this.state.selectedOptions}
          update={this.updateSelectedOptions}
          role='gridcell' />
      );
    });

    // Position checkboxes into rows
    let rows = [];
    let perRow = 3;
    for (let i = 0; i < exportOptions.length; i += perRow) {
      rows.push(
        <div class='group-row' role='row'>
          exportOptions.slice(i, i + perRow)
        </div>
      );
    }
    return rows;
  }

  render() {
    return (
      <section class='export-logs'>
        <output form='export-form' className='form-status'>{this.state.fetchError.message || (this.state.exporting && 'Exporting...')}</output>
        <div class='group-row' role='presentation'> {/*<!--Check how this affects DOM-->*/}
          <h3 id='export-heading'>Export Logs</h3>
          <fieldset class='group-column'>
            {this.renderOrientationOptions()}
          </fieldset>
        </div>
        <form action='' id='export-form' class='group-column' role='grid' aria-labelledby='export-heading'>
          {this.renderExportOptions()}
          <button
            type='submit'
            form='export-form'
            onClick={(e) => { this.handleSubmit(e) }}
            disabled={this.state.orientation || this.state.selectedOptions.length}
          > Export
          </button>
        </form>
      </section>
    );
  }
}

export default Exporter;