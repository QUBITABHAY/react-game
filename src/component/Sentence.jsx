import React, { useState, useEffect, useCallback } from "react";

function Sentence() {
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [mistakes, setMistakes] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [accuracy, setAccuracy] = useState(100);

  const fetchQuote = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const apiKey = import.meta.env.VITE_API_KEY;

      if (!apiUrl || !apiKey) {
        throw new Error("API configuration is missing. Please check your environment variables.");
      }

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "X-Api-Key": apiKey,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch quote (${response.status}). Please try again.`);
      }

      const data = await response.json();

      if (data && data.length > 0 && data[0].quote) {
        setQuote(data[0].quote);
      } else {
        throw new Error("Invalid response format from API");
      }
    } catch (err) {
      setError(err.message);
      console.error("Quote fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuote();
  }, [fetchQuote]);

  const calculateAccuracy = useCallback((mistakeCount, totalWords) => {
    if (totalWords === 0) return 100;
    return Math.max(0, Math.round(((totalWords - mistakeCount) / totalWords) * 100));
  }, []);

  const handleInputChange = (e) => {
    const input = e.target.value;
    setUserInput(input);

    if (!startTime && input.length === 1) {
      setStartTime(Date.now());
    }

    if (!quote) return;

    const quoteWords = quote.split(" ");
    const inputWords = input.split(" ");
    let mistakeCount = 0;

    const minLength = Math.min(quoteWords.length, inputWords.length);
    for (let i = 0; i < minLength; i++) {
      if (quoteWords[i] !== inputWords[i]) {
        mistakeCount++;
      }
    }

    const wordDiff = Math.abs(quoteWords.length - inputWords.length);
    mistakeCount += wordDiff;

    setMistakes(mistakeCount);
    setAccuracy(calculateAccuracy(mistakeCount, quoteWords.length));

    if (input.trim() === quote) {
      const endTime = Date.now();
      const timeInMinutes = (endTime - startTime) / 60000;
      const wordsTyped = quoteWords.length;
      const wpm = Math.round(wordsTyped / timeInMinutes);
      setTypingSpeed(wpm);
      setIsCompleted(true);
    }
  };

  const resetTest = () => {
    setUserInput("");
    setStartTime(null);
    setMistakes(0);
    setTypingSpeed(null);
    setIsCompleted(false);
    setAccuracy(100);
    fetchQuote();
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div
      className={`flex justify-center items-center min-h-screen transition-colors duration-200 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div
        className={`flex flex-col justify-center items-center p-8 w-full max-w-4xl ${
          isDarkMode ? "text-gray-100" : "text-gray-900"
        }`}
      >
        <div className="flex justify-between items-center w-full mb-8">
          <h1 className="text-3xl font-bold">Quote Typing Test</h1>
          <button
            onClick={toggleTheme}
            className={`px-4 py-2 rounded-lg transition-colors ${
              isDarkMode
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-900"
            }`}
            aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
          >
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <div
          className={`w-full p-6 rounded-xl shadow-lg transition-colors ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          {error && (
            <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
              <p className="font-medium">Error</p>
              <p>{error}</p>
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="ml-3 text-lg">Loading quote...</span>
            </div>
          ) : (
            <div className="mb-6">
              <div className={`text-lg leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                {quote &&
                  quote.split(" ").map((word, index) => {
                    const inputWords = userInput.split(" ");
                    let className = "inline-block mr-2 px-1 rounded transition-colors";

                    if (index < inputWords.length) {
                      className += inputWords[index] === word
                        ? " bg-green-100 text-green-700"
                        : " bg-red-100 text-red-700";
                    }

                    return (
                      <span key={index} className={className}>
                        {word}
                      </span>
                    );
                  })}
              </div>

              <div className="flex flex-wrap gap-4 mt-6 mb-4">
                <div className="stats-card bg-blue-100 text-blue-700 px-4 py-2 rounded-lg">
                  <span className="font-medium">Mistakes:</span> {mistakes}
                </div>
                <div className="stats-card bg-yellow-100 text-yellow-700 px-4 py-2 rounded-lg">
                  <span className="font-medium">Accuracy:</span> {accuracy}%
                </div>
                {typingSpeed && (
                  <div className="stats-card bg-green-100 text-green-700 px-4 py-2 rounded-lg">
                    <span className="font-medium">Speed:</span> {typingSpeed} WPM
                  </div>
                )}
              </div>

              <textarea
                value={userInput}
                onChange={handleInputChange}
                placeholder="Start typing the quote here..."
                className={`w-full p-4 mt-4 rounded-lg resize-none transition-colors ${
                  isDarkMode
                    ? "bg-gray-700 text-white placeholder-gray-400 border-gray-600"
                    : "bg-gray-50 text-gray-900 placeholder-gray-500 border-gray-200"
                } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                rows="3"
                disabled={isCompleted}
              />

              <div className="flex gap-4 mt-6">
                <button
                  onClick={resetTest}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  {isCompleted ? "Try Again" : "New Quote"}
                </button>
              </div>
            </div>
          )}
        </div>

        {isCompleted && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm">
            <div className={`p-8 rounded-xl shadow-xl max-w-md w-full ${
              isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
            }`}>
              <h2 className="text-2xl font-bold mb-6">🎉 Test Complete!</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Speed:</span>
                  <span className="text-xl font-bold text-green-500">{typingSpeed} WPM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Accuracy:</span>
                  <span className="text-xl font-bold text-blue-500">{accuracy}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Mistakes:</span>
                  <span className="text-xl font-bold text-red-500">{mistakes}</span>
                </div>
              </div>
              <button
                onClick={resetTest}
                className="w-full mt-8 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Try Another Quote
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sentence;
