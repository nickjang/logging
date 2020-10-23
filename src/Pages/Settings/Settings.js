import React, {Component} from 'react';
import Header from '../../Components/Header/Header';
import SettingsForm from '../../Components/SettingsForm/SettingsForm';
import './Settings.css';

class Settings extends Component {
  render() {
    return (
      <>
        <Header type='main'/>
        <SettingsForm />
      </>
    );
  }
}

export default Settings;