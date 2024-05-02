import { useEffect, useState } from 'react'
import { api_service } from './service'
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
      className="w-full text-slate-300 focus:bg-slate-900 rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none "
    />
  )
}
export const User = () => {
  const [new_module_data, set_new_module_data] = useState({
    first_name: '',
    last_name: '',
    email: '',
    contact: '',
  })
  const [module_list, set_module_list] = useState([])
  const [module_post_put_count, set_module_post_put_count]: any = useState(null)
  const [module_row_id, set_module_row_id] = useState()
  const [is_new_add_toggle, set_is_new_add_toggle] = useState(false)
  const [is_update_toggle, set_is_update_toggle] = useState(false)
  const [is_module_update, set_is_module_update] = useState(false)
  const [res_message, set_res_message] = useState('')
  const common_catch_handler = (error: any) => {
    console.log(
      'Exception_Error_User_38 : ',
      error.response.data.error ??
        error.response.data.message ??
        error.message ??
        error,
    )
    set_res_message(
      error.response.data.error ??
        error.response.data.message ??
        error.message ??
        'Something went wrong!',
    )
  }
  const module_data = async () => {
    const response = await api_service.list_data()
    return response.data.result
  }

  const get_update_save_count = async () => {
    const response = await api_service.get_update_save_count()
    set_module_post_put_count(response.data.result)
    //return response.data.result
  }

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    set_new_module_data((prevState: any) => ({ ...prevState, [name]: value }))
  }

  const handleDataSave = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    try {
      const response = await api_service.add_data(new_module_data)
      if (response !== undefined) {
        set_res_message(response.data.message)
        const response_data = await module_data()
        set_module_list(response_data)
      }
      set_new_module_data({
        first_name: '',
        last_name: '',
        email: '',
        contact: '',
      })
    } catch (error) {
      common_catch_handler(error)
    }
  }
  const handleDataUpdate = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    try {
      const response = await api_service.update_data({
        ...new_module_data,
        module_row_id,
      })
      if (response !== undefined) {
        set_res_message(response.data.message)
        const response_data = await module_data()
        set_module_list(response_data)
      }
    } catch (error) {
      common_catch_handler(error)
    }
  }

  const handleEditClick = async (row: any) => {
    set_is_update_toggle(true)
    set_module_row_id(row.id)
    set_new_module_data({
      first_name: row.first_name,
      last_name: row.last_name,
      email: row.email,
      contact: row.contact,
    })
    set_is_module_update(true)
  }

  useEffect(() => {
    // Fetch options from the API
    const manageData = async () => {
      try {
        const response_data = await module_data()
        console.log('response_data : ', response_data)
        set_module_list(response_data)
      } catch (error) {
        common_catch_handler(error)
      }
    }
    // Call the function when the component mounts
    manageData()
  }, [])
  return (
    <div className="flex flex-col gap-2 md:p-2 xl:p-8 2xl:p-10 bg-slate-600 overflow-x-auto text-xs">
      <div className="text-slate-300 text-sm">
        {res_message !== null && <div>{res_message}</div>}
      </div>
      <div className="p-2 rounded-sm flex flex-col gap-4 bg-slate-800 shadow-default">
        <div className="flex justify-between items-center">
          <h3 className="font-sans text-cyan-500">User</h3>

          <div className="flex justify-center items-center gap-3">
            <div>
              {module_post_put_count !== null && (
                <div className="text-xs font-bold flex justify-center gap-3 items-center text-orange-600">
                  <p>Add: {module_post_put_count.post}</p>
                  <p>Update: {module_post_put_count.put}</p>
                </div>
              )}
            </div>
            <button
              onClick={get_update_save_count}
              className="hover:text-blue-600 justify-center border border-stroke p-1 rounded-lg border-blue-400 text-blue-400 items-center flex gap-1"
            >
              <p className="">Count</p>
            </button>
          </div>

          <button
            onClick={() => {
              set_new_module_data({
                first_name: '',
                last_name: '',
                email: '',
                contact: '',
              })
              set_is_update_toggle(false)
              set_is_new_add_toggle(!is_new_add_toggle)
            }}
            className="hover:text-blue-600 justify-center border border-stroke p-1 rounded-lg border-blue-400 text-blue-400 items-center flex gap-1"
          >
            <p className="">Add</p>
          </button>
        </div>
      </div>
      {(is_new_add_toggle || is_update_toggle) && (
        <div className="p-3 rounded-sm flex flex-col gap-2 bg-slate-800 shadow-default">
          <form>
            <div className="flex flex-col">
              <div className="w-full text-xs flex flex-col xl:flex-row lg:flex-row 2xl:flex-row justify-between gap-2 items-center">
                <div className=" w-full  justify-center items-start">
                  <div className="flex gap-2 items-center">
                    <label className="mb-2.5 block font-normal text-slate-300">
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
                    <label className="mb-2.5 block font-normal text-slate-300">
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
                    <label className="mb-2.5 block font-normal text-slate-300">
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
                    <label className="mb-2.5 block font-normal text-slate-300">
                      Conatct
                    </label>
                  </div>
                  <div className="w-full">
                    <InputComponenet
                      type="text"
                      name="contact"
                      value={new_module_data.contact}
                      placeholder="Enter contact"
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

      <div className="rounded-sm bg-slate-800 p-3 pb-8 shadow-default text-xs">
        <div className="flex overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="bg-gray-700 w-full ">
                <th className="text-slate-200 text-xs font-semibold p-4">
                  First Name
                </th>
                <th className="text-slate-200 text-xs font-semibold p-4">
                  Last Name
                </th>
                <th className="text-slate-200 text-xs font-semibold p-4">
                  Email
                </th>
                <th className="text-slate-200 text-xs font-semibold p-4">
                  Contact
                </th>
                <th className="text-slate-200 text-xs font-semibold p-4">
                  Update Count
                </th>
                <th className="text-slate-200 text-xs font-semibold p-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="w-full">
              {module_list.length > 0 &&
                module_list.map((row: any) => (
                  <tr className="w-full border-b" key={row.id}>
                    <td
                      key={row.first_name}
                      className=" items-center text-center p-4"
                    >
                      <p className="text-slate-300 text-xs">{row.first_name}</p>
                    </td>
                    <td
                      key={row.last_name}
                      className=" items-center text-center p-4"
                    >
                      <p className="text-slate-300 text-xs">{row.last_name}</p>
                    </td>
                    <td
                      key={row.email}
                      className=" items-center text-center p-4"
                    >
                      <p className="text-slate-300 text-xs">{row.email}</p>
                    </td>
                    <td
                      key={row.contact}
                      className=" items-center text-center p-4"
                    >
                      <p className="text-slate-300 text-xs">{row.contact}</p>
                    </td>
                    <td key={999} className=" items-center text-center p-4">
                      <p className="text-slate-300 text-xs">
                        {row.data_update !== null ? row.data_update : 0}
                      </p>
                    </td>
                    <td className="border-b text-center">
                      <div className="flex justify-center items-center">
                        <div className="flex justify-start items-center gap-4 ">
                          <button
                            onClick={() => handleEditClick(row)}
                            className="hover:text-blue-600 justify-center border border-stroke p-1 rounded-lg border-blue-400 text-blue-400 items-center flex gap-1"
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
