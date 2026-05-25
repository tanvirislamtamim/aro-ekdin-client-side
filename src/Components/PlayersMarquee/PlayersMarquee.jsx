import React from 'react';

export default function Ultimate3DCarousel() {
  const images = [
    'https://res.cloudinary.com/do8awe7fc/image/upload/q_auto/f_auto/v1777145490/Action4_r4hccj.jpg',
    'https://res.cloudinary.com/do8awe7fc/image/upload/q_auto/f_auto/v1777145489/Action3_skmfkv.jpg',
    'https://res.cloudinary.com/do8awe7fc/image/upload/q_auto/f_auto/v1777145487/Action1_rsrzvd.jpg', 
    'https://res.cloudinary.com/do8awe7fc/image/upload/q_auto/f_auto/v1777145486/Action5_mhdswz.jpg',
    'https://res.cloudinary.com/do8awe7fc/image/upload/q_auto/f_auto/v1777145484/Action2_xjcmrw.jpg',
    'https://res.cloudinary.com/do8awe7fc/image/upload/q_auto/f_auto/v1777145490/Action4_r4hccj.jpg',
    'https://res.cloudinary.com/do8awe7fc/image/upload/q_auto/f_auto/v1777145489/Action3_skmfkv.jpg', 
    'https://res.cloudinary.com/do8awe7fc/image/upload/q_auto/f_auto/v1777145487/Action1_rsrzvd.jpg', 
  ];

  const angleOfRotation = 360 / images.length;

  return (
    <div className="w-full min-h-screen bg-[#030303] flex flex-col items-center pt-10 justify-center overflow-hidden font-sans pb-0 lg:pb-12">
      
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] bg-size-[32px_32px]"></div>
      </div>

      <div className="relative z-20 text-center mb-24 space-y-3 px-4">
        <p className="text-sm uppercase tracking-[0.4em] text-cyan-400/80 font-medium">Virtual Exhibition</p>
        <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter bg-linear-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent italic filter drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
          MOMENTS OF ACTION
        </h1>
        <div className="h-0.5 w-40 bg-linear-to-r from-transparent via-blue-500 to-transparent mx-auto rounded-full"></div>
      </div>

      <div className="relative w-full flex items-center justify-center perspective-[3000px] py-20">
        
        <div className="absolute inset-y-0 left-0 w-1/4 bg-linear-to-r from-[#030303] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-1/4 bg-linear-to-l from-[#030303] to-transparent z-10 pointer-events-none"></div>

        {/* 3D Carousel Spinner - the main animated element */}
        <div className="carousel-spinner-3d">
          {images.map((src, index) => {
            const rotation = index * angleOfRotation;
            return (
              <div 
                key={index} 
                className="card-3d-wrap"
                style={{
                  '--rotation': `${rotation}deg`,
                }}
              >
                <div className="card-3d relative h-full w-full overflow-hidden rounded-3xl border border-white/10 bg-gray-900/50 backdrop-blur-sm shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                  <img 
                    src={src} 
                    alt={`Action ${index + 1}`} 
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  
                  <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/90 p-6 flex flex-col justify-end">
                    <div className="w-fit px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/50 text-cyan-200 text-xs mb-3">
                      Action #{index + 1}
                    </div>
                    <p className="text-white font-bold text-2xl tracking-tight">Aro Ekdin</p>
                    <p className="text-gray-400 text-sm">Professional League</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        /* 3D Scene Settings */
        .perspective-[3000px] {
          perspective: 3000px;
        }

        /* The spinning container */
        .carousel-spinner-3d {
          position: relative;
          width: 350px; 
          height: 500px; 
          transform-style: preserve-3d;
          animation: spin3D 40s linear infinite;
        }

        /* Each image wrap */
        .card-3d-wrap {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          transform: rotateY(var(--rotation)) translateZ(800px); 
          transform-style: preserve-3d;
        }

        @keyframes spin3D {
          from {
            transform: rotateY(0deg);
          }
          to {
            transform: rotateY(360deg);
          }
        }

        @media (max-width: 768px) {
          .carousel-spinner-3d {
            width: 250px;
            height: 380px;
          }
          .card-3d-wrap {
            transform: rotateY(var(--rotation)) translateZ(500px);
          }
        }
      `}</style>
    </div>
  );
}