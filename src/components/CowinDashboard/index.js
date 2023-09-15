// Write your code here

import {Component} from 'react'

class CowinDashboard extends Component {
  render() {
    return (
      <div className="app-container">
        <div className="Cowin-dashboard-container">
          <div className="logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
              className="website-image"
            />
            <h1 className="main-heading">Co-WIN</h1>
          </div>
          <h1 className="cowin-heading">CoWIN Vaccination in India</h1>
        </div>
      </div>
    )
  }
}

export default CowinDashboard
