;(function ( $, window, document, undefined ) {
    'use strict';

    var pluginName = 'gyro3D';
    var defaults = {
        mouseSensitivity: 0.01,
        gyroSensitivity: 0.5
    };

    function Plugin ( element, options ) {
        this._name = pluginName;
        this._defaults = defaults;
        this.options = $.extend( {}, defaults, options );
        this.element = element;
        this.$element = $(element);
        this.$background = this.$element.find('#intro-background'),
        this.$foreground = this.$element.find('#intro-foreground'),
        this.init();
    }

    $.extend(Plugin.prototype, {

        init: function () {
            var that = this;

            // Window resize
            $(window).resize( function() {
                that.centerX = Math.round(that.$element.width() / 2);
                that.centerY = Math.round(that.$element.height() / 2);
            })
            .resize();

            // Mousemove
            $(document).mousemove( function(event) {

                var targetX = (event.pageX - that.centerX) * that.options.mouseSensitivity;
                var targetY = -(event.pageY - that.centerY) * that.options.mouseSensitivity;

                that.do3D( targetX, targetY );
            });

            // Device orientation handler
            if ( window.DeviceOrientationEvent ) {

                window.addEventListener( 'deviceorientation', function(event) {
                    var targetX;
                    var targetY;

                    // Landscape
                    if ( Math.abs( window.orientation ) == 90 ) {
                        targetX = event.beta;
                        targetY = event.gamma;
                    // Portrait
                    } else {
                        targetX = event.gamma;
                        targetY = event.beta;
                    }

                    // Tilt Y axis a bit
                    targetY += ( window.orientation > 0 ? 30 : -30 );

                    // Gyroscope sensitivity
                    targetY *= that.options.gyroSensitivity;
                    targetX *= that.options.gyroSensitivity;

                    // Limits tilt
                    targetX = Math.max(Math.min(targetX, 30), -30);
                    targetY = Math.max(Math.min(targetY, 30), -30);

                    that.do3D( targetX, targetY );
                }, true);
            }
        },

        do3D: function ( targetX, targetY)  {
            this.$background.css({
                '-webkit-transform': 'perspective(300px) rotateY('+ targetX +'deg) rotateX('+ targetY +'deg)',
                '-moz-transform': 'perspective(300px) rotateY('+ targetX +'deg) rotateX('+ targetY +'deg)',
                transform: 'perspective(300px) rotateY('+ targetX +'deg) rotateX('+ targetY +'deg)'
            });
            this.$foreground.css({
                '-webkit-transform': 'perspective(300px) rotateY('+ targetX +'deg) rotateX('+ targetY +'deg) translateZ(1px)',
                '-moz-transform': 'perspective(300px) rotateY('+ targetX +'deg) rotateX('+ targetY +'deg) translateZ(1px)',
                transform: 'perspective(300px) rotateY('+ targetX +'deg) rotateX('+ targetY +'deg) translateZ(1px)'
            });
        }
    });

    $.fn[ pluginName ] = function ( options ) {
        this.each(function() {
            if ( !$.data( this, "plugin_" + pluginName ) ) {
                $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
            }
        });
        return this;
    };

})( jQuery, window, document );