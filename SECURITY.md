# Security Policy

EasySorting is a static educational website. There is no server-side code, no
database, and no user accounts. The risk surface is small, but it is not zero.
This document explains how to report a vulnerability and what is in scope.

## Supported versions

The site is deployed continuously from its default branch. There are no
released version tags to patch, so all issues are handled on the latest
deployment.

## Reporting a vulnerability

Please do not open a public issue for a vulnerability. Report it privately by
one of these routes:

- Email the maintainer through the contact page:
  https://easysorting.netlify.app/contact
- Open a private GitHub advisory from the repository's Security tab, if
  available on this repository.

Please include:

- The URLs affected
- A description of the issue and the impact
- Steps to reproduce
- Any logs or screenshots that help triage

You will receive an acknowledgment within 3 business days. We aim to resolve
confirmed issues that are in scope within 14 days.

## What is in scope

- XSS or HTML injection through any page or query parameter
- Malicious JavaScript injected through third-party scripts or CDNs
- Incorrect security headers (see `_headers`)
- PWA/service worker misbehavior that exposes private data
- Broken outbound links or open redirects

## What is out of scope

- Dependencies served from CDNs that are patched upstream
- Deploy tooling or DNS on Netlify
- Brute force or availability attacks without a proven software flaw

## Security settings in place

- HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and
  Permissions-Policy headers are defined in `_headers`.
- The site uses immutable caching for images, CSS, and JS.
- No secrets, keys, or credentials are stored in the repository. If you find
  one, report it immediately.

## Position of trust

Anyone who registers on GitHub must follow the
[Code of Conduct](CODE_OF_CONDUCT.md). Report conduct issues through the same
contact route above.