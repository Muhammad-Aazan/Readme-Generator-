import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import api from '../services/api';
import { toast } from 'sonner';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post('/auth/forgot-password', { email });
      setSubmitted(true);
      toast.success('Reset email sent');
    } catch (err) {
      toast.error('Could not send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0F17] px-4 text-slate-100">
      <div className="w-full max-w-md bg-dark-surface border border-dark-border rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Reset Password</h2>
          <p className="text-xs text-slate-400 mt-1">
            Enter your account email to receive recovery instructions.
          </p>
        </div>

        {submitted ? (
          <div className="p-4 bg-purple-950/20 border border-purple-500/20 rounded-xl text-center space-y-4">
            <p className="text-xs text-purple-200">
              If an account with that email exists, we have sent instructions to reset your password.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-1 text-xs font-semibold text-purple-400 hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Account Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="developer@example.com"
                  className="w-full bg-dark-card border border-dark-border rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:border-purple-500 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-md shadow-purple-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <span>Sending link...</span> : <span>Send Reset Instructions</span>}
            </button>

            <div className="text-center pt-2">
              <Link to="/login" className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white">
                <ArrowLeft className="w-3.5 h-3.5" /> Return to Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
