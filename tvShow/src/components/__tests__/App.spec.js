import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import App from '../App.vue'
import { useShowStore } from '../stores/showStore'

describe('App', () => {
  it('renders properly', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [createTestingPinia()],
      },
    })
    expect(wrapper.text()).toContain('TV Show App')
  })

  it('fetches shows on mount', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [createTestingPinia()],
      },
    })
    const store = useShowStore()
    expect(store.fetchShows).toHaveBeenCalled()
  })
})