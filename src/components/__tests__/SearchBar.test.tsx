import { act, fireEvent, render, screen } from '@testing-library/react'
import { SortProvider } from '../../contexts/SortContext'
import { SearchBar } from '../SearchBar'
import type { ReactNode } from 'react'

// Explicitly type children as ReactNode
const MockProviders = ({ children }: { children: ReactNode }) => (
  <SortProvider>{children}</SortProvider>
)

// Use global jest type for mocking
jest.mock('../../contexts/onAuth', () => ({
  useAuth: () => [
    {
      user: null,
      token: '',
      isLoading: false,
    },
    () => {},
    () => {},
  ],
}))

describe('SearchBar Functionality', () => {
  it('Dropdown shows on input and hides on selection', async () => {
    await act(async () => {
      render(
        <MockProviders>
          <SearchBar />
        </MockProviders>,
      )
    })

    const search = screen.getByTestId('search-input')
    fireEvent.change(search, { target: { value: 'ave' } })

    const dropdown = screen.getByTestId('auth-dropdown-btn')
    fireEvent.click(dropdown)
    await new Promise((resolve) => setTimeout(resolve, 15))

    expect(screen.queryByTestId('search-div')).not.toBeInTheDocument()
  })

  it.only('Dropdown hides on clicking listed hotel', async () => {
    await act(async () => {
      render(
        <MockProviders>
          <SearchBar />
        </MockProviders>,
      )
    })

    // Perform search
    const search = screen.getByTestId('search-input')
    fireEvent.change(search, { target: { value: 'ave' } })

    await new Promise((resolve) => setTimeout(resolve, 15))
    expect(screen.queryByTestId('search-div')).toBeInTheDocument()

    const hotelSuggestion = screen.getByTestId('apartment-name')
    console.log(hotelSuggestion)

    await act(async () => {
      fireEvent.click(hotelSuggestion)
    })

    // Add a small delay to ensure state update
    // await new Promise((resolve) => setTimeout(resolve, 0))

    expect(screen.queryByTestId('search-div')).not.toBeInTheDocument()
  })
})
