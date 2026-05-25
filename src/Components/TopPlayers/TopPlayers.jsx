import React from 'react';
import { motion } from "framer-motion";


const TopPlayers = () => {
  const players = [
    { name: "S.Sajjad", id: "12", role: "Game Changer", img: "https://res.cloudinary.com/do8awe7fc/image/upload/q_auto/f_auto/v1777145445/Sajjad_egabvp.png" },
    { name: "Mizba Al Naim", id: "3", role: "Captain", img: "https://res.cloudinary.com/do8awe7fc/image/upload/q_auto/f_auto/v1777145439/Mizba_ufaruk.png" },
    { name: "MD Shehad", id: "5", role: "Star Performer", img: "https://res.cloudinary.com/do8awe7fc/image/upload/q_auto/f_auto/v1777145446/Shehad_tvxges.jpg" },
  ];

  return (
    <div>
      {/* ===== FEATURED PLAYERS SECTION ===== */}
      <section className="relative py-28 px-6 md:px-20 bg-black overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-blue-900/5 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-cyan-500/20 to-transparent"></div>

        <div className="text-center mb-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-xs font-mono tracking-[0.3em] text-cyan-400 bg-white/5 px-5 py-2 rounded-full backdrop-blur-sm mb-5 border border-white/10">
              THE ELITE
            </span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter">
              <span className="bg-linear-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                Top Performers
              </span>
            </h2>
            <div className="flex justify-center gap-2 mt-5">
              <div className="w-10 h-0.5 bg-cyan-500 rounded-full"></div>
              <div className="w-2 h-0.5 bg-white/30 rounded-full"></div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto relative z-10">
          {players.map((player, index) => {
            const isEmpty = !player.name || player.name === "";
            const scrollAnimation = {
              hidden: {
                opacity: 0,
                rotateX: 20,
                rotateY: -20,
                y: 80,
                scale: 0.8
              },
              visible: {
                opacity: 1,
                rotateX: 0,
                rotateY: 0,
                y: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  damping: 15,
                  stiffness: 120,
                  delay: index * 0.1,
                  duration: 0.7
                }
              }
            };

            return (
              <motion.div
                key={index}
                variants={scrollAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-30px" }}
                className="player-card-3d group rounded-3xl overflow-hidden backdrop-blur-sm"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="relative h-96 overflow-hidden">
                  {isEmpty ? (
                    <div className="w-full h-full bg-linear-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl mb-2 opacity-30">✨</div>
                        <p className="text-gray-500 text-sm">Coming Soon</p>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={player.img}
                      alt={player.name}
                      className="player-image w-full h-full object-cover object-center"
                    />
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
                  <div className="absolute inset-0 bg-linear-to-r from-black/30 via-transparent to-black/30 pointer-events-none"></div>

                  {!isEmpty && (
                    <div className="absolute top-5 right-5 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/20 transition-all duration-300 group-hover:bg-black/70 group-hover:scale-110 group-hover:border-cyan-400">
                      <span className="text-white font-black text-sm">{player.id}</span>
                    </div>
                  )}
                </div>

                <div className="p-7 text-center relative z-10">
                  {isEmpty ? (
                    <>
                      <h3 className="text-2xl font-bold text-gray-400 tracking-tight">
                        {player.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-2 flex items-center justify-center gap-1">
                        <span className="inline-block w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>
                        <span>{player.role}</span>
                      </p>
                    </>
                  ) : (
                    <>
                      {/* Name stays white on hover */}
                      <h3 className="player-name text-2xl font-extrabold text-white tracking-tight">
                        {player.name}
                      </h3>
                      {/* Role stays white on hover */}
                      <p className="player-role text-sm text-white mt-2 flex items-center justify-center gap-1 font-semibold tracking-wide">
                        <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                        {player.role}
                      </p>
                    </>
                  )}
                  <div className="w-12 h-px bg-linear-to-r from-transparent via-cyan-500 to-transparent mx-auto mt-5 transition-all duration-500 group-hover:w-24"></div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-20">
          <p className="text-gray-600 text-sm tracking-widest">✦ MORE LEGENDS COMING SOON ✦</p>
        </div>
      </section>
    </div>
  );
};

export default TopPlayers;