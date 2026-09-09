import AuthShell from "@/components/auth/AuthShell";
import SignUpForm from "@/components/auth/SignUpForm";

export default function SignUpPage() {
  return (
    <AuthShell
      title="Create your account"
      description="Start your wedding planning journey with us."
      footerText="Already have an account?"
      footerLinkText="Sign in"
      footerHref="/signin"
    >
      <SignUpForm />
    </AuthShell>
  );
}