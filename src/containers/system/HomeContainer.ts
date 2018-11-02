import { Home } from 'components'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'

const mapStateToProps = (state: any): any => state

const mapDispatchToProps = (dispatch: any) => bindActionCreators({}, dispatch)

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Home)
)
