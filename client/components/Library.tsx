import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'

import { getBooks, deletingBook, updatingBook } from '../actions/books'
import { Book } from '../../shared/types'
import BookDataInput from './BookDataInput'

export default function Library() {
  const dispatch = useAppDispatch()
  const books = useAppSelector((state) => state.books)

  const [updateBook, setUpdateBook] = useState<Book | undefined>()

  function handleUpdate(book: Book) {
    // if book undefined or id not found then return because can't update.
    if (updateBook?.id == null) {
      return
    }
    dispatch(updatingBook(updateBook.id, book))
      .then(() => {
        setUpdateBook(undefined)
      })
      .catch(() => {}) // TODO: handle error gracefully
  }

  function remove(id: string) {
    const numberId = Number(id)
    dispatch(deletingBook(numberId))
  }

  useEffect(() => {
    dispatch(getBooks())
  }, [dispatch])

  return (
    <>
      <div className="pt-6 text-center font-body text-2xl font-bold uppercase tracking-widest-0.1">
        My Library
      </div>
      <ol>
        {books?.map((book) => {
          return (
            <div
              className="inset-0 flex justify-center py-6 text-center tracking-widest-0.1"
              key={book.id}
            >
              <li>
                {book.title}
                <br />
                By {book.author}
                <div className="flex flex-row justify-center before:absolute before:block before:text-center sm:gap-8 md:gap-10">
                  {/* // TODO: Add media queries to effectively handle spacing between below buttons for smaller devices */}
                  <button
                    className="my-4 flex cursor-pointer border px-4 py-2 font-body text-sm font-semibold text-black transition duration-300 hover:bg-red-200 hover:text-black"
                    type="button"
                    onClick={() => remove(`${book.id}`)}
                  >
                    Remove
                  </button>
                  <button
                    className="bg-transparent my-4 flex cursor-pointer border px-4 py-2 font-body text-sm font-semibold text-black transition duration-300 hover:bg-blue-200 hover:text-black"
                    type="button"
                    onClick={() => {
                      setUpdateBook(book)
                    }}
                  >
                    Update
                  </button>
                </div>
              </li>
            </div>
          )
        })}
      </ol>

      {updateBook && (
        <>
          <div className="pt-6 font-body text-xl font-bold uppercase">
            📚 Update Book 📚
          </div>
          <BookDataInput
            onSubmit={handleUpdate}
            submitButtonText="Update"
            defaults={updateBook}
          />
        </>
      )}
    </>
  )
}
