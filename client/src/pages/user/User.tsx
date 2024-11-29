import { useEffect, useState } from 'react'
import { api_service } from './service'
import { MdEdit } from 'react-icons/md'
import { MdDelete } from 'react-icons/md'
import { RxCross2 } from 'react-icons/rx'
import { Pagination } from './Pagination'

const InputComponenet = ({
  type,
  value,
  placeholder,
  name,
  handleChange,
}: any) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      required
      onChange={(e) => {
        handleChange(e, name)
      }}
      className="w-full text-slate-950 text-slate-300 focus:bg-slate-50 rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none "
    />
  )
}
export const User = () => {
  const [new_module_data, set_new_module_data] = useState({
    first_name: '',
    last_name: '',
    email: '',
    marks: '',
    subject_name: '',
  })
  const [module_pagination, set_module_pagination] = useState({
    offset: 0,
    limit: 10,
  })
  const [students, setStudents]: any = useState([])
  const [module_row_id, set_module_row_id]: any = useState()
  const [is_new_add_toggle, set_is_new_add_toggle] = useState(false)
  const [is_update_toggle, set_is_update_toggle] = useState(false)
  const [res_message, set_res_message] = useState('')
  const [is_delete, set_is_delete]: any = useState(false)
  const [delete_row_id, set_delete_row_id]: any = useState()

  const common_catch_handler = (error: any) => {
    set_res_message(
      error.response.data.error ??
        error.response.data.message ??
        error.message ??
        'Something went wrong!',
    )
  }
  const module_data = async (body: any) => {
    try {
      const response: any = await api_service.list_data(body)
      console.log('response : ', response.data.result)
      setStudents(response.data.result)
    } catch (error) {
      console.error('Error fetching students:', error)
    }
  }

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    set_new_module_data((prevState: any) => ({ ...prevState, [name]: value }))
  }

  const handleDataSave = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    try {
      const response: any = await api_service.add_data(new_module_data)
      if (response !== undefined) {
        set_res_message(response.data.message)
        await module_data({ pagination: module_pagination })
      }
      set_new_module_data({
        first_name: '',
        last_name: '',
        email: '',
        marks: '',
        subject_name: '',
      })
    } catch (error) {
      common_catch_handler(error)
    }
  }
  const handleDataUpdate = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    try {
      const response = await api_service.update_data({
        body: new_module_data,
        module_row_id: module_row_id,
      })
      if (response !== undefined) {
        set_res_message(response.data.message)
        await module_data({ pagination: module_pagination })
      }
    } catch (error) {
      common_catch_handler(error)
    }
  }

  const handleDeleteClick = async (module_row_id?: any) => {
    try {
      let module_row_id = delete_row_id
      if (module_row_id !== undefined) {
        const response = await api_service.delete_data_by_params(module_row_id)
        set_res_message(response.data.message)
        if (response.status == 200) {
          setStudents((prev_data: any) => {
            return {
              ...prev_data,
              data: prev_data.data.filter(
                (data: any) => data.id !== module_row_id,
              ),
            }
          })
          set_is_delete(false)
        }
        if (response !== undefined) {
          common_catch_handler(response.data.message)
          //toast.success(response.data.message)
        }
      }
    } catch (error) {
      common_catch_handler(error)
    }
  }

  const handleEditClick = async (row: any) => {
    console.log('ROW : ', row)
    set_is_new_add_toggle(false)
    set_is_update_toggle(true)
    set_module_row_id(row.id)

    set_new_module_data({
      first_name: row.first_name,
      last_name: row.last_name,
      email: row.email,
      marks: row.marks,
      subject_name: row.subject_name,
    })
  }

  useEffect(() => {
    // Fetch options from the API
    const manageData = async () => {
      try {
        await module_data({ pagination: module_pagination })
      } catch (error) {
        common_catch_handler(error)
      }
    }
    // Call the function when the component mounts
    manageData()
  }, [])

  const handleChildData = async (data: any) => {
    await module_data({
      pagination: {
        offset:
          data.page_number == 1
            ? 0
            : data.item_per_page * (data.page_number - 1),
        limit: data.item_per_page,
      },
      pege_filter: [],
    })
    // setStudents(response_data)
    // set_module_pagination({
    //   offset: data.page_number == 1 ? 0 : data.item_per_page * data.page_number,
    //   limit: data.item_per_page,
    // });
    //setChildData(data);
  }

  return (
    <div className="flex flex-col gap-2 md:p-2 xl:p-8 2xl:p-10 bg-slate-200 overflow-x-auto text-xs">
      <div className="text-red-800 text-sm">
        {res_message !== null && <div>{res_message}</div>}
      </div>
      {is_delete && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
          id="deleteModal"
        >
          <div className="bg-slate-300 rounded-lg shadow-lg w-96 p-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Confirm Delete
            </h2>
            <p className="text-gray-600 mt-2">
              Are you sure you want to delete this item? This action cannot be
              undone.
            </p>

            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => set_is_delete(false)}
                id="cancelButton"
                className="bg-green-500 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteClick()}
                id="confirmButton"
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="p-2 rounded-sm flex flex-col gap-4 bg-slate-100 shadow-default">
        <div className="flex justify-between items-center">
          <h3 className="font-sans text-lg text-red-800">Student</h3>

          <button
            onClick={() => {
              set_new_module_data({
                first_name: '',
                last_name: '',
                email: '',
                marks: '',
                subject_name: '',
              })
              set_is_update_toggle(false)
              set_is_new_add_toggle(!is_new_add_toggle)
            }}
            className="hover:text-blue-600 justify-center border border-stroke p-1 rounded-lg border-blue-500 text-blue-600 items-center flex gap-1"
          >
            <p className="text-blue-600">Add New Student</p>
          </button>
        </div>
      </div>
      {(is_new_add_toggle || is_update_toggle) && (
        <div className="p-3 relative rounded-sm flex flex-col gap-2 bg-slate-100 shadow-default">
          <RxCross2
            onClick={() => {
              set_is_update_toggle(false)
              set_is_new_add_toggle(false)
            }}
            className="text-base hover:text-red-600 hover:cursor-pointer absolute top-1 right-1"
          />
          <form>
            <div className="flex flex-col">
              <div className="w-full text-xs  flex flex-col xl:flex-row lg:flex-row 2xl:flex-row justify-between gap-2 items-center">
                <div className=" w-full  justify-center items-start">
                  <div className="flex gap-2 items-center">
                    <label className="mb-2.5 block font-normal text-slate-950">
                      First Name
                    </label>
                  </div>
                  <div className="w-full">
                    <InputComponenet
                      type="text"
                      name="first_name"
                      value={new_module_data.first_name}
                      placeholder="Enter first name"
                      handleChange={handleChange}
                    />
                  </div>
                </div>
                <div className=" w-full  justify-center items-start">
                  <div className="flex gap-2 items-center">
                    <label className="mb-2.5 block font-normal text-slate-950">
                      Last Name
                    </label>
                  </div>
                  <div className="w-full">
                    <InputComponenet
                      type="text"
                      name="last_name"
                      value={new_module_data.last_name}
                      placeholder="Enter last name"
                      handleChange={handleChange}
                    />
                  </div>
                </div>
                <div className=" w-full  justify-center items-start">
                  <div className="flex gap-2 items-center">
                    <label className="mb-2.5 block font-normal text-slate-950">
                      Email
                    </label>
                  </div>
                  <div className="w-full">
                    <InputComponenet
                      type="text"
                      name="email"
                      value={new_module_data.email}
                      placeholder="Enter email"
                      handleChange={handleChange}
                    />
                  </div>
                </div>
                <div className=" w-full  justify-center items-start">
                  <div className="flex gap-2 items-center">
                    <label className="mb-2.5 block font-normal text-slate-950">
                      Marks
                    </label>
                  </div>
                  <div className="w-full">
                    <InputComponenet
                      type="text"
                      name="marks"
                      value={new_module_data.marks}
                      placeholder="Enter marks"
                      handleChange={handleChange}
                    />
                  </div>
                </div>
                <div className=" w-full  justify-center items-start">
                  <div className="flex gap-2 items-center">
                    <label className="mb-2.5 block font-normal text-slate-950">
                      Subject
                    </label>
                  </div>
                  <div className="w-full">
                    <InputComponenet
                      type="text"
                      name="subject_name"
                      value={new_module_data.subject_name}
                      placeholder="Enter subject"
                      handleChange={handleChange}
                    />
                  </div>
                </div>

                <div className="w-full lg:pt-7 xl:pt-7 2xl:pt-7">
                  {is_update_toggle && (
                    <button
                      type="submit"
                      onClick={handleDataUpdate}
                      className="w-full cursor-pointer rounded-lg hover:font-bold bg-primary font-monotext-xs p-2 bg-sky-800 hover:bg-sky-900 text-white transition hover:bg-opacity-90"
                    >
                      Update
                    </button>
                  )}
                  {is_new_add_toggle && (
                    <button
                      type="submit"
                      onClick={handleDataSave}
                      className="w-full cursor-pointer rounded-lg hover:font-bold bg-primary font-monotext-xs p-2 bg-sky-800 hover:bg-sky-900 text-white transition hover:bg-opacity-90"
                    >
                      Add
                    </button>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      )}

      <div className="rounded-sm bg-slate-100 p-3 pb-8 shadow-default text-xs">
        <div className="flex overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="bg-gray-300 w-full text-slate-950">
                <th className=" text-xs font-semibold p-4">Id</th>
                <th className=" text-xs font-semibold p-4">First Name</th>
                <th className="text-xs font-semibold p-4">Last Name</th>
                <th className="text-xs font-semibold p-4">Email</th>
                <th className="text-xs font-semibold p-4">Marks</th>
                <th className="text-xs font-semibold p-4">Subject Name</th>
                <th className="text-xs font-semibold p-4">Action</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {students.length !== 0 &&
                students !== undefined &&
                students.data.length !== 0 &&
                students.data != undefined &&
                students.data.map((row: any) => (
                  <tr className="w-full border-b" key={row.id}>
                    <td key={row.id} className=" items-center text-center p-4">
                      <p className="text-slate-900 text-xs">{row.id}</p>
                    </td>
                    <td
                      key={row.first_name}
                      className=" items-center text-center p-4"
                    >
                      <p className="text-slate-900 text-xs">{row.first_name}</p>
                    </td>
                    <td
                      key={row.last_name}
                      className=" items-center text-center p-4"
                    >
                      <p className="text-slate-900 text-xs">{row.last_name}</p>
                    </td>
                    <td
                      key={row.email}
                      className=" items-center text-center p-4"
                    >
                      <p className="text-slate-900 text-xs">{row.email}</p>
                    </td>
                    <td
                      key={row.marks}
                      className=" items-center text-center p-4"
                    >
                      <p className="text-slate-900 text-xs">{row.marks}</p>
                    </td>
                    <td
                      key={row.subject_name}
                      className=" items-center text-center p-4"
                    >
                      <p className="text-slate-900 text-xs">
                        {row.subject_name}
                      </p>
                    </td>
                    <td className="border-b text-center">
                      <div className="flex justify-center items-center">
                        <div className="flex justify-start items-center gap-4 ">
                          <MdEdit
                            onClick={() => handleEditClick(row)}
                            className="hover:text-blue-600 text-2xl  justify-center p-1 rounded-lg border-blue-400 text-blue-400 items-center flex gap-1"
                          ></MdEdit>
                          <MdDelete
                            onClick={() => {
                              set_is_delete(true)
                              set_delete_row_id(row.id)
                            }}
                            className="hover:text-blue-600 text-2xl justify-center p-1 rounded-lg border-blue-400 text-blue-400 items-center flex gap-1"
                          ></MdDelete>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="rounded-sm bg-slate-100 p-3 pb-8 shadow-default text-xs">
        <div>
          <Pagination
            props={students.data_count}
            onSendData={handleChildData}
          />
        </div>
      </div>
    </div>
  )
}
