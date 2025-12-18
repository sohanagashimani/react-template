import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import useDebounce from '../hooks/useDebounce'

interface Hotel {
  id: number
  name: string
  location: string
  price: number
  rating: number
}

const mockHotels: Array<Hotel> = [
  {
    id: 1,
    name: 'Grand Plaza Hotel',
    location: 'New York, NY',
    price: 299,
    rating: 4.5,
  },
  {
    id: 2,
    name: 'Seaside Resort',
    location: 'Miami, FL',
    price: 199,
    rating: 4.2,
  },
  {
    id: 3,
    name: 'Mountain View Lodge',
    location: 'Aspen, CO',
    price: 399,
    rating: 4.8,
  },
  {
    id: 4,
    name: 'Urban Avenue Suites',
    location: 'Los Angeles, CA',
    price: 249,
    rating: 4.3,
  },
  {
    id: 5,
    name: 'Riverside Hotel',
    location: 'Chicago, IL',
    price: 179,
    rating: 4.1,
  },
  {
    id: 6,
    name: 'Sunset Boulevard Inn',
    location: 'Santa Monica, CA',
    price: 329,
    rating: 4.6,
  },
  {
    id: 7,
    name: 'Avenue Hotel',
    location: 'San Francisco, CA',
    price: 189,
    rating: 4.0,
  },
]

interface SearchBarProps {
  onHotelSelect?: (hotel: Hotel) => void
}

export const SearchBar: React.FC<SearchBarProps> = ({ onHotelSelect }) => {
  const [searchText, setSearchText] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [searchResults, setSearchResults] = useState<Array<Hotel>>([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const debouncedSearchText = useDebounce(searchText, 10)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false)
        setShowResults(false)
        setSearchText('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const fetchSearchResults = useCallback(async (value: string) => {
    if (value.length > 0) {
      try {
        // Simulate API call with mock data
        const filtered = mockHotels.filter(
          (hotel) =>
            hotel.name.toLowerCase().includes(value.toLowerCase()) ||
            hotel.location.toLowerCase().includes(value.toLowerCase()),
        )
        setSearchResults(filtered)
      } catch (error) {
        console.error('Error retrieving search results:', error)
      }
    } else {
      setSearchResults([])
    }
  }, [])

  useEffect(() => {
    fetchSearchResults(debouncedSearchText)
  }, [debouncedSearchText])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setSearchText(value)
    setShowResults(value.length > 0)
    setIsDropdownOpen(true)
  }

  const handleApartmentClick = (apartmentId: number) => {
    const hotel = mockHotels.find((h) => h.id === apartmentId)
    if (hotel) {
      onHotelSelect?.(hotel)
    }
    setIsDropdownOpen(false)
    setShowResults(false)
    setSearchText('')
  }

  const memoizedSearchResults = useMemo(() => {
    return searchResults.length > 0 ? (
      searchResults.map((result) => (
        <div
          key={result.id}
          data-testid="apartment-name"
          onClick={() => handleApartmentClick(result.id)}
          className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
        >
          <div className="font-medium text-gray-900">{result.name}</div>
          <div className="text-sm text-gray-600">{result.location}</div>
          <div className="text-sm text-gray-500">
            ${result.price}/night • ⭐ {result.rating}
          </div>
        </div>
      ))
    ) : (
      <div className="p-3 text-gray-500 text-center">
        No matching results found
      </div>
    )
  }, [searchResults, handleApartmentClick])

  return (
    <div className="search-bar">
      <input
        data-testid="search-input"
        type="text"
        className="search-input"
        placeholder="Search for a location"
        value={searchText}
        onChange={handleInputChange}
      />
      <button
        className="search-button"
        onClick={() => {
          fetchSearchResults(searchText)
        }}
        data-testid="auth-dropdown-btn"
      >
        Search
      </button>
      {isDropdownOpen && showResults && (
        <div
          ref={dropdownRef}
          data-testid="search-div"
          className="results-dropdown"
        >
          {memoizedSearchResults}
        </div>
      )}
    </div>
  )
}
