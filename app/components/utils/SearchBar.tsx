import { useNavigate, useSearchParams } from '@remix-run/react'

export function SearchBar() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
  
    const clearFilters = () => {
      searchParams.delete('filter')
      searchParams.delete('sort')
      navigate('/dashboard')
    }
  
    return (
      <form className="w-fit px-6 flex items-center gap-x-4 border-b-4 border-b-blue-900 border-opacity-30 ">
        <div className={`flex items-center w-2/5`}>
          <input
            type="text"
            name="filter"
            className="w-full rounded-xl px-3 py-1"
            placeholder="Search a message or name"
          />
          <svg
            className="w-4 h-4 fill-current text-gray-400 -ml-8"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
        </div>
        <button
          type="submit"
          className="rounded-xl bg-yellow-300 font-semibold text-blue-600 px-3 py-2 transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1"
        >
          Search
        </button>
        {searchParams.get('filter') && (
          <button
            onClick={clearFilters}
            className="rounded-xl bg-red-300 font-semibold text-blue-600 px-3 py-2 transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1"
          >
            Clear Filters
          </button>
        )}
        <div className="flex-1" />
      </form>
    )
  }