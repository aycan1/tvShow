import { setActivePinia, createPinia } from 'pinia'
import { useShowStore } from '../showStore'
import { describe, it, expect, beforeEach, vi } from 'vitest'

vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
  },
}))

describe('Show Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('fetches shows', async () => {
    const store = useShowStore()
    const mockShows = [{ id: 1, name: 'Test Show' }]
    vi.mocked(axios.get).mockResolvedValueOnce({ data: mockShows })

    await store.fetchShows()

    expect(store.shows).toEqual(mockShows)
    expect(store.isLoading).toBe(false)
  })

  it('fetches show details', async () => {
    const store = useShowStore()
    const mockShow = { id: 1, name: 'Test Show', summary: 'Test Summary' }
    vi.mocked(axios.get).mockResolvedValueOnce({ data: mockShow })

    await store.fetchShowDetails('1')

    expect(store.currentShow).toEqual(mockShow)
  })
})