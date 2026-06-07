import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import { supabase } from '@/lib/supabaseClient'

const AuthRecovery: React.FC = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const updatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setMessage(null)

    if (!password || !confirmPassword) {
      setError('Por favor completa ambos campos.')
      return
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.')
      return
    }

    setLoading(true)

    const { error: updateError } = await supabase.auth.updateUser({ password })

    if (updateError) {
      setError(updateError.message)
      setLoading(false)
      return
    }

    setMessage('Contraseña actualizada correctamente. Ahora puedes iniciar sesión con tu nueva contraseña.')
    setPassword('')
    setConfirmPassword('')
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <main className="pt-28 pb-16">
        <section className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto rounded-[2rem] border border-slate-200/80 bg-slate-50 p-8 shadow-2xl shadow-slate-900/10">
            <div className="text-center mb-8">
              <p className="text-sm uppercase tracking-[0.35em] text-amber-400">Actualizar contraseña</p>
              <h1 className="mt-4 text-4xl font-semibold text-slate-950">Recuperación de contraseña</h1>
              <p className="mt-3 text-base text-slate-600">
                Ingresa una nueva contraseña para tu cuenta.
              </p>
            </div>

            <form onSubmit={updatePassword} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-slate-700">Nueva contraseña</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-2 block w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-amber-300 focus:ring-2 focus:ring-amber-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700">Confirmar contraseña</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-2 block w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-amber-300 focus:ring-2 focus:ring-amber-200"
                    required
                  />
                </div>
              </div>

              {error && <div className="rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}
              {message && <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">{message}</div>}

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? 'Actualizando...' : 'Actualizar contraseña'}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-600">
              <Link to="/auth" className="font-semibold text-amber-500 hover:text-amber-600">
                Volver al inicio de sesión
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default AuthRecovery