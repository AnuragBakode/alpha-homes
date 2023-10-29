import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [name, setname] = useState("");
  const [contact, setcontact] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [role, setrole] = useState("");

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/register", {
        name,
        email,
        password,
        role,
        contact,
      })
      .then((response) => {
        if (response.data.status == 200) {
          function notify(message) {
            toast.success(message, {
              theme: "dark",
            });
          }

          notify(response.data.message);
          navigate("/login");
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

  return (
    <section class="bg-white dark:bg-gray-900">
      <div class="flex justify-center min-h-screen">
        <div
          class="hidden bg-cover lg:block lg:w-2/5"
          style={{
            backgroundImage: `url(${"https://images.unsplash.com/photo-1608744882201-52a7f7f3dd60?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D"})`,
          }}
        ></div>

        <div class="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
          <div class="w-full">
            <h1 class="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
              Sign Up
            </h1>

            <p class="mt-4 text-gray-500 dark:text-gray-400">
              Let’s get you all set up so you can verify your personal account
              and begin setting up your profile.
            </p>

            <form class="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
              <div>
                <p class="mb-5 text-white">Register as a</p>
                <fieldset class="grid grid-cols-2 gap-4">
                  <legend class="sr-only">Role</legend>
                  <div>
                    <input
                      type="radio"
                      name="roleOption"
                      value="user"
                      id="roleUser"
                      onChange={(e) => setrole(e.target.value)}
                      class="peer hidden [&:checked_+_label_svg]:block"
                    />

                    <label
                      for="roleUser"
                      class="block cursor-pointer rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500"
                    >
                      <div class="flex items-center justify-between">
                        <p class="text-gray-700">User</p>

                        <svg
                          class="hidden h-5 w-5 text-blue-600"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </div>
                    </label>
                  </div>

                  <div>
                    <input
                      type="radio"
                      name="roleOption"
                      value="ngo"
                      id="roleNGO"
                      onChange={(e) => setrole(e.target.value)}
                      class="peer hidden [&:checked_+_label_svg]:block"
                    />

                    <label
                      for="roleNGO"
                      class="block cursor-pointer rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500"
                    >
                      <div class="flex items-center justify-between">
                        <p class="text-gray-700">NGO</p>

                        <svg
                          class="hidden h-5 w-5 text-blue-600"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </div>
                    </label>
                  </div>
                </fieldset>
              </div>
              <div>
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Full Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  type="text"
                  placeholder="John"
                  class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div>
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Phone number
                </label>
                <input
                  value={contact}
                  onChange={(e) => setcontact(e.target.value)}
                  type="text"
                  placeholder="XXX-XX-XXXX-XXX"
                  class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div>
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Email address
                </label>
                <input
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  type="email"
                  placeholder="johnsnow@example.com"
                  class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div>
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  type="password"
                  placeholder="Enter your password"
                  class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div>
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Confirm password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
            </form>
            <button
              class="flex items-center justify-between w-full px-6 py-3 mt-5 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              onClick={handleRegister}
            >
              <span>Sign Up </span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 rtl:-scale-x-100"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <div className="mt-6 text-sm text-center text-gray-400">
              Already have an account ?{" "}
              <Link to="/login" className="underline text-blue-500">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
