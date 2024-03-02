import {Component} from 'react'
import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class CowinDashboard extends Component {
  state = {
    vaccinationData: {},
    apiFetchStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getVaccinationData()
  }

  modifyDataObject = data => ({
    lastSevenDaysVaccinData: data.last_7_days_vaccination.map(eachData =>
      this.modifyLastSevenDaysData(eachData),
    ),
    vaccinationByAge: data.vaccination_by_age,
    vaccinationByGender: data.vaccination_by_gender,
  })

  modifyLastSevenDaysData = data => ({
    vaccineDate: data.vaccine_data,
    doseOne: data.dose_1,
    doseTwo: data.dose_2,
  })

  getVaccinationData = async () => {
    this.setState({apiFetchStatus: apiStatusConstant.inProgress})

    const url = 'https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(url)
    const data = await response.json()

    if (response.ok) {
      const modifiedData = this.modifyDataObject(data)
      this.setState({
        vaccinationData: modifiedData,
        apiFetchStatus: apiStatusConstant.success,
      })
    }
  }

  render() {
    return (
      <div data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
      </div>
    )
  }
}

export default CowinDashboard
