---
name: code-reviewer
description: Use when reviewing, auditing, or improving any generated or existing code. Checks for bugs, security issues, performance problems, and code quality before shipping or presenting to a client.
---

# Code Reviewer

## Use this skill when
- Reviewing AI-generated code before shipping to a client
- Auditing existing code for bugs or security vulnerabilities
- Improving code quality, readability, or performance
- Checking that environment variables and secrets are handled safely
- Verifying database queries are efficient and secure

## Do not use this skill when
- Just starting a new feature (review comes after building)
- Reviewing non-code documents or content

## Instructions

1. **Security Checklist** — Check every piece of code for:
   - [ ] No hardcoded API keys, passwords, or secrets in code
   - [ ] Environment variables used correctly (server-side secrets never exposed to client)
   - [ ] User input sanitized before database insertion
   - [ ] SQL queries using parameterized statements (Supabase handles this)
   - [ ] Auth checks in place before sensitive data access
   - [ ] RLS enabled on all Supabase tables

2. **Performance Checklist**:
   - [ ] No unnecessary re-renders in React (use memo, useCallback where needed)
   - [ ] Database queries fetch only needed columns (avoid `select('*')` in production)
   - [ ] Images optimized (Next.js Image component used)
   - [ ] No blocking operations in the main thread
   - [ ] API routes handle errors gracefully with try/catch

3. **Code Quality Checklist**:
   - [ ] Functions do one thing (single responsibility)
   - [ ] No duplicate code — extract repeated logic into utilities
   - [ ] Consistent naming (camelCase for variables, PascalCase for components)
   - [ ] TypeScript types defined, no `any` usage
   - [ ] Loading and error states handled in UI

4. **Client-Ready Checklist** (before delivering to a paying client):
   - [ ] All hardcoded test data removed
   - [ ] Console.log statements removed
   - [ ] Form validation in place (required fields, email format, etc.)
   - [ ] 404 and error pages exist
   - [ ] Mobile responsiveness verified
   - [ ] Favicon and page title set correctly

5. **Output Format**: When reviewing code, provide:
   - A summary verdict: ✅ Ready to ship / ⚠️ Needs minor fixes / 🚫 Has critical issues
   - A numbered list of specific issues found with line references
   - Fixed code snippets for each issue
   - A final cleaned version if changes are minor

## Examples

**User**: "Review this lead capture form before I send it to the client"
**Agent Action**: Checks form validation, Supabase insert security, error handling, loading states, mobile layout, and returns verdict with specific fixes.

**User**: "Check my Stripe webhook handler for security issues"
**Agent Action**: Verifies webhook signature validation, error handling, idempotency, environment variable usage, and Supabase update logic.
