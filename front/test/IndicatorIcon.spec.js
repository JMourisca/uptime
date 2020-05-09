import IndicatorIcon from '@/components/visitors/general/IndicatorIcon'
import { mount } from '@vue/test-utils'

describe('IndicatorIcon', () => {
    test('accepts one of 3 values', () => {
        const status = IndicatorIcon.props.status

        expect(status.validator('up')).toBe(true)
        expect(status.validator('sdfsdfsdfsdfsdf')).toBe(false)
    })

    test('check classes', () => {
        const wrapper = mount(IndicatorIcon)
        expect(wrapper.find('.up').exists()).toBe(true)
        // wrapper.setProps({status: 'down'})
        // expect(wrapper.find('.down').exists()).toBe(true)
        // wrapper.setProps({status: 'issue'})
        // expect(wrapper.find('.issue').exists()).toBe(true)
    })
})
