const fs = require('fs');
const path = require('path');

/**
 * reCAPTCHA keys. On Vercel these variables exist but are blank, and Next.js only fills a
 * variable from .env when it is undefined, so the blank dashboard values shadowed the committed
 * keys and production shipped without reCAPTCHA (the order form failed on submit). Here any
 * blank key is filled from .env, then inlined at build so the API route gets the same value at
 * runtime. A non-blank value set in Vercel still takes precedence.
 */
const RECAPTCHA_KEYS = ['NEXT_PUBLIC_RECAPTCHA_SITE_KEY', 'RECAPTCHA_SECRET_KEY'];

function readDotEnv(file) {
  try {
    return Object.fromEntries(
      fs
        .readFileSync(path.join(__dirname, file), 'utf8')
        .split(/\r?\n/)
        .map((line) => line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/))
        .filter(Boolean)
        .map(([, key, value]) => [key, value.replace(/^(['"])(.*)\1$/, '$2')]),
    );
  } catch {
    return {};
  }
}

// Same precedence as Next.js: .env.local over .env.
const dotEnv = { ...readDotEnv('.env'), ...readDotEnv('.env.local') };

const env = {};
for (const key of RECAPTCHA_KEYS) {
  if (!process.env[key] && dotEnv[key]) process.env[key] = dotEnv[key];
  if (process.env[key]) env[key] = process.env[key];
}

/** @type {import('next').NextConfig} */
const nextConfig = { env };

module.exports = nextConfig;
