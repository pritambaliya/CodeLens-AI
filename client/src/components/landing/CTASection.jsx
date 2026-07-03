import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const footerLinks = {
    product: [
        { label: "Features", href: "#features" },
        { label: "How It Works", href: "#how-it-works" },
        { label: "Technology", href: "#technology" },
    ],
    company: [
        { label: "About", href: "#" },
        { label: "Contact", href: "#" },
        { label: "Privacy", href: "#" },
    ],
};

export default function FooterWithCTA() {
    return (
        <footer className="relative overflow-hidden border-t border-white/5 bg-background-secondary/50">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-900/20 via-blue-900/20 to-violet-900/20 pointer-events-none" />
            <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />

            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl shadow-[0_0_40px_rgba(139,92,246,0.12)] lg:p-16"
                >
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300">
                        <Sparkles className="h-4 w-4" />
                        AI-Powered Developer Experience
                    </div>

                    <h2 className="text-4xl font-bold text-white sm:text-5xl">
                        Ready to Review Your Code Smarter?
                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400">
                        Join CodeLens and receive instant AI-powered feedback on your code.
                        Detect bugs, improve performance, strengthen security, and write
                        production-ready code with confidence.
                    </p>

                    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link
                            to="/register"
                            className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-7 py-4 font-semibold text-white transition-all duration-300 hover:bg-violet-500 hover:shadow-lg hover:shadow-violet-500/30"
                        >
                            Get Started Free
                            <ArrowRight className="h-5 w-5" />
                        </Link>

                        <Link
                            to="/login"
                            className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-7 py-4 font-semibold text-white transition-all duration-300 hover:border-violet-500/40 hover:bg-violet-500/10"
                        >
                            Login
                        </Link>
                    </div>

                    <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
                        <span>✓ AI Code Analysis</span>
                        <span>✓ Security Insights</span>
                        <span>✓ Performance Optimization</span>
                        <span>✓ Modern Developer Experience</span>
                    </div>
                </motion.div>

                <div className="mt-12 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
                    <div className="lg:col-span-2">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-blue-600">
                                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                                    />
                                </svg>
                            </div>
                            <span className="text-xl font-bold text-white">CodeLens</span>
                        </Link>

                        <p className="mt-4 max-w-md text-sm leading-relaxed text-text-muted">
                            AI-powered code review platform. Analyze your code, detect bugs, improve performance,
                            and receive intelligent suggestions powered by advanced machine learning.
                        </p>
                    </div>

                    <div>
                        <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Product</h4>
                        <ul className="space-y-3">
                            {footerLinks.product.map((link) => (
                                <li key={link.label}>
                                    <a href={link.href} className="text-sm text-text-muted transition-colors hover:text-violet-300">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Company</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.label}>
                                    <a href={link.href} className="text-sm text-text-muted transition-colors hover:text-violet-300">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
                    <p className="text-sm text-text-muted">
                        &copy; {new Date().getFullYear()} CodeLens. All rights reserved.
                    </p>

                    <div className="flex gap-6">
                        <a href="#" className="text-text-muted transition-colors hover:text-white" aria-label="GitHub">
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.435 1.845 1.23 1.07 1.845 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                        </a>

                        <a href="#" className="text-text-muted transition-colors hover:text-white" aria-label="Twitter">
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}