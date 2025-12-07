'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, TrendingUp, RefreshCw, ArrowLeft, Lightbulb, FileText, BarChart3, PieChart, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

// Lazy load Recharts (it can be heavy)
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface Review {
    id: string;
    rating: number;
    content: string;
    response: string;
    summary: string;
    action: string;
    date?: string;
    createdAt?: string;
}

export default function AdminDashboardReal() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Protect Route
    useEffect(() => {
        if (!document.cookie.includes('admin_auth=true')) {
            router.push('/admin');
        }
    }, [router]);

    const fetchReviews = async () => {
        try {
            const res = await fetch('/api/feedback');
            const data = await res.json();
            setReviews(data);
        } catch (error) {
            console.error('Failed to fetch reviews', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
        const interval = setInterval(fetchReviews, 5000);
        return () => clearInterval(interval);
    }, []);

    // Analytics Logic
    const averageRating = reviews.length
        ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
        : '0.0';

    const negativeCount = reviews.filter(r => r.rating <= 2).length;

    // Rating Distribution
    const distribution = [1, 2, 3, 4, 5].map(star => ({
        name: `${star} Star`,
        count: reviews.filter(r => r.rating === star).length
    }));

    const COLORS = ['#ef4444', '#f97316', '#eab308', '#84cc16', '#22c55e'];

    if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading Analytics...</div>;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 p-8">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                            <ArrowLeft className="w-5 h-5 text-slate-400" />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                                Analytics Hub
                            </h1>
                            <p className="text-slate-400 text-sm">Real-time Insights</p>
                        </div>
                    </div>
                    <button
                        onClick={() => { document.cookie = "admin_auth=; path=/; max-age=0"; router.push('/admin'); }}
                        className="text-sm text-slate-400 hover:text-white"
                    >
                        Log Out
                    </button>
                </div>

                {/* Analytics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="glass-card p-6 rounded-2xl relative overflow-hidden">
                        <p className="text-slate-400 font-medium mb-1">Average NPS</p>
                        <h2 className="text-4xl font-bold text-white">{averageRating}</h2>
                        <Star className="absolute top-4 right-4 w-12 h-12 text-yellow-500/20" />
                    </div>

                    <div className="glass-card p-6 rounded-2xl relative overflow-hidden">
                        <p className="text-slate-400 font-medium mb-1">Total Volume</p>
                        <h2 className="text-4xl font-bold text-white">{reviews.length}</h2>
                        <BarChart3 className="absolute top-4 right-4 w-12 h-12 text-indigo-500/20" />
                    </div>

                    <div className="glass-card p-6 rounded-2xl relative overflow-hidden">
                        <p className="text-slate-400 font-medium mb-1">Critical Issues</p>
                        <h2 className="text-4xl font-bold text-red-400">{negativeCount}</h2>
                        <ShieldAlert className="absolute top-4 right-4 w-12 h-12 text-red-500/20" />
                    </div>

                    <div className="glass-card p-4 rounded-2xl relative overflow-hidden flex items-center justify-center">
                        <div className="text-center">
                            <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">Prompt A Active</p>
                            <div className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full inline-block">
                                System Healthy
                            </div>
                        </div>
                    </div>
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 glass-card p-6 rounded-2xl min-h-[300px]">
                        <h3 className="text-lg font-semibold mb-6">Rating Distribution</h3>
                        <div className="h-[200px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={distribution}>
                                    <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                                        itemStyle={{ color: '#fff' }}
                                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                    />
                                    <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                                        {distribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="glass-card p-6 rounded-2xl">
                        <h3 className="text-lg font-semibold mb-4">AI Performance</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-slate-400">Response Latency</span>
                                    <span className="text-green-400">~1.2s</span>
                                </div>
                                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full w-[80%] bg-green-500 rounded-full" />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-slate-400">Sentiment Accuracy</span>
                                    <span className="text-indigo-400">94%</span>
                                </div>
                                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full w-[94%] bg-indigo-500 rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Feed */}
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-200">Live Feedback Stream</h3>

                    <div className="grid gap-4">
                        <AnimatePresence>
                            {reviews.map((review) => (
                                <motion.div
                                    key={review.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="glass-card p-6 rounded-2xl"
                                >
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <div className="flex-1 space-y-2">
                                            <div className="flex items-center justify-between">
                                                <div className="flex gap-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} className={cn("w-4 h-4", i < review.rating ? "fill-yellow-500 text-yellow-500" : "text-slate-700")} />
                                                    ))}
                                                </div>
                                                <span className="text-xs font-mono text-slate-500">{review.createdAt ? new Date(review.createdAt).toLocaleTimeString() : 'Just now'}</span>
                                            </div>
                                            <p className="text-slate-300">"{review.content}"</p>
                                        </div>

                                        <div className="flex-1 bg-white/5 rounded-xl p-4 border border-white/5 text-sm space-y-3">
                                            <div className="flex items-center gap-2 text-indigo-300">
                                                <Lightbulb className="w-4 h-4" />
                                                <span className="font-semibold">{review.summary}</span>
                                            </div>
                                            <div className="flex items-start gap-2 text-slate-400">
                                                <FileText className="w-4 h-4 mt-0.5 shrink-0" />
                                                <p>{review.action}</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {reviews.length === 0 && (
                            <div className="text-center py-12 text-slate-500">Waiting for data...</div>
                        )}
                    </div>
                </div>

                {/* AI RAG Chatbot */}
                <div className="glass-card p-6 rounded-2xl border-t-4 border-t-purple-500">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                        Ask Your Data
                    </h3>
                    <ChatInterface />
                </div>
            </div>
        </div>
    );
}

function ChatInterface() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<{ role: 'user' | 'ai', content: string }[]>([
        { role: 'ai', content: 'Hello! I am your AI Data Assistant. Ask me anything about your customer feedback.' }
    ]);
    const [loading, setLoading] = useState(false);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = input;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setLoading(true);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMsg })
            });
            const data = await res.json();
            setMessages(prev => [...prev, { role: 'ai', content: data.reply || "Sorry, I couldn't process that." }]);
        } catch (err) {
            setMessages(prev => [...prev, { role: 'ai', content: "Error connecting to AI." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="h-64 bg-black/20 rounded-xl p-4 overflow-y-auto space-y-4 custom-scrollbar">
                {messages.map((m, i) => (
                    <div key={i} className={cn("flex", m.role === 'user' ? 'justify-end' : 'justify-start')}>
                        <div className={cn(
                            "max-w-[80%] p-3 rounded-xl text-sm",
                            m.role === 'user' ? "bg-indigo-600 text-white" : "bg-white/10 text-slate-200"
                        )}>
                            {m.content}
                        </div>
                    </div>
                ))}
                {loading && <div className="text-slate-500 text-xs animate-pulse">AI is thinking...</div>}
            </div>
            <form onSubmit={handleSend} className="flex gap-2">
                <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="E.g., What are the main complaints about the UI?"
                    className="flex-1 glass-input rounded-xl p-3 text-sm text-white"
                />
                <button type="submit" disabled={loading} className="bg-purple-600 hover:bg-purple-500 px-6 rounded-xl font-medium transition-colors">
                    Ask
                </button>
            </form>
        </div>
    );
}
