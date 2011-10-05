(function($, undefined) {
    /**
    * @name kendo.ui.DatePicker.Description
    *
    * @section
    *   <p>
    *       The DatePicker widget allows to the end user to select a date from a graphical calendar.
    *       It supports custom templates for "month" view, configurable options for min and max date,
    *       start view and the depth of the navigation.
    *   </p>
    *
    *   <h3>Getting Started</h3>
    *
    * @exampleTitle Creating a DatePicker from existing INPUT element
    * @example
    * <!-- HTML -->
    * <input id="datepicker"/>
    *
    * @exampleTitle DatePicker initialization
    * @example
    *   $(document).ready(function(){
    *      $("#datepicker").kendoDatePicker();
    *   });
    * @section
    *  <p>
    *      When a DatePicker is initialized, it will automatically be displayed near the
    *      location of the used HTML element.
    *  </p>
    *  <h3>Configuring DatePicker behaviors</h3>
    *  <p>
    *      DatePicker provides configuration options that can be easily set during initialization.
    *      Among the properties that can be controlled:
    *  </p>
    *  <ul>
    *      <li>Selected date</li>
    *      <li>Minimum/Maximum date</li>
    *      <li>Define format</li>
    *      <li>Start view</li>
    *      <li>Define the navigation depth (last view to which end user can navigate)</li>
    *  </ul>
    * @exampleTitle Create DatePicker with selected date and defined min and max date
    * @example
    *  $("#datepicker").kendoDatePicker({
    *      value: new Date(),
    *      min: new Date(1950, 0, 1),
    *      max: new Date(2049, 11, 31)
    *  });
    *  @section
    * <p>
    *   DatePicker will set the value only if the entered date is valid and if it is in the defined range
    * </p>
    * @section
    * <h3>Define start view and navigation depth</h3>
    * <p>
    *    The first rendered view can be defined with "startView" option. Navigation depth
    *    can be controlled with "depth" option. Predefined views are:
    *    <ul>
    *       <li>"month" - shows the days from the month</li>
    *       <li>"year" - shows the months of the year</li>
    *       <li>"decade" - shows the years from the decade</li>
    *       <li>"century" - shows the decades from the century</li>
    *    </ul>
    * </p>
    *
    * @exampleTitle Create Month picker
    * @example
    *  $("#calendar").kendoDatePicker({
    *      startView: "year",
    *      depth: "year"
    *  });
    *
    */

    var kendo = window.kendo,
    ui = kendo.ui,
    Component = ui.Component,
    parse = kendo.parseDate,
    keys = kendo.keys,
    DIV = "<div />",
    CLICK = "click",
    OPEN = "open",
    CLOSE = "close",
    CHANGE = "change",
    NAVIGATE = "navigate",
    DATEVIEW = "dateView",
    SELECTED = "k-state-selected",
    MOUSEDOWN = (kendo.support.touch ? "touchstart" : "mousedown"),
    cal = kendo.calendar,
    isInRange = cal.isInRange,
    restrictValue = cal.restrictValue,
    proxy = $.proxy,
    DATE = Date,
    calendar;

    var DateView = function(options) {
        var that = this,
            body = document.body;

        if (!calendar) {
            calendar = new ui.Calendar($(DIV).hide().appendTo(body));
        }

        that.calendar = calendar;
        that.options = options = options || {};
        that.popup = new ui.Popup($(DIV).appendTo(body), options);

        that.value(options.value);
    }

    DateView.prototype = {
        _initCalendar: function() {
            var that = this,
                popup = that.popup,
                options = that.options,
                calendar = that.calendar,
                element = calendar.element;

            if (element.data(DATEVIEW) !== that) {

                element.show()
                       .appendTo(popup.element)
                       .data(DATEVIEW, that)
                       .bind(CLICK, proxy(that._click, that))
                       .unbind(MOUSEDOWN)
                       .bind(MOUSEDOWN, options.clearBlurTimeout);

                calendar.options.min = options.min;
                calendar.options.max = options.max;
                calendar.options.depth = options.depth;
                calendar.options.startView = options.startView;
                calendar._currentView = options.startView;

                calendar.unbind(CHANGE)
                        .unbind(NAVIGATE)
                        .bind(NAVIGATE, proxy(that._navigate, that))
                        .bind(CHANGE, options);

                that.value(that._value);
            }
        },

        open: function() {
            var that = this;

            that._initCalendar();
            that.popup.open();
        },

        close: function() {
            this.popup.close();
        },

        toggle: function() {
            var that = this;

            if (that.popup.visible()) {
                that.close();
            } else {
                that.open();
            }
        },

        navigate: function(e) {
            var that = this,
                options = that.options,
                min = options.min,
                max = options.max,
                viewedValue = new DATE(that._viewedValue),
                calendar = that.calendar,
                viewName = calendar._currentView,
                view = calendar._view,
                key = e.keyCode,
                dateString, value, prevent;

            if (keys.ESC == key) {
                that.close();
                return;
            }

            if (e.ctrlKey) {
                if (keys.RIGHT == key) {
                    calendar.navigateToFuture();
                    prevent = true;
                } else if (keys.LEFT == key) {
                    calendar.navigateToPast();
                    prevent = true;
                } else if (keys.UP == key) {
                    calendar.navigateUp();
                    prevent = true;
                } else if (keys.DOWN == key) {
                    that._navigateDown();
                    prevent = true;
                }
            } else {
                if (keys.RIGHT == key) {
                    value = 1;
                    prevent = true;
                } else if (keys.LEFT == key) {
                    value = -1;
                    prevent = true;
                } else if (keys.UP == key) {
                    value = viewName === "month" ? -7 : -4;
                    prevent = true;
                } else if (keys.DOWN == key) {
                    value = viewName === "month" ? 7 : 4;
                    prevent = true;
                } else if (keys.ENTER == key) {
                    prevent = true;
                    that._navigateDown();
                } else if (keys.HOME == key) {
                    prevent = true;
                    that._viewedValue = viewedValue = restrictValue(view.first(viewedValue), options.min, options.max);
                    calendar._focus(viewedValue);
                } else if (keys.END == key) {
                    prevent = true;
                    that._viewedValue = viewedValue = restrictValue(view.last(viewedValue), options.min, options.max);
                    calendar._focus(viewedValue);
                } else if (keys.PAGEUP == key) {
                    calendar.navigateToPast();
                } else if (keys.PAGEDOWN == key) {
                    calendar.navigateToFuture();
                }

                if (prevent) {
                    e.preventDefault();
                }

                if (value) {
                    view.setDate(viewedValue, value);
                    that._viewedValue = viewedValue = restrictValue(viewedValue, options.min, options.max);
                    calendar._focus(viewedValue);
                }
            }
        },

        value: function(value) {
            var that = this,
                calendar = that.calendar,
                options = that.options;

            that._value = value;
            that._viewedValue = new DATE(restrictValue(value, options.min, options.max));

            if (calendar.element.data(DATEVIEW) === that) {
                calendar._focus(that._viewedValue);
                calendar.value(value);
            }
        },

        _click: function(e) {
            if (e.currentTarget.className.indexOf(SELECTED) !== -1) {
                this.close();
            }
        },

        _navigate: function() {
            var that = this,
                calendar = that.calendar;

            that._viewedValue = new DATE(calendar._viewedValue);
            calendar._focus(calendar._viewedValue);
        },

        _navigateDown: function() {
            var that = this,
                calendar = that.calendar,
                viewedValue = calendar._viewedValue,
                cell = calendar._table.find(".k-state-focused"),
                value = new Date(cell.children(":first").data("value"));

            if (!cell[0] || cell.hasClass(SELECTED)) {
                that.close();
                return;
            }

            calendar._view.setDate(viewedValue, value);
            calendar.navigateDown(viewedValue);
        }
    }

    kendo.DateView = DateView;

    var DatePicker = Component.extend(/** @lends kendo.ui.DatePicker.prototype */{
        /**
         * @constructs
         * @extends kendo.ui.Component
         * @param {DomElement} element DOM element
         * @param {Object} options Configuration options.
         * @option {Date} [value] <null> Specifies the selected date.
         * @option {Date} [min] <Date(1900, 0, 1)> Specifies the minimum date, which the calendar can show.
         * @option {Date} [max] <Date(2099, 11, 31)> Specifies the maximum date, which the calendar can show.
         * @option {String} [format] <MM/dd/yyyy> Specifies the format, which is used to parse value set with value() method.
         * @option {String} [startView] <month> Specifies the start view.
         * @option {String} [depth] Specifies the navigation depth.
         */
        init: function(element, options) {
            var that = this,
                dateView;

            Component.fn.init.call(that, element, options);
            options = that.options;

            options.format = options.format || kendo.culture().calendar.patterns["d"];

            that._wrapper();

            that.dateView = dateView = new DateView($.extend({}, options, {
                anchor: that.wrapper,
                change: function() {
                    that._valid = true;
                    that.value(dateView.calendar.value());
                    that.trigger(CHANGE);
                    that.close();
                },
                clearBlurTimeout: proxy(that._clearBlurTimeout, that)
            }));

            that._icon();

            that.element
                .addClass("k-input")
                .bind({
                    keydown: proxy(that._keydown, that),
                    blur: proxy(that._blur, that)
                });

            /**
            * Fires when the selected date is changed
            * @name kendo.ui.DatePicker#change
            * @event
            * @param {Event} e
            */
            /**
            * Fires when the calendar is opened
            * @name kendo.ui.DatePicker#open
            * @event
            * @param {Event} e
            */
            /**
            * Fires when the calendar is closed
            * @name kendo.ui.DatePicker#close
            * @event
            * @param {Event} e
            */
            that.bind(CHANGE, options);

            that._valid = true;
            that.value(options.value || that.element.val());
        },

        options: {
            value: null,
            min: new Date(1900, 0, 1),
            max: new Date(2099, 11, 31),
            format: kendo.culture().calendar.patterns.d,
            startView: "month",
            depth: "month"
        },

        /**
        * Opens the calendar.
        * @name kendo.ui.DatePicker#open
        * @function
        * @example
        * datepicker.open();
        */
        open: function() {
            this.dateView.open();
        },

        /**
        * Closes the calendar.
        * @name kendo.ui.DatePicker#close
        * @function
        * @example
        * datepicker.close();
        */
        close: function() {
            this.dateView.close();
        },

        /**
        * Gets/Sets the value of the datepicker.
        * @param {Date|String} value The value to set.
        * @returns {Date} The value of the datepicker.
        * @example
        * var datepicker = $("#datepicker").data("kendoDatePicker");
        *
        * // get the value of the datepicker.
        * var value = datepicker.value();
        *
        * // set the value of the datepicker.
        * combobox.value("10/10/2000"); //parse "10/10/2000" date and selects it in the calendar.
        */
        value: function(value) {
            var that = this,
                options = that.options;

            if (value === undefined) {
                return that._value;
            }

            value = parse(value, that.options.format);

            if (!isInRange(value, options.min, options.max)) {
                value = null;
            }

            that._value = value;
            that.dateView.value(value);

            if (that._valid) {
                that.element.val(kendo.toString(value, that.options.format));
            }

            that._valid = true;
        },

        _blur: function() {
            var that = this,
                value = that._value;

            that._bluring = setTimeout(function() {
                that._change(value);
                that.close();
            }, 100);
        },

        _clearBlurTimeout: function() {
            var that = this;
            setTimeout(function() {
                clearTimeout(that._bluring);
                that.element.focus();
            });
        },

        _change: function(value) {
            var that = this,
                options = that.options;

            value = parse(value, options.format);

            if (value && !isInRange(value, options.min, options.max)) {
                value = null;
            }

            that._valid = value !== null;

            if (+value != +that._value) {
                that.value(value);

                that.trigger(CHANGE);

                // trigger the DOM change event so any subscriber gets notified
                that.element.trigger(CHANGE);
            }
        },

        _keydown: function(e) {
            var that = this,
                key = e.keyCode,
                dateView = that.dateView;

            if (e.altKey) {
                if (keys.DOWN == key) {
                    that.open();
                    e.preventDefault();
                } else if (keys.UP == key) {
                    that.close();
                    e.preventDefault();
                }
            } else {
                if (dateView.popup.visible()) {
                    dateView.navigate(e);
                } else if (keys.ENTER == key) {
                    that._change(e.currentTarget.value);
                }
            }
        },

        _icon: function() {
            var that = this,
                element = that.element,
                icon;

            icon = element.next("span.k-select");

            if (!icon[0]) {
                icon = $('<span class="k-select k-header"><span class="k-icon k-icon-calendar">select</span></span>').insertAfter(element);
            }

            icon.bind(CLICK, proxy(that.dateView.toggle, that.dateView))
                .bind(MOUSEDOWN, proxy(that._clearBlurTimeout, that));
        },

        _wrapper: function() {
            var that = this,
                element = that.element,
                wrapper;

            wrapper = element.parents(".k-datepicker");

            if (!wrapper[0]) {
                wrapper = element.wrap(DIV).parent().addClass("k-picker-wrap k-state-default");
                wrapper = wrapper.wrap(DIV).parent();
            }

            wrapper[0].style.cssText = element[0].style.cssText;
            that.wrapper = wrapper.addClass("k-widget k-datepicker k-header");
        }
    });

    ui.plugin("DatePicker", DatePicker);

})(jQuery);
