import React, { useState } from "react";
import { Link } from "react-router-dom";

function SingleWord() {
  const [number, setNumber] = useState(1);
  const [words, setWords] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [results, setResults] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [typingSpeed, setTypingSpeed] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const wordApi = `https://random-word-api.herokuapp.com/word?number=${number}`;

  const handleAPI = async () => {
    if (number < 1 || number > 100) {
      setError("Please enter a number between 1 and 100");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(wordApi);
      if (!response.ok) {
        throw new Error("Failed to fetch words. Please try again.");
      }
      const data = await response.json();
      setWords(data);
      setResults([]);
      setUserInput("");
      setTypingSpeed(null);
      setStartTime(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    setUserInput(input);

    if (!startTime && input.length === 1) {
      setStartTime(Date.now());
    }

    const inputWords = input.split(" ");
    const comparisonResults = inputWords.map((word, index) => ({
      word,
      isCorrect: word === words[index]
    }));

    setResults(comparisonResults);

    const allCorrect = comparisonResults.every(
      (result, index) => result.isCorrect && index < words.length
    );

    if (allCorrect && inputWords.length === words.length) {
      const endTime = Date.now();
      const timeTakenInMinutes = (endTime - startTime) / 60000;
      const wpm = Math.round(words.length / timeTakenInMinutes);
      setTypingSpeed(wpm);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-300 ${
      isDarkMode ? "bg-gray-900" : "bg-gradient-to-br from-blue-50 to-indigo-100"
    }`}>
      <div className="absolute top-4 right-4">
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

      <div className={`w-2xl max-w-4xl p-8 rounded-2xl transition-all duration-300 ${
        isDarkMode
          ? "bg-gray-800 text-white"
          : "bg-white/80 backdrop-blur-lg shadow-xl"
      }`}>
        <div className="text-center space-y-6 mb-8">
          <h1 className={`text-4xl font-bold bg-gradient-to-r ${
            isDarkMode
              ? "from-blue-400 to-purple-400"
              : "from-blue-600 to-purple-600"
          } bg-clip-text text-transparent`}>
            Word Challenge
          </h1>
          <p className={`text-lg ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            Test your typing speed with random words
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex gap-4 justify-center items-center">
            <div className="flex-1">
              <input
                type="number"
                min="1"
                max="100"
                value={number}
                onChange={(e) => setNumber(parseInt(e.target.value) || 1)}
                className={`w-sm px-4 py-3 rounded-lg transition-colors ${
                  isDarkMode
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-white text-gray-900 border-gray-200"
                } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Number of words (1-100)"
              />
            </div>
            <button
              onClick={handleAPI}
              disabled={loading}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                isDarkMode
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Loading...
                </span>
              ) : "Get Words"}
            </button>
          </div>

          {error && (
            <div className={`p-4 rounded-lg ${
              isDarkMode ? "bg-red-900/50 text-red-200" : "bg-red-100 text-red-700"
            }`}>
              <p className="font-medium">Error</p>
              <p>{error}</p>
            </div>
          )}

          {words.length > 0 && (
            <div className={`p-6 rounded-lg ${
              isDarkMode ? "bg-gray-700" : "bg-gray-50"
            }`}>
              <div className="flex flex-wrap gap-2">
                {words.map((word, index) => {
                  const result = results[index];
                  let className = `px-3 py-1.5 rounded transition-colors ${
                    isDarkMode ? "bg-opacity-50" : ""
                  } `;
                  
                  if (!result) {
                    className += isDarkMode ? "text-gray-300" : "text-gray-600";
                  } else {
                    className += result.isCorrect
                      ? isDarkMode 
                        ? "bg-green-900/50 text-green-200" 
                        : "bg-green-100 text-green-700"
                      : isDarkMode
                        ? "bg-red-900/50 text-red-200"
                        : "bg-red-100 text-red-700";
                  }

                  return (
                    <span key={index} className={className}>
                      {word}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {words.length > 0 && (
            <div className="space-y-4">
              <textarea
                value={userInput}
                onChange={handleInputChange}
                placeholder="Start typing the words..."
                className={`w-full p-4 rounded-lg resize-none transition-colors ${
                  isDarkMode
                    ? "bg-gray-700 text-white placeholder-gray-400 border-gray-600"
                    : "bg-white text-gray-900 placeholder-gray-500 border-gray-200"
                } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                rows="3"
                disabled={typingSpeed !== null}
              />

              {typingSpeed && (
                <div className="text-center space-y-4">
                  <div className={`inline-block px-6 py-3 rounded-lg ${
                    isDarkMode ? "bg-green-900/50 text-green-200" : "bg-green-100 text-green-700"
                  }`}>
                    <span className="font-medium">Speed:</span> {typingSpeed} WPM
                  </div>
                  <div>
                    <button
                      onClick={handleAPI}
                      className={`px-6 py-3 rounded-lg font-medium transition-all ${
                        isDarkMode
                          ? "bg-blue-500 hover:bg-blue-600 text-white"
                          : "bg-blue-600 hover:bg-blue-700 text-white"
                      }`}
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SingleWord;
