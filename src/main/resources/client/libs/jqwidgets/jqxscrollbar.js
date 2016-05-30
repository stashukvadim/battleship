/*
 jQWidgets v2.5.0 (2012-Oct-17)
 Copyright (c) 2011-2012 jQWidgets.
 License: http://jqwidgets.com/license/
 */

(function (a) {
    a.jqx.jqxWidget("myWidget", "", {});
    a.extend(a.jqx._myWidget.prototype, {
        var1: 5, var2: 10, foo: function (b) {
            this.var1 *= b
        }, bar: function () {
            alert(this.var1)
        }, createInstance: function (b) {
        }
    });
    a.jqx.jqxWidget("jqxScrollBar", "", {});
    a.extend(a.jqx._jqxScrollBar.prototype, {
        defineInstance: function () {
            this.height = null;
            this.width = null;
            this.vertical = false;
            this.min = 0;
            this.max = 1000;
            this.value = this.min;
            this.step = 10;
            this.largestep = 50;
            this.thumbMinSize = 10;
            this.thumbSize = 0;
            this.roundedCorners = "all";
            this.showButtons = true;
            this.disabled = false;
            this.touchMode = "auto";
            this.touchModeStyle = "auto";
            this.thumbTouchSize = 8;
            this._triggervaluechanged = true
        }, createInstance: function (b) {
            this.render()
        }, render: function () {
            this._mouseup = new Date();
            var b = this;
            this.element.innerHTML = "";
            this.host.append("<div id='jqxScrollOuterWrap' style='width:100%; height: 100%; align:left; border: 0px; valign:top; position: relative;'><div id='jqxScrollWrap' style='width:100%; height: 100%; left: 0px; top: 0px; align:left; valign:top; position: absolute;'><div id='jqxScrollBtnUp' style='align:left; valign:top; left: 0px; top: 0px; position: absolute;'/><div id='jqxScrollAreaUp' style='align:left; valign:top; left: 0px; top: 0px; position: absolute;'/><div id='jqxScrollThumb' style='align:left; valign:top; left: 0px; top: 0px; position: absolute;'/><div id='jqxScrollAreaDown' style='align:left; valign:top; left: 0px; top: 0px; position: absolute;'/><div id='jqxScrollBtnDown' style='align:left; valign:top; left: 0px; top: 0px; position: absolute;'/></div></div>");
            if (this.width != undefined && parseInt(this.width) > 0) {
                this.host.width(parseInt(this.width))
            }
            if (this.height != undefined && parseInt(this.height) > 0) {
                this.host.height(parseInt(this.height))
            }
            this.btnUp = this.host.find("#jqxScrollBtnUp");
            this.btnDown = this.host.find("#jqxScrollBtnDown");
            this.btnThumb = this.host.find("#jqxScrollThumb");
            this.areaUp = this.host.find("#jqxScrollAreaUp");
            this.arrowUp = a("<div></div>");
            this.arrowUp.appendTo(this.btnUp);
            this.arrowDown = a("<div></div>");
            this.arrowDown.appendTo(this.btnDown);
            this.areaDown = this.host.find("#jqxScrollAreaDown");
            this.scrollWrap = this.host.find("#jqxScrollWrap");
            this.scrollOuterWrap = this.host.find("#jqxScrollOuterWrap");
            this.btnUp[0].id = "jqxScrollBtnUp" + this.element.id;
            this.btnDown[0].id = "jqxScrollBtnDown" + this.element.id;
            this.btnThumb[0].id = "jqxScrollThumb" + this.element.id;
            this.areaUp[0].id = "jqxScrollAreaUp" + this.element.id;
            this.areaDown[0].id = "jqxScrollAreaDown" + this.element.id;
            this.scrollWrap[0].id = "jqxScrollWrap" + this.element.id;
            this.scrollOuterWrap[0].id = "jqxScrollOuterWrap" + this.element.id;
            if (!this.host.jqxRepeatButton) {
                alert("jqxbuttons.js is not loaded.");
                return
            }
            this.btnUp.jqxRepeatButton({overrideTheme: true, disabled: this.disabled});
            this.btnDown.jqxRepeatButton({overrideTheme: true, disabled: this.disabled});
            this.btnDownInstance = a.data(this.btnDown[0], "jqxRepeatButton").instance;
            this.btnUpInstance = a.data(this.btnUp[0], "jqxRepeatButton").instance;
            this.areaUp.jqxRepeatButton({overrideTheme: true, delay: 300});
            this.areaDown.jqxRepeatButton({overrideTheme: true, delay: 300});
            this.btnThumb.jqxButton({overrideTheme: true, disabled: this.disabled});
            this.propertyChangeMap.value = function (c, e, d, f) {
                if (!(isNaN(f))) {
                    if (d != f) {
                        c.setPosition(parseFloat(f), true)
                    }
                }
            };
            this.propertyChangeMap.width = function (c, e, d, f) {
                if (c.width != undefined && parseInt(c.width) > 0) {
                    c.host.width(parseInt(c.width));
                    c._arrange()
                }
            };
            this.propertyChangeMap.height = function (c, e, d, f) {
                if (c.height != undefined && parseInt(c.height) > 0) {
                    c.host.height(parseInt(c.height));
                    c._arrange()
                }
            };
            this.propertyChangeMap.theme = function (c, e, d, f) {
                c.setTheme()
            };
            this.propertyChangeMap.max = function (c, e, d, f) {
                if (!(isNaN(f))) {
                    if (d != f) {
                        c.max = parseInt(f);
                        if (c.min > c.max) {
                            c.max = c.min + 1
                        }
                        c._arrange();
                        c.setPosition(c.value)
                    }
                }
            };
            this.propertyChangeMap.min = function (c, e, d, f) {
                if (!(isNaN(f))) {
                    if (d != f) {
                        c.min = parseInt(f);
                        if (c.min > c.max) {
                            c.max = c.min + 1
                        }
                        c._arrange();
                        c.setPosition(c.value)
                    }
                }
            };
            this.propertyChangeMap.disabled = function (c, e, d, f) {
                if (d != f) {
                    if (f) {
                        c.host.addClass(c.toThemeProperty("jqx-fill-state-disabled"))
                    } else {
                        c.host.removeClass(c.toThemeProperty("jqx-fill-state-disabled"))
                    }
                    c.btnUp.jqxRepeatButton("disabled", c.disabled);
                    c.btnDown.jqxRepeatButton("disabled", c.disabled);
                    c.btnThumb.jqxButton("disabled", c.disabled)
                }
            };
            this.propertyChangeMap.touchMode = function (c, e, d, f) {
                if (d != f) {
                    c._updateTouchBehavior()
                }
            };
            this.buttonUpCapture = false;
            this.buttonDownCapture = false;
            this._updateTouchBehavior();
            this.setPosition(this.value);
            this._addHandlers();
            this.setTheme()
        }, _updateTouchBehavior: function () {
            this.isTouchDevice = a.jqx.mobile.isTouchDevice();
            if (this.touchMode == true) {
                this.isTouchDevice = true;
                a.jqx.mobile.setMobileSimulator(this.btnThumb[0]);
                this._removeHandlers();
                this._addHandlers();
                this.setTheme()
            } else {
                if (this.touchMode == false) {
                    this.isTouchDevice = false
                }
            }
        }, _addHandlers: function () {
            var d = this;
            if (d.isTouchDevice) {
                this.addHandler(this.btnThumb, "touchend", function (g) {
                    var h = d.vertical ? d.toThemeProperty("jqx-scrollbar-thumb-state-pressed") : d.toThemeProperty("jqx-scrollbar-thumb-state-pressed-horizontal");
                    var i = d.toThemeProperty("jqx-fill-state-pressed");
                    d.btnThumb.removeClass(h);
                    d.btnThumb.removeClass(i);
                    if (!d.disabled) {
                        d.handlemouseup(d, g)
                    }
                });
                this.addHandler(this.btnThumb, "touchstart", function (g) {
                    if (!d.disabled) {
                        if (d.touchMode == true) {
                            g.clientX = g.originalEvent.clientX;
                            g.clientY = g.originalEvent.clientY
                        } else {
                            var h = g;
                            if (h.originalEvent.touches && h.originalEvent.touches.length) {
                                g.clientX = h.originalEvent.touches[0].clientX;
                                g.clientY = h.originalEvent.touches[0].clientY
                            }
                        }
                        d.handlemousedown(g)
                    }
                });
                a.jqx.mobile.touchScroll(this.element, d.max, function (m, l, h, g, i) {
                    if (d.host.css("visibility") == "visible") {
                        if (d.touchMode == true) {
                            i.clientX = i.originalEvent.clientX;
                            i.clientY = i.originalEvent.clientY
                        } else {
                            var k = i;
                            if (k.originalEvent.touches && k.originalEvent.touches.length) {
                                i.clientX = k.originalEvent.touches[0].clientX;
                                i.clientY = k.originalEvent.touches[0].clientY
                            }
                        }
                        var j = d.vertical ? d.toThemeProperty("jqx-scrollbar-thumb-state-pressed") : d.toThemeProperty("jqx-scrollbar-thumb-state-pressed-horizontal");
                        d.btnThumb.addClass(j);
                        d.btnThumb.addClass(d.toThemeProperty("jqx-fill-state-pressed"));
                        d.handlemousemove(i)
                    }
                })
            }
            this.addHandler(this.btnUp, "click", function (g) {
                if (d.buttonUpCapture && !d.isTouchDevice) {
                    if (!d.disabled) {
                        d.setPosition(d.value - d.step)
                    }
                } else {
                    if (!d.disabled && d.isTouchDevice) {
                        d.setPosition(d.value - d.step)
                    }
                }
            });
            this.addHandler(this.btnDown, "click", function (g) {
                if (d.buttonDownCapture && !d.isTouchDevice) {
                    if (!d.disabled) {
                        d.setPosition(d.value + d.step)
                    }
                } else {
                    if (!d.disabled && d.isTouchDevice) {
                        d.setPosition(d.value + d.step)
                    }
                }
            });
            if (!this.isTouchDevice) {
                if (document.referrer != "" || window.frameElement) {
                    if (window.top != null && window.top != window.self) {
                        if (window.parent && document.referrer) {
                            parentLocation = document.referrer
                        }
                        if (parentLocation.indexOf(document.location.host) != -1) {
                            var e = function (g) {
                                if (!d.disabled) {
                                    d.handlemouseup(d, g)
                                }
                            };
                            if (window.top.document.addEventListener) {
                                window.top.document.addEventListener("mouseup", e, false)
                            } else {
                                if (window.top.document.attachEvent) {
                                    window.top.document.attachEvent("onmouseup", e)
                                }
                            }
                        }
                    }
                }
                this.addHandler(this.btnDown, "mouseup", function (g) {
                    if (!d.btnDownInstance.base.disabled && d.buttonDownCapture) {
                        d.buttonDownCapture = false;
                        d.btnDown.removeClass(d.toThemeProperty("jqx-scrollbar-button-state-pressed"));
                        d.btnDown.removeClass(d.toThemeProperty("jqx-fill-state-pressed"));
                        d._removeArrowClasses("pressed", "down");
                        d.handlemouseup(d, g);
                        d.setPosition(d.value + d.step);
                        return false
                    }
                });
                this.addHandler(this.btnUp, "mouseup", function (g) {
                    if (!d.btnUpInstance.base.disabled && d.buttonUpCapture) {
                        d.buttonUpCapture = false;
                        d.btnUp.removeClass(d.toThemeProperty("jqx-scrollbar-button-state-pressed"));
                        d.btnUp.removeClass(d.toThemeProperty("jqx-fill-state-pressed"));
                        d._removeArrowClasses("pressed", "up");
                        d.handlemouseup(d, g);
                        d.setPosition(d.value - d.step);
                        return false
                    }
                });
                this.addHandler(this.btnDown, "mousedown", function (g) {
                    if (!d.btnDownInstance.base.disabled) {
                        d.buttonDownCapture = true;
                        d.btnDown.addClass(d.toThemeProperty("jqx-fill-state-pressed"));
                        d.btnDown.addClass(d.toThemeProperty("jqx-scrollbar-button-state-pressed"));
                        d._addArrowClasses("pressed", "down");
                        return false
                    }
                });
                this.addHandler(this.btnUp, "mousedown", function (g) {
                    if (!d.btnUpInstance.base.disabled) {
                        d.buttonUpCapture = true;
                        d.btnUp.addClass(d.toThemeProperty("jqx-fill-state-pressed"));
                        d.btnUp.addClass(d.toThemeProperty("jqx-scrollbar-button-state-pressed"));
                        d._addArrowClasses("pressed", "up");
                        return false
                    }
                })
            }
            var c = "click";
            if (this.isTouchDevice) {
                c = "touchend"
            }
            this.addHandler(this.areaUp, c, function (g) {
                if (!d.disabled) {
                    d.setPosition(d.value - d.largestep);
                    return false
                }
            });
            this.addHandler(this.areaDown, c, function (g) {
                if (!d.disabled) {
                    d.setPosition(d.value + d.largestep);
                    return false
                }
            });
            this.addHandler(this.areaUp, "mousedown", function (g) {
                if (!d.disabled) {
                    return false
                }
            });
            this.addHandler(this.areaDown, "mousedown", function (g) {
                if (!d.disabled) {
                    return false
                }
            });
            this.addHandler(this.btnThumb, "mousedown", function (g) {
                if (!d.disabled) {
                    d.handlemousedown(g)
                }
                return false
            });
            this.addHandler(this.btnThumb, "dragstart", function (g) {
                return false
            });
            this.addHandler(a(document), "mouseup." + this.element.id, function (g) {
                if (!d.disabled) {
                    d.handlemouseup(d, g)
                }
            });
            if (!this.isTouchDevice) {
                var f = function (g) {
                    if (!d.disabled) {
                        d.handlemousemove(g)
                    }
                };
                this.addHandler(a(document), "mousemove." + this.element.id, f);
                this.addHandler(a(document), "mouseleave." + this.element.id, function (g) {
                    if (!d.disabled) {
                        d.handlemouseleave(g)
                    }
                });
                this.addHandler(a(document), "mouseenter." + this.element.id, function (g) {
                    if (!d.disabled) {
                        d.handlemouseenter(g)
                    }
                });
                if (!d.disabled) {
                    this.btnUp.hover(function () {
                        if (!d.disabled && !d.btnUpInstance.base.disabled && d.touchMode != true) {
                            d.btnUp.addClass(d.toThemeProperty("jqx-scrollbar-button-state-hover"));
                            d.btnUp.addClass(d.toThemeProperty("jqx-fill-state-hover"));
                            d._addArrowClasses("hover", "up")
                        }
                    }, function () {
                        if (!d.disabled && !d.btnUpInstance.base.disabled && d.touchMode != true) {
                            d.btnUp.removeClass(d.toThemeProperty("jqx-scrollbar-button-state-hover"));
                            d.btnUp.removeClass(d.toThemeProperty("jqx-fill-state-hover"));
                            d._removeArrowClasses("hover", "up")
                        }
                    });
                    var b = d.toThemeProperty("jqx-scrollbar-thumb-state-hover");
                    if (!d.vertical) {
                        b = d.toThemeProperty("jqx-scrollbar-thumb-state-hover-horizontal")
                    }
                    this.btnThumb.hover(function () {
                        if (!d.disabled && d.touchMode != true) {
                            d.btnThumb.addClass(b);
                            d.btnThumb.addClass(d.toThemeProperty("jqx-fill-state-hover"))
                        }
                    }, function () {
                        if (!d.disabled && d.touchMode != true) {
                            d.btnThumb.removeClass(b);
                            d.btnThumb.removeClass(d.toThemeProperty("jqx-fill-state-hover"))
                        }
                    });
                    this.btnDown.hover(function () {
                        if (!d.disabled && !d.btnDownInstance.base.disabled && d.touchMode != true) {
                            d.btnDown.addClass(d.toThemeProperty("jqx-scrollbar-button-state-hover"));
                            d.btnDown.addClass(d.toThemeProperty("jqx-fill-state-hover"));
                            d._addArrowClasses("hover", "down")
                        }
                    }, function () {
                        if (!d.disabled && !d.btnDownInstance.base.disabled && d.touchMode != true) {
                            d.btnDown.removeClass(d.toThemeProperty("jqx-scrollbar-button-state-hover"));
                            d.btnDown.removeClass(d.toThemeProperty("jqx-fill-state-hover"));
                            d._removeArrowClasses("hover", "down")
                        }
                    })
                }
            }
        }, destroy: function () {
            var b = this.btnUp;
            var f = this.btnDown;
            var d = this.btnThumb;
            var c = this.scrollWrap;
            var g = this.areaUp;
            var e = this.areaDown;
            e.removeClass();
            g.removeClass();
            f.removeClass();
            b.removeClass();
            d.removeClass();
            b.jqxRepeatButton("destroy");
            f.jqxRepeatButton("destroy");
            g.jqxRepeatButton("destroy");
            e.jqxRepeatButton("destroy");
            d.jqxButton("destroy");
            this._removeHandlers();
            this.host.removeClass();
            this.host.removeData();
            this.host.remove();
            this.host = null;
            this.btnUp = null;
            this.btnDown = null;
            this.scrollWrap = null;
            this.areaUp = null;
            this.areaDown = null
        }, _removeHandlers: function () {
            this.removeHandler(this.btnUp, "click");
            this.removeHandler(this.btnDown, "click");
            this.removeHandler(this.btnDown, "mouseup");
            this.removeHandler(this.btnUp, "mouseup");
            this.removeHandler(this.btnDown, "mousedown");
            this.removeHandler(this.btnUp, "mousedown");
            this.removeHandler(this.areaUp, "mousedown");
            this.removeHandler(this.areaDown, "mousedown");
            this.removeHandler(this.areaUp, "click");
            this.removeHandler(this.areaDown, "click");
            this.removeHandler(this.btnThumb, "mousedown");
            this.removeHandler(this.btnThumb, "dragstart");
            this.removeHandler(a(document), "mouseup." + this.element.id);
            this.removeHandler(a(document), "mousemove." + this.element.id);
            this.removeHandler(a(document), "mouseleave." + this.element.id);
            this.removeHandler(a(document), "mouseenter." + this.element.id);
            this.btnUp.unbind("hover");
            this.btnThumb.unbind("hover");
            this.btnDown.unbind("hover");
            var b = this
        }, _addArrowClasses: function (c, b) {
            if (c == "pressed") {
                c = "selected"
            }
            if (c != "") {
                c = "-" + c
            }
            if (this.vertical) {
                if (b == "up" || b == undefined) {
                    this.arrowUp.addClass(this.toThemeProperty("icon-arrow-up" + c))
                }
                if (b == "down" || b == undefined) {
                    this.arrowDown.addClass(this.toThemeProperty("icon-arrow-down" + c))
                }
            } else {
                if (b == "up" || b == undefined) {
                    this.arrowUp.addClass(this.toThemeProperty("icon-arrow-left" + c))
                }
                if (b == "down" || b == undefined) {
                    this.arrowDown.addClass(this.toThemeProperty("icon-arrow-right" + c))
                }
            }
        }, _removeArrowClasses: function (c, b) {
            if (c == "pressed") {
                c = "selected"
            }
            if (c != "") {
                c = "-" + c
            }
            if (this.vertical) {
                if (b == "up" || b == undefined) {
                    this.arrowUp.removeClass(this.toThemeProperty("icon-arrow-up" + c))
                }
                if (b == "down" || b == undefined) {
                    this.arrowDown.removeClass(this.toThemeProperty("icon-arrow-down" + c))
                }
            } else {
                if (b == "up" || b == undefined) {
                    this.arrowUp.removeClass(this.toThemeProperty("icon-arrow-left" + c))
                }
                if (b == "down" || b == undefined) {
                    this.arrowDown.removeClass(this.toThemeProperty("icon-arrow-right" + c))
                }
            }
        }, setTheme: function () {
            var o = this.btnUp;
            var m = this.btnDown;
            var p = this.btnThumb;
            var e = this.scrollWrap;
            var g = this.areaUp;
            var h = this.areaDown;
            var f = this.arrowUp;
            var i = this.arrowDown;
            this.scrollWrap[0].className = this.toThemeProperty("jqx-reset");
            this.scrollOuterWrap[0].className = this.toThemeProperty("jqx-reset");
            var k = this.toThemeProperty("jqx-reset");
            this.areaDown[0].className = k;
            this.areaUp[0].className = k;
            var d = this.toThemeProperty("jqx-scrollbar") + " " + this.toThemeProperty("jqx-widget") + " " + this.toThemeProperty("jqx-widget-content");
            this.element.className = d;
            m[0].className = this.toThemeProperty("jqx-scrollbar-button-state-normal");
            o[0].className = this.toThemeProperty("jqx-scrollbar-button-state-normal");
            var q = "";
            if (this.vertical) {
                f[0].className = k + " " + this.toThemeProperty("icon-arrow-up");
                i[0].className = k + " " + this.toThemeProperty("icon-arrow-down");
                q = this.toThemeProperty("jqx-scrollbar-thumb-state-normal")
            } else {
                f[0].className = k + " " + this.toThemeProperty("icon-arrow-left");
                i[0].className = k + " " + this.toThemeProperty("icon-arrow-right");
                q = this.toThemeProperty("jqx-scrollbar-thumb-state-normal-horizontal")
            }
            q += " " + this.toThemeProperty("jqx-fill-state-normal");
            p[0].className = q;
            if (this.disabled) {
                e.addClass(this.toThemeProperty("jqx-fill-state-disabled"));
                e.removeClass(this.toThemeProperty("jqx-scrollbar-state-normal"))
            } else {
                e.addClass(this.toThemeProperty("jqx-scrollbar-state-normal"));
                e.removeClass(this.toThemeProperty("jqx-fill-state-disabled"))
            }
            if (this.roundedCorners == "all") {
                if (this.vertical) {
                    var j = a.jqx.cssroundedcorners("top");
                    j = this.toThemeProperty(j);
                    o.addClass(j);
                    var c = a.jqx.cssroundedcorners("bottom");
                    c = this.toThemeProperty(c);
                    m.addClass(c)
                } else {
                    var n = a.jqx.cssroundedcorners("left");
                    n = this.toThemeProperty(n);
                    o.addClass(n);
                    var l = a.jqx.cssroundedcorners("right");
                    l = this.toThemeProperty(l);
                    m.addClass(l)
                }
            } else {
                var b = a.jqx.cssroundedcorners(this.roundedCorners);
                b = this.toThemeProperty(b);
                elBtnUp.addClass(b);
                elBtnDown.addClass(b)
            }
            var b = a.jqx.cssroundedcorners(this.roundedCorners);
            b = this.toThemeProperty(b);
            if (!p.hasClass(b)) {
                p.addClass(b)
            }
            if (this.isTouchDevice && this.touchModeStyle != false) {
                this.showButtons = false;
                p.addClass(this.toThemeProperty("jqx-scrollbar-thumb-state-normal-touch"))
            }
        }, isScrolling: function () {
            if (this.thumbCapture == undefined || this.buttonDownCapture == undefined || this.buttonUpCapture == undefined) {
                return false
            }
            return this.thumbCapture || this.buttonDownCapture || this.buttonUpCapture
        }, handlemousedown: function (c) {
            if (this.thumbCapture == undefined || this.thumbCapture == false) {
                this.thumbCapture = true;
                var b = this.btnThumb;
                if (b != null) {
                    b.addClass(this.toThemeProperty("jqx-fill-state-pressed"));
                    if (this.vertical) {
                        b.addClass(this.toThemeProperty("jqx-scrollbar-thumb-state-pressed"))
                    } else {
                        b.addClass(this.toThemeProperty("jqx-scrollbar-thumb-state-pressed-horizontal"))
                    }
                }
            }
            this.dragStartX = c.clientX;
            this.dragStartY = c.clientY;
            this.dragStartValue = this.value
        }, toggleHover: function (c, b) {
        }, refresh: function () {
            this._arrange()
        }, _setElementPosition: function (c, b, d) {
            if (!isNaN(b)) {
                if (parseInt(c[0].style.left) != parseInt(b)) {
                    c[0].style.left = b + "px"
                }
            }
            if (!isNaN(d)) {
                if (parseInt(c[0].style.top) != parseInt(d)) {
                    c[0].style.top = d + "px"
                }
            }
        }, _setElementTopPosition: function (b, c) {
            if (!isNaN(c)) {
                b[0].style.top = c + "px"
            }
        }, _setElementLeftPosition: function (c, b) {
            if (!isNaN(b)) {
                c[0].style.left = b + "px"
            }
        }, handlemouseleave: function (e) {
            var b = this.btnUp;
            var d = this.btnDown;
            b.removeClass(this.toThemeProperty("jqx-scrollbar-button-state-pressed"));
            d.removeClass(this.toThemeProperty("jqx-scrollbar-button-state-pressed"));
            this._removeArrowClasses("pressed");
            if (this.thumbCapture != true) {
                return
            }
            var c = this.btnThumb;
            var f = this.vertical ? this.toThemeProperty("jqx-scrollbar-thumb-state-pressed") : this.toThemeProperty("jqx-scrollbar-thumb-state-pressed-horizontal");
            c.removeClass(f);
            c.removeClass(this.toThemeProperty("jqx-fill-state-pressed"))
        }, handlemouseenter: function (e) {
            var b = this.btnUp;
            var d = this.btnDown;
            if (this.buttonUpCapture) {
                b.addClass(this.toThemeProperty("jqx-scrollbar-button-state-pressed"));
                b.addClass(this.toThemeProperty("jqx-fill-state-pressed"));
                this._addArrowClasses("pressed", "up")
            }
            if (this.buttonDownCapture) {
                d.addClass(this.toThemeProperty("jqx-scrollbar-button-state-pressed"));
                d.addClass(this.toThemeProperty("jqx-fill-state-pressed"));
                this._addArrowClasses("pressed", "down")
            }
            if (this.thumbCapture != true) {
                return
            }
            var c = this.btnThumb;
            if (this.vertical) {
                c.addClass(this.toThemeProperty("jqx-scrollbar-thumb-state-pressed"))
            } else {
                c.addClass(this.toThemeProperty("jqx-scrollbar-thumb-state-pressed-horizontal"))
            }
            c.addClass(this.toThemeProperty("jqx-fill-state-pressed"))
        }, handlemousemove: function (b) {
            var h = this.btnUp;
            var d = this.btnDown;
            var c = 0;
            if (d == null || h == null) {
                return
            }
            if (h != null && d != null && this.buttonDownCapture != undefined && this.buttonUpCapture != undefined) {
                if (this.buttonDownCapture && b.which == c) {
                    d.removeClass(this.toThemeProperty("jqx-scrollbar-button-state-pressed"));
                    d.removeClass(this.toThemeProperty("jqx-fill-state-pressed"));
                    this._removeArrowClasses("pressed", "down");
                    this.buttonDownCapture = false
                } else {
                    if (this.buttonUpCapture && b.which == c) {
                        h.removeClass(this.toThemeProperty("jqx-scrollbar-button-state-pressed"));
                        h.removeClass(this.toThemeProperty("jqx-fill-state-pressed"));
                        this._removeArrowClasses("pressed", "up");
                        this.buttonUpCapture = false
                    }
                }
            }
            if (this.thumbCapture != true) {
                return false
            }
            var j = this.btnThumb;
            if (b.which == c && !this.isTouchDevice) {
                this.thumbCapture = false;
                this._arrange();
                var i = this.vertical ? this.toThemeProperty("jqx-scrollbar-thumb-state-pressed") : this.toThemeProperty("jqx-scrollbar-thumb-state-pressed-horizontal");
                j.removeClass(i);
                j.removeClass(this.toThemeProperty("jqx-fill-state-pressed"));
                return true
            }
            if (b.preventDefault != undefined) {
                b.preventDefault()
            }
            if (b.originalEvent != null) {
                b.originalEvent.mouseHandled = true
            }
            if (b.stopPropagation != undefined) {
                b.stopPropagation()
            }
            var k = 0;
            try {
                if (!this.vertical) {
                    k = b.clientX - this.dragStartX
                } else {
                    k = b.clientY - this.dragStartY
                }
                var e = this._btnAndThumbSize;
                if (!this._btnAndThumbSize) {
                    e = (this.vertical) ? h.height() + d.height() + j.height() : h.width() + d.width() + j.width()
                }
                var f = (this.max - this.min) / (this.scrollBarSize - e);
                k *= f;
                this.setPosition(this.dragStartValue + k)
            } catch (g) {
                alert(g)
            }
            return false
        }, handlemouseup: function (d, h) {
            var c = false;
            try {
                d._mouseup = new Date()
            } catch (f) {
            }
            if (this.thumbCapture) {
                this.thumbCapture = false;
                var e = this.btnThumb;
                var i = this.vertical ? this.toThemeProperty("jqx-scrollbar-thumb-state-pressed") : this.toThemeProperty("jqx-scrollbar-thumb-state-pressed-horizontal");
                e.removeClass(i);
                e.removeClass(this.toThemeProperty("jqx-fill-state-pressed"));
                c = true
            }
            if (this.buttonUpCapture || this.buttonDownCapture) {
                var b = this.btnUp;
                var g = this.btnDown;
                this.buttonUpCapture = false;
                this.buttonDownCapture = false;
                b.removeClass(this.toThemeProperty("jqx-scrollbar-button-state-pressed"));
                g.removeClass(this.toThemeProperty("jqx-scrollbar-button-state-pressed"));
                b.removeClass(this.toThemeProperty("jqx-fill-state-pressed"));
                g.removeClass(this.toThemeProperty("jqx-fill-state-pressed"));
                this._removeArrowClasses("pressed");
                c = true
            }
            if (c) {
                if (h.preventDefault != undefined) {
                    h.preventDefault()
                }
                if (h.originalEvent != null) {
                    h.originalEvent.mouseHandled = true
                }
                if (h.stopPropagation != undefined) {
                    h.stopPropagation()
                }
            }
        }, setPosition: function (b, g) {
            var d = this.element;
            if (b == undefined || b == NaN) {
                b = this.min
            }
            if (b >= this.max) {
                b = this.max
            }
            if (b < this.min) {
                b = this.min
            }
            if (this.value !== b || g == true) {
                if (b == this.max) {
                    var c = new jQuery.Event("complete");
                    this.host.trigger(c)
                }
                var f = this.value;
                if (this._triggervaluechanged) {
                    var e = new jQuery.Event("valuechanged");
                    e.previousValue = this.value;
                    e.currentValue = b
                }
                this.value = b;
                this._positionelements();
                if (this._triggervaluechanged) {
                    this.host.trigger(e)
                }
                if (this.valuechanged) {
                    this.valuechanged({currentValue: this.value, previousvalue: f})
                }
            }
            return b
        }, _getThumbSize: function (b) {
            var d = this.max - this.min;
            var c = 0;
            if (d > 1) {
                c = (b / (d + b) * b)
            } else {
                if (d == 1) {
                    c = b
                }
            }
            if (this.thumbSize > 0) {
                c = this.thumbSize
            }
            if (c < this.thumbMinSize) {
                c = this.thumbMinSize
            }
            return Math.min(c, b)
        }, _positionelements: function () {
            var g = this.element;
            var n = this.areaUp;
            var e = this.areaDown;
            var h = this.btnUp;
            var f = this.btnDown;
            var o = this.btnThumb;
            var b = this.scrollWrap;
            var p = this._height ? this._height : this.host.height();
            var c = this._width ? this._width : this.host.width();
            var l = (!this.vertical) ? p : c;
            if (!this.showButtons) {
                l = 0
            }
            var m = (!this.vertical) ? c : p;
            this.scrollBarSize = m;
            var d = this._getThumbSize(m - 2 * l);
            d = Math.round(d);
            if (d < this.thumbMinSize) {
                d = this.thumbMinSize
            }
            if (p == NaN || p < 10) {
                p = 10
            }
            if (c == NaN || c < 10) {
                c = 10
            }
            l += 2;
            this.btnSize = l;
            var i = this._btnAndThumbSize;
            if (!this._btnAndThumbSize) {
                var i = (this.vertical) ? 2 * this.btnSize + o.outerHeight() : 2 * this.btnSize + o.outerWidth();
                i = Math.round(i)
            }
            var k = (m - i) / (this.max - this.min) * (this.value - this.min);
            k = Math.round(k);
            if (this.vertical) {
                var j = m - k - i;
                if (j < 0) {
                    j = 0
                }
                e[0].style.height = j + "px";
                n[0].style.height = k + "px";
                this._setElementTopPosition(n, l);
                this._setElementTopPosition(o, l + k);
                this._setElementTopPosition(e, l + k + d)
            } else {
                n[0].style.width = k + "px";
                e[0].style.width = m - k - i + "px";
                this._setElementLeftPosition(n, l);
                this._setElementLeftPosition(o, l + k);
                this._setElementLeftPosition(e, 2 + l + k + d)
            }
        }, _arrange: function () {
            var d = this.element;
            var g = this.areaUp;
            var q = this.areaDown;
            var c = this.btnUp;
            var k = this.btnDown;
            var r = this.btnThumb;
            var n = this.scrollWrap;
            var l = parseInt(this.element.style.height);
            var o = parseInt(this.element.style.width);
            if (isNaN(l)) {
                l = 0
            }
            if (isNaN(o)) {
                o = 0
            }
            this._width = o;
            this._height = l;
            var b = (!this.vertical) ? l : o;
            if (!this.showButtons) {
                b = 0
            }
            c[0].style.width = b + "px";
            c[0].style.height = b + "px";
            k[0].style.width = b + "px";
            k[0].style.height = b + "px";
            if (this.vertical) {
                n[0].style.width = o + 2 + "px"
            } else {
                n[0].style.height = l + 2 + "px"
            }
            this._setElementPosition(c, 0, 0);
            if (this.vertical) {
                this._setElementPosition(k, 0, l - k.outerHeight())
            } else {
                this._setElementPosition(k, o - k.outerWidth(), 0)
            }
            var e = (!this.vertical) ? o : l;
            this.scrollBarSize = e;
            var h = this._getThumbSize(e - 2 * b);
            h = Math.round(h);
            if (h < this.thumbMinSize) {
                h = this.thumbMinSize
            }
            var m = false;
            if (this.isTouchDevice && this.touchModeStyle != false) {
                m = true
            }
            if (!this.vertical) {
                r[0].style.width = h + "px";
                r[0].style.height = l + "px";
                if (m) {
                    r.css({height: this.thumbTouchSize + "px"});
                    r.css("margin-top", (this.host.height() - this.thumbTouchSize) / 2)
                }
            } else {
                r[0].style.width = o + "px";
                r[0].style.height = h + "px";
                if (m) {
                    r.css({width: this.thumbTouchSize + "px"});
                    r.css("margin-left", (this.host.width() - this.thumbTouchSize) / 2)
                }
            }
            if (l == NaN || l < 10) {
                l = 10
            }
            if (o == NaN || o < 10) {
                o = 10
            }
            b += 2;
            this.btnSize = b;
            var f = (this.vertical) ? 2 * this.btnSize + (2 + parseInt(r[0].style.height)) : 2 * this.btnSize + (2 + parseInt(r[0].style.width));
            f = Math.round(f);
            this._btnAndThumbSize = f;
            var t = (e - f) / (this.max - this.min) * (this.value - this.min);
            t = Math.round(t);
            if (t === -Infinity || t == Infinity) {
                t = 0
            }
            if (isNaN(t)) {
                t = 0
            }
            if (this.vertical) {
                var s = (e - t - f);
                if (s < 0) {
                    s = 0
                }
                q[0].style.height = s + "px";
                q[0].style.width = o + "px";
                g[0].style.height = t + "px";
                g[0].style.width = o + "px";
                var i = parseInt(this.host.height());
                r[0].style.visibility = "inherit";
                if (i - 3 * parseInt(b) < 0) {
                    r[0].style.visibility = "hidden"
                } else {
                    if (i < f) {
                        r[0].style.visibility = "hidden"
                    } else {
                        if (this.element.style.visibility == "visible") {
                            r[0].style.visibility = "inherit"
                        }
                    }
                }
                this._setElementPosition(g, 0, b);
                this._setElementPosition(r, 0, b + t);
                this._setElementPosition(q, 0, b + t + h)
            } else {
                g[0].style.width = t + "px";
                g[0].style.height = l + "px";
                var j = (e - t - f);
                if (j < 0) {
                    j = 0
                }
                q[0].style.width = j + "px";
                q[0].style.height = l + "px";
                var p = parseInt(this.host.width());
                r[0].style.visibility = "inherit";
                if (p - 3 * parseInt(b) < 0) {
                    r[0].style.visibility = "hidden"
                } else {
                    if (p < f) {
                        r[0].style.visibility = "hidden"
                    } else {
                        if (this.element.style.visibility == "visible") {
                            r[0].style.visibility = "inherit"
                        }
                    }
                }
                this._setElementPosition(g, b, 0);
                this._setElementPosition(r, b + t, 0);
                this._setElementPosition(q, 2 + b + t + h, 0)
            }
        }
    })
})(jQuery);