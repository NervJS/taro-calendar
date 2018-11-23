import Nerv from 'nervjs'
import { renderToString } from 'nerv-server'

import AtCalendar from '../../.temp/components/calendar/index'

describe('Calendar Snap', () => {
  it('render initial Progress', () => {
    const component = renderToString(<AtCalendar />)
    expect(component).toMatchSnapshot()
  })
})
