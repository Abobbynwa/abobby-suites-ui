import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Mail, ArrowLeft, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ForgotPassword = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate password reset request
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setLoading(false);
    setSubmitted(true);
    toast({
      title: "Email Sent!",
      description: "Check your inbox for password reset instructions.",
    });
  };

  return (
    <Layout>
      <section className="py-20 bg-secondary min-h-[80vh] flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="bg-card rounded-xl shadow-luxury p-8">
              {/* Back Link */}
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors mb-6"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Sign In
              </Link>

              {!submitted ? (
                <>
                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                      <Mail className="h-8 w-8 text-accent" />
                    </div>
                    <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
                      Forgot Password?
                    </h1>
                    <p className="text-muted-foreground">
                      No worries! Enter your email and we'll send you reset instructions.
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:border-accent"
                          required
                        />
                      </div>
                    </div>

                    <Button type="submit" variant="gold" size="xl" className="w-full" disabled={loading}>
                      {loading ? "Sending..." : "Send Reset Link"}
                    </Button>
                  </form>
                </>
              ) : (
                /* Success State */
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
                    Check Your Email
                  </h1>
                  <p className="text-muted-foreground mb-6">
                    We've sent password reset instructions to{" "}
                    <span className="font-medium text-foreground">{email}</span>
                  </p>
                  <p className="text-sm text-muted-foreground mb-6">
                    Didn't receive the email? Check your spam folder or{" "}
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="text-accent hover:underline"
                    >
                      try again
                    </button>
                  </p>
                  <Link to="/login">
                    <Button variant="outline" size="lg" className="w-full">
                      Back to Sign In
                    </Button>
                  </Link>
                </div>
              )}

              {/* Help Text */}
              {!submitted && (
                <p className="text-center text-sm text-muted-foreground mt-8">
                  Remember your password?{" "}
                  <Link to="/login" className="text-accent font-medium hover:underline">
                    Sign in
                  </Link>
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ForgotPassword;
