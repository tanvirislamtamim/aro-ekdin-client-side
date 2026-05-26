import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Download from "yet-another-react-lightbox/plugins/download";
import "yet-another-react-lightbox/styles.css";
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'

import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "../../hooks/useAxiosSecure";


const Gallery = () => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("new");
  const axiosSecure = useAxiosSecure();

  // ডেটা ফেচিং
const { data: allPhotos = [], isLoading } = useQuery({
  queryKey: ["photos"],
  queryFn: async () => {
    const res = await axiosSecure.get("/photos");
    return res.data;
  },
});

// সেফ ফিল্টারিং
const currentPhotos = Array.isArray(allPhotos) 
  ? allPhotos.filter((item) => item?.category === activeTab) 
  : [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      rotateX: -15,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.2, 0.9, 0.4, 1.1],
      },
    },
    hover: {
      y: -12,
      scale: 1.03,
      rotateX: 5,
      rotateY: 5,
      transition: {
        type: "spring",
        stiffness: 250,
        damping: 18,
      },
    },
    tap: {
      scale: 0.98,
    },
  };

  const tabVariants = {
    inactive: {
      scale: 1,
      backgroundColor: "rgba(255,255,255,0.05)",
      borderColor: "rgba(255,255,255,0.2)",
    },
    active: {
      scale: 1,
      backgroundColor: "rgba(255,255,255,0.15)",
      borderColor: "#06b6d4",
      boxShadow: "0 0 20px rgba(6,182,212,0.3)",
    },
    hover: {
      scale: 1.02,
      backgroundColor: "rgba(255,255,255,0.1)",
    },
  };

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>
  }
  
  return (
    <div className="relative bg-linear-to-br from-black via-gray-950 to-black text-white py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0, y: -50, rotateX: -20 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="text-center mb-12 overflow-visible px-2 sm:px-4"
          style={{ perspective: 1000 }}
        >
          <motion.h2
            className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight overflow-visible whitespace-normal wrap-break-word inline-block max-w-full px-2"
            animate={{
              textShadow: [
                "0 0 0px rgba(255,255,255,0)",
                "0 0 20px rgba(6,182,212,0.5)",
                "0 0 0px rgba(255,255,255,0)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
          >
            <span className="bg-linear-to-r from-blue-400 via-cyan-300 bg-clip-text text-transparent">
              GALLERY
            </span>
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1 bg-linear-to-r from-blue-400 via-cyan-300 mx-auto mt-4 rounded-full"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.7 }}
            className="text-gray-400 mt-4 text-lg"
          >
            Capturing moments, creating memories
          </motion.p>
        </motion.div>

        {/* TAB BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex justify-center gap-6 mb-12 flex-wrap"
        >
          <motion.button
            variants={tabVariants}
            initial="inactive"
            animate={activeTab === "new" ? "active" : "inactive"}
            whileHover="hover"
            whileTap={{ scale: 0.97 }}
            onClick={() => setActiveTab("new")}
            className={`relative px-8 py-3 rounded-xl font-bold text-lg backdrop-blur-sm border transition-all duration-300 ${
              activeTab === "new"
                ? "border-cyan-500 text-white"
                : "border-white/20 text-gray-300 hover:text-white"
            }`}
            style={{
              background:
                activeTab === "new"
                  ? "linear-gradient(135deg, rgba(6,182,212,0.2), rgba(59,130,246,0.2))"
                  : "rgba(255,255,255,0.05)",
            }}
          >
            <span className="relative z-10">📸 New Photos</span>

            {activeTab === "new" && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 rounded-xl bg-linear-to-r from-cyan-500/20 to-black"
                transition={{ type: "spring", duration: 0.5 }}
              />
            )}
          </motion.button>

          <motion.button
            variants={tabVariants}
            initial="inactive"
            animate={activeTab === "old" ? "active" : "inactive"}
            whileHover="hover"
            whileTap={{ scale: 0.97 }}
            onClick={() => setActiveTab("old")}
            className={`relative px-8 py-3 rounded-xl font-bold text-lg backdrop-blur-sm border transition-all duration-300 ${
              activeTab === "old"
                ? "border-cyan-500 text-white"
                : "border-white/20 text-gray-300 hover:text-white"
            }`}
            style={{
              background:
                activeTab === "old"
                  ? "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(6,182,212,0.2))"
                  : "rgba(255,255,255,0.05)",
            }}
          >
            <span className="relative z-10">🎞️ Old Photos</span>

            {activeTab === "old" && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 rounded-xl bg-linear-to-r from-black to-cyan-500/20"
                transition={{ type: "spring", duration: 0.5 }}
              />
            )}
          </motion.button>
        </motion.div>

        {/* IMAGE GRID */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            style={{ perspective: 1200 }}
          >
            {currentPhotos.map((image, i) => (
              <motion.div
                key={`${activeTab}-${i}`}
                variants={cardVariants}
                whileHover="hover"
                whileTap="tap"
                className="group cursor-pointer"
                style={{
                  transformStyle: "preserve-3d",
                }}
                onClick={() => {
                  setIndex(i);
                  setOpen(true);
                }}
              >
                <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-linear-to-br from-white/10 to-white/5 backdrop-blur-sm shadow-2xl transition-all duration-300">
                  <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="relative overflow-hidden">
                    <img
                    
                      src={image.url}
                      alt={image.title}
                      className="w-full h-72 md:h-80 object-cover object-center transform transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                      decoding="async"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-cyan-400/50 transition-all duration-300 pointer-events-none" />
                  </div>

                  <div className="absolute bottom-0 w-full p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-center text-lg font-bold italic tracking-wide">
                      {image.title}
                    </p>

                    {image.year && (
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        className="text-center text-sm text-cyan-400 font-medium mt-1"
                      >
                        {image.year}
                      </motion.p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          className="text-center mt-12 text-gray-500 text-sm"
        >
          {currentPhotos.length} photos •{" "}
          {activeTab === "new"
            ? "Latest moments"
            : "Cherished memories"}
        </motion.div>
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={currentPhotos.map((img) => ({
          src: img.url,
          title: img.title,
          description: img.year,
        }))}
        plugins={[Zoom, Download]}
        carousel={{
          finite: false,
          preload: 2,
        }}
        zoom={{
          maxZoomPixelRatio: 3,
          zoomInMultiplier: 1.5,
        }}
        controller={{
          closeOnBackdropClick: true,
        }}
        styles={{
          container: { backgroundColor: "rgba(0,0,0,0.95)" },
          button: {
            filter: "drop-shadow(0 0 10px rgba(0,0,0,0.5))",
          },
        }}
      />
    </div>
  );
};

export default Gallery;