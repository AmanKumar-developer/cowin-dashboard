// Write your code here

import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationCoverage from '../VaccinationCoverage'

import './index.css'

const apiConstantsStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {apiStatus: apiConstantsStatus.initial, vaccinationData: {}}

  componentDidMount() {
    this.getVaccinationData()
  }

  getVaccinationData = async () => {
    this.setState({
      apiStatus: apiConstantsStatus.inProgress,
    })
    const VaccinationApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(VaccinationApiUrl)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const UpdatedData = {
        last7DaysVaccination: fetchedData.last_7_days_vaccination.map(
          eachDayData => ({
            vaccineDate: eachDayData.vaccine_date,
            dose1: eachDayData.dose_1,
            dose2: eachDayData.dose_2,
          }),
        ),
        vaccinationByAge: fetchedData.vaccination_by_age.map(eachAge => ({
          age: eachAge.age,
          count: eachAge.count,
        })),
        vaccinationByGender: fetchedData.vaccination_by_gender.map(
          eachgender => ({
            count: eachgender.count,
            gender: eachgender.gender,
          }),
        ),
      }
      this.setState({
        vaccinationData: UpdatedData,
        apiStatus: apiConstantsStatus.success,
      })
    } else {
      this.setState({
        apiStatus: apiConstantsStatus.failure,
      })
    }
  }

  renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-view-heading">Something went wrong</h1>
    </div>
  )

  renderVaccinationStatus = () => {
    const {vaccinationData} = this.state
    return (
      <>
        <VaccinationCoverage
          VaccinationCoverageDetails={vaccinationData.last7DaysVaccination}
        />
        <VaccinationByGender
          VaccinationByGenderDetails={vaccinationData.vaccinationByGender}
        />
        <VaccinationByAge
          VaccinationAgeDetails={vaccinationData.vaccinationByAge}
        />
      </>
    )
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderViewBasedOnApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstantsStatus.success:
        return this.renderVaccinationStatus()
      case apiConstantsStatus.failure:
        return this.renderFailureView()
      case apiConstantsStatus.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

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
          {this.renderViewBasedOnApiStatus()}
        </div>
      </div>
    )
  }
}

export default CowinDashboard
