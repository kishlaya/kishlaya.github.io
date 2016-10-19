$(document).ready(function() {
    $(window).on('mousewheel', function(event) {
        if($('body').hasClass('intro'))
            event.preventDefault();
    });
    $('#intro-wrapper').gyro3D();

    $(document).click(function() {
        if($('body').hasClass('intro')) {
            $('body').removeClass('intro');
            $('#intro-wrapper').fadeOut(function() {
                $('.container').delay(100).fadeIn('slow');
            });
        }
    });

    $('li[role="details"]').click(function(e) {
        $(this).children('a').toggleClass('active');
        $(this).children('p').fadeToggle();
        e.preventDefault();
    });
});