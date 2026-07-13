import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, LockKeyhole, ShieldCheck, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

import Button from "../components/Button";
import AnimatedBackground from "../components/AnimatedBackground";
import PageTransition from "../components/PageTransition";
import { forgotPassword, verifyOTP, resetPassword } from "../services/authService";


export function ForgotPassword() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [seconds, setSeconds] = useState(300);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (step !== 2 || seconds <= 0)
            return;

        const timer = setInterval(() => {
            setSeconds(prev => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [step, seconds]);

    const formatTime = () => {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min}:${String(sec).padStart(2, "0")}`;
    };

    const sendOTP = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await forgotPassword({ email });

            toast.success(
                "OTP sent! Check your inbox and spam folder."
            );

            setStep(2);
            setSeconds(300);

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Unable to send OTP"
            );
        }
        finally {
            setLoading(false);
        }
    };

    const verifyOtpHandler = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            await verifyOTP({
                email,
                otp
            });

            toast.success("OTP verified");

            navigate("/reset-password", {
                state: {
                    email,
                    otp
                }
            });

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Invalid OTP"
            );
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <PageTransition className="relative flex min-h-screen items-center justify-center bg-background px-4">
            <AnimatedBackground />

            <div className="absolute left-6 top-6 z-20">
                <Button
                    variant="ghost"
                    onClick={() => navigate("/login")}
                >
                    ← Back to Login
                </Button>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative w-full max-w-md"
            >

                <div className="mb-8 flex flex-col items-center">
                    <Link
                        to="/"
                        className="mb-6 flex items-center gap-3"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-600">

                            <LockKeyhole
                                className="text-white"
                                size={24}
                            />
                        </div>

                        <span className="text-2xl font-bold text-white">
                            CodeLens
                        </span>
                    </Link>

                    <h1 className="text-3xl font-bold text-white">
                        {step === 1
                            ? "Forgot Password?"
                            : "Verify OTP"
                        }
                    </h1>

                    <p className="mt-3 text-center text-sm text-text-muted">
                        {step === 1
                            ?
                            "Enter your email and we'll send you a secure OTP."
                            :
                            "We sent a 6 digit OTP to your email."
                        }
                    </p>

                </div>

                {
                    step === 1 ?
                        <form
                            onSubmit={sendOTP}
                            className="glass-card glow-purple space-y-6 rounded-3xl p-8"
                        >

                            <label className="text-sm text-text-muted">
                                Email Address
                            </label>

                            <div className="relative">
                                <Mail
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
                                />

                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 text-white outline-none focus:border-violet-500"
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                loading={loading}
                                disabled={loading}
                            >
                                Send OTP
                            </Button>
                        </form>
                        :
                        <form
                            onSubmit={verifyOtpHandler}
                            className="glass-card glow-purple space-y-6 rounded-3xl p-8"
                        >
                            <ShieldCheck
                                className="mx-auto text-violet-400"
                                size={45}
                            />
                            <input
                                maxLength={6}
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="Enter 6 digit OTP"
                                className="w-full rounded-xl border border-white/10 bg-white/5 py-3 text-center text-2xl tracking-[10px] text-white outline-none focus:border-violet-500"
                            />

                            <div className="text-center text-sm text-violet-400">
                                OTP expires in {formatTime()}
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={loading || seconds === 0}
                                loading={loading}
                            >
                                Verify OTP
                            </Button>

                            <p className="text-center text-xs text-text-muted">
                                Didn't receive OTP?
                                <br />
                                Check your
                                <span className="text-violet-400">
                                    {" "}Spam/Junk folder
                                </span>
                            </p>
                        </form>
                }
            </motion.div>
        </PageTransition>
    );
}

export function ResetPassword() {

    const navigate = useNavigate();
    const location = useLocation();
    const { email, otp } = location.state || {};
    const [form, setForm] = useState({
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (form.password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        try {
            setLoading(true);
            await resetPassword({
                email,
                otp,
                password: form.password,
            });

            toast.success(
                "Password updated successfully"
            );

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Password reset failed"
            );
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <PageTransition className="relative flex min-h-screen items-center justify-center bg-background px-4">
            <AnimatedBackground />

            <div className="absolute left-6 top-6 z-20">
                <Button
                    variant="ghost"
                    onClick={() => navigate("/login")}
                >
                    ← Back to Login
                </Button>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="relative w-full max-w-md"
            >
                <div className="mb-8 flex flex-col items-center">
                    <Link
                        to="/"
                        className="mb-6 flex items-center gap-3"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 shadow-lg shadow-violet-600/30">
                            <LockKeyhole
                                size={24}
                                className="text-white"
                            />
                        </div>
                        <span className="text-2xl font-bold text-white">
                            CodeLens
                        </span>
                    </Link>

                    <h1 className="text-3xl font-bold text-white">
                        Reset Password
                    </h1>

                    <p className="mt-3 text-center text-sm text-text-muted">
                        Create a new secure password for your account.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="glass-card glow-purple space-y-5 rounded-3xl p-8"
                >
                    <div>
                        <label className="mb-2 block text-sm text-text-muted">
                            New Password
                        </label>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                required
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Enter new password"
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-12 text-white outline-none focus:border-violet-500"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted"
                            >
                                {
                                    showPassword
                                        ?
                                        <EyeOff size={18} />
                                        :
                                        <Eye size={18} />
                                }
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-text-muted">
                            Confirm Password
                        </label>

                        <div className="relative">
                            <input
                                type={showConfirm ? "text" : "password"}
                                name="confirmPassword"
                                required
                                value={form.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm password"
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-12 text-white outline-none focus:border-violet-500"
                            />

                            <button
                                type="button"
                                onClick={() => setShowConfirm(!showConfirm)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted"
                            >

                                {
                                    showConfirm
                                        ?
                                        <EyeOff size={18} />
                                        :
                                        <Eye size={18} />
                                }
                            </button>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        loading={loading}
                        disabled={loading}
                    >
                        Update Password
                    </Button>

                    <p className="text-center text-xs text-text-muted">
                        Your password should be strong and unique.
                    </p>
                </form>
            </motion.div>
        </PageTransition>
    );
}