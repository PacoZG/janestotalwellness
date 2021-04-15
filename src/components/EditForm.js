import React from 'react'

const EditForm = () => {

  return (
    <div>
      <div className="bg-white m-2 md:m-8 mb-1 shadow overflow-hidden rounded-lg" >
        <div >
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="pt-3 md:col-span-1">
              <div className="pt-2 px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 pt-3 text-gray-900">Profile</h3>
                <p className="mt-1 text-sm text-gray-600">This information will be show only to the admins.</p>
              </div>
            </div>
            <div className="mr-2 ml-2 mt-3 md:mt-5 md:col-span-2">
              <form action="#" method="POST">
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                  <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <div className="grid grid-cols-3 gap-6">
                      {/* <div className="col-span-3 sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Website</label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                            http:// </span>
                          <input type="text" name="company_website" id="company_website" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="www.example.com" />
                        </div>
                      </div> */}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Health information</label>
                      <div className="mt-1">
                        <textarea id="about" name="about" rows="3" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="you@example.com"></textarea>
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Share something that you believe is important to me. Chronical health issues, medical treatments, etc.
                        </p>
                    </div>

                    <div className="object-center ml-16">
                      <label className="block text-sm pl-2 font-medium text-gray-700">Photo</label>
                      <div className="mt-1 flex items-center">
                        <span className="inline-block h-14 w-14 rounded-full overflow-hidden bg-gray-100">
                          <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </span>
                        <label className="relative cursor-pointer ml-20 mt-1 bg-gray-500 px-3 py-2 rounded-md text-sm text-white
                        hover:text-gray-600 hover:bg-red-600 focus-within:outline-none focus-within:ring-1
                          focus-within:ring-offset-2 focus-within:ring-red-600">
                          <span>Upload a picture</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 ml-7">PNG, JPG, GIF up to 10MB</p>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm font-medium rounded-md
                      bg-gray-500 text-sm text-white hover:text-gray-600 hover:bg-red-600 focus-within:outline-none focus-within:ring-1">
                      Save</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200"></div>
          </div>
        </div>
        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Edit Personal Information</h3>
                <p className="mt-1 text-sm text-gray-600">Use a permanent address where you can receive mail.</p>
              </div>
            </div>
            <div className="mr-2 ml-2 mt-3 md:mt-5 md:col-span-2">
              <form action="#" method="POST">
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-700">First name</label>
                        <input type="text" name="first_name" id="first_name" autoComplete="given-name"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-700">Last name</label>
                        <input type="text" name="last_name" id="last_name" autoComplete="family-name"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                      </div>

                      <div className="col-span-6 sm:col-span-4">
                        <label className="block text-sm font-medium text-gray-700">Email address</label>
                        <input type="text" name="email_address" id="email_address" autoComplete="email"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-700">Country / Region</label>
                        <select id="country" name="country" autoComplete="country"
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                          <option value="Finland" >Finland</option>
                          <option value="Sweden" >Sweden</option>
                          <option value="Norway" >Norway</option>
                          <option value="Estonia" >Estonia</option>
                          <option value="Mexico" >Mexico</option>
                        </select>
                      </div>

                      <div className="col-span-6">
                        <label className="block text-sm font-medium text-gray-700">Street address</label>
                        <input type="text" name="street_address" id="street_address" autoComplete="street-address"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                      </div>

                      <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">City</label>
                        <input type="text" name="city" id="city"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                      </div>

                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">State / Province</label>
                        <input type="text" name="state" id="state"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                      </div>

                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">ZIP / Postal</label>
                        <input type="text" name="postal_code" id="postal_code" autoComplete="postal-code"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Save</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditForm