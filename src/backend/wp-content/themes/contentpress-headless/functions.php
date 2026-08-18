<?php
/**
 * ContentPress Headless Theme Functions
 */

// 1. Enforce Headless Security & Redirects
add_action('template_redirect', function() {
    // If the request is for the WP REST API or GraphQL, allow it
    if (is_admin() || (defined('REST_REQUEST') && REST_REQUEST) || (defined('GRAPHQL_REQUEST') && GRAPHQL_REQUEST)) {
        return;
    }
    
    // Otherwise, redirect to Next.js
    $frontend_url = 'https://contentpress-demo.duckdns.org';
    $request_uri = $_SERVER['REQUEST_URI'];
    wp_redirect($frontend_url . $request_uri, 301);
    exit;
});

// 2. Headless Gutenberg Optimizations
add_action('after_setup_theme', 'contentpress_headless_setup');
function contentpress_headless_setup() {
    // Enable support for Gutenberg wide/full alignments
    add_theme_support('align-wide');
    
    // Disable custom colors to force editors to use the Tailwind theme colors
    add_theme_support('disable-custom-colors');
    
    // Disable custom font sizes to force editors to use Tailwind typography scales
    add_theme_support('disable-custom-font-sizes');
    
    // Enable featured images for pages and custom post types
    add_theme_support('post-thumbnails');
}

// 3. Register Custom Block Patterns (Optional free alternative to ACF components)
// This allows you to create predefined layouts (like a Hero section) natively in Gutenberg
add_action('init', 'contentpress_register_patterns');
function contentpress_register_patterns() {
    register_block_pattern(
        'contentpress/hero',
        array(
            'title'       => __('Hero Section', 'contentpress'),
            'description' => _x('A large hero section with heading and button.', 'Block pattern description', 'contentpress'),
            'content'     => '<!-- wp:group {"align":"full","layout":{"type":"constrained"}} -->
                              <div class="wp-block-group alignfull"><!-- wp:heading {"textAlign":"center","level":1} -->
                              <h1 class="wp-block-heading has-text-align-center">Your Catchy Headline Here</h1>
                              <!-- /wp:heading -->
                              <!-- wp:paragraph {"align":"center"} -->
                              <p class="has-text-align-center">A strong supporting subtitle that explains your value proposition.</p>
                              <!-- /wp:paragraph -->
                              <!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
                              <div class="wp-block-buttons"><!-- wp:button -->
                              <div class="wp-block-button"><a class="wp-block-button__link wp-element-button">Get Started</a></div>
                              <!-- /wp:button --></div>
                              <!-- /wp:buttons --></div>
                              <!-- /wp:group -->',
        )
    );
}
?>
