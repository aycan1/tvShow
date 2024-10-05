import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import ShowList from '../ShowList.vue'
import { useShowStore } from '../stores/showStore'

describe('ShowList', () => {
  it('renders shows from store', () => {
    const wrapper = mount(ShowList, {
      global: {
        plugins: [createTestingPinia({
          initialState: {
            show: {
              shows: [
                { id: 1, name: 'Show 1' },
                { id: 2, name: 'Show 2' },
              ],
            },
          },
        })],
      },
    })
    
    expect(wrapper.findAll('.show-item')).toHaveLength(2)
    expect(wrapper.text()).toContain('Show 1')
    expect(wrapper.text()).toContain('Show 2')
  })

  it('displays loading message when fetching', () => {
    const wrapper = mount(ShowList, {
      global: {
        plugins: [createTestingPinia({
          initialState: {
            show: {
              isLoading: true,
            },
          },
        })],
      },
    })
    
    expect(wrapper.text()).toContain('Loading...')
  })
})