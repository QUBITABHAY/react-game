import React, { useState } from "react";
import { Link } from "react-router-dom";

function SelectMode() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900" : "bg-gradient-to-br from-blue-50 to-indigo-100"
      }`}
    >
      <div className={`absolute top-4 right-4`}>
        <button
          onClick={() => setIsDarkMode(prev => !prev)}
          className={`p-3 rounded-full transition-all duration-300 ${
            isDarkMode
              ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
              : "bg-white text-gray-800 hover:bg-gray-100 shadow-lg"
          }`}
          aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
        >
          {isDarkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
      </div>

      <div
        className={`w-full max-w-4xl p-8 rounded-2xl transition-all duration-300 ${
          isDarkMode
            ? "bg-gray-800 text-white"
            : "bg-white/80 backdrop-blur-lg shadow-xl"
        }`}
      >
        <div className="text-center space-y-6 mb-12">
          <h1 className={`text-5xl font-bold bg-gradient-to-r ${
            isDarkMode
              ? "from-blue-400 to-purple-400"
              : "from-blue-600 to-purple-600"
          } bg-clip-text text-transparent`}>
            Type Master
          </h1>
          <p className={`text-lg ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            Enhance your typing skills with our interactive challenges
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <Link
            to="/singleword"
            className={`group relative overflow-hidden rounded-xl p-6 transition-all duration-300 ${
              isDarkMode
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-white hover:shadow-2xl"
            }`}
          >
            <div className="relative z-10">
              <h3 className={`text-xl font-semibold mb-2 ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}>
                Single Word Challenge
              </h3>
              <p className={`${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              } mb-4`}>
                Practice with individual words to build your speed
              </p>
              <span className={`inline-flex items-center text-sm font-medium ${
                isDarkMode ? "text-blue-400" : "text-blue-600"
              }`}>
                Start Challenge
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </Link>

          <Link
            to="/sentence"
            className={`group relative overflow-hidden rounded-xl p-6 transition-all duration-300 ${
              isDarkMode
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-white hover:shadow-2xl"
            }`}
          >
            <div className="relative z-10">
              <h3 className={`text-xl font-semibold mb-2 ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}>
                Quote Challenge
              </h3>
              <p className={`${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              } mb-4`}>
                Test your skills with complete sentences and quotes
              </p>
              <span className={`inline-flex items-center text-sm font-medium ${
                isDarkMode ? "text-blue-400" : "text-blue-600"
              }`}>
                Start Challenge
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SelectMode;
