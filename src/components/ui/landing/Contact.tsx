import React, { useState } from "react";

const Contact = () => {
  // State variables for form data
  const [form_data, set_form_data] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    details: "",
  });

  // State variable for modal visibility
  const [modal, set_modal] = useState({
    is_open: false,
    message: "",
    is_success: false,
  });

  // Handle input change
  const handle_change = (e) => {
    const { name, value } = e.target;
    set_form_data((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handle_submit = async (e) => {
    e.preventDefault();

    try {
      // Replace with your API endpoint
      const response = await fetch(
        "https://ugs5b5uxm6.execute-api.ap-southeast-1.amazonaws.com/main/send-enquiry",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form_data),
        }
      );

      if (response.ok) {
        set_modal({
          is_open: true,
          message: "Your inquiry was sent successfully!",
          is_success: true,
        });
        set_form_data({
          first_name: "",
          last_name: "",
          email: "",
          phone_number: "",
          details: "",
        });
      } else {
        throw new Error("Failed to send inquiry");
      }
    } catch (error) {
      set_modal({
        is_open: true,
        message: "Something went wrong. Please try again.",
        is_success: false,
      });
    }
  };

  // Close the modal
  const close_modal = () => {
    set_modal((prev) => ({ ...prev, is_open: false }));
  };

  return (
    <>
      <div className="mt-12 max-w-lg mx-auto">
        {/* <!-- Card --> */}
        <div className="flex flex-col bg-gradient-to-b from-transparent to-teal-500/20  border rounded-xl p-4 sm:p-6 lg:p-8 border-2 border-blue-800/10">
          <h2 className="mb-8 text-xl font-semibold text-gray-800 dark:text-neutral-200">
            Fill in the form
          </h2>

          <form onSubmit={handle_submit}>
            <div className="grid gap-4 lg:gap-6">
              {/* <!-- Grid --> */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                <div>
                  <label
                    htmlFor="first_name"
                    className="block mb-2 text-sm text-gray-700 font-medium dark:text-white"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    value={form_data.first_name}
                    onChange={handle_change}
                    className="border border-gray-400 py-3 px-4 block w-full rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-violet-900 dark:border-violet-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  />
                </div>

                <div>
                  <label
                    htmlFor="last_name"
                    className="block mb-2 text-sm text-gray-700 font-medium dark:text-white"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    value={form_data.last_name}
                    onChange={handle_change}
                    className="border py-3 px-4 block w-full border-gray-400 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-violet-900 dark:border-violet-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  />
                </div>
              </div>
              {/* <!-- End Grid --> */}

              {/* <!-- Grid --> */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm text-gray-700 font-medium dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    value={form_data.email}
                    onChange={handle_change}
                    className="border py-3 px-4 block w-full border-gray-400 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-violet-900 dark:border-violet-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone_number"
                    className="block mb-2 text-sm text-gray-700 font-medium dark:text-white"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone_number"
                    id="phone_number"
                    value={form_data.phone_number}
                    onChange={handle_change}
                    className="border py-3 px-4 block w-full border-gray-400 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-violet-900 dark:border-violet-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  />
                </div>
              </div>
              {/* <!-- End Grid --> */}

              <div>
                <label
                  htmlFor="details"
                  className="block mb-2 text-sm text-gray-700 font-medium dark:text-white"
                >
                  Details
                </label>
                <textarea
                  id="details"
                  name="details"
                  value={form_data.details}
                  onChange={handle_change}
                  className="border py-3 px-4 block w-full border-gray-400 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-violet-900 dark:border-violet-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                ></textarea>
              </div>
            </div>
            {/* <!-- End Grid --> */}

            <div className="mt-6 grid">
              <button
                type="submit"
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-violet-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                Send inquiry
              </button>
            </div>

            <div className="mt-3 text-center">
              <p className="text-sm text-gray-500 dark:text-neutral-500">
                We'll get back to you in 1-2 business days.
              </p>
            </div>
          </form>
        </div>
        {/* <!-- End Card --> */}
      </div>

      {/* Success Modal */}
      {modal.is_open && modal.is_success && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg font-semibold text-green-600">
              {modal.message}
            </p>
            <button
              onClick={close_modal}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {modal.is_open && !modal.is_success && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg font-semibold text-red-600">
              {modal.message}
            </p>
            <button
              onClick={close_modal}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Contact;
