import AuthShell from "@/components/auth/AuthShell";
import SignInForm from "@/components/auth/SignInForm";

export default function SignInPage() {
  return (
    <AuthShell
      title="Welcome back"
      description="Sign in to continue planning your perfect wedding."
      footerText="Don't have an account?"
      footerLinkText="Create account"
      footerHref="/signup"
    >
      <SignInForm />
    </AuthShell>
  );
}