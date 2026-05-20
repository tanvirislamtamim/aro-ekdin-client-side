import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import {
  User,
  Flag,
  Calendar,
  Ruler,
  Weight,
  HandMetal,
  Phone,
  ArrowLeft,
} from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PlayerDetailsCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const axiosSecure = useAxiosSecure();

  const {
    data: singlePlayer,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["player", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/players/${id}`);
      return res.data;
    },
  });

  // 3D Animation Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);
  const springRotateX = useSpring(rotateX, { damping: 20, stiffness: 300 });
  const springRotateY = useSpring(rotateY, { damping: 20, stiffness: 300 });

  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - (rect.left + rect.width / 2));
    y.set(e.clientY - (rect.top + rect.height / 2));
    setGlowPosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const copyNumber = () => {
    if (singlePlayer?.phone) {
      navigator.clipboard.writeText(singlePlayer.phone);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  // --- Skeleton Loader (UI change ছাড়া) ---
  if (isLoading)
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 font-sans">
        <div className="w-full max-w-5xl rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md p-8 flex flex-col md:flex-row gap-8 animate-pulse">
          <div className="w-full md:w-2/5 flex flex-col items-center">
            <div className="w-52 h-52 md:w-64 md:h-64 rounded-full bg-white/10 mb-8" />
            <div className="w-40 h-8 rounded-lg bg-white/10 mb-3" />
            <div className="w-24 h-4 rounded bg-white/5" />
          </div>
          <div className="w-full md:w-3/5 space-y-8">
            <div className="w-32 h-6 rounded bg-white/10" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="w-20 h-4 rounded bg-white/10" />
                  <div className="w-full h-8 rounded-lg bg-white/5" />
                </div>
              ))}
            </div>
            <div className="w-full h-20 rounded-2xl bg-white/5" />
          </div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center text-red-500">
        Error loading player data!
      </div>
    );

  const { name, facebook, position, whatsapp, img, jersey, nationality, age, height, weight, DominantHand, Birthdate, phone, instagram } = singlePlayer;

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      <AnimatePresence>
        {showToast && (
          <motion.div initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="fixed top-5 right-5 z-50">
            <div className="px-5 py-3 rounded-2xl border border-white/20 bg-gradient-to-br from-indigo-600 to-purple-700 text-white shadow-2xl">
              📋 Number copied
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-purple-900/20 rounded-full blur-[180px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-700/20 rounded-full blur-[180px]" />
      </div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-5xl z-10">
        <motion.div
          style={{ rotateX: springRotateX, rotateY: springRotateY, transformStyle: "preserve-3d" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => { x.set(0); y.set(0); setIsHovering(false); }}
          onMouseEnter={() => setIsHovering(true)}
          className="relative rounded-3xl overflow-hidden border border-white/20 bg-gradient-to-tr from-white/5 to-indigo-900/10 backdrop-blur-[40px] shadow-2xl shadow-indigo-900/40 transition-transform duration-500 hover:scale-[1.03]"
        >
          <div className="absolute inset-0 pointer-events-none transition-opacity duration-300" style={{ opacity: isHovering ? 1 : 0, background: `radial-gradient(600px circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(99,102,241,0.2), transparent 40%)` }} />

          <button onClick={() => navigate(-1)} className="absolute top-5 left-5 z-20 flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full pl-3 pr-4 py-2 border border-white/20 hover:bg-white/20">
            <ArrowLeft size={18} className="text-indigo-300" /> Back
          </button>

          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-2/5 p-8 flex flex-col items-center justify-center border-r border-white/10">
              <div className="relative">
                <div className="w-52 h-52 md:w-64 md:h-64 rounded-full overflow-hidden border border-purple-500 p-2 bg-black/30">
                  <img src={img} alt={name} className="w-full h-full object-cover rounded-full" />
                </div>
                <div className="absolute top-8 right-2 bg-gradient-to-tr from-indigo-500 to-purple-500 text-white w-14 h-14 rounded-full flex items-center justify-center text-xl font-black shadow-lg">
                  {jersey}
                </div>
              </div>
              <div className="mt-8 text-center">
                <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-white">{name}</h2>
                <p className="text-indigo-300 uppercase text-sm mt-1">{position}</p>
                <div className="flex justify-center items-center gap-6 mt-4 bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
                  <Link to={facebook || "#"} target="_blank"><FaFacebook color="white" size={24} /></Link>
                  <Link to={instagram || "#"} target="_blank"><FaInstagram color="white" size={24} /></Link>
                  <Link to={whatsapp || "#"} target="_blank"><FaWhatsapp color="white" size={24} /></Link>
                </div>
              </div>
            </div>

            <div className="w-full md:w-3/5 p-8 md:p-12">
              <h3 className="text-xl font-semibold text-white uppercase mb-8">Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <DetailItem icon={<Flag size={18} />} label="Nationality" value={nationality} />
                <DetailItem icon={<User size={18} />} label="Age" value={`${age} Years`} />
                <DetailItem icon={<Ruler size={18} />} label="Height" value={height} />
                <DetailItem icon={<Weight size={18} />} label="Weight" value={weight} />
                <DetailItem icon={<HandMetal size={18} />} label="Dominant Hand" value={DominantHand} />
                <DetailItem icon={<Calendar size={18} />} label="Birth Date" value={Birthdate} />
              </div>

              <div onClick={copyNumber} className="mt-10 p-5 bg-indigo-500/5 border border-indigo-500/20 rounded-2xl flex items-center justify-between cursor-pointer hover:bg-indigo-500/10">
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-500/20 p-2 rounded-lg text-indigo-400"><Phone size={20} /></div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase">Contact</p>
                    <p className="text-slate-200 font-semibold">{phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

const DetailItem = ({ icon, label, value }) => (
  <div className="p-4 rounded-2xl hover:bg-indigo-500/10 transition-all">
    <div className="flex items-center gap-3 mb-1 text-indigo-400">
      {icon}
      <span className="text-xs text-slate-400 uppercase font-bold">{label}</span>
    </div>
    <p className="text-white font-semibold text-lg ml-7">{value || "N/A"}</p>
  </div>
);

export default PlayerDetailsCard;