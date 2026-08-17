// Single shared password-strength check used by every code path that sets
// or rotates an admin credential's secret (seedAdmin.ts, rotateAdminPassword.ts).
// Keeping this in one place means the policy can only drift by editing here.
export function assertStrongPassword(password: string) {
  if (password.length < 12) {
    throw new Error("Password must be at least 12 characters.");
  }
}
