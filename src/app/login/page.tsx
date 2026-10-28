"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("admin@sistema.com");
    const [password, setPassword] = useState("password123");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (!res.ok || data.message !== "OK") {
                setError(data.error || "Falha ao autenticar no sistema.");
                setLoading(false);
                return;
            }

            if (typeof window !== "undefined") {
                localStorage.setItem("crud_session", JSON.stringify(data.session));
            }

            router.push("/");
            router.refresh();
        } catch {
            setError("Erro de conexão ao tentar realizar o login.");
            setLoading(false);
        }
    }

    function fillCredentials(demoEmail: string, demoPassword: string) {
        setEmail(demoEmail);
        setPassword(demoPassword);
        setError("");
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-6">
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-8">
                <div className="mb-6 text-center">
                    <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full mb-3">
                        Next.js 14 + Prisma ORM
                    </span>
                    <h1 className="text-2xl font-bold text-white">Acesso ao Painel CRUD</h1>
                    <p className="text-sm text-slate-400 mt-1">
                        Entre com as credenciais de teste para gerenciar usuários
                    </p>
                </div>

                {error && (
                    <div className="mb-5 p-3.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-1.5">
                            E-mail de Acesso
                        </label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@sistema.com"
                            className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500 text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-1.5">
                            Senha
                        </label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500 text-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2.5 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold text-sm transition-colors shadow-lg shadow-indigo-600/20"
                    >
                        {loading ? "Autenticando..." : "Entrar no Painel"}
                    </button>
                </form>

                <div className="mt-6 pt-6 border-t border-slate-800">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                        Credenciais Rápidas (Seeders)
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            type="button"
                            onClick={() => fillCredentials("admin@sistema.com", "password123")}
                            className="p-2.5 text-left rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 transition-colors"
                        >
                            <div className="text-xs font-bold text-indigo-400">Administrador</div>
                            <div className="text-[11px] text-slate-400 truncate">admin@sistema.com</div>
                        </button>
                        <button
                            type="button"
                            onClick={() => fillCredentials("usuario@sistema.com", "password123")}
                            className="p-2.5 text-left rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 transition-colors"
                        >
                            <div className="text-xs font-bold text-emerald-400">Operador</div>
                            <div className="text-[11px] text-slate-400 truncate">usuario@sistema.com</div>
                        </button>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <Link
                        href="/"
                        className="text-xs text-slate-400 hover:text-indigo-400 transition-colors"
                    >
                        ← Voltar diretamente para o Dashboard CRUD
                    </Link>
                </div>
            </div>
        </div>
    );
}
