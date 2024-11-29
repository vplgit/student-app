import { useState } from 'react'
import { GrFormNext } from 'react-icons/gr'
import { GrFormPrevious } from 'react-icons/gr'
import { GoMoveToEnd } from 'react-icons/go'
import { GoMoveToStart } from 'react-icons/go'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { MdKeyboardArrowUp } from 'react-icons/md'
export const Pagination = ({ props, onSendData }: any) => {
  const pages = [5, 10, 25, 50, 100]
  const [item_per_page, set_item_per_page] = useState(10)
  const [is_item_open, set_is_item_open] = useState(false)
  const [page_number, set_page_number] = useState(1)
  const moveToPage = (page: any) => {
    switch (page) {
      case 'start':
        onSendData({ item_per_page, page_number: 1 })
        set_page_number(1)
        break
      case 'end':
        if (item_per_page < props) {
          onSendData({
            item_per_page,
            page_number: Math.ceil(parseInt(props) / item_per_page),
          })
          set_page_number(Math.ceil(parseInt(props) / item_per_page))
        }
        break
      case 'next':
        set_page_number((prevPageNumber) => {
          const newPageNumber = prevPageNumber + 1
          onSendData({ item_per_page, page_number: newPageNumber })
          return newPageNumber
        })
        break
      case 'previous':
        if (page_number > 1) {
          set_page_number((prevPageNumber) => {
            const newPageNumber = prevPageNumber - 1
            onSendData({ item_per_page, page_number: newPageNumber })
            return newPageNumber
          })
        }
        break
      default:
        break
    }
  }

  return (
    <div className="flex flex-row justify-between items-center px-4">
      <div className="class border-b flex justify-center items-center ">
        <div className="p-1 text-sm text-slate-900" onClick={() => {}}>
          {item_per_page}
        </div>

        {is_item_open ? (
          <div className="relative">
            <MdKeyboardArrowUp
              className="text-slate-900"
              onClick={() => set_is_item_open(!is_item_open)}
            />
            <div className="absolute left-0 top-6 text-slate-900">
              {pages.map(
                (page) =>
                  item_per_page !== page && (
                    <div className="flex-col justify-center hover:cursor-pointer hover:font-bold gap-2 items-center">
                      <p
                        className="text-sm"
                        key={page}
                        onClick={() => {
                          set_item_per_page(page)
                          onSendData({ item_per_page: page, page_number })
                          set_is_item_open(false)
                        }}
                      >
                        {page}
                      </p>
                    </div>
                  ),
              )}
            </div>
          </div>
        ) : (
          <MdKeyboardArrowDown
            className="text-slate-300 relative"
            onClick={() => set_is_item_open(!is_item_open)}
          />
        )}
      </div>
      <div className="class flex justify-end items-center gap-5">
        <div className="flex justify-center gap-4 text-lg hover:cursor-pointer">
          <GoMoveToStart
            onClick={() => moveToPage('start')}
            //className="hover:text-blue-600"
            className={`${
              page_number === 1
                ? 'text-slate-400'
                : 'hover:text-blue-600 text-slate-900'
            }`}
          ></GoMoveToStart>
          <GrFormPrevious
            onClick={() => moveToPage('previous')}
            className="hover:text-blue-600 text-slate-900"
          ></GrFormPrevious>
          <p className="text-slate-900 font-normal text-sm">{props}</p>
          <GrFormNext
            onClick={() => moveToPage('next')}
            className="hover:text-blue-600 text-slate-900"
          ></GrFormNext>
          <GoMoveToEnd
            onClick={() => moveToPage('end')}
            className={`${
              props <= item_per_page
                ? 'text-slate-400'
                : 'hover:text-blue-600 text-slate-900'
            }`}
            // className="hover:text-blue-600 text-slate-300"
          ></GoMoveToEnd>
        </div>
      </div>
    </div>
  )
}
