/*
 jQWidgets v2.5.0 (2012-Oct-17)
 Copyright (c) 2011-2012 jQWidgets.
 License: http://jqwidgets.com/license/
 */

(function (a) {
    a.jqx.jqxWidget("jqxListBox", "", {});
    a.extend(a.jqx._jqxListBox.prototype, {
        defineInstance: function () {
            this.disabled = false;
            this.width = null;
            this.height = null;
            this.items = new Array();
            this.multiple = false;
            this.selectedIndex = -1;
            this.selectedIndexes = new Array();
            this.source = null;
            this.scrollBarSize = 15;
            this.enableHover = true;
            this.enableSelection = true;
            this.visualItems = new Array();
            this.groups = new Array();
            this.equalItemsWidth = true;
            this.itemHeight = -1;
            this.visibleItems = new Array();
            this.emptyGroupText = "Group";
            this.checkboxes = false;
            this.hasThreeStates = false;
            this.autoHeight = false;
            this.roundedcorners = true;
            this.touchMode = "auto";
            this.displayMember = "";
            this.valueMember = "";
            this.searchMode = "startswithignorecase";
            this.incrementalSearch = true;
            this.incrementalSearchDelay = 700;
            this.allowDrag = false;
            this.allowDrop = true;
            this.dropAction = "default";
            this.touchModeStyle = "auto";
            this.keyboardNavigation = true;
            this.enableMouseWheel = true;
            this.multipleextended = false;
            this.events = ["select", "unselect", "change", "checkChange", "dragStart", "dragEnd"]
        }, createInstance: function (b) {
            this.render()
        }, render: function () {
            this.element.innerHTML = "";
            var b = this;
            this.host.addClass(this.toThemeProperty("jqx-listbox"));
            this.host.addClass(this.toThemeProperty("jqx-reset"));
            this.host.addClass(this.toThemeProperty("jqx-rc-all"));
            this.host.addClass(this.toThemeProperty("jqx-widget"));
            this.host.addClass(this.toThemeProperty("jqx-widget-content"));
            var f = false;
            if (this.width != null && this.width.toString().indexOf("%") != -1) {
                this.host.width(this.width);
                f = true
            }
            if (this.height != null && this.height.toString().indexOf("%") != -1) {
                this.host.height(this.height);
                if (this.host.height() == 0) {
                    this.host.height(200)
                }
                f = true
            }
            if (this.width != null && this.width.toString().indexOf("px") != -1) {
                this.host.width(this.width)
            } else {
                if (this.width != undefined && !isNaN(this.width)) {
                    this.host.width(this.width)
                }
            }
            if (this.height != null && this.height.toString().indexOf("px") != -1) {
                this.host.height(this.height)
            } else {
                if (this.height != undefined && !isNaN(this.height)) {
                    this.host.height(this.height)
                }
            }
            var c = a("<div tabIndex=0 style='-webkit-appearance: none; background: transparent; outline: none; width:100%; height: 100%; align:left; border: 0px; padding: 0px; margin: 0px; left: 0px; top: 0px; valign:top; position: relative;'><div tabIndex=1 style='-webkit-appearance: none; border: none; background: transparent; outline: none; width:100%; height: 100%; padding: 0px; margin: 0px; align:left; left: 0px; top: 0px; valign:top; position: relative;'><div id='listBoxContent' tabIndex=2 style='-webkit-appearance: none; border: none; background: transparent; outline: none; border: none; padding: 0px; overflow: hidden; margin: 0px; align:left; valign:top; left: 0px; top: 0px; position: absolute;'/><div id='verticalScrollBar" + this.element.id + "' style='align:left; valign:top; left: 0px; top: 0px; position: absolute;'/><div id='horizontalScrollBar" + this.element.id + "' style='align:left; valign:top; left: 0px; top: 0px; position: absolute;'/><div id='bottomRight' style='align:left; valign:top; left: 0px; top: 0px; border: none; position: absolute;'/></div></div>");
            this._addInput();
            this.host.attr("tabIndex", 1);
            this.host.append(c);
            var e = this.host.find("#verticalScrollBar" + this.element.id);
            if (!e.jqxScrollBar) {
                alert("jqxscrollbar.js is not loaded.");
                return
            }
            this.vScrollBar = e.jqxScrollBar({
                vertical: true,
                theme: this.theme,
                touchMode: this.touchMode,
                largestep: parseInt(this.host.height()) / 2
            });
            var d = this.host.find("#horizontalScrollBar" + this.element.id);
            this.hScrollBar = d.jqxScrollBar({vertical: false, touchMode: this.touchMode, theme: this.theme});
            this.content = this.host.find("#listBoxContent");
            this.content[0].id = "listBoxContent" + this.element.id;
            this.bottomRight = this.host.find("#bottomRight").addClass(this.toThemeProperty("jqx-listbox-bottomright"));
            this.bottomRight[0].id = "bottomRight" + this.element.id;
            this.vScrollBar.css("visibility", "inherit");
            this.hScrollBar.css("visibility", "inherit");
            this.vScrollInstance = a.data(this.vScrollBar[0], "jqxScrollBar").instance;
            this.hScrollInstance = a.data(this.hScrollBar[0], "jqxScrollBar").instance;
            if (this.isTouchDevice()) {
                var g = a("<div class='overlay' style='-webkit-appearance: none; border: none; background: transparent; outline: none; border: none; padding: 0px; overflow: hidden; margin: 0px; align:left; valign:top; left: 0px; top: 0px; position: absolute;'></div>");
                this.content.parent().append(g);
                this.overlayContent = this.host.find(".overlay")
            }
            this._updateTouchScrolling();
            this.host.addClass("jqx-disableselect");
            if (f) {
                a(window).resize(function () {
                    b._updateSize()
                })
            }
            if (this.host.jqxDragDrop) {
                jqxListBoxDragDrop()
            }
        }, _addInput: function () {
            var b = this.host.attr("name");
            if (!b) {
                b = this.element.id
            } else {
                this.host.attr("name", "")
            }
            this.input = a("<input type='hidden'/>");
            this.host.append(this.input);
            this.input.attr("name", b)
        }, _updateTouchScrolling: function () {
            var b = this;
            if (this.isTouchDevice()) {
                b.enableHover = false;
                var c = this.overlayContent ? this.overlayContent : this.content;
                a(c).unbind("touchstart.touchScroll");
                a(c).unbind("touchmove.touchScroll");
                a(c).unbind("touchend.touchScroll");
                a(c).unbind("touchcancel.touchScroll");
                a.jqx.mobile.touchScroll(c, b.vScrollInstance.max, function (f, e) {
                    if (b.vScrollBar.css("visibility") != "hidden") {
                        var d = b.vScrollInstance.value;
                        b.vScrollInstance.setPosition(d + e);
                        b._lastScroll = new Date()
                    }
                    if (b.hScrollBar.css("visibility") != "hidden") {
                        var d = b.hScrollInstance.value;
                        b.hScrollInstance.setPosition(d + f);
                        b._lastScroll = new Date()
                    }
                }, this.element.id);
                if (b.vScrollBar.css("visibility") != "visible" && b.hScrollBar.css("visibility") != "visible") {
                    a.jqx.mobile.setTouchScroll(false, this.element.id)
                } else {
                    a.jqx.mobile.setTouchScroll(true, this.element.id)
                }
            }
        }, isTouchDevice: function () {
            var b = a.jqx.mobile.isTouchDevice();
            if (this.touchMode == true) {
                b = true;
                a.jqx.mobile.setMobileSimulator(this.element)
            } else {
                if (this.touchMode == false) {
                    b = false
                }
            }
            if (b && this.touchModeStyle != false) {
                this.scrollBarSize = 10
            }
            if (b) {
                this.host.addClass(this.toThemeProperty("jqx-touch"))
            }
            return b
        }, beginUpdate: function () {
            this.updatingListBox = true
        }, endUpdate: function () {
            this.updatingListBox = false;
            this._addItems();
            this._renderItems()
        }, beginUpdateLayout: function () {
            this.updating = true
        }, resumeUpdateLayout: function () {
            this.updating = false;
            this.vScrollInstance.value = 0;
            this._render(false)
        }, _updateSize: function () {
            var c = this;
            var d = c.host.width();
            var b = c.host.height();
            if (!c._oldWidth) {
                c._oldWidth = d
            }
            if (!c._oldHeight) {
                c._oldHeight = b
            }
            setTimeout(function () {
                if (d != c._oldWidth) {
                    c._updatescrollbars();
                    c._renderItems()
                }
                if (b != c._oldHeight) {
                    if (c.items) {
                        if (c.items.length > 0 && c.virtualItemsCount * c.items[0].height < b) {
                            c._render(false)
                        } else {
                            c._updatescrollbars();
                            c._renderItems()
                        }
                    }
                }
                c._oldWidth = d;
                c._oldHeight = b
            }, 1)
        }, propertyChangedHandler: function (b, c, e, d) {
            if (this.isInitialized == undefined || this.isInitialized == false) {
                return
            }
            if (c == "source" || c == "checkboxes") {
                b.clearSelection();
                b.refresh()
            }
            if (c == "scrollBarSize" || c == "equalItemsWidth") {
                if (d != e) {
                    b._updatescrollbars()
                }
            }
            if (c == "disabled") {
                b._renderItems()
            }
            if (c == "touchMode") {
                b._removeHandlers();
                b.vScrollBar.jqxScrollBar({touchMode: d});
                b.hScrollBar.jqxScrollBar({touchMode: d});
                b._updateTouchScrolling();
                b._addHandlers();
                b._render(false)
            }
            if (!this.updating) {
                if (c == "width" || c == "height") {
                    setTimeout(function () {
                        b.vScrollInstance.value = 0;
                        if (c == "width") {
                            if (e != d) {
                                b.host.width(d);
                                b._updatescrollbars();
                                b._renderItems()
                            }
                        } else {
                            if (e != d) {
                                b.host.height(d);
                                if (b.items) {
                                    if (b.items.length > 0 && b.virtualItemsCount * b.items[0].height < d) {
                                        b._render(false)
                                    } else {
                                        b._updatescrollbars();
                                        b._renderItems()
                                    }
                                }
                            }
                        }
                    }, 1)
                }
            }
            if (c == "theme") {
                if (e != d) {
                    b.hScrollBar.jqxScrollBar({theme: b.theme});
                    b.vScrollBar.jqxScrollBar({theme: b.theme});
                    b.host.removeClass();
                    b.host.addClass(b.toThemeProperty("jqx-listbox"));
                    b.host.addClass(b.toThemeProperty("jqx-widget"));
                    b.host.addClass(b.toThemeProperty("jqx-widget-content"));
                    b.host.addClass(b.toThemeProperty("jqx-reset"));
                    b.host.addClass(b.toThemeProperty("jqx-rc-all"));
                    b.refresh()
                }
            }
            if (c == "selectedIndex") {
                b.clearSelection();
                b.selectIndex(d, true)
            }
            if (c == "displayMember" || c == "valueMember") {
                if (e != d) {
                    var f = b.selectedIndex;
                    b.refresh();
                    b.selectedIndex = f;
                    b.selectedIndexes[f] = f
                }
                b._renderItems()
            }
            if (c == "autoHeight") {
                b._render()
            }
        }, loadFromSelect: function (i) {
            if (i == null) {
                return
            }
            var c = "#" + i;
            var f = a(c);
            if (f.length > 0) {
                var e = f.find("option");
                var b = f.find("optgroup");
                var d = 0;
                var h = -1;
                var g = new Array();
                a.each(e, function () {
                    var l = b.find(this).length > 0;
                    var n = null;
                    if (this.text != this.value && (this.label == null || this.label == "")) {
                        this.label = this.text
                    }
                    var m = {
                        disabled: this.disabled,
                        value: this.value,
                        label: this.label,
                        title: this.title,
                        originalItem: this
                    };
                    var k = a.browser.msie && a.browser.version < 8;
                    if (k) {
                        if (m.value == "" && this.text != null && this.text.length > 0) {
                            m.value = this.text
                        }
                    }
                    if (l) {
                        n = b.find(this).parent()[0].label;
                        m.group = n
                    }
                    if (this.selected) {
                        h = d
                    }
                    g[d] = m;
                    d++
                });
                this.source = g;
                this.fromSelect = true;
                this.clearSelection();
                this.selectedIndex = h;
                this.selectedIndexes[this.selectedIndex] = this.selectedIndex;
                this.refresh()
            }
        }, refresh: function (c) {
            var b = this;
            if (this.vScrollBar == undefined) {
                return
            }
            this.visibleItems = new Array();
            var d = function (e) {
                if (e == true) {
                    if (b.selectedIndex != -1) {
                        var f = b.selectedIndex;
                        b.selectedIndex = -1;
                        b._stopEvents = true;
                        b.selectIndex(f, false, true);
                        if (b.selectedIndex == -1) {
                            b.selectedIndex = f
                        }
                        b._stopEvents = false
                    }
                }
            };
            if (a.jqx.dataAdapter && this.source != null && this.source._source) {
                this.databind(this.source);
                d(c);
                return
            }
            this.items = this.loadItems(this.source);
            this._render(false, c == true);
            d(c)
        }, _render: function (c, b) {
            this._addItems();
            this._renderItems();
            this.vScrollInstance.setPosition(0);
            this._cachedItemHtml = new Array();
            if (c == undefined || c) {
                if (this.items != undefined && this.items != null) {
                    if (this.selectedIndex >= 0 && this.selectedIndex < this.items.length) {
                        this.selectIndex(this.selectedIndex, true, true, true)
                    }
                }
            }
            if (this.allowDrag && this._enableDragDrop) {
                this._enableDragDrop();
                if (this.isTouchDevice()) {
                    this._removeHandlers();
                    if (this.overlayContent) {
                        this.overlayContent.remove();
                        this.overlayContent = null
                    }
                    this._updateTouchScrolling();
                    this._addHandlers();
                    return
                }
            }
            this._updateTouchScrolling();
            if (this.rendered) {
                this.rendered()
            }
        }, _createID: function () {
            var b = Math.random() + "";
            b = b.replace(".", "");
            b = "99" + b;
            b = b / 1;
            while (this.items[b]) {
                b = Math.random() + "";
                b = b.replace(".", "");
                b = b / 1
            }
            return "listitem" + b
        }, _hitTest: function (c, f) {
            var e = parseInt(this.vScrollInstance.value);
            var b = this._searchFirstVisibleIndex(f + e, this.renderedVisibleItems);
            if (this.renderedVisibleItems[b] != undefined && this.renderedVisibleItems[b].isGroup) {
                return null
            }
            if (this.renderedVisibleItems.length > 0) {
                var d = this.renderedVisibleItems[this.renderedVisibleItems.length - 1];
                if (d.height + d.top < f + e) {
                    return null
                }
            }
            b = this._searchFirstVisibleIndex(f + e);
            return this.visibleItems[b];
            return null
        }, _searchFirstVisibleIndex: function (e, f) {
            if (e == undefined) {
                e = parseInt(this.vScrollInstance.value)
            }
            var c = 0;
            if (f == undefined || f == null) {
                f = this.visibleItems
            }
            var b = f.length;
            while (c <= b) {
                mid = parseInt((c + b) / 2);
                var d = f[mid];
                if (d == undefined) {
                    break
                }
                if (d.initialTop > e && d.initialTop + d.height > e) {
                    b = mid - 1
                } else {
                    if (d.initialTop < e && d.initialTop + d.height <= e) {
                        c = mid + 1
                    } else {
                        return mid;
                        break
                    }
                }
            }
            return 0
        }, _renderItems: function () {
            if (this.items == undefined || this.items.length == 0) {
                this.visibleItems = new Array();
                return
            }
            if (this.updatingListBox == true) {
                return
            }
            var F = this.vScrollInstance;
            var h = this.hScrollInstance;
            var g = parseInt(F.value);
            var f = parseInt(h.value);
            var A = this.items.length;
            var L = this.host.width();
            var J = parseInt(this.content[0].style.width);
            var b = J + parseInt(h.max);
            var p = parseInt(this.vScrollBar[0].style.width) + 2;
            if (this.vScrollBar[0].style.visibility != "visible") {
                p = 0
            }
            if (this.hScrollBar[0].style.visibility != "visible") {
                b = J
            }
            var k = this._getVirtualItemsCount();
            var K = new Array();
            var E = 0;
            var D = parseInt(this.element.style.height) + 2;
            if (this.element.style.height.indexOf("%") != -1) {
                D = this.host.outerHeight()
            }
            if (isNaN(D)) {
                D = 0
            }
            var s = 0;
            var r = 0;
            var O = 0;
            if (F.value == 0 || this.visibleItems.length == 0) {
                for (var q = 0; q < this.items.length; q++) {
                    var w = this.items[q];
                    if (w.visible) {
                        w.top = -g;
                        w.initialTop = -g;
                        if (!w.isGroup && w.visible) {
                            this.visibleItems[r++] = w;
                            w.visibleIndex = r - 1
                        }
                        this.renderedVisibleItems[O++] = w;
                        w.left = -f;
                        var c = w.top + w.height;
                        if (c >= 0 && w.top - w.height <= D) {
                            K[E++] = {index: q, item: w}
                        }
                        g -= w.height
                    }
                }
            }
            var l = g > 0 ? this._searchFirstVisibleIndex(this.vScrollInstance.value, this.renderedVisibleItems) : 0;
            var M = 0;
            E = 0;
            var x = this.vScrollInstance.value;
            var I = 0;
            while (M < 100 + D) {
                var w = this.renderedVisibleItems[l];
                if (w == undefined) {
                    break
                }
                if (w.visible) {
                    w.left = -f;
                    var c = w.top + w.height - x;
                    if (c >= 0 && w.initialTop - x - w.height <= 2 * D) {
                        K[E++] = {index: l, item: w}
                    }
                }
                l++;
                if (w.visible) {
                    M += w.initialTop - x + w.height - M
                }
                I++;
                if (I > this.items.length - 1) {
                    break
                }
            }
            var n = this.toThemeProperty("jqx-listitem-state-normal") + " " + this.toThemeProperty("jqx-item");
            var i = this.toThemeProperty("jqx-listitem-state-group");
            var N = this.toThemeProperty("jqx-listitem-state-disabled") + " " + this.toThemeProperty("jqx-fill-state-disabled");
            var B = 0;
            var m = this;
            for (var q = 0; q < this.visualItems.length; q++) {
                var C = this.visualItems[q];
                var H = function () {
                    var y = C[0].firstChild;
                    if (m.checkboxes) {
                        y = C[0].lastChild
                    }
                    if (y != null) {
                        y.style.visibility = "hidden";
                        y.className = ""
                    }
                    if (m.checkboxes && m.host.jqxCheckBox) {
                        var P = C.find(".chkbox");
                        P.css({visibility: "hidden"})
                    }
                };
                if (q < K.length) {
                    var w = K[q].item;
                    if (w.initialTop - x >= D) {
                        H();
                        continue
                    }
                    var z = a(C[0].firstChild);
                    if (this.checkboxes) {
                        z = a(C[0].lastChild)
                    }
                    if (z.length == 0) {
                        continue
                    }
                    if (z[0] == null) {
                        continue
                    }
                    z[0].className = "";
                    z[0].style.display = "block";
                    z[0].style.visibility = "inherit";
                    var o = "";
                    if (!w.isGroup && !this.selectedIndexes[w.index] >= 0) {
                        o = n
                    } else {
                        o = i
                    }
                    if (w.disabled || this.disabled) {
                        o += " " + N
                    }
                    if (this.roundedcorners) {
                        o += " " + this.toThemeProperty("jqx-rc-all")
                    }
                    z[0].className = o;
                    if (this.renderer) {
                        if (!w.key) {
                            w.key = this.generatekey()
                        }
                        if (!this._cachedItemHtml) {
                            this._cachedItemHtml = new Array()
                        }
                        if (this._cachedItemHtml[w.key]) {
                            if (z[0].innerHTML != this._cachedItemHtml[w.key]) {
                                z[0].innerHTML = this._cachedItemHtml[w.key]
                            }
                        } else {
                            var v = this.renderer(w.index, w.label, w.value);
                            z[0].innerHTML = v;
                            this._cachedItemHtml[w.key] = z[0].innerHTML
                        }
                    } else {
                        if (w.html != null && w.html.toString().length > 0) {
                            z[0].innerHTML = w.html
                        } else {
                            if (w.label != null || w.value != null) {
                                if (w.label != null) {
                                    if (z[0].innerHTML !== w.label) {
                                        z[0].innerHTML = w.label
                                    }
                                } else {
                                    if (z[0].innerHTML !== w.value) {
                                        z[0].innerHTML = w.value
                                    }
                                }
                            } else {
                                if (w.label == "" || w.label == null) {
                                    z[0].innerHTML = "";
                                    z[0].style.height = (w.height - 10) + "px"
                                }
                            }
                        }
                    }
                    C[0].style.left = w.left + "px";
                    C[0].style.top = w.initialTop - x + "px";
                    w.element = z[0];
                    if (w.title) {
                        z[0].title = w.title
                    }
                    if (this.equalItemsWidth && !w.isGroup) {
                        if (s == 0) {
                            var d = parseInt(b);
                            var u = parseInt(z.outerWidth()) - parseInt(z.width());
                            d -= u;
                            var G = 1;
                            if (G != null) {
                                G = parseInt(G)
                            } else {
                                G = 0
                            }
                            d -= 2 * G;
                            s = d;
                            if (this.checkboxes && this.host.jqxCheckBox && this.hScrollBar[0].style.visibility == "hidden") {
                                s -= 18
                            }
                        }
                        if (J > this.virtualSize.width) {
                            z[0].style.width = s + "px";
                            w.width = s
                        } else {
                            z[0].style.width = -4 + this.virtualSize.width + "px";
                            w.width = this.virtualSize.width - 4
                        }
                    } else {
                        if (z.width() < this.host.width()) {
                            z.width(this.host.width() - 2)
                        }
                    }
                    if (this.checkboxes && this.host.jqxCheckBox && !w.isGroup) {
                        if (B == 0) {
                            B = (parseInt(C.outerHeight(true)) - 16) / 2;
                            B++
                        }
                        var e = a(C.children()[0]);
                        e[0].item = w;
                        if (z[0].style.left != "18px") {
                            z[0].style.left = "18px"
                        }
                        e.css("top", B + "px");
                        e.css({display: "block", visibility: "inherit"});
                        var t = e.jqxCheckBox("checked");
                        if (t != w.checked) {
                            e.jqxCheckBox({checked: w.checked, disabled: w.disabled})
                        }
                    } else {
                        if (this.checkboxes && this.host.jqxCheckBox) {
                            var e = a(C.children()[0]);
                            e.css({display: "none", visibility: "inherit"})
                        }
                    }
                    if (this.selectedIndexes[w.visibleIndex] >= 0 && !w.disabled) {
                        z.addClass(this.toThemeProperty("jqx-listitem-state-selected"));
                        z.addClass(this.toThemeProperty("jqx-fill-state-pressed"))
                    }
                } else {
                    H()
                }
            }
        }, generatekey: function () {
            var b = function () {
                return (((1 + Math.random()) * 65536) | 0).toString(16).substring(1)
            };
            return (b() + b() + "-" + b() + "-" + b() + "-" + b() + "-" + b() + b() + b())
        }, _calculateVirtualSize: function () {
            var d = 0;
            var q = 2;
            var o = 0;
            var g = a("<span></span>");
            var f = 0;
            var c = this.host.outerHeight();
            a(document.body).append(g);
            var e = this.items.length;
            if (this.renderer || this.groups.length > 1 || (e > 0 && this.items[0].html != null)) {
                for (var o = 0; o < e; o++) {
                    var r = this.items[o];
                    if (r.isGroup && (r.label == "" && r.html == "")) {
                        continue
                    }
                    if (!r.visible) {
                        continue
                    }
                    var k = "";
                    if (!r.isGroup) {
                        k += this.toThemeProperty("jqx-listitem-state-normal jqx-rc-all")
                    } else {
                        k += this.toThemeProperty("jqx-listitem-state-group jqx-rc-all")
                    }
                    k += " " + this.toThemeProperty("jqx-fill-state-normal");
                    if (this.isTouchDevice()) {
                        k += " " + this.toThemeProperty("jqx-touch")
                    }
                    if (this.equalItemsWidth) {
                        g.css("float", "left")
                    }
                    g[0].className = k;
                    if (this.renderer) {
                        var h = this.renderer(r.index, r.label, r.value);
                        g[0].innerHTML = h
                    } else {
                        if (r.html != null && r.html.toString().length > 0) {
                            g[0].innerHTML = r.html
                        } else {
                            if (r.label != null || r.value != null) {
                                if (r.label != null) {
                                    g[0].innerHTML = r.label
                                } else {
                                    g[0].innerHTML = r.value
                                }
                            }
                        }
                    }
                    var b = g.outerHeight();
                    var p = g.outerWidth();
                    if (this.itemHeight > -1) {
                        b = this.itemHeight
                    }
                    r.height = b;
                    r.width = p;
                    q += b;
                    d = Math.max(d, p);
                    if (q <= c) {
                        f++
                    }
                }
            } else {
                var q = 0;
                var i = 0;
                var n = "";
                var l = 0;
                var m = 0;
                for (var o = 0; o < e; o++) {
                    var r = this.items[o];
                    if (r.isGroup && (r.label == "" && r.html == "")) {
                        continue
                    }
                    if (!r.visible) {
                        continue
                    }
                    var k = "";
                    if (o == 0) {
                        k += this.toThemeProperty("jqx-listitem-state-normal jqx-rc-all");
                        k += " " + this.toThemeProperty("jqx-fill-state-normal");
                        k += " " + this.toThemeProperty("jqx-widget");
                        k += " " + this.toThemeProperty("jqx-listbox");
                        k += " " + this.toThemeProperty("jqx-widget-content");
                        if (this.isTouchDevice()) {
                            k += " " + this.toThemeProperty("jqx-touch")
                        }
                        if (this.equalItemsWidth) {
                            g.css("float", "left")
                        }
                        g[0].className = k;
                        if (r.html == null && (r.label == "" || r.label == null)) {
                            g[0].innerHTML = "Item"
                        } else {
                            if (r.html != null && r.html.toString().length > 0) {
                                g[0].innerHTML = r.html
                            } else {
                                if (r.label != null || r.value != null) {
                                    if (r.label != null) {
                                        g[0].innerHTML = r.label
                                    } else {
                                        g[0].innerHTML = r.value
                                    }
                                }
                            }
                        }
                        var b = g.outerHeight();
                        if (this.itemHeight > -1) {
                            b = this.itemHeight
                        }
                        i = b
                    }
                    if (l != undefined) {
                        m = l
                    }
                    if (r.html != null && r.html.toString().length > 0) {
                        l = Math.max(l, r.html.toString().length);
                        if (m != l) {
                            n = r.html
                        }
                    } else {
                        if (r.label != null) {
                            l = Math.max(l, r.label.length);
                            if (m != l) {
                                n = r.label
                            }
                        } else {
                            if (r.value != null) {
                                l = Math.max(l, r.value.length);
                                if (m != l) {
                                    n = r.value
                                }
                            }
                        }
                    }
                    r.height = i;
                    q += i;
                    if (q <= c) {
                        f++
                    }
                }
                g[0].innerHTML = n;
                d = g.outerWidth()
            }
            q += 2;
            if (f < 10) {
                f = 10
            }
            g.remove();
            return {width: d, height: q, itemsPerPage: f}
        }, _getVirtualItemsCount: function () {
            if (this.virtualItemsCount == 0) {
                var b = parseInt(this.host.height()) / 5;
                if (b > this.items.length) {
                    b = this.items.length
                }
                return b
            } else {
                return this.virtualItemsCount
            }
        }, _addItems: function () {
            if (this.updatingListBox == true) {
                return
            }
            if (this.items == undefined || this.items.length == 0) {
                this.virtualSize = {width: 0, height: 0, itemsPerPage: 0};
                this._updatescrollbars();
                this.renderedVisibleItems = new Array();
                if (this.itemswrapper) {
                    this.itemswrapper.children().remove()
                }
                return
            }
            var n = this;
            var h = 0;
            this.visibleItems = new Array();
            this.renderedVisibleItems = new Array();
            this._removeHandlers();
            this.content[0].innerHTML = "";
            this.itemswrapper = a('<div tabIndex=1 style="outline: 0 none; overflow:hidden; width:100%; position: relative;"></div>');
            this.itemswrapper.height(2 * this.host.height());
            this.content.append(this.itemswrapper);
            var i = this._calculateVirtualSize();
            var l = i.itemsPerPage * 2;
            if (this.autoHeight) {
                l = this.items.length
            }
            this.virtualItemsCount = Math.min(l, this.items.length);
            var g = this;
            var f = i.width;
            this.virtualSize = i;
            this.itemswrapper.width(Math.max(this.host.width(), 17 + i.width));
            for (var k = 0; k < this.virtualItemsCount; k++) {
                var m = this.items[k];
                var b = a("<div style='border: none; tabIndex=0 width:100%; height: 100%; align:left; valign:top; position: absolute;'><span id='spanElement'></span></div>");
                b[0].id = n._createID();
                if (this.allowDrag && this._enableDragDrop) {
                    b.addClass("draggable")
                }
                b.appendTo(this.itemswrapper);
                if (this.checkboxes && this.host.jqxCheckBox) {
                    var e = a('<div tabIndex=1 style="background-color: transparent; padding: 0; margin: 0; position: absolute; float: left; width: 16px; height: 16px;" class="chkbox"/>');
                    b.css("float", "left");
                    var c = a(b[0].firstChild);
                    c.css("float", "left");
                    b.prepend(e);
                    e.jqxCheckBox({
                        checked: m.checked,
                        animationShowDelay: 0,
                        animationHideDelay: 0,
                        disabled: m.disabled,
                        enableContainerClick: false,
                        keyboardCheck: false,
                        hasThreeStates: this.hasThreeStates,
                        theme: this.theme
                    });
                    m.checkBoxElement = e[0];
                    var d = function (r, q) {
                        var o = r.owner.element.item;
                        if (o != null) {
                            var p = r.args;
                            if (q) {
                                g.checkIndex(o.index, true)
                            } else {
                                if (q == false) {
                                    g.uncheckIndex(o.index, true)
                                } else {
                                    g.indeterminateIndex(o.index, true)
                                }
                            }
                        }
                        g.focused = true
                    };
                    e.jqxCheckBox("updated", d)
                }
                b[0].style.height = m.height + "px";
                b[0].style.top = h + "px";
                h += m.height;
                this.visualItems[k] = b
            }
            this._addHandlers();
            this._updatescrollbars();
            if (a.browser.msie && a.browser.version < 8) {
                this.host.attr("hideFocus", true);
                this.host.find("div").attr("hideFocus", true)
            }
        }, _updatescrollbars: function () {
            var k = this.virtualSize.height;
            var h = this.virtualSize.width;
            var d = this.vScrollInstance;
            var c = this.hScrollInstance;
            this._arrange();
            var i = false;
            if (k > this.host.outerHeight()) {
                var b = 0;
                if (h > this.host.outerWidth()) {
                    b = this.hScrollBar.outerHeight() + 2
                }
                d.max = 2 + parseInt(k) + b - parseInt(this.host.height());
                if (this.vScrollBar[0].style.visibility != "inherit") {
                    this.vScrollBar[0].style.visibility = "inherit";
                    i = true
                }
            } else {
                if (this.vScrollBar[0].style.visibility != "hidden") {
                    this.vScrollBar[0].style.visibility = "hidden";
                    i = true
                }
            }
            var f = 0;
            if (this.vScrollBar[0].style.visibility != "hidden") {
                f = this.scrollBarSize + 6
            }
            var e = this.checkboxes ? 20 : 0;
            if (h >= this.host.outerWidth() - f - e) {
                var g = c.max;
                if (this.vScrollBar[0].style.visibility == "inherit") {
                    c.max = e + f + parseInt(h) - this.host.width() + 4
                } else {
                    c.max = e + parseInt(h) - this.host.width() + 6
                }
                if (this.hScrollBar[0].style.visibility != "inherit") {
                    this.hScrollBar[0].style.visibility = "inherit";
                    i = true
                }
                if (g != c.max) {
                    c._arrange()
                }
                if (this.vScrollBar[0].style.visibility == "inherit") {
                    d.max = 2 + parseInt(k) + this.hScrollBar.outerHeight() + 2 - parseInt(this.host.height())
                }
            } else {
                if (this.hScrollBar[0].style.visibility != "hidden") {
                    this.hScrollBar[0].style.visibility = "hidden";
                    i = true
                }
            }
            c.setPosition(0);
            if (i) {
                this._arrange()
            }
            if (this.itemswrapper) {
                this.itemswrapper.width(Math.max(this.host.width(), 17 + h));
                this.itemswrapper.height(2 * this.host.height())
            }
        }, clear: function () {
            this.source = null;
            this.clearSelection();
            this.refresh()
        }, clearSelection: function (b) {
            for (indx = 0; indx < this.selectedIndexes.length; indx++) {
                this.selectedIndexes[indx] = -1
            }
            this.selectedIndex = -1;
            if (b != false) {
                this._renderItems()
            }
        }, unselectIndex: function (b, c) {
            if (isNaN(b)) {
                return
            }
            this.selectedIndexes[b] = -1;
            if (c == undefined || c == true) {
                this._renderItems();
                this._raiseEvent("1", {index: b, type: type})
            }
            this._updateInputSelection();
            this._raiseEvent("2", {index: b, item: this.getItem(b)})
        }, getItem: function (c) {
            if (c == -1 || isNaN(c)) {
                return null
            }
            var b = null;
            var d = a.each(this.items, function () {
                if (this.index == c) {
                    b = this;
                    return false
                }
            });
            return b
        }, getVisibleItem: function (b) {
            if (b == -1 || isNaN(b)) {
                return null
            }
            return this.visibleItems[b]
        }, checkIndex: function (b, c) {
            if (!this.checkboxes || !this.host.jqxCheckBox) {
                return
            }
            if (isNaN(b)) {
                return
            }
            if (b < 0 || b >= this.visibleItems.length) {
                return
            }
            if (this.visibleItems[b] != null && this.visibleItems[b].disabled) {
                return
            }
            if (this.disabled) {
                return
            }
            var d = this.getItem(b);
            if (d != null) {
                var e = a(d.checkBoxElement);
                d.checked = true;
                if (c == undefined || c == true) {
                    this._updateCheckedItems()
                }
            }
            this._raiseEvent(3, {label: d.label, value: d.value, checked: true, item: d})
        }, getCheckedItems: function () {
            if (!this.checkboxes || !this.host.jqxCheckBox) {
                return null
            }
            var b = new Array();
            a.each(this.items, function () {
                if (this.checked) {
                    b[b.length] = this
                }
            });
            return b
        }, checkAll: function () {
            if (!this.checkboxes || !this.host.jqxCheckBox) {
                return
            }
            if (this.disabled) {
                return
            }
            a.each(this.items, function () {
                this.checked = true
            });
            this._updateCheckedItems();
            this._raiseEvent(3, {checked: true})
        }, uncheckAll: function () {
            if (!this.checkboxes || !this.host.jqxCheckBox) {
                return
            }
            if (this.disabled) {
                return
            }
            a.each(this.items, function () {
                this.checked = false
            });
            this._updateCheckedItems();
            this._raiseEvent(3, {checked: false})
        }, uncheckIndex: function (b, c) {
            if (!this.checkboxes || !this.host.jqxCheckBox) {
                return
            }
            if (isNaN(b)) {
                return
            }
            if (b < 0 || b >= this.visibleItems.length) {
                return
            }
            if (this.visibleItems[b] != null && this.visibleItems[b].disabled) {
                return
            }
            if (this.disabled) {
                return
            }
            var d = this.getItem(b);
            if (d != null) {
                var e = a(d.checkBoxElement);
                d.checked = false;
                if (c == undefined || c == true) {
                    this._updateCheckedItems()
                }
            }
            this._raiseEvent(3, {label: d.label, value: d.value, checked: false, item: d})
        }, indeterminateIndex: function (b, c) {
            if (!this.checkboxes || !this.host.jqxCheckBox) {
                return
            }
            if (isNaN(b)) {
                return
            }
            if (b < 0 || b >= this.visibleItems.length) {
                return
            }
            if (this.visibleItems[b] != null && this.visibleItems[b].disabled) {
                return
            }
            if (this.disabled) {
                return
            }
            var d = this.getItem(b);
            if (d != null) {
                var e = a(d.checkBoxElement);
                d.checked = null;
                if (c == undefined || c == true) {
                    this._updateCheckedItems()
                }
            }
            this._raiseEvent(3, {checked: null})
        }, getSelectedIndex: function () {
            return this.selectedIndex
        }, getSelectedItems: function () {
            var b = this.getItems();
            var e = this.selectedIndexes;
            var d = [];
            for (var c in e) {
                if (e[c] != -1) {
                    d[d.length] = b[c]
                }
            }
            return d
        }, getSelectedItem: function () {
            return this.getItem(this.selectedIndex)
        }, _updateCheckedItems: function () {
            var b = this.selectedIndex;
            this.clearSelection(false);
            var c = this.getCheckedItems();
            this.selectedIndex = b;
            this._renderItems();
            var d = a.data(this.element, "hoveredItem");
            if (d != null) {
                a(d).addClass(this.toThemeProperty("jqx-listitem-state-hover"));
                a(d).addClass(this.toThemeProperty("jqx-fill-state-hover"))
            }
            this._updateInputSelection()
        }, selectIndex: function (k, r, c, d, n, b) {
            if (isNaN(k)) {
                return
            }
            if (k < -1 || k >= this.visibleItems.length) {
                return
            }
            if (this.visibleItems[k] != null && this.visibleItems[k].disabled) {
                return
            }
            if (this.disabled) {
                return
            }
            if (!this.multiple && !this.multipleextended && this.selectedIndex == k && !d) {
                return
            }
            if (this.checkboxes) {
                this._updateCheckedItems();
                return
            }
            this.focused = true;
            var q = false;
            if (this.selectedIndex != k) {
                q = true
            }
            var p = this.selectedIndex;
            if (this.selectedIndex == k && !this.multiple) {
                p = -1
            }
            if (n == undefined) {
                n = "none"
            }
            var h = this.getItem(k);
            var s = this.getItem(p);
            if (this.visibleItems && this.visibleItems.length != this.items.length) {
                h = this.getVisibleItem(k);
                s = this.getVisibleItem(p)
            }
            if (d != undefined && d) {
                this._raiseEvent("1", {index: p, type: n, item: s, originalEvent: b});
                this.selectedIndex = k;
                this.selectedIndexes[p] = -1;
                this.selectedIndexes[k] = k;
                this._raiseEvent("0", {index: k, type: n, item: h, originalEvent: b})
            } else {
                var m = this;
                var e = function (t, x, v, w, u, i) {
                    m._raiseEvent("1", {index: x, type: v, item: w, originalEvent: i});
                    m.selectedIndex = t;
                    m.selectedIndexes[x] = -1;
                    x = t;
                    m.selectedIndexes[t] = t;
                    m._raiseEvent("0", {index: t, type: v, item: u, originalEvent: i})
                };
                var l = function (t, x, v, w, u, i) {
                    if (m.selectedIndexes[t] == undefined || m.selectedIndexes[t] == -1) {
                        m.selectedIndexes[t] = t;
                        m.selectedIndex = t;
                        m._raiseEvent("0", {index: t, type: v, item: u, originalEvent: i})
                    } else {
                        x = m.selectedIndexes[t];
                        m.selectedIndexes[t] = -1;
                        m.selectedIndex = -1;
                        m._raiseEvent("1", {index: x, type: v, item: w, originalEvent: i})
                    }
                };
                if (this.multipleextended) {
                    if (!this._shiftKey && !this._ctrlKey) {
                        if (n != "keyboard" && n != "mouse") {
                            l(k, p, n, s, h, b);
                            m._clickedIndex = k
                        } else {
                            this.clearSelection(false);
                            m._clickedIndex = k;
                            e(k, p, n, s, h, b)
                        }
                    } else {
                        if (this._ctrlKey) {
                            if (n == "keyboard") {
                                this.clearSelection(false)
                            }
                            l(k, p, n, s, h, b)
                        } else {
                            if (this._shiftKey) {
                                if (m._clickedIndex == undefined) {
                                    m._clickedIndex = p
                                }
                                var f = Math.min(m._clickedIndex, k);
                                var o = Math.max(m._clickedIndex, k);
                                this.clearSelection(false);
                                for (var g = f; g <= o; g++) {
                                    m.selectedIndexes[g] = g;
                                    m._raiseEvent("0", {
                                        index: g,
                                        type: n,
                                        item: this.getVisibleItem(g),
                                        originalEvent: b
                                    })
                                }
                                if (n != "keyboard") {
                                    m.selectedIndex = m._clickedIndex
                                } else {
                                    m.selectedIndex = k
                                }
                            }
                        }
                    }
                } else {
                    if (this.multiple) {
                        l(k, p, n, s, h, b)
                    } else {
                        e(k, p, n, s, h, b)
                    }
                }
            }
            if (c == undefined || c == true) {
                this._renderItems()
            }
            if (r != undefined && r != null && r == true) {
                this.ensureVisible(k)
            }
            this._raiseEvent("2", {index: k, item: h});
            this._updateInputSelection();
            return q
        }, _updateInputSelection: function () {
            if (this.input) {
                if (this.selectedIndex == -1) {
                    this.input.val("")
                } else {
                    if (this.items[this.selectedIndex] != undefined) {
                        this.input.val(this.items[this.selectedIndex].value)
                    }
                }
                if (this.multiple || this.multipleextended || this.checkboxes) {
                    var b = !this.checkboxes ? this.getSelectedItems() : this.getCheckedItems();
                    var d = "";
                    for (var c = 0; c < b.length; c++) {
                        if (c == b.length - 1) {
                            d += b[c].value
                        } else {
                            d += b[c].value + ","
                        }
                    }
                    this.input.val(d)
                }
            }
        }, isIndexInView: function (c) {
            if (isNaN(c)) {
                return false
            }
            if (c < 0 || c >= this.items.length) {
                return false
            }
            var d = this.vScrollInstance.value;
            var e = this.visibleItems[this.selectedIndex];
            if (e == undefined) {
                return true
            }
            var b = e.initialTop;
            var f = e.height;
            if (b - d < 0 || b - d + f >= this.host.outerHeight()) {
                return false
            }
            return true
        }, _itemsInPage: function () {
            var b = 0;
            var c = this;
            a.each(this.items, function () {
                if ((this.initialTop + this.height) >= c.content.height()) {
                    return false
                }
                b++
            });
            return b
        }, _firstItemIndex: function () {
            if (this.visibleItems != null) {
                if (this.visibleItems[0].isGroup) {
                    return this._nextItemIndex(0)
                } else {
                    return 0
                }
            }
            return -1
        }, _lastItemIndex: function () {
            if (this.visibleItems != null) {
                if (this.visibleItems[this.visibleItems.length - 1].isGroup) {
                    return this._prevItemIndex(this.visibleItems.length - 1)
                } else {
                    return this.visibleItems.length - 1
                }
            }
            return -1
        }, _nextItemIndex: function (b) {
            for (indx = b + 1; indx < this.visibleItems.length; indx++) {
                if (this.visibleItems[indx]) {
                    if (!this.visibleItems[indx].disabled && !this.visibleItems[indx].isGroup) {
                        return indx
                    }
                }
            }
            return -1
        }, _prevItemIndex: function (b) {
            for (indx = b - 1; indx >= 0; indx--) {
                if (this.visibleItems[indx]) {
                    if (!this.visibleItems[indx].disabled && !this.visibleItems[indx].isGroup) {
                        return indx
                    }
                }
            }
            return -1
        }, _getMatches: function (g, d) {
            if (g == undefined || g.length == 0) {
                return -1
            }
            if (d == undefined) {
                d = 0
            }
            var b = this.getItems();
            var f = this;
            var c = -1;
            var e = 0;
            a.each(b, function (h) {
                var l = "";
                if (!this.isGroup) {
                    if (this.label) {
                        l = this.label
                    } else {
                        if (this.value) {
                            l = this.value
                        } else {
                            if (this.title) {
                                l = this.title
                            } else {
                                l = "jqxItem"
                            }
                        }
                    }
                    var k = false;
                    switch (f.searchMode) {
                        case"containsignorecase":
                            k = a.jqx.string.containsIgnoreCase(l, g);
                            break;
                        case"contains":
                            k = a.jqx.string.contains(l, g);
                            break;
                        case"equals":
                            k = a.jqx.string.equals(l, g);
                            break;
                        case"equalsignorecase":
                            k = a.jqx.string.equalsIgnoreCase(l, g);
                            break;
                        case"startswith":
                            k = a.jqx.string.startsWith(l, g);
                            break;
                        case"startswithignorecase":
                            k = a.jqx.string.startsWithIgnoreCase(l, g);
                            break;
                        case"endswith":
                            k = a.jqx.string.endsWith(l, g);
                            break;
                        case"endswithignorecase":
                            k = a.jqx.string.endsWithIgnoreCase(l, g);
                            break
                    }
                    if (k && this.visibleIndex >= d) {
                        c = this.visibleIndex;
                        return false
                    }
                }
            });
            return c
        }, findItems: function (e) {
            var b = this.getItems();
            var d = this;
            var c = 0;
            var f = new Array();
            a.each(b, function (g) {
                var k = "";
                if (!this.isGroup) {
                    if (this.label) {
                        k = this.label
                    } else {
                        if (this.value) {
                            k = this.value
                        } else {
                            if (this.title) {
                                k = this.title
                            } else {
                                k = "jqxItem"
                            }
                        }
                    }
                    var h = false;
                    switch (d.searchMode) {
                        case"containsignorecase":
                            h = a.jqx.string.containsIgnoreCase(k, e);
                            break;
                        case"contains":
                            h = a.jqx.string.contains(k, e);
                            break;
                        case"equals":
                            h = a.jqx.string.equals(k, e);
                            break;
                        case"equalsignorecase":
                            h = a.jqx.string.equalsIgnoreCase(k, e);
                            break;
                        case"startswith":
                            h = a.jqx.string.startsWith(k, e);
                            break;
                        case"startswithignorecase":
                            h = a.jqx.string.startsWithIgnoreCase(k, e);
                            break;
                        case"endswith":
                            h = a.jqx.string.endsWith(k, e);
                            break;
                        case"endswithignorecase":
                            h = a.jqx.string.endsWithIgnoreCase(k, e);
                            break
                    }
                    if (h) {
                        f[c++] = this
                    }
                }
            });
            return f
        }, _handleKeyDown: function (b) {
            var p = b.keyCode;
            var q = this;
            var k = q.selectedIndex;
            var d = q.selectedIndex;
            var m = false;
            if (!this.keyboardNavigation) {
                return
            }
            var i = function () {
                if (q.multiple) {
                    q.clearSelection(false)
                }
            };
            if (b.altKey) {
                p = -1
            }
            if (q.incrementalSearch) {
                var r = -1;
                if (!q._searchString) {
                    q._searchString = ""
                }
                if ((p == 8 || p == 46) && q._searchString.length >= 1) {
                    q._searchString = q._searchString.substr(0, q._searchString.length - 1)
                }
                var c = String.fromCharCode(p);
                var l = (!isNaN(parseInt(c)));
                if ((p >= 65 && p <= 97) || l || p == 8 || p == 32 || p == 46) {
                    if (!b.shiftKey) {
                        c = c.toLocaleLowerCase()
                    }
                    var o = 1 + q.selectedIndex;
                    if (p != 8 && p != 32 && p != 46) {
                        if (q._searchString.length > 0 && q._searchString.substr(0, 1) == c) {
                            o = 1 + q.selectedIndex
                        } else {
                            q._searchString += c
                        }
                    }
                    if (p == 32) {
                        q._searchString += " "
                    }
                    var h = this._getMatches(q._searchString, o);
                    r = h;
                    if (r == q._lastMatchIndex || r == -1) {
                        var h = this._getMatches(q._searchString, 0);
                        r = h
                    }
                    q._lastMatchIndex = r;
                    if (r >= 0) {
                        i();
                        q.selectIndex(r, false, false, false, "keyboard", b);
                        var e = q.isIndexInView(r);
                        if (!e) {
                            q.ensureVisible(r)
                        } else {
                            q._renderItems()
                        }
                    }
                }
                if (q._searchTimer != undefined) {
                    clearTimeout(q._searchTimer)
                }
                if (p == 27 || p == 13) {
                    q._searchString = ""
                }
                q._searchTimer = setTimeout(function () {
                    q._searchString = ""
                }, q.incrementalSearchDelay);
                if (r >= 0) {
                    return
                }
            }
            if (this.checkboxes) {
                return true
            }
            if (p == 33) {
                var g = q._itemsInPage();
                if (q.selectedIndex - g >= 0) {
                    i();
                    q.selectIndex(d - g, false, false, false, "keyboard", b)
                } else {
                    i();
                    q.selectIndex(q._firstItemIndex(), false, false, false, "keyboard", b)
                }
                q._searchString = ""
            }
            if (p == 32 && this.checkboxes) {
                var f = this.getItem(k);
                if (f != null) {
                    q._updateItemCheck(f, k);
                    b.preventDefault()
                }
                q._searchString = ""
            }
            if (p == 36) {
                i();
                q.selectIndex(q._firstItemIndex(), false, false, false, "keyboard", b);
                q._searchString = ""
            }
            if (p == 35) {
                i();
                q.selectIndex(q._lastItemIndex(), false, false, false, "keyboard", b);
                q._searchString = ""
            }
            if (p == 34) {
                var g = q._itemsInPage();
                if (q.selectedIndex + g < q.visibleItems.length) {
                    i();
                    q.selectIndex(d + g, false, false, false, "keyboard", b)
                } else {
                    i();
                    q.selectIndex(q._lastItemIndex(), false, false, false, "keyboard", b)
                }
                q._searchString = ""
            }
            if (p == 38) {
                q._searchString = "";
                if (q.selectedIndex > 0) {
                    var n = q._prevItemIndex(q.selectedIndex);
                    if (n != q.selectedIndex && n != -1) {
                        i();
                        q.selectIndex(n, false, false, false, "keyboard", b)
                    } else {
                        return true
                    }
                } else {
                    return false
                }
            } else {
                if (p == 40) {
                    q._searchString = "";
                    if (q.selectedIndex + 1 < q.visibleItems.length) {
                        var n = q._nextItemIndex(q.selectedIndex);
                        if (n != q.selectedIndex && n != -1) {
                            i();
                            q.selectIndex(n, false, false, false, "keyboard", b)
                        } else {
                            return true
                        }
                    } else {
                        return false
                    }
                }
            }
            if (p == 35 || p == 36 || p == 38 || p == 40 || p == 34 || p == 33) {
                var e = q.isIndexInView(q.selectedIndex);
                if (!e) {
                    q.ensureVisible(q.selectedIndex)
                } else {
                    q._renderItems()
                }
                return false
            }
            return true
        }, _updateItemCheck: function (b, c) {
            if (b.checked == true) {
                b.checked = this.hasThreeStates ? null : false
            } else {
                b.checked = b.checked != null
            }
            switch (b.checked) {
                case true:
                    this.checkIndex(c);
                    break;
                case false:
                    this.uncheckIndex(c);
                    break;
                default:
                    this.indeterminateIndex(c);
                    break
            }
        }, wheel: function (d, c) {
            if (c.autoHeight || !c.enableMouseWheel) {
                d.returnValue = true;
                return true
            }
            var e = 0;
            if (!d) {
                d = window.event
            }
            if (d.originalEvent && d.originalEvent.wheelDelta) {
                d.wheelDelta = d.originalEvent.wheelDelta
            }
            if (d.wheelDelta) {
                e = d.wheelDelta / 120
            } else {
                if (d.detail) {
                    e = -d.detail / 3
                }
            }
            if (e) {
                var b = c._handleDelta(e);
                if (b) {
                    if (d.preventDefault) {
                        d.preventDefault()
                    }
                    if (d.originalEvent != null) {
                        d.originalEvent.mouseHandled = true
                    }
                    if (d.stopPropagation != undefined) {
                        d.stopPropagation()
                    }
                }
                if (b) {
                    b = false;
                    d.returnValue = b;
                    return b
                } else {
                    return false
                }
            }
            if (d.preventDefault) {
                d.preventDefault()
            }
            d.returnValue = false
        }, _handleDelta: function (d) {
            var c = this.vScrollInstance.value;
            if (d < 0) {
                this.scrollDown()
            } else {
                this.scrollUp()
            }
            var b = this.vScrollInstance.value;
            if (c != b) {
                return true
            }
            return false
        }, getTouches: function (b) {
            if (b.originalEvent) {
                if (b.originalEvent.touches && b.originalEvent.touches.length) {
                    return b.originalEvent.touches
                } else {
                    if (b.originalEvent.changedTouches && b.originalEvent.changedTouches.length) {
                        return b.originalEvent.changedTouches
                    }
                }
            }
            if (!b.touches) {
                b.touches = new Array();
                b.touches[0] = b.originalEvent
            }
            return b.touches
        }, focus: function () {
            this.focused = true;
            this.content.focus();
            var b = this;
            setTimeout(function () {
                b.content.focus()
            }, 10)
        }, _removeHandlers: function () {
            var b = this;
            this.removeHandler(a(document), "keydown.listbox" + this.element.id);
            this.removeHandler(a(document), "keyup.listbox" + this.element.id);
            this.removeHandler(this.vScrollBar, "valuechanged");
            this.removeHandler(this.hScrollBar, "valuechanged");
            this.removeHandler(this.host, "mousewheel");
            this.removeHandler(this.host, "keydown");
            this.removeHandler(this.content, "mouseleave");
            this.removeHandler(this.content, "focus");
            this.removeHandler(this.content, "blur");
            this.removeHandler(this.content, "mouseenter");
            this.removeHandler(this.content, "mouseup");
            this.removeHandler(this.content, "mousedown");
            this.removeHandler(this.content, "touchend");
            this.removeHandler(this.content, "mousemove");
            if (a.browser.msie) {
                this.removeHandler(this.content, "selectstart")
            }
            if (this.overlayContent) {
                this.removeHandler(this.overlayContent, "touchend")
            }
        }, _addHandlers: function () {
            var k = this;
            this.focused = false;
            var l = false;
            var i = 0;
            var e = null;
            var i = 0;
            var b = 0;
            var g = new Date();
            var d = this.isTouchDevice();
            if ((this.width != null && this.width.toString().indexOf("%") != -1) || (this.height != null && this.height.toString().indexOf("%") != -1)) {
                a(window).unbind("resize." + this.element.id);
                a(window).bind("resize." + this.element.id, function () {
                    if (k.host.height() != k._oldheight || k.host.width() != k._oldwidth) {
                        k._oldwidth = k.host.width();
                        k._oldheight = k.host.height();
                        if (k.items) {
                            if (k.items.length > 0 && k.virtualItemsCount * k.items[0].height < k._oldheight) {
                                k._render(false)
                            } else {
                                k._updatescrollbars();
                                k._renderItems()
                            }
                        }
                    }
                })
            }
            this.addHandler(this.vScrollBar, "valuechanged", function (m) {
                if (a.browser.msie && a.browser.version > 9) {
                    setTimeout(function () {
                        k._renderItems()
                    }, 1)
                } else {
                    k._renderItems()
                }
            });
            this.addHandler(this.hScrollBar, "valuechanged", function () {
                k._renderItems()
            });
            this.addHandler(this.host, "mousewheel", function (m) {
                k.wheel(m, k)
            });
            this.addHandler(a(document), "keydown.listbox" + this.element.id, function (m) {
                k._ctrlKey = m.ctrlKey;
                k._shiftKey = m.shiftKey
            });
            this.addHandler(a(document), "keyup.listbox" + this.element.id, function (m) {
                k._ctrlKey = m.ctrlKey;
                k._shiftKey = m.shiftKey
            });
            this.addHandler(this.host, "keydown", function (m) {
                if (k.focused) {
                    return k._handleKeyDown(m)
                }
            });
            this.addHandler(this.content, "mouseleave", function (m) {
                k.focused = false;
                var n = a.data(k.element, "hoveredItem");
                if (n != null) {
                    a(n).removeClass(k.toThemeProperty("jqx-listitem-state-hover"));
                    a(n).removeClass(k.toThemeProperty("jqx-fill-state-hover"))
                }
            });
            this.addHandler(this.content, "focus", function (m) {
                k.focused = true
            });
            this.addHandler(this.content, "blur", function (m) {
                k.focused = false
            });
            this.addHandler(this.content, "mouseenter", function (m) {
                k.focused = true
            });
            if (this.enableSelection) {
                var f = k.isTouchDevice();
                var h = !f ? "mousedown" : "touchend";
                if (this.overlayContent) {
                    this.addHandler(this.overlayContent, "touchend", function (o) {
                        if (f) {
                            k._newScroll = new Date();
                            if (k._newScroll - k._lastScroll < 500) {
                                return false
                            }
                        }
                        var r = k.getTouches(o);
                        var q = r[0];
                        var s = k.host.offset();
                        var p = parseInt(q.pageX);
                        var t = parseInt(q.pageY);
                        if (k.touchmode == true) {
                            p = parseInt(q._pageX);
                            t = parseInt(q._pageY)
                        }
                        p = p - s.left;
                        t = t - s.top;
                        var u = k._hitTest(p, t);
                        if (u != null && !u.isGroup) {
                            if (k.checkboxes) {
                                var n = a(u.element).offset();
                                var m = parseInt(n.left);
                                if (p <= m + 20) {
                                    if (u.checked) {
                                        k.uncheckIndex(u.visibleIndex)
                                    } else {
                                        k.checkIndex(u.visibleIndex)
                                    }
                                }
                            }
                            if (u.html.indexOf("href") != -1) {
                                setTimeout(function () {
                                    k.selectIndex(u.visibleIndex, false, true, false, "mouse", o)
                                }, 100)
                            } else {
                                k.selectIndex(u.visibleIndex, false, true, false, "mouse", o)
                            }
                        }
                    })
                }
                var c = a.jqx.utilities.hasTransform(this.host);
                this.addHandler(this.content, h, function (m) {
                    if (f) {
                        k._newScroll = new Date();
                        if (k._newScroll - k._lastScroll < 500) {
                            return false
                        }
                    }
                    k.focused = true;
                    if (!k.isTouchDevice()) {
                        k.content.focus()
                    }
                    if (m.target.id != ("listBoxContent" + k.element.id) && k.itemswrapper[0] != m.target) {
                        var q = m.target;
                        var v = a(q).offset();
                        var p = k.host.offset();
                        if (c) {
                            var n = a.jqx.mobile.getLeftPos(q);
                            var s = a.jqx.mobile.getTopPos(q);
                            v.left = n;
                            v.top = s;
                            n = a.jqx.mobile.getLeftPos(k.element);
                            s = a.jqx.mobile.getTopPos(k.element);
                            p.left = n;
                            p.top = s
                        }
                        var r = parseInt(v.top) - parseInt(p.top);
                        var t = parseInt(v.left) - parseInt(p.left);
                        var u = k._hitTest(t, r);
                        if (u != null && !u.isGroup) {
                            var o = function (x, w) {
                                if (!k._shiftKey) {
                                    k._clickedIndex = x.visibleindex
                                }
                                if (!k.checkboxes) {
                                    k.selectIndex(x.visibleIndex, false, true, false, "mouse", w)
                                } else {
                                    k.selectedIndex = x.visibleIndex;
                                    if (t >= 20) {
                                        k._updateItemCheck(x, x.visibleIndex)
                                    }
                                }
                            };
                            if (u.html.indexOf("href") != -1) {
                                setTimeout(function () {
                                    o(u, m)
                                }, 100)
                            } else {
                                o(u, m)
                            }
                        }
                        if (h == "mousedown") {
                            return false
                        }
                    }
                    return true
                });
                this.addHandler(this.content, "mouseup", function (m) {
                    k.vScrollInstance.handlemouseup(k, m)
                });
                if (a.browser.msie) {
                    this.addHandler(this.content, "selectstart", function (m) {
                        return false
                    })
                }
            }
            var d = this.isTouchDevice();
            if (this.enableHover && !d) {
                this.addHandler(this.content, "mousemove", function (m) {
                    if (d) {
                        return true
                    }
                    if (!k.enableHover) {
                        return true
                    }
                    var o = a.browser.msie == true && a.browser.version < 9 ? 0 : 1;
                    if (m.target == null) {
                        return true
                    }
                    if (k.disabled) {
                        return true
                    }
                    k.focused = true;
                    var q = k.vScrollInstance.isScrolling();
                    if (!q && m.target.id != ("listBoxContent" + k.element.id)) {
                        if (k.itemswrapper[0] != m.target) {
                            var s = m.target;
                            var A = a(s).offset();
                            var r = k.host.offset();
                            if (c) {
                                var n = a.jqx.mobile.getLeftPos(s);
                                var u = a.jqx.mobile.getTopPos(s);
                                A.left = n;
                                A.top = u;
                                n = a.jqx.mobile.getLeftPos(k.element);
                                u = a.jqx.mobile.getTopPos(k.element);
                                r.left = n;
                                r.top = u
                            }
                            var t = parseInt(A.top) - parseInt(r.top);
                            var v = parseInt(A.left) - parseInt(r.left);
                            var z = k._hitTest(v, t);
                            if (z != null && !z.isGroup && !z.disabled) {
                                var p = a.data(k.element, "hoveredItem");
                                if (p != null) {
                                    a(p).removeClass(k.toThemeProperty("jqx-listitem-state-hover"));
                                    a(p).removeClass(k.toThemeProperty("jqx-fill-state-hover"))
                                }
                                a.data(k.element, "hoveredItem", z.element);
                                var w = a(z.element);
                                w.addClass(k.toThemeProperty("jqx-listitem-state-hover"));
                                w.addClass(k.toThemeProperty("jqx-fill-state-hover"))
                            }
                        }
                    }
                })
            }
        }, _arrange: function () {
            var c = null;
            var l = null;
            var h = this;
            var f = function (o) {
                o = h.host.height();
                if (o == 0) {
                    o = 200;
                    h.host.height(o)
                }
                return o
            };
            if (this.width != null && this.width.toString().indexOf("px") != -1) {
                c = this.width
            } else {
                if (this.width != undefined && !isNaN(this.width)) {
                    c = this.width
                }
            }
            if (this.height != null && this.height.toString().indexOf("px") != -1) {
                l = this.height
            } else {
                if (this.height != undefined && !isNaN(this.height)) {
                    l = this.height
                }
            }
            if (this.width != null && this.width.toString().indexOf("%") != -1) {
                this.host.width(this.width);
                c = this.host.width()
            }
            if (this.height != null && this.height.toString().indexOf("%") != -1) {
                this.host.height(this.height);
                l = f(l)
            }
            var k = this.host.css("border-width");
            if (k == null) {
                k = 0
            }
            if (c != null) {
                c = parseInt(c);
                if (parseInt(this.element.style.width) != parseInt(this.width)) {
                    this.host.width(this.width)
                }
            }
            if (!this.autoHeight) {
                if (l != null) {
                    l = parseInt(l);
                    if (parseInt(this.element.style.height) != parseInt(this.height)) {
                        this.host.height(this.height);
                        f(l)
                    }
                }
            } else {
                if (this.virtualSize) {
                    if (this.hScrollBar.css("visibility") != "hidden") {
                        this.host.height(this.virtualSize.height + parseInt(this.scrollBarSize) + 3);
                        this.height = this.virtualSize.height + parseInt(this.scrollBarSize) + 3
                    } else {
                        this.host.height(this.virtualSize.height);
                        this.height = this.virtualSize.height
                    }
                }
            }
            var b = this.scrollBarSize;
            if (isNaN(b)) {
                b = parseInt(b);
                if (isNaN(b)) {
                    b = "17px"
                } else {
                    b = b + "px"
                }
            }
            b = parseInt(b);
            var g = 4;
            var n = 2;
            var i = 0;
            if (this.vScrollBar) {
                if (this.vScrollBar[0].style.visibility != "hidden") {
                    i = b + g
                } else {
                    this.vScrollInstance.setPosition(0)
                }
            } else {
                return
            }
            if (this.hScrollBar) {
                if (this.hScrollBar[0].style.visibility != "hidden") {
                    n = b + g
                } else {
                    this.hScrollInstance.setPosition(0)
                }
            } else {
                return
            }
            var m = parseInt(l) - g - b;
            if (m < 0) {
                m = 0
            }
            this.hScrollBar.height(b);
            this.hScrollBar.css({top: m + "px", left: "0px"});
            this.hScrollBar.width(c - b - g + "px");
            if (i == 0) {
                this.hScrollBar.width(c - 2)
            }
            if (b != parseInt(this.vScrollBar[0].style.width)) {
                this.vScrollBar.width(b)
            }
            if ((parseInt(l) - n) != parseInt(this.vScrollBar[0].style.height)) {
                this.vScrollBar.height(parseInt(l) - n + "px")
            }
            this.vScrollBar.css({left: parseInt(c) - parseInt(b) - g + "px", top: "0px"});
            var e = this.vScrollInstance;
            e.disabled = this.disabled;
            e._arrange();
            var d = this.hScrollInstance;
            d.disabled = this.disabled;
            d._arrange();
            if ((this.vScrollBar[0].style.visibility != "hidden") && (this.hScrollBar[0].style.visibility != "hidden")) {
                this.bottomRight.css("visibility", "inherit");
                this.bottomRight.css({
                    left: 1 + parseInt(this.vScrollBar.css("left")),
                    top: 1 + parseInt(this.hScrollBar.css("top"))
                });
                this.bottomRight.width(parseInt(b) + 3);
                this.bottomRight.height(parseInt(b) + 3)
            } else {
                this.bottomRight.css("visibility", "hidden")
            }
            if (parseInt(this.content[0].style.width) != (parseInt(c) - i)) {
                this.content.width(parseInt(c) - i)
            }
            if (parseInt(this.content[0].style.height) != (parseInt(l) - n)) {
                this.content.height(parseInt(l) - n)
            }
            if (this.overlayContent) {
                this.overlayContent.width(parseInt(c) - i);
                this.overlayContent.height(parseInt(l) - n)
            }
        }, ensureVisible: function (d) {
            var c = this.isIndexInView(d);
            if (!c) {
                if (d < 0) {
                    return
                }
                if (this.autoHeight) {
                    var b = a.data(this.vScrollBar[0], "jqxScrollBar").instance;
                    b.setPosition(0)
                } else {
                    for (indx = 0; indx < this.visibleItems.length; indx++) {
                        var e = this.visibleItems[indx];
                        if (e.visibleIndex == d && !e.isGroup) {
                            var b = a.data(this.vScrollBar[0], "jqxScrollBar").instance;
                            b.setPosition(e.initialTop);
                            break
                        }
                    }
                }
            }
            this._renderItems()
        }, scrollDown: function () {
            if (this.vScrollBar.css("visibility") == "hidden") {
                return false
            }
            var b = this.vScrollInstance;
            if (b.value + b.largestep <= b.max) {
                b.setPosition(b.value + b.largestep);
                return true
            } else {
                b.setPosition(b.max);
                return true
            }
            return false
        }, scrollUp: function () {
            if (this.vScrollBar.css("visibility") == "hidden") {
                return false
            }
            var b = this.vScrollInstance;
            if (b.value - b.largestep >= b.min) {
                b.setPosition(b.value - b.largestep);
                return true
            } else {
                if (b.value != b.min) {
                    b.setPosition(b.min);
                    return true
                }
            }
            return false
        }, databind: function (h) {
            this.records = new Array();
            var d = h._source ? true : false;
            var i = new a.jqx.dataAdapter(h, {autoBind: false});
            if (d) {
                i = h;
                h = h._source
            }
            var g = function (k) {
                if (h.type != undefined) {
                    i._options.type = h.type
                }
                if (h.formatdata != undefined) {
                    i._options.formatData = h.formatdata
                }
                if (h.contenttype != undefined) {
                    i._options.contentType = h.contenttype
                }
                if (h.async != undefined) {
                    i._options.async = h.async
                }
            };
            var c = function (q, p) {
                var r = function (s) {
                    if (typeof s === "string") {
                        var u = s;
                        var v = s
                    } else {
                        var v = s[q.valueMember];
                        var u = s[q.displayMember]
                    }
                    var t = new a.jqx._jqxListBox.item();
                    t.label = u;
                    t.value = v;
                    t.html = "";
                    t.visible = true;
                    t.originalItem = s;
                    t.group = "";
                    t.groupHtml = "";
                    t.disabled = false;
                    return t
                };
                if (p != undefined) {
                    var n = i._changedrecords[0];
                    if (n) {
                        a.each(i._changedrecords, function () {
                            var s = this.index;
                            var t = this.record;
                            if (p != "remove") {
                                var u = r(t)
                            }
                            switch (p) {
                                case"update":
                                    q.updateAt(u, s);
                                    break;
                                case"add":
                                    q.insertAt(u, s);
                                    break;
                                case"remove":
                                    q.removeAt(s);
                                    break
                            }
                        });
                        return
                    }
                }
                q.records = i.records;
                var m = q.records.length;
                q.items = new Array();
                for (var o = 0; o < m; o++) {
                    var k = q.records[o];
                    var l = r(k);
                    l.index = o;
                    q.items[o] = l
                }
                q._render()
            };
            g(this);
            var f = this;
            switch (h.datatype) {
                case"local":
                case"array":
                default:
                    if (h.localdata != null) {
                        i.dataBind();
                        c(this);
                        i.unbindBindingUpdate(this.element.id);
                        i.bindBindingUpdate(this.element.id, function (k) {
                            c(f, k)
                        })
                    }
                    break;
                case"json":
                case"jsonp":
                case"xml":
                case"xhtml":
                case"script":
                case"text":
                case"csv":
                case"tab":
                    if (h.localdata != null) {
                        i.dataBind();
                        c(this);
                        i.unbindBindingUpdate(this.element.id);
                        i.bindBindingUpdate(this.element.id, function () {
                            c(f)
                        });
                        return
                    }
                    var e = {};
                    if (i._options.data) {
                        a.extend(i._options.data, e)
                    } else {
                        if (h.data) {
                            a.extend(e, h.data)
                        }
                        i._options.data = e
                    }
                    var b = function () {
                        c(f)
                    };
                    i.unbindDownloadComplete(f.element.id);
                    i.bindDownloadComplete(f.element.id, b);
                    i.dataBind()
            }
        }, loadItems: function (h) {
            if (h == null) {
                this.groups = new Array();
                this.items = new Array();
                this.visualItems = new Array();
                return
            }
            var n = this;
            var f = 0;
            var d = 0;
            var b = 0;
            this.groups = new Array();
            this.items = new Array();
            this.visualItems = new Array();
            var e = new Array();
            a.map(h, function (s) {
                if (s == undefined) {
                    return null
                }
                var p = new a.jqx._jqxListBox.item();
                var t = s.group;
                var o = s.groupHtml;
                var u = s.title;
                if (u == null || u == undefined) {
                    u = ""
                }
                if (t == null || t == undefined) {
                    t = ""
                }
                if (o == null || o == undefined) {
                    o = ""
                }
                if (!n.groups[t]) {
                    n.groups[t] = {items: new Array(), index: -1, caption: t, captionHtml: o};
                    f++;
                    var q = f + "jqxGroup";
                    n.groups[q] = n.groups[t];
                    d++;
                    n.groups.length = d
                }
                var r = n.groups[t];
                r.index++;
                r.items[r.index] = p;
                if (typeof s === "string") {
                    p.label = s;
                    p.value = s
                } else {
                    if (s.label == null && s.value == null && s.html == null && s.group == null && s.groupHtml == null) {
                        p.label = s.toString();
                        p.value = s.toString()
                    } else {
                        p.label = s.label || s.value;
                        p.value = s.value || s.label
                    }
                }
                if (typeof s != "string") {
                    if (n.displayMember != "") {
                        if (s[n.displayMember]) {
                            p.label = s[n.displayMember]
                        }
                    }
                    if (n.valueMember != "") {
                        p.value = s[n.valueMember]
                    }
                }
                p.originalItem = s;
                p.title = u;
                p.html = s.html || "";
                p.group = t;
                p.checked = s.checked || false;
                p.groupHtml = s.groupHtml || "";
                p.disabled = s.disabled || false;
                p.visible = s.visible || true;
                p.index = b;
                e[b] = p;
                b++;
                return p
            });
            var c = new Array();
            var k = 0;
            if (this.fromSelect == undefined || this.fromSelect == false) {
                for (indx = 0; indx < d; indx++) {
                    var f = indx + 1;
                    var i = f + "jqxGroup";
                    var l = this.groups[i];
                    if (l == undefined || l == null) {
                        break
                    }
                    if (indx == 0 && l.caption == "" && l.captionHtml == "" && d <= 1) {
                        return l.items
                    } else {
                        var g = new a.jqx._jqxListBox.item();
                        g.isGroup = true;
                        g.label = l.caption;
                        if (l.caption == "" && l.captionHtml == "") {
                            l.caption = this.emptyGroupText;
                            g.label = l.caption
                        }
                        g.html = l.captionHtml;
                        c[k] = g;
                        k++
                    }
                    for (j = 0; j < l.items.length; j++) {
                        c[k] = l.items[j];
                        k++
                    }
                }
            } else {
                var k = 0;
                var m = new Array();
                a.each(e, function () {
                    if (!m[this.group]) {
                        if (this.group != "") {
                            var o = new a.jqx._jqxListBox.item();
                            o.isGroup = true;
                            o.label = this.group;
                            c[k] = o;
                            k++;
                            m[this.group] = true
                        }
                    }
                    c[k] = this;
                    k++
                })
            }
            return c
        }, _mapItem: function (c) {
            var b = new a.jqx._jqxListBox.item();
            if (typeof c === "string") {
                b.label = c;
                b.value = c
            } else {
                if (typeof c === "number") {
                    b.label = c.toString();
                    b.value = c.toString()
                } else {
                    b.label = c.label || c.value;
                    b.value = c.value || c.label
                }
            }
            if (b.label == undefined && b.value == undefined && b.html == undefined) {
                b.label = b.value = c
            }
            b.html = c.html || "";
            b.group = c.group || "";
            b.title = c.title || "";
            b.groupHtml = c.groupHtml || "";
            b.disabled = c.disabled || false;
            b.visible = c.visible || true;
            return b
        }, addItem: function (b) {
            if (this.items == undefined || this.items.length == 0) {
                this.source = new Array();
                this.source[0] = b;
                this.refresh();
                return
            }
            return this.insertAt(b, this.items.length)
        }, updateAt: function (d, c) {
            if (d != null) {
                var b = this._mapItem(d);
                this.items[c].value = b.value;
                this.items[c].label = b.label;
                this.items[c].html = b.html;
                this.items[c].disabled = b.disabled
            }
            this._cachedItemHtml = [];
            this._renderItems();
            if (this.rendered) {
                this.rendered()
            }
        }, insertAt: function (l, f) {
            if (l == null) {
                return false
            }
            this._cachedItemHtml = [];
            if (this.items == undefined || this.items.length == 0) {
                this.source = new Array();
                this.source[0] = l;
                this.refresh();
                if (this.rendered) {
                    this.rendered()
                }
                return false
            }
            var g = this._mapItem(l);
            if (f == -1 || f == undefined || f == null || f >= this.items.length) {
                g.index = this.items.length;
                this.items[this.items.length] = g
            } else {
                var c = new Array();
                var k = 0;
                var e = false;
                var h = 0;
                for (var b = 0; b < this.items.length; b++) {
                    if (this.items[b].isGroup == false) {
                        if (h >= f && !e) {
                            c[k++] = g;
                            g.index = f;
                            h++;
                            e = true
                        }
                    }
                    c[k] = this.items[b];
                    if (!this.items[b].isGroup) {
                        c[k].index = h;
                        h++
                    }
                    k++
                }
                this.items = c
            }
            this.visibleItems = new Array();
            this.renderedVisibleItems = new Array();
            var d = a.data(this.vScrollBar[0], "jqxScrollBar").instance;
            var i = d.value;
            d.setPosition(0);
            this._addItems();
            this._renderItems();
            if (this.allowDrag && this._enableDragDrop) {
                this._enableDragDrop()
            }
            d.setPosition(i);
            if (this.rendered) {
                this.rendered()
            }
            return true
        }, removeAt: function (g) {
            if (g < 0 || g > this.items.length - 1) {
                return false
            }
            var d = this.items[g].height;
            this.items.splice(g, 1);
            var c = new Array();
            var k = 0;
            var e = false;
            var h = 0;
            for (var b = 0; b < this.items.length; b++) {
                c[k] = this.items[b];
                if (!this.items[b].isGroup) {
                    c[k].index = h;
                    h++
                }
                k++
            }
            this.items = c;
            var f = a.data(this.vScrollBar[0], "jqxScrollBar").instance;
            var f = a.data(this.vScrollBar[0], "jqxScrollBar").instance;
            var i = f.value;
            f.setPosition(0);
            this.visibleItems = new Array();
            this.renderedVisibleItems = new Array();
            if (this.items.length > 0) {
                if (this.virtualSize) {
                    this.virtualSize.height -= d;
                    var l = this.virtualSize.itemsPerPage * 2;
                    if (this.autoHeight) {
                        l = this.items.length
                    }
                    this.virtualItemsCount = Math.min(l, this.items.length)
                }
                this._updatescrollbars()
            } else {
                this._addItems()
            }
            this._renderItems();
            if (this.allowDrag && this._enableDragDrop) {
                this._enableDragDrop()
            }
            if (this.vScrollBar.css("visibility") != "hidden") {
                f.setPosition(i)
            } else {
                f.setPosition(0)
            }
            if (this.rendered) {
                this.rendered()
            }
            return true
        }, removeItem: function (b) {
            this.removeAt(b.index)
        }, getItems: function () {
            return this.items
        }, disableAt: function (b) {
            if (!this.items) {
                return false
            }
            if (b < 0 || b > this.items.length - 1) {
                return false
            }
            this.items[b].disabled = true;
            this._renderItems();
            return true
        }, enableAt: function (b) {
            if (!this.items) {
                return false
            }
            if (b < 0 || b > this.items.length - 1) {
                return false
            }
            this.items[b].disabled = false;
            this._renderItems();
            return true
        }, destroy: function () {
            this._removeHandlers();
            this.vScrollBar.jqxScrollBar("destroy");
            this.hScrollBar.jqxScrollBar("destroy");
            this.vScrollBar.remove();
            this.hScrollBar.remove();
            this.host.removeClass("jqx-listbox jqx-rc-all");
            this.host.remove()
        }, _raiseEvent: function (f, c) {
            if (this._stopEvents == true) {
                return true
            }
            if (c == undefined) {
                c = {owner: null}
            }
            var d = this.events[f];
            args = c;
            args.owner = this;
            this._updateInputSelection();
            var e = new jQuery.Event(d);
            e.owner = this;
            e.args = args;
            if (this.host != null) {
                var b = this.host.trigger(e)
            }
            return b
        }
    })
})(jQuery);
(function (a) {
    a.jqx._jqxListBox.item = function () {
        var b = {
            group: "",
            groupHtml: "",
            selected: false,
            isGroup: false,
            highlighted: false,
            value: null,
            label: "",
            html: null,
            visible: true,
            disabled: false,
            element: null,
            width: null,
            height: null,
            initialTop: null,
            top: null,
            left: null,
            title: "",
            index: -1,
            checkBoxElement: null,
            originalItem: null,
            checked: false,
            visibleIndex: -1
        };
        return b
    }
})(jQuery);