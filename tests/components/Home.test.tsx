import { Home } from 'components'
import { shallow } from 'enzyme'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

export const testOnSubmit = (event: any) => {
  alert(event)
}

const component = renderer.create(
  <Home />
).toJSON()

const HomeRender = shallow(<Home />)

test('Snapshot', () => {
  expect(component).toMatchSnapshot()
})

test('Check component', () => {
  // expect(component.type).toEqual('div')
  expect(HomeRender.text()).toEqual('React typescript boilerplate')
})
