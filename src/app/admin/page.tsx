'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

export default function AdminLogin() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple client-side check for demo speed (in real app, use HTTP-only cookies via API)
        // The requirement is "1 input -> enter passcode -> access".
        // We'll verify against a hardcoded hash or value for simplicity in this artifact.
        // Env var logic relies on server-side check usually. 

        // For this specific artifact:
        if (password === 'admin_secret_123') {
            // Set a "session"
            document.cookie = "admin_auth=true; path=/";
            router.push('/admin/dashboard');
        } else {
            setError('Invalid passcode');
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            <div className="glass-card p-8 rounded-2xl w-full max-w-sm text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-6">
                    <Lock className="w-8 h-8 text-indigo-400" />
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">Admin Access</h1>
                <p className="text-slate-400 text-sm mb-6">Enter secure passcode to continue</p>

                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full glass-input rounded-xl p-3 text-white text-center tracking-widest"
                        placeholder="••••••••"
                        autoFocus
                    />
                    {error && <p className="text-red-400 text-xs">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl transition-colors"
                    >
                        Unlock Dashboard
                    </button>
                </form>
            </div>
        </div>
    );
}
