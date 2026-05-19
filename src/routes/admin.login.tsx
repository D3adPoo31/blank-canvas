import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/login")({
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    navigate({ to: "/admin" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100 px-6">
      <div className="bg-white border border-stone-200 p-10 w-full max-w-md">
        <Link to="/" className="font-display font-extrabold text-xl text-emerald-900 block mb-8">
          Adubo<span className="text-amber-600">.</span>Amazônico
        </Link>
        <h1 className="font-display text-2xl font-bold text-stone-900 mb-6">Acesso administrativo</h1>
        <form onSubmit={submit} className="space-y-5">
          <input type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border-b border-stone-300 bg-transparent py-3 focus:border-emerald-900 focus:outline-none" />
          <input type="password" required placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border-b border-stone-300 bg-transparent py-3 focus:border-emerald-900 focus:outline-none" />
          <button type="submit" disabled={loading} className="w-full bg-emerald-900 hover:bg-emerald-800 text-white font-semibold py-3 disabled:opacity-50">
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
