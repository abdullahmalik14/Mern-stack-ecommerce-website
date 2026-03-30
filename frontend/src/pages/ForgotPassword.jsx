import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../utils/api";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { data } = await api.post("/auth/forgotpassword", { email });
      toast.success(data.data || "Email sent! Check your inbox.");
      setIsSent(true);
    } catch (error) {
      console.error("Forgot Password failed:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Left Side - Image */}
      <div className="hidden md:block w-1/2 relative">
        <img 
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop" 
          alt="Forgot Password Background" 
          className="w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-white text-center p-8">
            <h2 className="text-4xl font-bold mb-4 tracking-tighter">Lost Your Key?</h2>
            <p className="text-lg text-gray-200">Reset your password to regain access to your style.</p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Reset Password</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email address to receive a recovery link.
            </p>
          </div>

          {!isSent ? (
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors duration-200 disabled:bg-gray-400"
                >
                  {isSubmitting ? "Sending..." : "Send Reset Link"}
                </button>
              </div>
            </form>
          ) : (
            <div className="mt-8 text-center p-6 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="text-xl font-medium text-gray-900 mb-2">Check your email</h3>
              <p className="text-gray-600 mb-6">We've sent a password reset link to {email}.</p>
              <button 
                onClick={() => setIsSent(false)}
                className="text-sm font-medium text-black hover:underline"
              >
                Try another email
              </button>
            </div>
          )}

          <div className="text-center mt-6">
             <Link to="/login" className="font-medium text-black hover:underline text-sm">
                &larr; Back to login
             </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPassword;
