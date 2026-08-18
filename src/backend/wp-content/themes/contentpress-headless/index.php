<?php
/**
 * Headless Theme Frontend Redirect
 * 
 * Since this is a Headless WordPress installation, the frontend is handled entirely by Next.js.
 * This file acts as a fallback redirect. If anyone tries to access the raw WordPress frontend,
 * they will be safely redirected to the Next.js frontend application.
 */

// Define the Next.js frontend URL (Update this if your domain changes)
$frontend_url = 'https://contentpress-demo.duckdns.org';

// Preserve the requested path
$request_uri = $_SERVER['REQUEST_URI'];

// Execute the 301 Permanent Redirect
wp_redirect($frontend_url . $request_uri, 301);
exit;
