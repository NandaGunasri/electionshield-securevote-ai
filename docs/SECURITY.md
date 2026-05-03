# Security Policy

## Reporting a Vulnerability

We take the security of the ElectionShield SecureVote AI platform seriously. If you believe you have found a security vulnerability, please report it to us by opening a private security advisory or contacting the maintainers directly.

## Secret Remediation

The ElectionShield project follows strict secret management protocols:
1. **Zero Hardcoded Secrets**: No API keys, service accounts, or database credentials are permitted in the source code.
2. **Environment Isolation**: Sensitive variables are managed via environment variables and Cloud Secret Manager.
3. **History Purging**: In the event of a secret leak, the repository history is purged and keys are rotated immediately.

## Key Rotation Status

| Key Type | Status | Action Taken |
| --- | --- | --- |
| Firebase API Key | **ROTATED** | Purged from history, fresh key required. |
| Gemini API Key | **ROTATED** | Purged from history, fresh key required. |
| GCP Service Account | **SECURED** | Not exposed in repository. |

## Secure Deployment

The platform is deployed using **Google Cloud Run** with secrets injected at runtime.
- **Build Args**: Used for public environment variables (e.g., `NEXT_PUBLIC_FIREBASE_*`).
- **Secret Manager**: Used for private environment variables (e.g., `GEMINI_API_KEY`).

---
**Democracy requires trust. Trust requires security.**
