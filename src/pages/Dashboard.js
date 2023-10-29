import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Dashboard() {
  const [image, setimage] = useState("");
  const [location, setlocation] = useState("");
  const [description, setdescription] = useState("");
  const [requests, setrequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = () => {
    axios
      .get("http://localhost:4000/getRequests", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.data.status === 200) {
          setrequests(response.data.data);
        } else {
          function notify(message) {
            toast.error(message, {
              theme: "dark",
            });
          }
          notify(response.data.message);
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const handleRegisterRequest = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("location", location);
    formData.append("description", description);

    axios
      .post("http://localhost:4000/uploadRequest", formData, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.data.status == 200) {
          function notify(message) {
            toast.success(message, {
              theme: "dark",
            });
          }
          notify(response.data.message);
          setimage("");
          setdescription("");
          setlocation("");
        } else {
          function notify(message) {
            toast.error(message, {
              theme: "dark",
            });
          }

          notify(response.data.message);
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  const handleRequestDelete = (requestId) => {
    console.log(requestId);
    axios
      .delete(`http://localhost:4000/deleteRequest/${requestId}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.data.status == 200) {
          function notify(message) {
            toast.success(message, {
              theme: "dark",
            });
          }
          notify(response.data.message);
        } else {
          function notify(message) {
            toast.error(message, {
              theme: "dark",
            });
          }

          notify(response.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section class="bg-white dark:bg-gray-900">
      <div className="flex flex-col-reverse lg:flex-row h-full min-h-screen">
        <div className="bg-cover lg:block lg:w-2/3">
          <div className="flex w-full h-full px-20 py-20 bg-gray-900 bg-opacity-40">
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Your recent requests
              </h2>

              {/* card */}

              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {requests.map((request) => {
                  return (
                    <div class="cursor-pointer rounded-xl bg-white p-3 shadow-lg hover:shadow-xl">
                      <div class="flex items-end overflow-hidden rounded-xl w-62 h-62 max-h-44">
                        <img
                          src={request.imageURL}
                          alt="wallpaper"
                          className="h-full w-full object-center"
                        />
                      </div>

                      <div class="mt-1 p-2">
                        <div class="mt-3 flex items-end justify-between">
                          <h2 class="text-slate-700">{request.location}</h2>
                          <div
                            class="group inline-flex rounded-xl bg-orange-100 p-2 hover:bg-orange-200"
                            onClick={() => handleRequestDelete(request._id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="h-4 w-4 text-orange-400 group-hover:text-orange-500"
                            >
                              <path d="M 10.806641 2 C 10.289641 2 9.7956875 2.2043125 9.4296875 2.5703125 L 9 3 L 4 3 A 1.0001 1.0001 0 1 0 4 5 L 20 5 A 1.0001 1.0001 0 1 0 20 3 L 15 3 L 14.570312 2.5703125 C 14.205312 2.2043125 13.710359 2 13.193359 2 L 10.806641 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z"></path>
                            </svg>
                          </div>
                        </div>

                        <p class="mt-1 text-sm text-slate-400">
                          {request.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="flex mt-20 w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div>
              <h2 className="mt-3 text-gray-500 dark:text-gray-300">
                Register a Request
              </h2>
            </div>

            <div className="mt-8">
              <form>
                <label
                  class="block text-sm font-medium text-gray-900 dark:text-white"
                  for="user_avatar"
                >
                  Upload file
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  onChange={(e) => setimage(e.target.files[0])}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                <div
                  class="mt-1 text-sm text-gray-500 dark:text-gray-300 mb-3"
                  id="user_avatar_help"
                >
                  Try to upload a picture in horizontal allignment
                </div>

                <div>
                  <label
                    for="location"
                    className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    id="location"
                    value={location}
                    onChange={(e) => setlocation(e.target.value)}
                    placeholder="Enter the location"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div className="mt-6">
                  <div className="flex justify-between mb-2">
                    <label
                      for="description"
                      className="text-sm text-gray-600 dark:text-gray-200"
                    >
                      Description
                    </label>
                  </div>

                  <textarea
                    type="text"
                    name="description"
                    id="description"
                    value={description}
                    onChange={(e) => setdescription(e.target.value)}
                    placeholder="Enter a description"
                    className="block w-full resize-y min-h-[200px] px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div className="mt-6">
                  <button
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                    onClick={handleRegisterRequest}
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
