"use client";

import { useEffect, useState, FormEvent } from "react";
import Link from "next/link";

interface User {
    id: number;
    name: string;
}

interface SessionData {
    id: number;
    name: string;
    email: string;
    role: string;
}

export default function Home() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");

    const [newName, setNewName] = useState<string>("");
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingName, setEditingName] = useState<string>("");
    const [searchId, setSearchId] = useState<string>("");
    const [searchedUser, setSearchedUser] = useState<User | null>(null);

    const [session, setSession] = useState<SessionData | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("crud_session");
            if (saved) {
                try {
                    setSession(JSON.parse(saved));
                } catch {
                    localStorage.removeItem("crud_session");
                }
            }
        }
        fetchUsers();
    }, []);

    async function fetchUsers() {
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/user", { cache: "no-store" });
            const data = await res.json();
            if (!res.ok || data.message !== "OK") {
                setError(data.error || "Não foi possível carregar os usuários.");
            } else {
                setUsers(Array.isArray(data.users) ? data.users : []);
            }
        } catch {
            setError("Falha de conexão com a API (/api/user). Verifique o banco de dados.");
        } finally {
            setLoading(false);
        }
    }

    async function handleCreateUser(e: FormEvent) {
        e.preventDefault();
        if (!newName.trim()) return;

        setSubmitting(true);
        setError("");
        setSuccess("");

        try {
            const res = await fetch("/api/user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: newName.trim() })
            });
            const data = await res.json();

            if (!res.ok || data.message !== "OK") {
                setError(data.error || "Erro ao criar usuário.");
            } else {
                setNewName("");
                setSuccess(`Usuário "${data.user.name}" cadastrado com sucesso (ID #${data.user.id}).`);
                await fetchUsers();
            }
        } catch {
            setError("Erro de rede ao tentar cadastrar usuário.");
        } finally {
            setSubmitting(false);
        }
    }

    async function handleUpdateUser(e: FormEvent) {
        e.preventDefault();
        if (editingId === null || !editingName.trim()) return;

        setSubmitting(true);
        setError("");
        setSuccess("");

        try {
            const res = await fetch("/api/user", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: editingId, name: editingName.trim() })
            });
            const data = await res.json();

            if (!res.ok || data.message !== "OK") {
                setError(data.error || "Erro ao atualizar usuário.");
            } else {
                setSuccess(`Usuário ID #${editingId} atualizado para "${data.user.name}".`);
                setEditingId(null);
                setEditingName("");
                await fetchUsers();
            }
        } catch {
            setError("Erro de rede ao tentar atualizar usuário.");
        } finally {
            setSubmitting(false);
        }
    }

    async function handleDeleteUser(id: number, name: string) {
        setSubmitting(true);
        setError("");
        setSuccess("");

        try {
            const res = await fetch("/api/user", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id })
            });
            const data = await res.json();

            if (!res.ok || data.message !== "OK") {
                setError(data.error || "Erro ao remover usuário.");
            } else {
                setSuccess(`Usuário "${name}" (ID #${id}) removido com sucesso.`);
                if (searchedUser?.id === id) {
                    setSearchedUser(null);
                }
                await fetchUsers();
            }
        } catch {
            setError("Erro de rede ao tentar excluir usuário.");
        } finally {
            setSubmitting(false);
        }
    }

    async function handleSearchById(e: FormEvent) {
        e.preventDefault();
        setSearchedUser(null);
        setError("");
        setSuccess("");

        const trimmed = searchId.trim();
        if (!trimmed) return;

        try {
            const res = await fetch(`/api/user?id=${encodeURIComponent(trimmed)}`, {
                cache: "no-store"
            });
            const data = await res.json();

            if (!res.ok || data.message !== "OK") {
                setError(data.error || "Usuário não localizado para o ID informado.");
            } else {
                setSearchedUser(data.user);
            }
        } catch {
            setError("Erro ao buscar usuário por ID.");
        }
    }

    async function handleLogout() {
        await fetch("/api/auth", { method: "DELETE" }).catch(() => {});
        if (typeof window !== "undefined") {
            localStorage.removeItem("crud_session");
        }
        setSession(null);
        setSuccess("Sessão encerrada com sucesso.");
    }

    return (
        <main className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10">
            <div className="max-w-5xl mx-auto space-y-8">
                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-2.5 py-0.5 text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full">
                                Next.js 14 App Router
                            </span>
                            <span className="px-2.5 py-0.5 text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
                                Prisma ORM + PostgreSQL
                            </span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-white">
                            CRUD API Handler — Gerenciamento de Usuários
                        </h1>
                        <p className="text-sm text-slate-400 mt-1">
                            Interface interativa conectada aos Route Handlers (<code className="text-indigo-400">/api/user</code>)
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        {session ? (
                            <div className="flex items-center gap-3 bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-xl">
                                <div className="text-right">
                                    <div className="text-xs font-semibold text-white">{session.name}</div>
                                    <div className="text-[11px] text-indigo-400">{session.role}</div>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-red-500/20 hover:text-red-300 text-xs font-medium text-slate-300 transition-colors"
                                >
                                    Sair
                                </button>
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors shadow-lg shadow-indigo-600/20"
                            >
                                Acessar Login
                            </Link>
                        )}
                    </div>
                </header>

                {/* Alertas */}
                {error && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm flex items-center justify-between">
                        <span>{error}</span>
                        <button onClick={() => setError("")} className="text-xs underline ml-4">
                            Fechar
                        </button>
                    </div>
                )}

                {success && (
                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-center justify-between">
                        <span>{success}</span>
                        <button onClick={() => setSuccess("")} className="text-xs underline ml-4">
                            Fechar
                        </button>
                    </div>
                )}

                {/* Formulários de Criação e Busca por ID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Cadastrar Usuário (POST) */}
                    <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
                        <h2 className="text-base font-bold text-white mb-1">
                            Novo Usuário <span className="text-xs font-mono text-emerald-400 ml-1">POST /api/user</span>
                        </h2>
                        <p className="text-xs text-slate-400 mb-4">
                            Adiciona um novo registro diretamente no PostgreSQL via Prisma.
                        </p>

                        <form onSubmit={handleCreateUser} className="flex gap-2">
                            <input
                                type="text"
                                required
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                placeholder="Ex: Gabriel Martins"
                                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
                            />
                            <button
                                type="submit"
                                disabled={submitting}
                                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold text-sm transition-colors"
                            >
                                Cadastrar
                            </button>
                        </form>
                    </section>

                    {/* Consultar por ID (GET ?id=) */}
                    <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
                        <h2 className="text-base font-bold text-white mb-1">
                            Buscar por ID <span className="text-xs font-mono text-sky-400 ml-1">GET /api/user?id=</span>
                        </h2>
                        <p className="text-xs text-slate-400 mb-4">
                            Testa o endpoint de busca individual por chave primária.
                        </p>

                        <form onSubmit={handleSearchById} className="flex gap-2">
                            <input
                                type="number"
                                min="1"
                                value={searchId}
                                onChange={(e) => setSearchId(e.target.value)}
                                placeholder="ID do usuário (ex: 1)"
                                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-sky-500"
                            />
                            <button
                                type="submit"
                                className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-sm transition-colors"
                            >
                                Buscar
                            </button>
                        </form>

                        {searchedUser && (
                            <div className="mt-4 p-3 rounded-xl bg-slate-950 border border-sky-500/30 flex items-center justify-between text-xs">
                                <div>
                                    <span className="text-slate-400">Resultado: </span>
                                    <strong className="text-white">#{searchedUser.id} — {searchedUser.name}</strong>
                                </div>
                                <button
                                    onClick={() => setSearchedUser(null)}
                                    className="text-slate-400 hover:text-white"
                                >
                                    Limpar
                                </button>
                            </div>
                        )}
                    </section>
                </div>

                {/* Modal/Barra de Edição (PUT) */}
                {editingId !== null && (
                    <section className="bg-indigo-950/30 border border-indigo-500/40 rounded-2xl p-6 shadow-lg">
                        <h2 className="text-base font-bold text-white mb-1">
                            Editando Usuário #{editingId}{" "}
                            <span className="text-xs font-mono text-amber-400 ml-1">PUT /api/user</span>
                        </h2>
                        <form onSubmit={handleUpdateUser} className="flex flex-col sm:flex-row gap-3 mt-3">
                            <input
                                type="text"
                                required
                                value={editingName}
                                onChange={(e) => setEditingName(e.target.value)}
                                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-indigo-500/50 text-white text-sm focus:outline-none"
                            />
                            <div className="flex gap-2">
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-sm transition-colors"
                                >
                                    Salvar Alteração
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditingId(null);
                                        setEditingName("");
                                    }}
                                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm transition-colors"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </section>
                )}

                {/* Listagem de Usuários (GET) */}
                <section className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                    <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-bold text-white">
                                Usuários Cadastrados{" "}
                                <span className="text-xs font-mono text-indigo-400 ml-2">GET /api/user</span>
                            </h2>
                            <p className="text-xs text-slate-400 mt-0.5">
                                Total de registros retornados: {users.length}
                            </p>
                        </div>
                        <button
                            onClick={fetchUsers}
                            disabled={loading}
                            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
                        >
                            {loading ? "Atualizando..." : "Recarregar Lista"}
                        </button>
                    </div>

                    {loading ? (
                        <div className="p-12 text-center text-sm text-slate-400">
                            Carregando registros do banco de dados...
                        </div>
                    ) : users.length === 0 ? (
                        <div className="p-12 text-center text-sm text-slate-400">
                            Nenhum usuário cadastrado até o momento. Utilize o formulário acima para criar o primeiro registro.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-800 bg-slate-950/60 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                                        <th className="py-3.5 px-6 w-24">ID</th>
                                        <th className="py-3.5 px-6">Nome do Usuário</th>
                                        <th className="py-3.5 px-6 text-right">Ações (PUT / DELETE)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800/70 text-sm">
                                    {users.map((u) => (
                                        <tr key={u.id} className="hover:bg-slate-800/30 transition-colors">
                                            <td className="py-3.5 px-6 font-mono text-xs text-indigo-400 font-semibold">
                                                #{u.id}
                                            </td>
                                            <td className="py-3.5 px-6 font-medium text-slate-100">
                                                {u.name}
                                            </td>
                                            <td className="py-3.5 px-6 text-right space-x-2">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setEditingId(u.id);
                                                        setEditingName(u.name);
                                                    }}
                                                    className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20 text-xs font-medium transition-colors"
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    type="button"
                                                    disabled={submitting}
                                                    onClick={() => handleDeleteUser(u.id, u.name)}
                                                    className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/20 text-xs font-medium transition-colors disabled:opacity-50"
                                                >
                                                    Excluir
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}
