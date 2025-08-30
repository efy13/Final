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
import { useCart } from "@/Providers/CartProvider";

const registerValidationSchema = object({
  email: string().email("Invalid email").required("Email is required"),
  name: string().min(3, "At least 3 characters").required("Username is required"),
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

  const [activeForm, setActiveForm] = useState<"register" | "login">("register");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<{ email: string; name?: string } | null>(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) setUser(JSON.parse(storedUser));
    } catch {}
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
      setUser(data.user);
      setDrawerOpen(false);
      router.push("/admin");
    },
  });

  const registerFormik = useFormik({
    initialValues: { email: "", name: "", password: "", passwordConfirm: "" },
    validationSchema: registerValidationSchema,
    onSubmit: (values) => {
      registerMutate({ email: values.email, name: values.name, password: values.password });
    },
  });

  const loginFormik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => loginMutate(values),
  });

  // Register-dən sonra avtologin (istəməsən silə bilərsən)
  useEffect(() => {
    if (activeForm === "login" && registerFormik.isSubmitting) {
      loginMutate({
        email: registerFormik.values.email,
        password: registerFormik.values.password,
      });
      registerFormik.resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeForm, registerFormik.isSubmitting]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    deleteCookie("token");
    setUser(null);
    router.push("/");
  };

  const { cart, removeFromCart, getTotalPrice } = useCart();
  const cartCount = cart.reduce((sum: number, it: any) => sum + (it.quantity || 1), 0);

  return (
    <header className="bg-[#ffffffcc] border-b border-gray-200 h-[64px] md:h-[80px] flex items-center sticky backdrop-blur-[6px] w-full top-0 z-40">
      <div className="container mx-auto max-w-[1400px] px-3 sm:px-4">
        <div className="flex items-center justify-between gap-2">
          {/* Left: Mobile menu + Logo */}
          <div className="flex items-center gap-1 sm:gap-3">
            {/* Mobile menu */}
            <div className="md:hidden">
              <Drawer open={mobileOpen} onOpenChange={setMobileOpen} direction="left">
                <DrawerTrigger
                  aria-label="Open menu"
                  className="p-2 -ml-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
                >
                  <svg width="26" height="26" viewBox="0 0 24 24">
                    <path d="M3 6h18M3 12h18M3 18h18" stroke="black" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </DrawerTrigger>
                <DrawerContent className="p-6 w-[85vw] max-w-sm sm:w-[360px]">
                  <nav className="space-y-4 text-base font-medium text-[#343434]">
                    <Link href="/" onClick={() => setMobileOpen(false)} className="block">
                      Home
                    </Link>
                    <Link href="/shop" onClick={() => setMobileOpen(false)} className="block">
                      Products
                    </Link>
                    <Link href="/blog" onClick={() => setMobileOpen(false)} className="block">
                      Blog
                    </Link>
                    <Link href="/about" onClick={() => setMobileOpen(false)} className="block">
                      About
                    </Link>
                    <Link href="/contact" onClick={() => setMobileOpen(false)} className="block">
                      Contact Us
                    </Link>
                  </nav>
                </DrawerContent>
              </Drawer>
            </div>

            {/* Logo */}
            <Link href="/" className="inline-flex items-center">
              <Image
                src="https://xstore.b-cdn.net/elementor3/painting-studio/wp-content/uploads/sites/12/2025/02/Logo.png"
                alt="logo"
                width={160}
                height={60}
                className="w-28 sm:w-32 md:w-40 h-auto"
                priority
              />
            </Link>
          </div>

          {/* Center: Desktop nav */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-5 lg:gap-8 text-sm md:text-[15px] lg:text-base font-medium text-[#343434]">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/shop">Products</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center">
            <ul className="flex items-center gap-1.5 sm:gap-3 md:gap-4">
              {/* Search */}
              <li className="flex">
                <Drawer direction="top">
                  <DrawerTrigger
                    aria-label="Open search"
                    className="h-9 w-9 inline-flex items-center justify-center rounded hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 20 20" fill="none">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M1.43772 5.66937C2.88621 2.24473 6.28007 0.0100765 10.0478 0.000167915C14.1154 -0.0238952 17.7335 2.54041 19.0015 6.34596C20.2695 10.1515 18.8972 14.3278 15.6056 16.6809C12.314 19.034 7.85601 19.0256 4.57355 16.6602L1.6587 19.5302C1.36131 19.8226 0.879535 19.8226 0.582142 19.5302C0.285119 19.2374 0.285119 18.763 0.582142 18.4702L3.41574 15.6802C0.768919 13.04 -0.0107633 9.094 1.43772 5.66937ZM12.4047 6.04179C12.6526 6.62562 13.234 7.00421 13.8767 7.00017C14.7461 7.00017 15.4509 6.30621 15.4509 5.45017C15.455 4.81741 15.0705 4.24488 14.4775 4.00086C13.8846 3.75684 13.2007 3.88967 12.7462 4.33711C12.2918 4.78455 12.1569 5.45796 12.4047 6.04179Z"
                        fill="#020202"
                      />
                    </svg>
                  </DrawerTrigger>
                  <DrawerContent className="w-full max-w-[100vw]">
                    <div className="p-4 sm:p-6 max-w-[1200px] mx-auto">
                      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-center mb-4 md:mb-6">
                        What Are You Looking For?
                      </h2>

                      <div className="flex justify-center mb-4">
                        <div className="flex border border-gray-300 rounded overflow-hidden w-full max-w-md sm:max-w-xl md:max-w-3xl">
                          <select className="px-3 sm:px-4 py-2 text-sm border-r border-gray-300 outline-none">
                            <option>All categories</option>
                          </select>
                          <input
                            type="text"
                            placeholder="Search for products"
                            className="flex-1 px-3 sm:px-4 py-2 text-sm outline-none"
                          />
                          <button className="flex items-center gap-2 px-4 sm:px-5 md:px-6 bg-black text-white text-sm font-medium hover:bg-gray-800 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
                            </svg>
                            SEARCH
                          </button>
                        </div>
                      </div>

                      <div className="text-center mt-3 md:mt-4">
                        <p className="text-gray-500 mb-2 font-medium text-xs sm:text-sm">
                          TRENDING SEARCHES:
                        </p>
                        <div className="flex justify-center gap-2 flex-wrap">
                          {["Autumn", "Dreams", "Blossom"].map((t) => (
                            <span key={t} className="bg-gray-200 px-3 py-1 rounded-full text-xs sm:text-sm">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </DrawerContent>
                </Drawer>
              </li>

              {/* User */}
              {user ? (
                <li className="flex items-center gap-2 md:gap-3">
                  <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-black text-white flex items-center justify-center font-semibold text-sm md:text-base cursor-default select-none">
                    {user.email.charAt(0).toUpperCase()}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-xs sm:text-sm h-8 px-3 rounded bg-black text-white hover:bg-white hover:text-black border border-black transition"
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <li className="flex user z-20">
                  <Drawer direction="right" open={drawerOpen} onOpenChange={setDrawerOpen}>
                    <DrawerTrigger
                      aria-label="Open account"
                      className="h-9 w-9 inline-flex items-center justify-center rounded hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="22" viewBox="0 0 16 20" fill="none">
                        <path d="M12.6406 20H3.36058C2.34976 19.9632 1.40815 19.477 0.792929 18.6741C0.177708 17.8713 -0.046851 16.8356 0.180583 15.85L0.420583 14.71C0.696618 13.1668 2.0232 12.0327 3.59058 12H12.4106C13.978 12.0327 15.3045 13.1668 15.5806 14.71L15.8206 15.85C16.048 16.8356 15.8235 17.8713 15.2082 18.6741C14.593 19.477 13.6514 19.9632 12.6406 20Z" fill="black"></path>
                        <path d="M8.50001 10H7.50001C5.29088 10 3.50001 8.20915 3.50001 6.00001V3.36001C3.49735 2.46807 3.85049 1.61189 4.48119 0.981192C5.11189 0.350491 5.96807 -0.00265152 6.86001 1.49917e-05H9.14002C10.032 -0.00265152 10.8881 0.350491 11.5188 0.981192C12.1495 1.61189 12.5027 2.46807 12.5 3.36001V6.00001C12.5 7.06088 12.0786 8.0783 11.3284 8.82844C10.5783 9.57859 9.56088 10 8.50001 10Z" fill="black"></path>
                      </svg>
                    </DrawerTrigger>
                    <DrawerContent className="p-5 sm:p-8 w-[90vw] max-w-md">
                      <div className="w-full flex justify-between mb-4">
                        <button
                          onClick={() => setActiveForm("register")}
                          className={`flex-1 py-2 font-semibold border-b-2 ${activeForm === "register" ? "border-black" : "border-transparent"}`}
                        >
                          Register
                        </button>
                        <button
                          onClick={() => setActiveForm("login")}
                          className={`flex-1 py-2 font-semibold border-b-2 ${activeForm === "login" ? "border-black" : "border-transparent"}`}
                        >
                          Login
                        </button>
                      </div>

                      {activeForm === "register" && (
                        <form onSubmit={registerFormik.handleSubmit} className="w-full flex flex-col gap-3">
                          {registerError && (
                            <p className="text-red-500 text-sm mb-2">
                              {(registerError as any).message || "Registration failed"}
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
                          {registerFormik.touched.email && registerFormik.errors.email && (
                            <p className="text-red-500 text-xs">{registerFormik.errors.email}</p>
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
                          {registerFormik.touched.name && registerFormik.errors.name && (
                            <p className="text-red-500 text-xs">{registerFormik.errors.name}</p>
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
                          {registerFormik.touched.password && registerFormik.errors.password && (
                            <p className="text-red-500 text-xs">{registerFormik.errors.password}</p>
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
                          {registerFormik.touched.passwordConfirm && registerFormik.errors.passwordConfirm && (
                            <p className="text-red-500 text-xs">{registerFormik.errors.passwordConfirm}</p>
                          )}

                          <button type="submit" disabled={registerLoading} className="w-full bg-black text-white py-2 rounded disabled:opacity-50">
                            {registerLoading ? "Registering..." : "Register"}
                          </button>
                        </form>
                      )}

                      {activeForm === "login" && (
                        <form onSubmit={loginFormik.handleSubmit} className="w-full flex flex-col gap-3">
                          {loginError && (
                            <p className="text-red-500 text-sm mb-2">{(loginError as any).message || "Login failed"}</p>
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
                          {loginFormik.touched.email && loginFormik.errors.email && (
                            <p className="text-red-500 text-xs">{loginFormik.errors.email}</p>
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
                          {loginFormik.touched.password && loginFormik.errors.password && (
                            <p className="text-red-500 text-xs">{loginFormik.errors.password}</p>
                          )}

                          <button type="submit" disabled={loginLoading} className="w-full bg-black text-white py-2 rounded disabled:opacity-50">
                            {loginLoading ? "Logging in..." : "Login"}
                          </button>
                        </form>
                      )}
                    </DrawerContent>
                  </Drawer>
                </li>
              )}

              {/* Basket */}
              <li className="relative flex">
                <Drawer direction="right">
                  <DrawerTrigger
                    aria-label="Open cart"
                    className="h-9 w-9 inline-flex items-center justify-center rounded hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
                  >
                    <div className="relative">
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="19" viewBox="0 0 22 19" fill="none">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M20.6218 12.4421L21.2798 7.90193L21.2359 7.85807C21.382 6.8589 21.0878 5.84547 20.4294 5.07982C19.7711 4.31417 18.8131 3.87148 17.8034 3.86623H6.36521L6.13491 3.10953C5.69632 1.65256 4.36627 0.646158 2.84493 0.620117H1.74828C1.29402 0.620117 0.925781 0.98836 0.925781 1.44261C0.925781 1.89686 1.29402 2.26511 1.74828 2.26511H2.84493C3.65972 2.26509 4.37776 2.80027 4.61056 3.5811L7.3851 12.9356C7.8328 14.4096 9.18943 15.4193 10.7299 15.425H17.1673C18.8964 15.4176 20.3624 14.1517 20.6218 12.4421ZM10.4776 16.8068C9.87192 16.8068 9.38093 17.2978 9.38093 17.9035C9.38093 18.5091 9.87192 19.0001 10.4776 19.0001C11.0833 19.0001 11.5743 18.5091 11.5743 17.9035C11.5743 17.2978 11.0833 16.8068 10.4776 16.8068ZM17.0575 16.8068C16.4519 16.8068 15.9609 17.2978 15.9609 17.9035C15.9609 18.5091 16.4519 19.0001 17.0575 19.0001C17.6632 19.0001 18.1542 18.5091 18.1542 17.9035C18.1542 17.2978 17.6632 16.8068 17.0575 16.8068Z"
                          fill="black"
                        />
                      </svg>

                      {/* Badge */}
                      {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 text-[10px] leading-none bg-black text-white rounded-full px-1.5 py-1">
                          {cartCount}
                        </span>
                      )}
                    </div>
                  </DrawerTrigger>
                  <DrawerContent className="w-[90vw] max-w-sm sm:max-w-md">
                    <div className="p-4 sm:p-6">
                      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-center mb-4 sm:mb-6">Your Basket</h2>

                      {cart.length === 0 ? (
                        <p className="text-center">Your basket is empty.</p>
                      ) : (
                        <div className="space-y-4">
                          {cart.map((item: any) => (
                            <div key={item.id} className="flex gap-3 border rounded p-2 items-center">
                              <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded" />
                              <div className="flex-1">
                                <p className="font-medium line-clamp-1">{item.name}</p>
                                <p className="text-sm text-gray-500">
                                  {item.quantity} x ${Number(item.price).toFixed(2)}
                                </p>
                              </div>
                              <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                                Remove
                              </button>
                            </div>
                          ))}

                          <div className="border-t pt-4 flex justify-between font-semibold text-lg">
                            <span>Total:</span>
                            <span>${getTotalPrice().toFixed(2)}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </DrawerContent>
                </Drawer>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
