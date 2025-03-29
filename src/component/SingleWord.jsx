import React, { useState } from "react";

function SingleWord() {
  const [number, setNumber] = useState(1);
  const [words, setWords] = useState([]);
  const [error, setError] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [results, setResults] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [typingSpeed, setTypingSpeed] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const wordApi = `https://random-word-api.herokuapp.com/word?number=${number}`;

  const handleAPI = async () => {
    try {
      const response = await fetch(wordApi);
      if (!response.ok) {
        throw new Error("Failed to fetch word");
      }
      const data = await response.json();
      setWords(data);
      setResults([]);
      setUserInput("");
      setTypingSpeed(null);
      setStartTime(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleInputChange = e => {
    const input = e.target.value;
    setUserInput(input);

    if (!startTime) {
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
      const correctWords = comparisonResults.filter(result => result.isCorrect)
        .length;
      const wpm = Math.round(correctWords / timeTakenInMinutes);
      setTypingSpeed(wpm);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <div
      className={`flex justify-center items-center min-h-screen ${isDarkMode
        ? "bg-black text-white"
        : "bg-gray-100 text-black"}`}
    >
      <div
        className={`shadow-md w-md rounded-lg p-4 ${isDarkMode
          ? "bg-gray-800 text-white"
          : "bg-white text-black"}`}
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Word Typing Test</h1>
          <button
            onClick={toggleTheme}
            className={`px-4 py-2 rounded ${isDarkMode
              ? "bg-gray-700 text-white"
              : "bg-gray-300 text-black"}`}
          >
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
        <div className="flex items-center mb-4">
          <input
            onChange={e => setNumber(e.target.value)}
            value={number}
            type="number"
            min="1"
            className="border border-gray-300 rounded-lg p-2 w-full"
            placeholder="Type No. of Words You Want..."
          />
          <button
            onClick={handleAPI}
            className="bg-blue-500 text-white rounded-lg px-4 py-2 ml-2 disabled:bg-gray-400"
          >
            Get
          </button>
        </div>
        {error &&
          <p className="text-red-500 mb-4">
            {error}
          </p>}
        <div className="flex flex-wrap gap-4">
          {words.map((word, index) =>
            <h2
              key={index}
              className={`text-xl font-bold ${isDarkMode
                ? "text-white-500"
                : "text-gray-700"}`}
            >
              {word}
            </h2>
          )}
        </div>
        <p className="text-red-500 mt-4 mb-4">Type the word space separated</p>
        <input
          onChange={handleInputChange}
          value={userInput}
          type="text"
          className="border border-gray-300 rounded-lg p-2 w-full"
          placeholder="Type the word"
        />
        <div className="mt-4">
          {results.map((result, index) =>
            <p
              key={index}
              className={`text-lg ${result.isCorrect
                ? "text-green-500"
                : "text-red-500"}`}
            >
              {result.word} - {result.isCorrect ? "Correct" : "Incorrect"}
            </p>
          )}
        </div>
        {typingSpeed !== null &&
          <p className="text-xl font-bold text-green-500 mt-4">
            Typing Speed: {typingSpeed} WPM
          </p>}
      </div>
    </div>
  );
}

export default SingleWord;
