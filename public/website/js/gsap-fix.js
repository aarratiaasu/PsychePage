/**
 * GSAP Target Fix
 * This script fixes the "GSAP target not found" errors by providing fallback elements
 * or suppressing the errors when the targets don't exist.
 */
(function() {
    // Wait for GSAP and jQuery to be loaded
    window.addEventListener('load', function() {
        // Make sure GSAP and jQuery are available
        if (typeof gsap === 'undefined' || typeof jQuery === 'undefined') {
            console.log('GSAP or jQuery not loaded, skipping fixes');
            return;
        }

        // Create a backup of the original GSAP error handler
        const originalGSAPError = gsap.config().onError;

        // Override GSAP error handler to suppress specific errors
        gsap.config({
            onError: function(message) {
                // Check if it's a "target not found" error
                if (message && message.indexOf('GSAP target') !== -1 && message.indexOf('not found') !== -1) {
                    // Log a more friendly message
                    console.log('GSAP target warning (suppressed):', message);
                    return; // Suppress the error
                }
                
                // For other errors, use the original handler
                if (originalGSAPError) {
                    originalGSAPError.apply(this, arguments);
                } else {
                    console.error(message);
                }
            }
        });

        // Fix for "header .logo .divider" target
        if (typeof Psyche !== 'undefined' && Psyche.init_header) {
            const originalInitHeader = Psyche.init_header;
            Psyche.init_header = function() {
                // Create the missing elements if they don't exist
                if ($('header .logo .divider').length === 0) {
                    $('header .logo').append('<div class="divider" style="display:none;"></div>');
                }
                
                // Call the original function
                return originalInitHeader.apply(this, arguments);
            };
        }

        // Fix for content_with_image issues
        if (typeof Psyche !== 'undefined' && Psyche.init_content_with_image) {
            const originalInitContent = Psyche.init_content_with_image;
            Psyche.init_content_with_image = function() {
                try {
                    return originalInitContent.apply(this, arguments);
                } catch (e) {
                    console.log('Suppressed error in content_with_image:', e.message);
                    return false;
                }
            };
        }

        console.log('GSAP fixes applied');
    });
})();
