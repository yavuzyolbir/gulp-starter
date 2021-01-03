window.FN = {};

// LAZY LOAD IMAGES
FN.lazyLoadImages = function () {
    var lazyLoadInstance = new LazyLoad();
}
FN.lazyLoadImages();


// ACCORDIONS
FN.accordions = function () {

    let accordionButtons = $(".accordion-button"),
        accordionPanels = $(".accordion-panel"),
        accordionBoxes = $(".accordion-box"),
        thisAccordion = null,
        isAccordionActive = false,
        nextAccordionPanel = null,
        nextPanelHeight = 0;

    $(accordionButtons).on("click", function () {

        accordionButtons = $(this).parents(".accordion").find(".accordion-button");
        accordionPanels = $(this).parents(".accordion").find(".accordion-panel");
        accordionBoxes = $(this).parents(".accordion").find(".accordion-box");
        thisAccordion = $(this).parents('.accordion-box')
        isAccordionActive = thisAccordion.hasClass('active');
        nextAccordionPanel = $(this).next('.accordion-panel');
        nextPanelHeight = nextAccordionPanel[0].scrollHeight;

        if (isAccordionActive != true) {
            accordionBoxes.removeClass("active");
            thisAccordion.addClass("active");
            accordionPanels.css("max-height", 0)
            nextAccordionPanel.css("max-height", nextPanelHeight)
        } else {
            accordionBoxes.removeClass("active");
            accordionPanels.css("max-height", 0);
        }
    });

}
FN.accordions();