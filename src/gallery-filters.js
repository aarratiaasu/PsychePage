import Litepicker from 'litepicker';
import 'litepicker/dist/css/litepicker.css';
import $ from 'jquery'; // Assuming jQuery is available globally or via import

// Assuming Psyche object and updateGallery function are available globally or imported
// If not, this needs adjustment.
// declare global {
//   const Psyche: {
//     updateGallery: (params: URLSearchParams) => void;
//   };
//   const $: JQueryStatic;
// }


export function initGalleryFilters() {
    const archiveGallery = $('section.archive-gallery');
    if (!archiveGallery.length) {
        return; // Exit if the gallery section isn't present
    }

    const fromDateEl = archiveGallery.find("#from-date")[0];
    const toDateEl = archiveGallery.find("#to-date")[0];
    const filterSelect = archiveGallery.find(".filter-select");
    const resetFiltersBtn = archiveGallery.find(".reset-filters");
    const galleryFiltersToggle = archiveGallery.find(".gallery-filters-toggle");

    if (!fromDateEl || !toDateEl) {
        console.warn("Litepicker target elements not found for gallery filters.");
        return;
    }

    let urlParams = new URLSearchParams(window.location.search);

    // --- Litepicker Instances ---
    const fromPicker = new Litepicker({
        element: fromDateEl,
        startDate: urlParams.get("from") || null, // Get initial date from URL or null
        format: 'YYYY-MM-DD', // Explicitly set format if needed by v2
        setup: (picker) => {
            picker.on('selected', (date1, date2) => {
                // Litepicker v2 returns DateTime objects or null
                if (!date1) return;
                const selectedDate = date1.toJSDate().toISOString().split("T")[0];
                urlParams.set("from", selectedDate);
                urlParams.delete("pg");
                if (typeof Psyche !== 'undefined' && Psyche.updateGallery) {
                    Psyche.updateGallery(urlParams);
                } else {
                    console.error("Psyche.updateGallery function not found.");
                }
            });
        }
    });

    const toPicker = new Litepicker({
        element: toDateEl,
        startDate: urlParams.get("to") || null, // Get initial date from URL or null
        format: 'YYYY-MM-DD', // Explicitly set format if needed by v2
        setup: (picker) => {
            picker.on('selected', (date1, date2) => {
                 // Litepicker v2 returns DateTime objects or null
                if (!date1) return;
                const selectedDate = date1.toJSDate().toISOString().split("T")[0];
                urlParams.set("to", selectedDate);
                urlParams.delete("pg");
                 if (typeof Psyche !== 'undefined' && Psyche.updateGallery) {
                    Psyche.updateGallery(urlParams);
                } else {
                    console.error("Psyche.updateGallery function not found.");
                }
            });
        }
    });

    // --- Event Listeners (Copied logic structure) ---

    // Toggle Filters Visibility
    galleryFiltersToggle.on("click", function () {
        if (archiveGallery.hasClass("active")) {
            urlParams.delete("filters");
            archiveGallery.removeClass("active");
        } else {
            urlParams.set("filters", '1'); // Use '1' or similar string value
            archiveGallery.addClass("active");
        }
        const newUrl = window.location.pathname + "?" + urlParams.toString();
        window.history.pushState({}, document.title, newUrl);
    });

    // Sort Select
    $(".sort-select select").on("change", function () {
        urlParams.set("sort", $(this).val());
        urlParams.delete("pg");
        if (typeof Psyche !== 'undefined' && Psyche.updateGallery) {
            Psyche.updateGallery(urlParams);
        }
    });

    // Limit Select
    $(".limit-select select").on("change", function () {
        urlParams.set("limit", $(this).val());
        urlParams.delete("pg");
        if (typeof Psyche !== 'undefined' && Psyche.updateGallery) {
            Psyche.updateGallery(urlParams);
        }
    });

    // Filter Select (Category/Phase etc.)
    filterSelect.on("change", function () {
        const name = $(this).attr("name");
        const value = $(this).find("option:selected").attr("value");
        if (name && value) {
             urlParams.set(name, value);
        } else if (name) {
            urlParams.delete(name); // Handle case where selection is cleared
        }
        urlParams.delete("pg");
        if (typeof Psyche !== 'undefined' && Psyche.updateGallery) {
            Psyche.updateGallery(urlParams);
        }
    });

    // Pagination Links
    archiveGallery.on("click", ".gallery-pagination a", function (e) {
        e.preventDefault();
        if (!$(this).hasClass("disabled")) {
            urlParams = new URLSearchParams(this.href.split("?")[1]);
             if (typeof Psyche !== 'undefined' && Psyche.updateGallery) {
                Psyche.updateGallery(urlParams);
            }
        }
    });

    // Pagination Input
    archiveGallery.on("change", ".gallery-pagination input", function () {
        urlParams.set("pg", $(this).val());
         if (typeof Psyche !== 'undefined' && Psyche.updateGallery) {
            Psyche.updateGallery(urlParams);
        }
    });


    // Reset Button
    resetFiltersBtn.on("click", function () {
        fromPicker.clearSelection();
        urlParams.delete("from");
        toPicker.clearSelection();
        urlParams.delete("to");
        filterSelect.val(""); // Reset select dropdowns
        urlParams.delete("filter"); // Assuming 'filter' is a param name
        urlParams.delete("phase");  // Assuming 'phase' is a param name
        // Add other params to delete if necessary
         if (typeof Psyche !== 'undefined' && Psyche.updateGallery) {
            Psyche.updateGallery(urlParams);
        }
    });

    // Initial resize logic (simplified)
    // Consider using a more robust resize handler if needed
    const resizeHandler = () => {
         const filtersWrap = $(".gallery-filters-wrap");
         filtersWrap.css("min-height", 0);
         if (window.matchMedia("(min-width: 992px)").matches) {
             const filtersHeight = $(".gallery-filters")[0]?.scrollHeight + "px";
             if (filtersHeight) {
                filtersWrap.css("min-height", filtersHeight);
             }
         }
    };
    // Using throttle might require importing a library like lodash/throttle
    // For simplicity, using a basic timeout debouncer here
    let resizeTimeout;
    $(window).on("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(resizeHandler, 250); // Debounce resize
    }).trigger("resize"); // Trigger once on load
}

// Example: Call the function if the specific section exists on the page
// $(function() { // jQuery document ready
//     if ($('section.archive-gallery').length) {
//         initGalleryFilters();
//     }
// });
