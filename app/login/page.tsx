"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  signUp,
  signInWithPassword,
  signInWithOGoogle,
} from "../../lib/auth";

interface FormData {
  email: string;
  password: string;
}

export default function AuthPage() {
// eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [mode, setMode] = useState<"login" | "register">("login");
  const [formData, setFormData] = useState<FormData>({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === "register") {
        const [data, authError] = await signUp(
          formData.email,
          formData.password
        );

        if (authError && typeof authError === 'object' && 'message' in authError) {
          setError(authError.message || "Error en el registro");
          return;
        }

        if (data && typeof data === 'object' && 'user' in data) {
          router.replace("/");
        }
      } else {
        const [data, authError] = await signInWithPassword(
          formData.email,
          formData.password
        );

        if (authError && typeof authError === 'object' && 'message' in authError) {
          setError(authError.message || "Credenciales incorrectas");
          return;
        }

        router.replace("/");
      }
    } catch (err) {
      setError("Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);

    try {
      const [data, authError] = await signInWithOGoogle();

      if (authError && typeof authError === 'object' && 'message' in authError) {
        setError(authError.message || "Error en el inicio de sesión con Google");
        return;
      }

      if (data && typeof data === 'object' && 'url' in data && data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      setError("Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background px-4 py-12 flex items-center justify-center">
      <div className="w-full max-w-md space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground text-center">
            {mode === "login" ? "Iniciar sesión" : "Crear cuenta"}
          </h2>
          <p className="text-sm text-muted-foreground text-center">
            {mode === "login"
              ? "Bienvenido de nuevo"
              : "Regístrate para continuar"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="ejemplo@email.com"
              required
              disabled={loading}
              className="w-full rounded border border-input bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Contraseña
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="••••••••"
              required
              disabled={loading}
              className="w-full rounded border border-input bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 transition-colors"
          >
            {loading
              ? "Procesando..."
              : mode === "login"
                ? "Ingresar"
                : "Crear cuenta"}
          </button>
        </form>

        <p className="text-center text-sm">
          <span className="underline cursor-pointer" onClick={() => setMode("login")}>
            ¿Ya tienes cuenta? Inicia sesión
          </span>
          {mode === "login" ? (
            <span className="underline cursor-pointer" onClick={() => setMode("register")}>
              Regístrate
            </span>
          ) : null}
        </p>
      </div>

      <div className="mt-6 w-full max-w-md">
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full rounded border-2 border-border bg-background py-2 text-sm font-medium hover:bg-accent focus:outline-none focus:ring-2 focus:ring-border focus:ring-offset-2 transition-colors"
        >
          {loading
            ? "Continuando con Google..."
            : "Continuar con Google"}
        </button>
      </div>
    </div>
  );
}