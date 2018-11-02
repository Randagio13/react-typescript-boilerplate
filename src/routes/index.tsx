import { HomeContainer } from 'containers'
import * as React from 'react'
import { Route } from 'react-router-dom'
import { containerApp } from './style.scss'
const Routes = () => {
  return (
    <div className={containerApp}>
      <Route path='/' render={HomeContainer} />
    </div>
  )
}

export default Routes
