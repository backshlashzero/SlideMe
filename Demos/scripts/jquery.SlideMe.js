(function ($) {
    
    $.fn.SlideMe = function (settings, callback) {

        slideElement = $(this);
        
        // default global vars
        var config = {
            direction: 'left',
            changeSpeed: 500,
            slidewidth: 400,
            measurement: 0,
            slidestomove: 3,
            slidemargin: 3
        };

        // merge default global variables with custom variables, modifying 'config'
        if (settings) $.extend(config, settings);
        config.measurement = (config.slidewidth + config.slidemargin) * config.slidestomove;
        
        var wraper = slideElement.parent();
        var noOfSlides = slideElement.children().length;
        slideElement.css("width", noOfSlides * (config.slidewidth));
        //wraper.addClass("slides");
        slideElement.each(function (i) {
            var measurement = config.measurement;

            var startStyle = {};
            startStyle['position'] = $(this).css('position') == 'static' ? 'relative' : $(this).css('position');
            startStyle['left'] = $(this).css('left') == 'auto' ? 0 : $(this).position().left;

            var endStyle = {};

            if (config.direction == 'left') {
                var condition = startStyle['left'] + slideElement.outerWidth() - (measurement + measurement / 2);        
                endStyle['left'] = condition < 0 ? startStyle['left'] : (startStyle['left'] - measurement) + '';
                
                
                if (slideElement.outerWidth() + endStyle['left'] == measurement) {
                    endStyle['left'] = endStyle['left'] - (measurement / 2);
                }
            }
            else {

                endStyle['left'] = startStyle['left'] >= 0 ? 0 : (startStyle['left'] + measurement) + '';
            }
            
            $(this).css(startStyle).animate(endStyle, config.changeSpeed, callback);

        });
    };
})(jQuery);