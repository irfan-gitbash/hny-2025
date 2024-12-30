import React, { useState, useEffect } from "react";

const CardFlipCountdown = () => {
  const [currentYear, setCurrentYear] = useState(2024);
  const [isFlipped, setIsFlipped] = useState(false);
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    // Hitung waktu menuju tahun baru (1 Januari)
    const targetDate = new Date("January 1, 2025 00:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        clearInterval(interval);
        setCurrentYear(2025); // Update tahun ke 2025
        setIsFlipped(true); // Lakukan animasi flip
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Update countdown state
        setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval); // Cleanup saat komponen di-unmount
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      {/* Container angka */}
      <div className="flex space-x-6 mb-12 perspective">
        {/* Kartu untuk angka */}
        {String(currentYear)
          .split("")
          .map((num, index) => (
            <div
              key={index}
              className="relative w-20 h-32 text-4xl font-bold flex justify-center items-center perspective"
            >
              <div
                className={`absolute w-full h-full bg-gray-800 border border-gray-700 flex items-center justify-center text-white 
                shadow-xl transform transition-transform duration-700 ${
                  isFlipped && index === 3 ? "rotate-x-180 bg-green-500" : ""
                }`}
              >
                {num}
              </div>
              {/* Shadow Box */}
              <div className="absolute bottom-[-6px] bg-gray-700 w-20 h-6 rounded transform skew-x-[20deg]"></div>
            </div>
          ))}
      </div>

      {/* Countdown Timer */}
      <div className="relative text-center text-xl font-semibold text-gray-300">
        {countdown ? (
          <p>Time Remaining: {countdown}</p>
        ) : (
          <p className="text-white font-bold text-4xl text-center px-4 z-50 relative">
            🎉 Happy New Year 2025! 🎉
          </p>
        )}
      </div>
    </div>
  );
};

export default CardFlipCountdown;
