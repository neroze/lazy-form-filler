/*
	Copyright (c) 2015 Niraj Maharajn, nirajmaharjan.com.np
	
	Permission is hereby granted, free of charge, to any person obtaining
	a copy of this software and associated documentation files (the
	"Software"), to deal in the Software without restriction, including
	without limitation the rights to use, copy, modify, merge, publish,
	distribute, sublicense, and/or sell copies of the Software, and to
	permit persons to whom the Software is furnished to do so, subject to
	the following conditions:
	
	The above copyright notice and this permission notice shall be
	included in all copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
	LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
	OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
(function($){
    $.fn.extend({
        lazy_form_filler: function(_json, options) {
            this.defaultOptions = {
            	after:function(){

            	},
            	before:function(){

            	}
            };
            
            var settings = $.extend({}, this.defaultOptions, options);
            
            return this.each(function() {
                var _target = $(this);
                var filler = {};
               
                // before callback;
                settings.before();

				filler.updateSelect =function() {
					for (i in _json) {

						if (_json[i] != null) {
							var _target = $('select[name="' + i + '"]');
							if (_target.length > 0) {
								_target.val(_json[i]);
								settings.after();
							}
						}
					}
				}

				filler.updateInput = function() {
					for (i in _json) {

						if (_json[i] != null) {
							var _target = $('input[name="' + i + '"]');
							var _attr = _target.attr('type');
							var _textarea = $('textarea[name="' + i + '"]');

							if (_attr == "text") {
								_target.val(_json[i]);
							} else if (_attr == "radio"  || _attr == "checkbox" ) {
								_target.each(function(index, el) {
									var _val = $(this).val();
									if (_val == _json[i]) {
										$(this).trigger('click');
									}
								});
							} else if (_textarea.length) {
						                _textarea.val(_json[i]);
						            }

							settings.after();
						}

					}
				}

				// calling handlers;

				filler.updateSelect();
				filler.updateInput();
            });
        }
    });
})(jQuery);
