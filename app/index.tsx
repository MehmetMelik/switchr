import Head from 'next/head'
import { useState, FormEvent } from 'react'

export default function Home(): JSX.Element {
  const [currentWage, setCurrentWage] = useState<string>('')
  const [dailyCommuteCost, setDailyCommuteCost] = useState<string>('')
  const [timeCost, setTimeCost] = useState<string>('')
  const [onerousPercent, setOnerousPercent] = useState<string>('')
  const [jobChangeCost, setJobChangeCost] = useState<string>('')
  const [result, setResult] = useState<string | null>(null)

  const calculateExtra = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const wage = parseFloat(currentWage)
    const commuteCost = parseFloat(dailyCommuteCost)
    const timeCostNum = parseFloat(timeCost)
    const onerous = parseFloat(onerousPercent)
    const jobChange = parseFloat(jobChangeCost)

    if (
      isNaN(wage) ||
      isNaN(commuteCost) ||
      isNaN(timeCostNum) ||
      isNaN(onerous) ||
      isNaN(jobChange)
    ) {
      alert('Please fill in all fields with valid numbers.')
      return
    }

    const workingDays = 200
    const rawCommuteCost = commuteCost * workingDays
    // For UK tax regime above £100K, apply a multiplier of ~1.67
    const taxMultiplier = wage > 100000 ? 1.67 : 1
    const adjustedCommuteCost = rawCommuteCost * taxMultiplier
    const onerousCost = (onerous / 100) * wage
    const totalExtra = adjustedCommuteCost + timeCostNum + onerousCost + jobChange

    setResult(totalExtra.toFixed(2))
  }

  return (
    <>
      <Head>
        <title>Job Offer Calculator</title>
        <meta name="description" content="Calculate the required salary increase" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
      </Head>
      <div className="container my-5">
        <h2 className="mb-4">Job Offer Extra Cost Calculator</h2>
        <form onSubmit={calculateExtra}>
          <div className="mb-3">
            <label htmlFor="currentWage" className="form-label">
              Current Annual Wage (£)
            </label>
            <input
              type="number"
              className="form-control"
              id="currentWage"
              placeholder="e.g., 150000"
              value={currentWage}
              onChange={(e) => setCurrentWage(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="dailyCommuteCost" className="form-label">
              Daily Commute Cost (£)
            </label>
            <input
              type="number"
              className="form-control"
              id="dailyCommuteCost"
              placeholder="e.g., 30"
              value={dailyCommuteCost}
              onChange={(e) => setDailyCommuteCost(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="timeCost" className="form-label">
              Annual Cost of Time Spent on Commute (£)
            </label>
            <input
              type="number"
              className="form-control"
              id="timeCost"
              placeholder="e.g., 20000"
              value={timeCost}
              onChange={(e) => setTimeCost(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="onerousPercent" className="form-label">
              Extra Job Onerousness (%)
            </label>
            <input
              type="number"
              className="form-control"
              id="onerousPercent"
              placeholder="e.g., 10"
              value={onerousPercent}
              onChange={(e) => setOnerousPercent(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="jobChangeCost" className="form-label">
              Cost of Changing Jobs (£)
            </label>
            <input
              type="number"
              className="form-control"
              id="jobChangeCost"
              placeholder="e.g., 15000"
              value={jobChangeCost}
              onChange={(e) => setJobChangeCost(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Calculate
          </button>
        </form>
        {result && (
          <div className="mt-4 alert alert-info" role="alert">
            Required salary increase: £{result}
          </div>
        )}
      </div>
    </>
  )
}
