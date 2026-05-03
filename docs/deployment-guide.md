# ElectionShield SecureVote AI - Deployment Guide

This guide provides the exact commands for a clean production deployment of the ElectionShield platform to Google Cloud Run.

## 1. Local Validation
Ensure your environment is clean and dependencies are correct.

```bash
# Clean install
npm ci

# Production build
npm run build

# Docker build (test locally)
# Replace [VARS] with your actual Firebase config values
docker build \
  --build-arg NEXT_PUBLIC_FIREBASE_API_KEY=[KEY] \
  --build-arg NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=[DOMAIN] \
  --build-arg NEXT_PUBLIC_FIREBASE_PROJECT_ID=[ID] \
  --build-arg NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=[BUCKET] \
  --build-arg NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=[ID] \
  --build-arg NEXT_PUBLIC_FIREBASE_APP_ID=[ID] \
  --build-arg NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=[ID] \
  -t electionshield-local .
```

## 2. GitHub Finalization
Push the sanitized codebase to your public repository.

```bash
git add .
git commit -m "chore: final production-grade security stabilization and documentation"
git push origin main
```

## 3. Cloud Build Execution
Submit the build to Google Cloud for remote image generation.

```bash
gcloud builds submit --tag gcr.io/promptwars-virtual-2-494909/electionshield-securevote-ai \
  --build-arg NEXT_PUBLIC_FIREBASE_API_KEY=[KEY] \
  --build-arg NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=[DOMAIN] \
  --build-arg NEXT_PUBLIC_FIREBASE_PROJECT_ID=[ID] \
  --build-arg NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=[BUCKET] \
  --build-arg NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=[ID] \
  --build-arg NEXT_PUBLIC_FIREBASE_APP_ID=[ID] \
  --build-arg NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=[ID] \
  .
```

## 4. Cloud Run Deployment
Deploy the container with secure runtime environment variables.

```bash
gcloud run deploy electionshield-securevote-ai \
  --image gcr.io/promptwars-virtual-2-494909/electionshield-securevote-ai \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars "GEMINI_API_KEY=[YOUR_GEMINI_KEY]" \
  --project promptwars-virtual-2-494909
```

## 5. Post-Deployment Verification
Verify the live service:
1. **Homepage**: Ensure the landing page loads without error.
2. **Auth**: Test Sign-in/Sign-up (Firebase).
3. **Chatbot**: Test "Shieldy" (Gemini).
4. **Dashboard**: Verify data visualization.

---
**Security Note**: Never include your `GEMINI_API_KEY` or `NEXT_PUBLIC_FIREBASE_API_KEY` in shell history. Use environment variables or a secure terminal session.
