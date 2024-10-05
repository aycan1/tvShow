import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import ShowDetails from '../ShowDetails.vue'
import { useShowStore } from '../stores/showStore'

describe('ShowDetails', () => {
  it('renders show details', async () => {
    const wrapper = mount(ShowDetails, {
      global: {
        plugins: [createTestingPinia({
          initialState: {
            show: {
              currentShow: {
                id: 1,
                name: 'Test Show',
                summary: 'This is a test show',
              },
            },
          },
        })],
      },
      props: {
        id: '1',
      },
    })

    expect(wrapper.text()).toContain('Test Show')
    expect(wrapper.text()).toContain('This is a test show')
  })

  it('fetches show details on mount', async () => {
    const wrapper = mount(ShowDetails, {
      global: {
        plugins: [createTestingPinia()],
      },
      props: {
        id: '1',
      },
    })

    const store = useShowStore()
    expect(store.fetchShowDetails).toHaveBeenCalledWith('1')
  })
})