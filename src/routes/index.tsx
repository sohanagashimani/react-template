import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { SortProvider } from '../contexts/SortContext'
import { AuthProvider } from '../contexts/onAuth'
import { SearchBar } from '../components/SearchBar'

export const Route = createFileRoute('/')({
  component: AppWrapper,
})

function AppWrapper() {
  return (
    <SortProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </SortProvider>
  )
}

type Trip = {
  id: number
  destination: string
  price: number // in USD
  rating: number // 1–5
  date: string // ISO format
}

const trips: Array<Trip> = [
  { id: 1, destination: 'Paris', price: 1200, rating: 4.8, date: '2025-09-15' },
  { id: 2, destination: 'London', price: 900, rating: 4.5, date: '2025-08-25' },
  { id: 3, destination: 'Tokyo', price: 2000, rating: 4.9, date: '2025-12-01' },
  { id: 4, destination: 'Goa', price: 400, rating: 4.2, date: '2025-07-20' },
]

function App() {
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'date'>('price')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [rating, setRating] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 2 // how many trips per page

  // filter by date range + rating
  const filteredTrips = trips.filter((trip) => {
    if (!trip.date || isNaN(new Date(trip.date).getTime())) return false
    const tripDate = new Date(trip.date).getTime()

    if (startDate && endDate) {
      const start = new Date(startDate).getTime()
      const end = new Date(endDate).getTime()
      return tripDate >= start && tripDate <= end
    }
    if (startDate) return tripDate >= new Date(startDate).getTime()
    if (endDate) return tripDate <= new Date(endDate).getTime()
    if (rating) return trip.rating >= parseFloat(rating)

    return true
  })

  // sort
  const sortedTrips = [...filteredTrips].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price
    if (sortBy === 'rating') return b.rating - a.rating
    return new Date(a.date).getTime() - new Date(b.date).getTime()
  })

  // pagination
  const totalPages = Math.ceil(sortedTrips.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const currentTrips = sortedTrips.slice(startIndex, startIndex + pageSize)

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  return (
    <div className="p-4 space-y-4">
      {/* Search Bar */}
      <div className="mb-6">
        <SearchBar />
      </div>

      {/* Controls */}
      <div className="flex gap-2">
        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value as any)
            setCurrentPage(1) // reset page on sort
          }}
          className="border p-2 rounded"
        >
          <option value="price">Sort by Price</option>
          <option value="rating">Sort by Rating</option>
          <option value="date">Sort by Date</option>
        </select>

        <input
          type="date"
          value={startDate}
          onChange={(e) => {
            setStartDate(e.target.value)
            setCurrentPage(1) // reset page
          }}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => {
            setEndDate(e.target.value)
            setCurrentPage(1) // reset page
          }}
          min={startDate}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Min Rating"
          className="border p-2 rounded"
          value={rating}
          onChange={(e) => {
            setRating(e.target.value)
            setCurrentPage(1) // reset page
          }}
        />
      </div>

      {/* Results */}
      <ul className="space-y-2">
        {currentTrips.length ? (
          currentTrips.map((trip) => (
            <li key={trip.id} className="p-2 border rounded">
              {trip.destination} – ${trip.price} – ⭐ {trip.rating} – 📅{' '}
              {new Date(trip.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </li>
          ))
        ) : (
          <li className="p-2 border rounded text-gray-500">No trips found</li>
        )}
      </ul>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex gap-2 items-center">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`px-3 py-1 border rounded ${
                page === currentPage ? 'bg-blue-500 text-white' : ''
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
