"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useFormik } from "formik";
import { object, string, ref } from "yup";
import { useMutation } from "@tanstack/react-query";
import { postApi } from "@/http/api";
import { setCookie, deleteCookie } from "cookies-next/client";
import { useRouter } from "next/navigation";

const registerValidationSchema = object({
  email: string().email("Invalid email").required("Email is required"),
  name: string()
    .min(3, "At least 3 characters")
    .required("Username is required"),
  password: string().min(6, "Min 6 chars").required("Password is required"),
  passwordConfirm: string()
    .oneOf([ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const loginValidationSchema = object({
  email: string().email("Invalid email").required("Email is required"),
  password: string().min(6, "Min 6 chars").required("Password is required"),
});

const Header = () => {
  const router = useRouter();

  const [activeForm, setActiveForm] = useState<"register" | "login">(
    "register"
  );
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [user, setUser] = useState<{ email: string; name?: string } | null>(
    null
  );

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const {
    mutate: registerMutate,
    isLoading: registerLoading,
    error: registerError,
  } = useMutation({
    mutationKey: ["register"],
    mutationFn: (data: any) => postApi("/auth/register", data),
    onSuccess: () => {
      setActiveForm("login");
    },
  });

  const {
    mutate: loginMutate,
    isLoading: loginLoading,
    error: loginError,
  } = useMutation({
    mutationKey: ["login"],
    mutationFn: (data: any) => postApi("/auth/login", data),
    onSuccess: (data) => {
      setCookie("token", data.token, { maxAge: 60 * 60 * 24 * 7 });
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user); // user state yenilə
      setDrawerOpen(false);
      router.push("/admin");
    },
  });

  const registerFormik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema: registerValidationSchema,
    onSubmit: (values) => {
      registerMutate({
        email: values.email,
        name: values.name,
        password: values.password,
      });
    },
  });

  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      loginMutate(values);
    },
  });

  React.useEffect(() => {
    if (activeForm === "login" && registerFormik.isSubmitting) {
      loginMutate({
        email: registerFormik.values.email,
        password: registerFormik.values.password,
      });
      registerFormik.resetForm();
    }
  }, [activeForm]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    deleteCookie("token");
    setUser(null);
    router.push("/");
  };

  return (
    <div className="bg-[#ffffffaa] border-b border-b-gray-200 h-[87px] flex items-center justify-center sticky backdrop-blur-[5px] w-full top-0 z-10">
      <div className="container mx-auto max-w-[1400px]">
        <div className="nav flex items-center justify-between">
          <div>
            <Image
              src={
                "https://xstore.b-cdn.net/elementor3/painting-studio/wp-content/uploads/sites/12/2025/02/Logo.png"
              }
              alt="logo"
              width={155}
              height={78}
            />
          </div>
          <div>
            <ul className="flex items-center gap-[48px] text-[16px] font-medium text-[#343434]">
              <li>
                <Link href={"/"}>Home</Link>
              </li>
              <li>
                <Link href={"/shop"}>Products</Link>
              </li>
              <li>
                <Link href={"/blog"}>Blog</Link>
              </li>
              <li>
                <Link href={"/about"}>About</Link>
              </li>
              <li>
                <Link href={"/contact"}>Contact Us</Link>
              </li>
            </ul>
          </div>
          <div>
            <ul className="flex items-center gap-[26px]">
              <li className="Search flex">
                <Drawer direction="top">
                  <DrawerTrigger>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      className="cursor-pointer"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M1.43772 5.66937C2.88621 2.24473 6.28007 0.0100765 10.0478 0.000167915C14.1154 -0.0238952 17.7335 2.54041 19.0015 6.34596C20.2695 10.1515 18.8972 14.3278 15.6056 16.6809C12.314 19.034 7.85601 19.0256 4.57355 16.6602L1.6587 19.5302C1.36131 19.8226 0.879535 19.8226 0.582142 19.5302C0.285119 19.2374 0.285119 18.763 0.582142 18.4702L3.41574 15.6802C0.768919 13.04 -0.0107633 9.094 1.43772 5.66937ZM12.4047 6.04179C12.6526 6.62562 13.234 7.00421 13.8767 7.00017C14.7461 7.00017 15.4509 6.30621 15.4509 5.45017C15.455 4.81741 15.0705 4.24488 14.4775 4.00086C13.8846 3.75684 13.2007 3.88967 12.7462 4.33711C12.2918 4.78455 12.1569 5.45796 12.4047 6.04179Z"
                        fill="#020202"
                      ></path>
                    </svg>
                  </DrawerTrigger>
                  <DrawerContent>
                    <div className="p-6">
                      <h2 className="text-2xl font-semibold text-center mb-6">
                        What Are You Looking For?
                      </h2>

                      <div className="flex justify-center mb-4">
                        <div className="flex border border-gray-300 rounded overflow-hidden w-full max-w-3xl">
                          <select className="px-4 py-2 text-sm border-r border-gray-300 outline-none">
                            <option>All categories</option>
                          </select>
                          <input
                            type="text"
                            placeholder="Search for products"
                            className="flex-1 px-4 py-2 text-sm outline-none"
                          />
                          <button className="flex items-center gap-2 px-6 bg-black text-white text-sm font-medium hover:bg-gray-800 transition">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
                              />
                            </svg>
                            SEARCH
                          </button>
                        </div>
                      </div>

                      <div className="text-center mt-4">
                        <p className="text-gray-500 mb-2 font-medium text-sm">
                          TRENDING SEARCHES:
                        </p>
                        <div className="flex justify-center gap-2 flex-wrap">
                          <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                            Autumn
                          </span>
                          <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                            Dreams
                          </span>
                          <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                            Blossom
                          </span>
                        </div>
                      </div>
                    </div>
                  </DrawerContent>
                </Drawer>
              </li>

              {user ? (
                <li className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center font-semibold text-md cursor-default select-none">
                    {user.email.charAt(0).toUpperCase()}
                  </div>

                  <button
                    onClick={handleLogout}
                    className="text-sm w-16 h-7 rounded-[5px]  bg-black text-white hover:bg-white hover:text-black cursor-pointer duration-500 border border-black"
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <li className="flex user z-20">
                  <Drawer
                    direction="right"
                    open={drawerOpen}
                    onOpenChange={setDrawerOpen}
                  >
                    <DrawerTrigger>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="20"
                        viewBox="0 0 16 20"
                        fill="none"
                        className="cursor-pointer"
                      >
                        <path
                          d="M12.6406 20H3.36058C2.34976 19.9632 1.40815 19.477 0.792929 18.6741C0.177708 17.8713 -0.046851 16.8356 0.180583 15.85L0.420583 14.71C0.696618 13.1668 2.0232 12.0327 3.59058 12H12.4106C13.978 12.0327 15.3045 13.1668 15.5806 14.71L15.8206 15.85C16.048 16.8356 15.8235 17.8713 15.2082 18.6741C14.593 19.477 13.6514 19.9632 12.6406 20Z"
                          fill="black"
                        ></path>
                        <path
                          d="M8.50001 10H7.50001C5.29088 10 3.50001 8.20915 3.50001 6.00001V3.36001C3.49735 2.46807 3.85049 1.61189 4.48119 0.981192C5.11189 0.350491 5.96807 -0.00265152 6.86001 1.49917e-05H9.14002C10.032 -0.00265152 10.8881 0.350491 11.5188 0.981192C12.1495 1.61189 12.5027 2.46807 12.5 3.36001V6.00001C12.5 7.06088 12.0786 8.0783 11.3284 8.82844C10.5783 9.57859 9.56088 10 8.50001 10Z"
                          fill="black"
                        ></path>
                      </svg>
                    </DrawerTrigger>
                    <DrawerContent className="p-[30.8px] flex flex-col items-center max-w-md">
                      <div className="w-full flex justify-between mb-4">
                        <button
                          onClick={() => setActiveForm("register")}
                          className={`flex-1 py-2 font-semibold border-b-2 ${
                            activeForm === "register"
                              ? "border-black"
                              : "border-transparent"
                          }`}
                        >
                          Register
                        </button>
                        <button
                          onClick={() => setActiveForm("login")}
                          className={`flex-1 py-2 font-semibold border-b-2 ${
                            activeForm === "login"
                              ? "border-black"
                              : "border-transparent"
                          }`}
                        >
                          Login
                        </button>
                      </div>

                      {activeForm === "register" && (
                        <form
                          onSubmit={registerFormik.handleSubmit}
                          className="w-full flex flex-col gap-4"
                        >
                          {registerError && (
                            <p className="text-red-500 text-sm mb-2">
                              {(registerError as any).message ||
                                "Registration failed"}
                            </p>
                          )}
                          <input
                            name="email"
                            placeholder="Email"
                            type="email"
                            onChange={registerFormik.handleChange}
                            onBlur={registerFormik.handleBlur}
                            value={registerFormik.values.email}
                            className="border border-gray-300 px-3 py-2 rounded"
                          />
                          {registerFormik.touched.email &&
                            registerFormik.errors.email && (
                              <p className="text-red-500 text-xs">
                                {registerFormik.errors.email}
                              </p>
                            )}

                          <input
                            name="name"
                            placeholder="Name"
                            type="text"
                            onChange={registerFormik.handleChange}
                            onBlur={registerFormik.handleBlur}
                            value={registerFormik.values.name}
                            className="border border-gray-300 px-3 py-2 rounded"
                          />
                          {registerFormik.touched.name &&
                            registerFormik.errors.name && (
                              <p className="text-red-500 text-xs">
                                {registerFormik.errors.name}
                              </p>
                            )}

                          <input
                            name="password"
                            placeholder="Password"
                            type="password"
                            onChange={registerFormik.handleChange}
                            onBlur={registerFormik.handleBlur}
                            value={registerFormik.values.password}
                            className="border border-gray-300 px-3 py-2 rounded"
                          />
                          {registerFormik.touched.password &&
                            registerFormik.errors.password && (
                              <p className="text-red-500 text-xs">
                                {registerFormik.errors.password}
                              </p>
                            )}

                          <input
                            name="passwordConfirm"
                            placeholder="Confirm Password"
                            type="password"
                            onChange={registerFormik.handleChange}
                            onBlur={registerFormik.handleBlur}
                            value={registerFormik.values.passwordConfirm}
                            className="border border-gray-300 px-3 py-2 rounded"
                          />
                          {registerFormik.touched.passwordConfirm &&
                            registerFormik.errors.passwordConfirm && (
                              <p className="text-red-500 text-xs">
                                {registerFormik.errors.passwordConfirm}
                              </p>
                            )}

                          <button
                            type="submit"
                            disabled={registerLoading}
                            className="w-full bg-black text-white py-2 rounded disabled:opacity-50"
                          >
                            {registerLoading ? "Registering..." : "Register"}
                          </button>
                        </form>
                      )}

                      {activeForm === "login" && (
                        <form
                          onSubmit={loginFormik.handleSubmit}
                          className="w-full flex flex-col gap-4"
                        >
                          {loginError && (
                            <p className="text-red-500 text-sm mb-2">
                              {(loginError as any).message || "Login failed"}
                            </p>
                          )}
                          <input
                            name="email"
                            placeholder="Email"
                            type="email"
                            onChange={loginFormik.handleChange}
                            onBlur={loginFormik.handleBlur}
                            value={loginFormik.values.email}
                            className="border border-gray-300 px-3 py-2 rounded"
                          />
                          {loginFormik.touched.email &&
                            loginFormik.errors.email && (
                              <p className="text-red-500 text-xs">
                                {loginFormik.errors.email}
                              </p>
                            )}

                          <input
                            name="password"
                            placeholder="Password"
                            type="password"
                            onChange={loginFormik.handleChange}
                            onBlur={loginFormik.handleBlur}
                            value={loginFormik.values.password}
                            className="border border-gray-300 px-3 py-2 rounded"
                          />
                          {loginFormik.touched.password &&
                            loginFormik.errors.password && (
                              <p className="text-red-500 text-xs">
                                {loginFormik.errors.password}
                              </p>
                            )}

                          <button
                            type="submit"
                            disabled={loginLoading}
                            className="w-full bg-black text-white py-2 rounded disabled:opacity-50"
                          >
                            {loginLoading ? "Logging in..." : "Login"}
                          </button>
                        </form>
                      )}
                    </DrawerContent>
                  </Drawer>
                </li>
              )}

              <li className="flex basket">
                <Drawer direction="right">
                  <DrawerTrigger>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="19"
                      viewBox="0 0 22 19"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M20.6218 12.4421L21.2798 7.90193L21.2359 7.85807C21.382 6.8589 21.0878 5.84547 20.4294 5.07982C19.7711 4.31417 18.8131 3.87148 17.8034 3.86623H6.36521L6.13491 3.10953C5.69632 1.65256 4.36627 0.646158 2.84493 0.620117H1.74828C1.29402 0.620117 0.925781 0.98836 0.925781 1.44261C0.925781 1.89686 1.29402 2.26511 1.74828 2.26511H2.84493C3.65972 2.26509 4.37776 2.80027 4.61056 3.5811L7.3851 12.9356C7.8328 14.4096 9.18943 15.4193 10.7299 15.425H17.1673C18.8964 15.4176 20.3624 14.1517 20.6218 12.4421ZM10.4776 16.8068C9.87192 16.8068 9.38093 17.2978 9.38093 17.9035C9.38093 18.5091 9.87192 19.0001 10.4776 19.0001C11.0833 19.0001 11.5743 18.5091 11.5743 17.9035C11.5743 17.2978 11.0833 16.8068 10.4776 16.8068ZM17.0575 16.8068C16.4519 16.8068 15.9609 17.2978 15.9609 17.9035C15.9609 18.5091 16.4519 19.0001 17.0575 19.0001C17.6632 19.0001 18.1542 18.5091 18.1542 17.9035C18.1542 17.2978 17.6632 16.8068 17.0575 16.8068Z"
                        fill="black"
                      ></path>
                    </svg>
                  </DrawerTrigger>
                  <DrawerContent>
                    <div className="p-6">
                      <h2 className="text-2xl font-semibold text-center mb-6">
                        Your Basket
                      </h2>
                      <p>Your basket is empty.</p>
                    </div>
                  </DrawerContent>
                </Drawer>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
