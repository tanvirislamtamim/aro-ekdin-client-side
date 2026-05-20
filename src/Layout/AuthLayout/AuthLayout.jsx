import React, { useMemo } from 'react';
import { Outlet, Link } from 'react-router';

const AuthLayout = () => {
    
    
    return (
        <div className="bg-[#0a0a0a] min-h-screen flex flex-col relative overflow-hidden">
            {/* Animated Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-150 h-150 bg-linear-to-r from-blue-400/10 via-cyan-300/10 to-indigo-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-150 h-150 bg-linear-to-r from-blue-400/5 via-cyan-300/5 to-indigo-400/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-1/2 left-1/2 w-100 h-100 bg-linear-to-r from-blue-500/5 via-cyan-400/5 to-indigo-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            </div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
                style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }}>
            </div>

            {/* Top Logo Section */}
            <div className='relative p-6 md:p-10'>
                <Link to="/" className="inline-flex items-center gap-3 group">
                    <div className="relative">
                        {/* Logo Glow Effect */}
                        <div className="absolute inset-0 bg-linear-to-r from-blue-400/30 via-cyan-300/30 to-indigo-400/30 blur-xl rounded-full group-hover:from-blue-400/50 group-hover:via-cyan-300/50 group-hover:to-indigo-400/50 transition-all duration-500"></div>
                        <img
                            src="https://res.cloudinary.com/do8awe7fc/image/upload/q_auto/f_auto/v1777145975/Logo_qzb1xk.jpg"
                            alt="Aro Ekdin Logo"
                            className="relative w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-white/20 shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:border-blue-400/50 group-hover:shadow-blue-400/20"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-cyan-300 to-indigo-400 tracking-tight">
                            Aro Ekdin
                        </span>
                        <span className="text-xs text-gray-500 tracking-[0.2em] uppercase">Volleyball Community</span>
                    </div>
                </Link>
            </div>

            {/* Main Content Wrapper */}
            <div className="relative grow flex items-center justify-center p-4">
                <div className="container max-w-6xl mx-auto">
                    <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20">
                        
                        {/* Left Side: Form Content (Outlet) */}
                        <div className='flex-1 w-full max-w-md flex justify-center lg:justify-start z-10'>
                            <div className="w-full">
                                <Outlet />
                            </div>
                        </div>

                        {/* Right Side: Realistic Volleyball Animation Section */}
                        <div className='flex-1 hidden lg:flex justify-center items-center z-10'>
                            <div className="relative w-125 h-125">
                                {/* Animated Glow Background */}
                                <div className="absolute inset-0 bg-linear-to-br from-blue-600/20 via-cyan-500/15 to-indigo-600/20 rounded-full blur-3xl animate-pulse"></div>
                                
                                {/* Floating Light Orbs */}
                                <div className="absolute top-[15%] left-[20%] w-48 h-48 bg-blue-500/15 rounded-full blur-3xl animate-pulse-slow"></div>
                                <div className="absolute bottom-[20%] right-[15%] w-56 h-56 bg-cyan-500/15 rounded-full blur-3xl animate-pulse-slower"></div>
                                <div className="absolute top-[40%] right-[25%] w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl animate-float"></div>

                                {/* Main Realistic Volleyball Container */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="relative w-80 h-80">
                                        {/* Bouncing Container */}
                                        <div className="absolute inset-0 animate-volleyball-bounce">
                                            {/* Realistic Volleyball Image */}
                                            <div className="relative w-full h-full animate-spin-slow">
                                                {/* Real Volleyball PNG with transparent background */}
                                                <img 
                                                    src="https://pngimg.com/uploads/volleyball/volleyball_PNG39.png" 
                                                    alt="Realistic Volleyball"
                                                    className="w-full h-full object-contain drop-shadow-2xl filter"
                                                    style={{
                                                        filter: 'drop-shadow(0 25px 25px rgba(0,0,0,0.5)) drop-shadow(0 0 50px rgba(59,130,246,0.3))',
                                                    }}
                                                />
                                                
                                                {/* Additional Glow Effect Behind Ball */}
                                                <div className="absolute inset-0 bg-linear-to-br from-blue-400/20 via-transparent to-indigo-400/20 rounded-full blur-2xl -z-10"></div>
                                            </div>
                                        </div>

                                        {/* Dynamic Shadow on Ground */}
                                        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-40 h-6 bg-black/50 rounded-full blur-lg animate-shadow-pulse"></div>

                                        {/* Floating Particles Around Ball */}
                                        {[...Array(15)].map((_, i) => (
                                            <div
                                                key={i}
                                                className="absolute rounded-full"
                                                style={{
                                                    width: `${3 + Math.random() * 4}px`,
                                                    height: `${3 + Math.random() * 4}px`,
                                                    background: `radial-gradient(circle, ${['#60a5fa', '#22d3ee', '#818cf8', '#a78bfa'][i % 4]}, transparent)`,
                                                    top: `${10 + Math.random() * 80}%`,
                                                    left: `${10 + Math.random() * 80}%`,
                                                    animation: `float-particle ${2.5 + Math.random() * 3}s ease-in-out infinite`,
                                                    animationDelay: `${Math.random() * 2}s`,
                                                    boxShadow: `0 0 ${4 + Math.random() * 6}px ${['#60a5fa', '#22d3ee', '#818cf8'][i % 3]}`
                                                }}
                                            ></div>
                                        ))}

                                        {/* Motion Trail Effects */}
                                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72">
                                            <div className="absolute inset-0 border-2 border-blue-400/10 rounded-full animate-ping-slow"></div>
                                            <div className="absolute inset-4 border border-cyan-400/10 rounded-full animate-ping-slower"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Decorative Orbit Rings */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-96 h-96 rounded-full border border-white/5 animate-reverse-spin">
                                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-400/50 rounded-full blur-sm"></div>
                                    </div>
                                    <div className="absolute w-80 h-80 rounded-full border border-white/3 animate-spin-slower">
                                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-cyan-400/50 rounded-full blur-sm"></div>
                                    </div>
                                </div>

                                {/* Bottom Glass Card */}
                                <div className="absolute -bottom-19 left-1/2 transform -translate-x-1/2 w-72">
                                    <div className="backdrop-blur-md bg-white/5 rounded-2xl p-5 border border-white/10 shadow-2xl">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
                                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93z"/>
                                                </svg>
                                            </div>
                                            <h2 className="text-lg font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-cyan-300 to-indigo-400">
                                                Aro Ekdin
                                            </h2>
                                        </div>
                                        <p className="text-gray-400 text-xs leading-relaxed">
                                            Join the ultimate volleyball community. Spike, serve, and soar to new heights!
                                        </p>
                                        <div className="flex gap-2 mt-3">
                                            <span className="px-2 py-1 text-[10px] bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/20">#Volleyball</span>
                                            <span className="px-2 py-1 text-[10px] bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-500/20">#Community</span>
                                            <span className="px-2 py-1 text-[10px] bg-indigo-500/20 text-indigo-300 rounded-full border border-indigo-500/20">#Sports</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            
            {/* Footer */}
            <div className="relative p-6 text-center z-10">
                <div className="flex items-center justify-center gap-4 mb-2">
                    <div className="h-px w-12 bg-linear-to-r from-transparent to-white/10"></div>
                    <span className="text-gray-500 text-sm">© {new Date().getFullYear()} Aro Ekdin. All rights reserved.</span>
                    <div className="h-px w-12 bg-linear-to-l from-transparent to-white/10"></div>
                </div>
                <div className="flex items-center justify-center gap-4 text-xs text-gray-600">
                    <Link to="/terms" className="hover:text-blue-400 transition-colors duration-300">Terms</Link>
                    <span>•</span>
                    <Link to="/privacy" className="hover:text-cyan-300 transition-colors duration-300">Privacy</Link>
                    <span>•</span>
                    <Link to="/support" className="hover:text-indigo-400 transition-colors duration-300">Support</Link>
                </div>
            </div>

            {/* Animation Styles */}
            <style jsx>{`
                @keyframes pulse-slow {
                    0%, 100% { transform: scale(1); opacity: 0.5; }
                    50% { transform: scale(1.2); opacity: 0.8; }
                }
                
                @keyframes pulse-slower {
                    0%, 100% { transform: scale(1); opacity: 0.3; }
                    50% { transform: scale(1.3); opacity: 0.6; }
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-25px); }
                }
                
                @keyframes volleyball-bounce {
                    0%, 100% { transform: translateY(0px); }
                    30% { transform: translateY(-20px); }
                    50% { transform: translateY(0px); }
                    70% { transform: translateY(-10px); }
                    85% { transform: translateY(0px); }
                }
                
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                
                @keyframes reverse-spin {
                    from { transform: rotate(360deg); }
                    to { transform: rotate(0deg); }
                }
                
                @keyframes spin-slower {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(-360deg); }
                }
                
                @keyframes float-particle {
                    0%, 100% { 
                        transform: translate(0, 0) scale(0); 
                        opacity: 0; 
                    }
                    20% { 
                        transform: translate(15px, -30px) scale(1.2); 
                        opacity: 1; 
                    }
                    80% { 
                        transform: translate(-20px, -50px) scale(0.5); 
                        opacity: 0.5; 
                    }
                }
                
                @keyframes shadow-pulse {
                    0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.4; }
                    50% { transform: translateX(-50%) scale(0.8); opacity: 0.2; }
                }
                
                @keyframes ping-slow {
                    0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.5; }
                    100% { transform: translate(-50%, -50%) scale(1.2); opacity: 0; }
                }
                
                @keyframes ping-slower {
                    0% { transform: translate(-50%, -50%) scale(0.9); opacity: 0.3; }
                    100% { transform: translate(-50%, -50%) scale(1.1); opacity: 0; }
                }
                
                .animate-pulse-slow {
                    animation: pulse-slow 3s ease-in-out infinite;
                }
                
                .animate-pulse-slower {
                    animation: pulse-slower 4s ease-in-out infinite;
                }
                
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                
                .animate-volleyball-bounce {
                    animation: volleyball-bounce 2.5s ease-in-out infinite;
                }
                
                .animate-spin-slow {
                    animation: spin-slow 25s linear infinite;
                }
                
                .animate-reverse-spin {
                    animation: reverse-spin 20s linear infinite;
                }
                
                .animate-spin-slower {
                    animation: spin-slower 30s linear infinite;
                }
                
                .animate-shadow-pulse {
                    animation: shadow-pulse 2.5s ease-in-out infinite;
                }
                
                .animate-ping-slow {
                    animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
                }
                
                .animate-ping-slower {
                    animation: ping-slower 4s cubic-bezier(0, 0, 0.2, 1) infinite 1s;
                }
            `}</style>
        </div>
    );
};

export default AuthLayout;