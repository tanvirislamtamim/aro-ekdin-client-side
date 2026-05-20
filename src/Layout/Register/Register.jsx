import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import useAxios from "../../hooks/useAxios";
import SocialLogin from "../SocialLogin/SocialLogin";
import Swal from "sweetalert2";

const Register = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxios();
  

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // OTP স্টেজের জন্য স্টেটসমূহ
  const [isOtpStage, setIsOtpStage] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [image, setImage] = useState(null);
  
  const handleFileChange = (e) => {
  setImage(e.target.files[0]);
};

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ১ম ধাপ: "Register & Send OTP" বাটনে ক্লিক করলে শুধু OTP পাঠানো হবে
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        // ব্যাকএন্ডে ওটিপি পাঠানোর রিকোয়েস্ট (রেজিস্ট্রেশনের আগেই)
        const response = await axiosPublic.post("/send-otp", { 
          email: formData.email,
          name: formData.name // যদি ব্যাকএন্ডে ইমেইল টেমপ্লেটে নাম দেখাতে চান
        });

        if (response.data.success || response.status === 200) {
          Swal.fire({
            title: "Verification Code Sent!",
            text: `A 6-digit OTP has been sent to ${formData.email}`,
            icon: "success",
            confirmButtonColor: "#3b82f6",
          });
          setIsOtpStage(true); // OTP ইনপুট স্ক্রিন ওপেন হবে
        }
      } catch (error) {
        console.error("OTP Send Error:", error);
        setErrors((prev) => ({ 
          ...prev, 
          firebase: error.response?.data?.message || "Failed to send OTP. Try again." 
        }));
      } finally {
        setIsLoading(false);
      }
    }
  };

  // ২য় ধাপ: OTP ভেরিফাই হওয়া মাত্রই ফাইনাল রেজিস্ট্রেশন সম্পন্ন হবে
  const handleVerifyAndRegister = async (e) => {
    e.preventDefault();
    setOtpError("");
    
    if (otp.length !== 6) {
      setOtpError("Please enter a valid 6-digit OTP");
      return;
    }

    setIsLoading(true);
    try {
      // ১. প্রথমে ব্যাকএন্ডে ওটিপি কোডটি ভেরিফাই করা হবে
      const verifyResponse = await axiosPublic.post("/verify-otp", {
        email: formData.email,
        otp: otp,
      });

      // ওটিপি সঠিক হলে ভেতরের ব্লকে ঢুকবে
      if (verifyResponse.data.success) {
        let imageUrl = "";

        // Cloudinary-তে ইমেজ আপলোড
        if (image) {
          const formDataImage = new FormData();
          formDataImage.append("file", image);
          formDataImage.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET); // আপনার ক্লাউডিনারির প্রিসেট দিন

          const imgRes = await fetch("https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload", {
            method: "POST",
            body: formDataImage,
          });
          const imgData = await imgRes.json();
          imageUrl = imgData.secure_url;
          console.log(imageUrl);
        }

        // Firebase রেজিস্ট্রেশন
        const firebaseResult = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        console.log("Firebase User Created:", firebaseResult.user);

        // MongoDB-তে পাঠানোর ডাটা
        const userInfo = {
          name: formData.name,
          email: formData.email,
          photoURL: imageUrl, // এখানে ইমেজ ইউআরএল সেট হলো
          role: "user",
          isVerified: true,
          last_login: new Date(),
          createdAt: new Date(),
        };

        const mongoResponse = await axiosPublic.post("/users", userInfo);

        if (mongoResponse.data.insertedId) {
          Swal.fire({
            title: "Registration Success!",
            text: "Your account has been verified and registered successfully.",
            icon: "success",
            confirmButtonText: "Go to Home",
            confirmButtonColor: "#10b981",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/");
            }
          });
        }
      }
    } catch (error) {
      console.error("Verification/Registration Error:", error);
      // ওটিপি ভুল হলে বা ফায়ারবেস/ডাটাবেজে কোনো সমস্যা হলে এরর হ্যান্ডলিং
      const errMsg = error.response?.data?.message || error.message || "Something went wrong!";
      setOtpError(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative">
      

      <div className="relative w-full max-w-md">
        <div className="bg-[#0a0a0a]/80 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-cyan-300 to-indigo-400 mb-2">
              {isOtpStage ? "Verify Email" : "Create Account"}
            </h2>
            <p className="text-gray-400 text-sm">
              {isOtpStage
                ? `Enter the 6-digit code sent to ${formData.email}`
                : "Register to continue your journey"}
            </p>
          </div>

          {errors.firebase && (
            <p className="text-red-400 text-xs text-center bg-red-500/10 p-2 rounded-lg mb-4 border border-red-500/20">
              {errors.firebase}
            </p>
          )}

          {/* DYNAMIC SCREEN RENDERING */}
          {!isOtpStage ? (
            /* স্ক্রিন ১: ইনফরমেশন ও ওটিপি পাঠানোর ফর্ম */
            <form onSubmit={handleSendOtp} className="space-y-5">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your Name"
                  className={`w-full px-4 py-3 bg-white/5 border ${errors.name ? "border-red-500/50" : "border-white/10"} rounded-xl text-white focus:outline-none focus:border-blue-400/50 transition-all`}
                />
                {errors.name && <p className="text-red-400 text-xs">{errors.name}</p>}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={`w-full px-4 py-3 bg-white/5 border ${errors.email ? "border-red-500/50" : "border-white/10"} rounded-xl text-white focus:outline-none focus:border-blue-400/50 transition-all`}
                />
                {errors.email && <p className="text-red-400 text-xs">{errors.email}</p>}
              </div>
              <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Profile Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none"
                  />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className={`w-full px-4 py-3 bg-white/5 border ${errors.password ? "border-red-500/50" : "border-white/10"} rounded-xl text-white focus:outline-none focus:border-blue-400/50 transition-all`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 text-xs"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                {errors.password && <p className="text-red-400 text-xs">{errors.password}</p>}
              </div>
              

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-linear-to-r from-blue-400 via-cyan-300 to-indigo-400 text-white font-semibold rounded-xl hover:opacity-90 transition-all disabled:opacity-50"
              >
                {isLoading ? "Sending OTP..." : "Register & Send OTP"}
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-[#0a0a0a] text-gray-500">Or continue with</span>
                </div>
              </div>
              
              <SocialLogin />

              {/* Login Link */}
              <p className="text-center mt-6 text-gray-400 text-sm">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-300 hover:from-blue-300 hover:to-cyan-200 font-semibold transition-all duration-300"
                >
                  Sign In
                </Link>
              </p>
            </form>
          ) : (
            /* স্ক্রিন ২: ওটিপি সাবমিট এবং ফাইনাল রেজিস্ট্রেশন ফর্ম */
            <form onSubmit={handleVerifyAndRegister} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 text-center block">
                  Enter Verification Code
                </label>

                {/* OTP Individual Boxes */}
                <div className="flex justify-center gap-3">
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <div key={index} className="relative">
                      <input
                        type="text"
                        maxLength="1"
                        value={otp[index] || ""}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          const newOtp = otp.split("");
                          newOtp[index] = value;
                          setOtp(newOtp.join(""));

                          // Auto-focus next input
                          if (value && index < 5) {
                            const nextInput = e.target.parentElement.parentElement.children[index + 1]?.querySelector("input");
                            if (nextInput) nextInput.focus();
                          }
                        }}
                        onKeyDown={(e) => {
                          // Backspace to go to previous input
                          if (e.key === "Backspace" && !otp[index] && index > 0) {
                            const prevInput = e.target.parentElement.parentElement.children[index - 1]?.querySelector("input");
                            if (prevInput) prevInput.focus();
                          }
                        }}
                        onPaste={(e) => {
                          e.preventDefault();
                          const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
                          setOtp(pastedData);
                        }}
                        className="w-12 h-14 sm:w-14 sm:h-16 text-center text-xl sm:text-2xl font-bold bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 focus:bg-white/10 transition-all duration-300"
                        style={{ caretColor: "#60a5fa" }}
                      />
                      {otp[index] && (
                        <div className="absolute bottom-1 left-2 right-2 h-0.5 bg-linear-to-r from-blue-400 to-cyan-300 rounded-full animate-pulse"></div>
                      )}
                    </div>
                  ))}
                </div>

                {otpError && (
                  <p className="text-red-400 text-xs text-center mt-2 flex items-center justify-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {otpError}
                  </p>
                )}

                {/* OTP Resend */}
                <div className="text-center mt-4">
                  <button
                    type="button"
                    onClick={handleSendOtp} // পুনরায় OTP পাঠানোর জন্য একই ফাংশন কল হবে
                    className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-300"
                  >
                    Didn't receive code? <span className="text-blue-400 hover:text-cyan-300">Resend</span>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || otp.length < 6}
                className="w-full py-3 bg-linear-to-r from-green-400 to-emerald-500 text-white font-semibold rounded-xl hover:from-green-500 hover:to-emerald-600 transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? "Registering..." : "Verify & Register Account"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsOtpStage(false);
                  setOtp("");
                  setOtpError("");
                }}
                className="w-full text-center text-sm text-gray-400 hover:text-white transition-colors duration-300 flex items-center justify-center gap-1 group"
              >
                <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Registration
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;