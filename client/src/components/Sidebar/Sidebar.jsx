import React, { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { PiStudent } from "react-icons/pi";
import { Link } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setOpen(true)}
          className="text-white bg-indigo-600 p-2 rounded-md shadow"
        >
          <HiMenuAlt3 size={24} />
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-40 h-full w-[220px] bg-gradient-to-b from-purple-600 via-indigo-600 to-blue-700 p-7 transition-transform duration-300 ease-in-out 
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="md:hidden flex justify-end mb-4">
          <button onClick={() => setOpen(false)} className="text-white">
            <HiX size={24} />
          </button>
        </div>

        <img
          src="/logo_white.png"
          alt="Skillnext Logo"
          className="object-cover w-full h-auto mb-8"
        />

        <div className="flex flex-col gap-6 text-white">
          <Link
            to="/home "
            className="flex items-center gap-3 border-b pb-2 border-white cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <MdDashboard className="text-2xl" />
            <h2 className="text-xl font-medium">Home</h2>
          </Link>
          <Link
            to="/student"
            className="flex items-center gap-3 border-b pb-2 border-white cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <PiStudent className="text-2xl" />
            <h2 className="text-xl font-medium">Student</h2>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
