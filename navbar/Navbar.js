"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import ButtonCustom from "../elements/ButtonCustom";

const Navbar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); // ➕ shadow state
  const sidebarRef = useRef(null);

  const router = useRouter();
  const pathname = usePathname();

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        closeSidebar();
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isSidebarOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const scrollToId = localStorage.getItem("scrollToId");
    if (pathname === "/" && scrollToId) {
      const section = document.getElementById(scrollToId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
        localStorage.removeItem("scrollToId");
      }
    }
  }, [pathname]);

  const scrollToSection = (id) => {
    if (pathname === "/") {
      const section = document.getElementById(id);
      if (section) section.scrollIntoView({ behavior: "smooth" });
    } else {
      localStorage.setItem("scrollToId", id);
      router.push("/");
    }
    closeSidebar();
  };

  return (
    <div
      className={`sticky top-0 z-50 bg-main py-2 px-4 md:px-10 lg:px-30 transition-shadow duration-300 ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      {/* Mobile Navbar */}
      <div className="flex justify-between items-center lg:hidden">
        <Link href="/">
          <Image src="/img/logo.png" width={60} height={60} alt="logo" />
        </Link>
        <button onClick={toggleSidebar}>
          <Image
            src="/svg/hamburger.svg"
            width={26}
            height={26}
            alt="menu"
            className="md:w-[26px] cursor-pointer"
          />
        </button>
      </div>

      {/* Sidebar Mobile */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-72 md:w-80 h-full bg-main shadow-lg p-6 z-50"
            ref={sidebarRef}
          >
            <button onClick={closeSidebar} className="text-5xl text-gray-500">
              ×
            </button>
            <ul className="mt-6 space-y-4 font-medium text-gray-900">
              <li
                onClick={() => scrollToSection("services")}
                className="cursor-pointer bg-gray-100 p-2 rounded hover:underline"
              >
                Our Services
              </li>
              <li  className="ml-4 underline">
                <Link href="/service/web-main">Website Maintenance</Link>
              </li>
              <li className="ml-4 underline">
                <Link href="/service/web-dev">Website & App Development</Link>
              </li>
              <li className="ml-4 underline">
                <Link href="/service/it-support">IT Support</Link>
              </li>
              <li className="ml-4 underline">
                <Link href="/service/ai-solution">3rd Party AI Solution</Link>
              </li>
              <li
                onClick={() => scrollToSection("aboutUs")}
                className="cursor-pointer bg-gray-100 p-2 rounded hover:underline"
              >
                About Us
              </li>
              <li
                onClick={() => scrollToSection("portfolio")}
                className="cursor-pointer bg-gray-100 p-2 rounded hover:underline"
              >
                Portfolio
              </li>
              <li
                onClick={() => scrollToSection("contact")}
                className="cursor-pointer bg-gray-100 p-2 rounded hover:underline"
              >
                Contact Us
              </li>
              <li>
                <a
                  href="https://api.whatsapp.com/send/?phone=6581181595&text=Hi+Co2%2C+I+would+like+ask+about+your+services.&type=phone_number&app_absent=0"
                  target="_blank"
                  className="block mt-4 bg-secondary text-white text-center py-3 rounded text-sm md:text-base"
                >
                  Get Started Today!
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Navbar */}
      <div className="hidden lg:flex justify-between items-center">
        <Link href="/">
          <Image src="/img/logo.png" width={60} height={60} alt="logo" />
        </Link>
        <div className="flex items-center gap-10 font-generalSans font-medium text-black text-lg">
          {/* Dropdown */}
          <div
            className="relative group cursor-pointer"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <div className="flex items-center gap-1">
              <span>Our Services</span>
              <motion.span
                animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                ▼
              </motion.span>
            </div>
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-full left-0 bg-white shadow-md rounded-md overflow-hidden text-gray-900"
                >
                  <ul className="w-198 py-3 px-4 grid grid-cols-2 gap-2">
                    {[
                      {
                        href: "/service/web-main",
                        img: "/svg/drop-web-main.svg",
                        title: "Website Maintenance",
                        desc: "Keep your website running smoothly and securely",
                        bg: "bg-red-100",
                      },
                      {
                        href: "/service/web-dev",
                        img: "/svg/drop-web-dev.svg",
                        title: "Website & App Development",
                        desc: "Transform your online presence with our custom platform design solution",
                        bg: "bg-yellow-100",
                      },
                      {
                        href: "/service/it-support",
                        img: "/svg/drop-it-support.svg",
                        title: "IT Support",
                        desc: "Experience peace of mind with our reliable IT support services",
                        bg: "bg-green-100",
                      },
                      {
                        href: "/service/ai-solution",
                        img: "/svg/drop-ai-solution.svg",
                        title: "3rd Party AI Solution",
                        desc: "Leverage our expertise to find the best third-party services for your business",
                        bg: "bg-purple-100",
                      },
                    ].map((item, idx) => (
                      <li
                        key={idx}
                        className="p-1 hover:bg-gray-100 rounded-lg transition-all duration-150"
                      >
                        <Link href={item.href} className="flex gap-4">
                          <Image
                            src={item.img}
                            width={22}
                            height={22}
                            alt="icon"
                            className={`p-5 ${item.bg} rounded-lg w-[20%] h-[72px]`}
                          />
                          <div className="w-[70%]">
                            <h4 className="text-lg font-semibold">
                              {item.title}
                            </h4>
                            <p className="text-xs font-medium">{item.desc}</p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Scroll Links */}
          <button
            onClick={() => scrollToSection("aboutUs")}
            className="cursor-pointer"
          >
            About Us
          </button>
          <button
            onClick={() => scrollToSection("portfolio")}
            className="cursor-pointer"
          >
            Portfolio
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="cursor-pointer"
          >
            Contact
          </button>
        </div>
        <a
          href="https://api.whatsapp.com/send/?phone=6581181595&text=Hi+Co2%2C+I+would+like+ask+about+your+services.&type=phone_number&app_absent=0"
          target="_blank"
          className=""
        >
          <ButtonCustom>Get a free consult</ButtonCustom>
        </a>
      </div>
    </div>
  );
};

export default Navbar;
