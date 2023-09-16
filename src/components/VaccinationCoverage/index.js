// Write your code here
import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'
import './index.css'

const VaccinationCoverage = props => {
  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }
  const {VaccinationCoverageDetails} = props
  return (
    <div className="vaccination-by-coverage-container">
      <h1 className="vaccination-by-coverage-heading">Vaccination Coverage</h1>
      <BarChart
        width={1000}
        height={300}
        data={VaccinationCoverageDetails}
        margin={{
          top: 5,
        }}
      >
        <XAxis
          dataKey="vaccineDate"
          tick={{
            stroke: 'gray',
            strokeWidth: 1,
            fontFamily: 'Roboto',
            fontSize: 15,
          }}
        />
        <YAxis
          tickFormatter={DataFormatter}
          tick={{
            stroke: 'gray',
            strokeWidth: 0.5,
            fontSize: 15,
            fontFamily: 'Roboto',
          }}
        />
        <Legend
          wrapperStyle={{
            padding: 30,
            fontFamily: 'Roboto',
            textAlign: 'center',
            fontSize: 12,
          }}
        />
        <Bar
          dataKey="boys"
          name="Dose1"
          fill="#1f77b4"
          barSize="20%"
          radius={[10, 10, 0, 0]}
        />
        <Bar
          dataKey="girls"
          name="Dose2"
          fill="#f54394"
          barSize="20%"
          radius={[10, 10, 0, 0]}
        />
      </BarChart>
    </div>
  )
}
export default VaccinationCoverage
