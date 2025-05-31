import { useState } from 'react'
import { FaQuestionCircle } from 'react-icons/fa'
import { AnimatePresence, motion } from 'framer-motion'

export default function GameInfoModal() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleModal = () => setIsOpen((prev) => !prev)

  return (
    <div className="">
      <button
        onClick={toggleModal}
        className="flex justify-center items-center text-white"
      >
        <FaQuestionCircle size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-8 right-0 z-20 w-64 bg-white rounded shadow-xl p-4 text-sm text-black"
          >
            <h2 className="font-bold mb-2">🏀 How the Game Works</h2>
            <p>
              Choose <strong>5 NBA teams</strong> to compete in a tournament.
              After you click <strong>"Begin Tournament"</strong>, the computer
              selects <strong>5 random opposing teams</strong> and a random
              season. The tournament consists of <strong>5 rounds</strong>. The
              winner is determined by who achieves the most wins!
            </p>
            <button
              onClick={toggleModal}
              className="mt-3 w-full py-1 bg-gray-800 text-white rounded"
            >
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
