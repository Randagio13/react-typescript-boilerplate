import * as PropTypes from 'prop-types'
import * as React from 'react'
import { RouteComponentProps } from 'react-router'

interface IProps extends RouteComponentProps<any> {
  process?: any
}

class Home extends React.Component<IProps, any> {
  public propsTypes = {
    process: PropTypes.any
  }
  public render (): JSX.Element {
    return (
      <div>{'React typescript boilerplate'}</div>
    )
  }
}

export default Home
