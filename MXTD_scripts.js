// ----------------- ALERTA DE BIENVENIDA ----------------------------
//alert("¡Bievenido a México: Tierra de Dioses!" );

// ----------------- JAVASCRIPT INTERACTIVE CODE ----------------------------
(function() {
    var on = addEventListener
      , off = removeEventListener
      , $ = function(q) {
        return document.querySelector(q)
    }
      , $$ = function(q) {
        return document.querySelectorAll(q)
    }
      , $body = document.body
      , $inner = $('.inner')
      , client = (function() {
        var o = {
            browser: 'other',
            browserVersion: 0,
            os: 'other',
            osVersion: 0,
            mobile: false,
            canUse: null,
            flags: {
                lsdUnits: false,
            },
        }, ua = navigator.userAgent, a, i;
        a = [['firefox', /Firefox\/([0-9\.]+)/], ['edge', /Edge\/([0-9\.]+)/], ['safari', /Version\/([0-9\.]+).+Safari/], ['chrome', /Chrome\/([0-9\.]+)/], ['chrome', /CriOS\/([0-9\.]+)/], ['ie', /Trident\/.+rv:([0-9]+)/]];
        for (i = 0; i < a.length; i++) {
            if (ua.match(a[i][1])) {
                o.browser = a[i][0];
                o.browserVersion = parseFloat(RegExp.$1);
                break;
            }
        }
        a = [['ios', /([0-9_]+) like Mac OS X/, function(v) {
            return v.replace('_', '.').replace('_', '');
        }
        ], ['ios', /CPU like Mac OS X/, function(v) {
            return 0
        }
        ], ['ios', /iPad; CPU/, function(v) {
            return 0
        }
        ], ['android', /Android ([0-9\.]+)/, null], ['mac', /Macintosh.+Mac OS X ([0-9_]+)/, function(v) {
            return v.replace('_', '.').replace('_', '');
        }
        ], ['windows', /Windows NT ([0-9\.]+)/, null], ['undefined', /Undefined/, null]];
        for (i = 0; i < a.length; i++) {
            if (ua.match(a[i][1])) {
                o.os = a[i][0];
                o.osVersion = parseFloat(a[i][2] ? (a[i][2])(RegExp.$1) : RegExp.$1);
                break;
            }
        }
        if (o.os == 'mac' && ('ontouchstart'in window) && ((screen.width == 1024 && screen.height == 1366) || (screen.width == 834 && screen.height == 1112) || (screen.width == 810 && screen.height == 1080) || (screen.width == 768 && screen.height == 1024)))
            o.os = 'ios';
        o.mobile = (o.os == 'android' || o.os == 'ios');
        var _canUse = document.createElement('div');
        o.canUse = function(property, value) {
            var style;
            style = _canUse.style;
            if (!(property in style))
                return false;
            if (typeof value !== 'undefined') {
                style[property] = value;
                if (style[property] == '')
                    return false;
            }
            return true;
        }
        ;
        o.flags.lsdUnits = o.canUse('width', '100dvw');
        return o;
    }())
      , trigger = function(t) {
        dispatchEvent(new Event(t));
    }
      , cssRules = function(selectorText) {
        var ss = document.styleSheets, a = [], f = function(s) {
            var r = s.cssRules, i;
            for (i = 0; i < r.length; i++) {
                if (r[i]instanceof CSSMediaRule && matchMedia(r[i].conditionText).matches)
                    (f)(r[i]);
                else if (r[i]instanceof CSSStyleRule && r[i].selectorText == selectorText)
                    a.push(r[i]);
            }
        }, x, i;
        for (i = 0; i < ss.length; i++)
            f(ss[i]);
        return a;
    }
      , thisHash = function() {
        var h = location.hash ? location.hash.substring(1) : null, a;
        if (!h)
            return null;
        if (h.match(/\?/)) {
            a = h.split('?');
            h = a[0];
            history.replaceState(undefined, undefined, '#' + h);
            window.location.search = a[1];
        }
        if (h.length > 0 && !h.match(/^[a-zA-Z]/))
            h = 'x' + h;
        if (typeof h == 'string')
            h = h.toLowerCase();
        return h;
    }
      , scrollToElement = function(e, style, duration) {
        var y, cy, dy, start, easing, offset, f;
        if (!e)
            y = 0;
        else {
            offset = (e.dataset.scrollOffset ? parseInt(e.dataset.scrollOffset) : 0) * parseFloat(getComputedStyle(document.documentElement).fontSize);
            switch (e.dataset.scrollBehavior ? e.dataset.scrollBehavior : 'default') {
            case 'default':
            default:
                y = e.offsetTop + offset;
                break;
            case 'center':
                if (e.offsetHeight < window.innerHeight)
                    y = e.offsetTop - ((window.innerHeight - e.offsetHeight) / 2) + offset;
                else
                    y = e.offsetTop - offset;
                break;
            case 'previous':
                if (e.previousElementSibling)
                    y = e.previousElementSibling.offsetTop + e.previousElementSibling.offsetHeight + offset;
                else
                    y = e.offsetTop + offset;
                break;
            }
        }
        if (!style)
            style = 'smooth';
        if (!duration)
            duration = 750;
        if (style == 'instant') {
            window.scrollTo(0, y);
            return;
        }
        start = Date.now();
        cy = window.scrollY;
        dy = y - cy;
        switch (style) {
        case 'linear':
            easing = function(t) {
                return t
            }
            ;
            break;
        case 'smooth':
            easing = function(t) {
                return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
            }
            ;
            break;
        }
        f = function() {
            var t = Date.now() - start;
            if (t >= duration)
                window.scroll(0, y);
            else {
                window.scroll(0, cy + (dy * easing(t / duration)));
                requestAnimationFrame(f);
            }
        }
        ;
        f();
    }
      , scrollToTop = function() {
        scrollToElement(null);
    }
      , loadElements = function(parent) {
        var a, e, x, i;
        a = parent.querySelectorAll('iframe[data-src]:not([data-src=""])');
        for (i = 0; i < a.length; i++) {
            a[i].contentWindow.location.replace(a[i].dataset.src);
            a[i].dataset.initialSrc = a[i].dataset.src;
            a[i].dataset.src = '';
        }
        a = parent.querySelectorAll('video[autoplay]');
        for (i = 0; i < a.length; i++) {
            if (a[i].paused)
                a[i].play();
        }
        e = parent.querySelector('[data-autofocus="1"]');
        x = e ? e.tagName : null;
        switch (x) {
        case 'FORM':
            e = e.querySelector('.field input, .field select, .field textarea');
            if (e)
                e.focus();
            break;
        default:
            break;
        }
    }
      , unloadElements = function(parent) {
        var a, e, x, i;
        a = parent.querySelectorAll('iframe[data-src=""]');
        for (i = 0; i < a.length; i++) {
            if (a[i].dataset.srcUnload === '0')
                continue;
            if ('initialSrc'in a[i].dataset)
                a[i].dataset.src = a[i].dataset.initialSrc;
            else
                a[i].dataset.src = a[i].src;
            a[i].contentWindow.location.replace('about:blank');
        }
        a = parent.querySelectorAll('video');
        for (i = 0; i < a.length; i++) {
            if (!a[i].paused)
                a[i].pause();
        }
        e = $(':focus');
        if (e)
            e.blur();
    };
    window._scrollToTop = scrollToTop;
    var thisUrl = function() {
        return window.location.href.replace(window.location.search, '').replace(/#$/, '');
    };
    var getVar = function(name) {
        var a = window.location.search.substring(1).split('&'), b, k;
        for (k in a) {
            b = a[k].split('=');
            if (b[0] == name)
                return b[1];
        }
        return null;
    };
    var errors = {
        handle: function(handler) {
            window.onerror = function(message, url, line, column, error) {
                (handler)(error.message);
                return true;
            }
            ;
        },
        unhandle: function() {
            window.onerror = null;
        }
    };
    var loaderTimeout = setTimeout(function() {
        $body.classList.add('with-loader');
    }, 500);
    var loadHandler = function() {
        setTimeout(function() {
            clearTimeout(loaderTimeout);
            $body.classList.remove('is-loading');
            $body.classList.add('is-playing');
            setTimeout(function() {
                $body.classList.remove('with-loader');
                $body.classList.remove('is-playing');
                $body.classList.add('is-ready');
            }, 1000);
        }, 100);
    };
    on('load', loadHandler);
    setTimeout(function() {
        off('load', loadHandler);
        (loadHandler)();
    }, 3000);
    loadElements(document.body);
    (function() {
        var scrollPointParent = function(target) {
            var inner;
            inner = $('#main > .inner');
            while (target && target.parentElement != inner)
                target = target.parentElement;
            return target;
        }
          , scrollPointSpeed = function(scrollPoint) {
            let x = parseInt(scrollPoint.dataset.scrollSpeed);
            switch (x) {
            case 5:
                return 250;
            case 4:
                return 500;
            case 3:
                return 750;
            case 2:
                return 1000;
            case 1:
                return 1250;
            default:
                break;
            }
            return 750;
        }
          , doNextScrollPoint = function(event) {
            var e, target, id;
            event.preventDefault();
            event.stopPropagation();
            e = scrollPointParent(event.target);
            if (!e)
                return;
            while (e && e.nextElementSibling) {
                e = e.nextElementSibling;
                if (e.dataset.scrollId) {
                    target = e;
                    id = e.dataset.scrollId;
                    break;
                }
            }
            if (!target || !id)
                return;
            if (target.dataset.scrollInvisible == '1')
                scrollToElement(target, 'smooth', scrollPointSpeed(target));
            else
                location.href = '#' + id;
        }
          , doPreviousScrollPoint = function(e) {
            var e, target, id;
            event.preventDefault();
            event.stopPropagation();
            e = scrollPointParent(event.target);
            if (!e)
                return;
            while (e && e.previousElementSibling) {
                e = e.previousElementSibling;
                if (e.dataset.scrollId) {
                    target = e;
                    id = e.dataset.scrollId;
                    break;
                }
            }
            if (!target || !id)
                return;
            if (target.dataset.scrollInvisible == '1')
                scrollToElement(target, 'smooth', scrollPointSpeed(target));
            else
                location.href = '#' + id;
        }
          , doFirstScrollPoint = function(e) {
            var e, target, id;
            event.preventDefault();
            event.stopPropagation();
            e = scrollPointParent(event.target);
            if (!e)
                return;
            while (e && e.previousElementSibling) {
                e = e.previousElementSibling;
                if (e.dataset.scrollId) {
                    target = e;
                    id = e.dataset.scrollId;
                }
            }
            if (!target || !id)
                return;
            if (target.dataset.scrollInvisible == '1')
                scrollToElement(target, 'smooth', scrollPointSpeed(target));
            else
                location.href = '#' + id;
        }
          , doLastScrollPoint = function(e) {
            var e, target, id;
            event.preventDefault();
            event.stopPropagation();
            e = scrollPointParent(event.target);
            if (!e)
                return;
            while (e && e.nextElementSibling) {
                e = e.nextElementSibling;
                if (e.dataset.scrollId) {
                    target = e;
                    id = e.dataset.scrollId;
                }
            }
            if (!target || !id)
                return;
            if (target.dataset.scrollInvisible == '1')
                scrollToElement(target, 'smooth', scrollPointSpeed(target));
            else
                location.href = '#' + id;
        };
        window._nextScrollPoint = doNextScrollPoint;
        window._previousScrollPoint = doPreviousScrollPoint;
        window._firstScrollPoint = doFirstScrollPoint;
        window._lastScrollPoint = doLastScrollPoint;
        window._scrollToTop = function() {
            scrollToElement(null);
            if (window.location.hash) {
                history.pushState(null, null, '.');
            }
        }
        ;
        if ('scrollRestoration'in history)
            history.scrollRestoration = 'manual';
        on('load', function() {
            var initialScrollPoint, h;
            h = thisHash();
            if (h && !h.match(/^[a-zA-Z0-9\-]+$/))
                h = null;
            initialScrollPoint = $('[data-scroll-id="' + h + '"]');
            if (initialScrollPoint)
                scrollToElement(initialScrollPoint, 'instant');
        });
        on('hashchange', function(event) {
            var scrollPoint, h, pos;
            h = thisHash();
            if (h && !h.match(/^[a-zA-Z0-9\-]+$/))
                return false;
            scrollPoint = $('[data-scroll-id="' + h + '"]');
            if (scrollPoint)
                scrollToElement(scrollPoint, 'smooth', scrollPointSpeed(scrollPoint));
            else
                scrollToElement(null);
            return false;
        });
        on('click', function(event) {
            var t = event.target, tagName = t.tagName.toUpperCase(), scrollPoint;
            switch (tagName) {
            case 'IMG':
            case 'SVG':
            case 'USE':
            case 'U':
            case 'STRONG':
            case 'EM':
            case 'CODE':
            case 'S':
            case 'MARK':
            case 'SPAN':
                while (!!(t = t.parentElement))
                    if (t.tagName == 'A')
                        break;
                if (!t)
                    return;
                break;
            default:
                break;
            }
            if (t.tagName == 'A' && t.getAttribute('href').substr(0, 1) == '#') {
                if (!!(scrollPoint = $('[data-scroll-id="' + t.hash.substr(1) + '"][data-scroll-invisible="1"]'))) {
                    event.preventDefault();
                    scrollToElement(scrollPoint, 'smooth', scrollPointSpeed(scrollPoint));
                } else if (t.hash == window.location.hash) {
                    event.preventDefault();
                    history.replaceState(undefined, undefined, '#');
                    location.replace(t.hash);
                }
            }
        });
    }
    )();
    var style, sheet, rule;
    style = document.createElement('style');
    style.appendChild(document.createTextNode(''));
    document.head.appendChild(style);
    sheet = style.sheet;
    if (client.mobile) {
        (function() {
            if (client.flags.lsdUnits) {
                document.documentElement.style.setProperty('--viewport-height', '100svh');
                document.documentElement.style.setProperty('--background-height', '100lvh');
            } else {
                var f = function() {
                    document.documentElement.style.setProperty('--viewport-height', window.innerHeight + 'px');
                    document.documentElement.style.setProperty('--background-height', (window.innerHeight + 250) + 'px');
                };
                on('load', f);
                on('orientationchange', function() {
                    setTimeout(function() {
                        (f)();
                    }, 100);
                });
            }
        }
        )();
    }
    if (client.os == 'android') {
        (function() {
            sheet.insertRule('body::after { }', 0);
            rule = sheet.cssRules[0];
            var f = function() {
                rule.style.cssText = 'height: ' + (Math.max(screen.width, screen.height)) + 'px';
            };
            on('load', f);
            on('orientationchange', f);
            on('touchmove', f);
        }
        )();
        $body.classList.add('is-touch');
    } else if (client.os == 'ios') {
        if (client.osVersion <= 11)
            (function() {
                sheet.insertRule('body::after { }', 0);
                rule = sheet.cssRules[0];
                rule.style.cssText = '-webkit-transform: scale(1.0)';
            }
            )();
        if (client.osVersion <= 11)
            (function() {
                sheet.insertRule('body.ios-focus-fix::before { }', 0);
                rule = sheet.cssRules[0];
                rule.style.cssText = 'height: calc(100% + 60px)';
                on('focus', function(event) {
                    $body.classList.add('ios-focus-fix');
                }, true);
                on('blur', function(event) {
                    $body.classList.remove('ios-focus-fix');
                }, true);
            }
            )();
        $body.classList.add('is-touch');
    }
    (function() {
        var breakpoints = {
            small: '(max-width: 736px)',
            medium: '(max-width: 980px)',
        }
          , elements = $$('[data-reorder]');
        elements.forEach(function(e) {
            var desktop = [], mobile = [], state = false, query, a, x, ce, f;
            if ('reorderBreakpoint'in e.dataset && e.dataset.reorderBreakpoint in breakpoints)
                query = breakpoints[e.dataset.reorderBreakpoint];
            else
                query = breakpoints.small;
            for (ce of e.childNodes) {
                if (ce.nodeType != 1)
                    continue;
                desktop.push(ce);
            }
            a = e.dataset.reorder.split(',');
            for (x of a)
                mobile.push(desktop[parseInt(x)]);
            f = function() {
                var order = null, ce;
                if (window.matchMedia(query).matches) {
                    if (!state) {
                        state = true;
                        for (ce of mobile)
                            e.appendChild(ce);
                    }
                } else {
                    if (state) {
                        state = false;
                        for (ce of desktop)
                            e.appendChild(ce);
                    }
                }
            }
            ;
            on('resize', f);
            on('orientationchange', f);
            on('load', f);
            on('fullscreenchange', f);
        });
    }
    )();
    var scrollEvents = {
        items: [],
        add: function(o) {
            this.items.push({
                element: o.element,
                triggerElement: (('triggerElement'in o && o.triggerElement) ? o.triggerElement : o.element),
                enter: ('enter'in o ? o.enter : null),
                leave: ('leave'in o ? o.leave : null),
                mode: ('mode'in o ? o.mode : 3),
                offset: ('offset'in o ? o.offset : 0),
                initialState: ('initialState'in o ? o.initialState : null),
                state: false,
            });
        },
        handler: function() {
            var height, top, bottom, scrollPad;
            if (client.os == 'ios') {
                height = document.documentElement.clientHeight;
                top = document.body.scrollTop + window.scrollY;
                bottom = top + height;
                scrollPad = 125;
            } else {
                height = document.documentElement.clientHeight;
                top = document.documentElement.scrollTop;
                bottom = top + height;
                scrollPad = 0;
            }
            scrollEvents.items.forEach(function(item) {
                var bcr, elementTop, elementBottom, state, a, b;
                if (!item.enter && !item.leave)
                    return true;
                if (!item.triggerElement)
                    return true;
                if (item.triggerElement.offsetParent === null) {
                    if (item.state == true && item.leave) {
                        item.state = false;
                        (item.leave).apply(item.element);
                        if (!item.enter)
                            item.leave = null;
                    }
                    return true;
                }
                bcr = item.triggerElement.getBoundingClientRect();
                elementTop = top + Math.floor(bcr.top);
                elementBottom = elementTop + bcr.height;
                if (item.initialState !== null) {
                    state = item.initialState;
                    item.initialState = null;
                } else {
                    switch (item.mode) {
                    case 1:
                    default:
                        state = (bottom > (elementTop - item.offset) && top < (elementBottom + item.offset));
                        break;
                    case 2:
                        a = (top + (height * 0.5));
                        state = (a > (elementTop - item.offset) && a < (elementBottom + item.offset));
                        break;
                    case 3:
                        a = top + (height * 0.25);
                        if (a - (height * 0.375) <= 0)
                            a = 0;
                        b = top + (height * 0.75);
                        if (b + (height * 0.375) >= document.body.scrollHeight - scrollPad)
                            b = document.body.scrollHeight + scrollPad;
                        state = (b > (elementTop - item.offset) && a < (elementBottom + item.offset));
                        break;
                    }
                }
                if (state != item.state) {
                    item.state = state;
                    if (item.state) {
                        if (item.enter) {
                            (item.enter).apply(item.element);
                            if (!item.leave)
                                item.enter = null;
                        }
                    } else {
                        if (item.leave) {
                            (item.leave).apply(item.element);
                            if (!item.enter)
                                item.leave = null;
                        }
                    }
                }
            });
        },
        init: function() {
            on('load', this.handler);
            on('resize', this.handler);
            on('scroll', this.handler);
            (this.handler)();
        }
    };
    scrollEvents.init();
    var onvisible = {
        effects: {
            'blur-in': {
                transition: function(speed, delay) {
                    return 'opacity ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '') + ', ' + 'filter ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '');
                },
                rewind: function(intensity) {
                    this.style.opacity = 0;
                    this.style.filter = 'blur(' + (0.25 * intensity) + 'rem)';
                },
                play: function() {
                    this.style.opacity = 1;
                    this.style.filter = 'none';
                },
            },
            'zoom-in': {
                transition: function(speed, delay) {
                    return 'opacity ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '') + ', ' + 'transform ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '');
                },
                rewind: function(intensity, alt) {
                    this.style.opacity = 0;
                    this.style.transform = 'scale(' + (1 - ((alt ? 0.25 : 0.05) * intensity)) + ')';
                },
                play: function() {
                    this.style.opacity = 1;
                    this.style.transform = 'none';
                },
            },
            'zoom-out': {
                transition: function(speed, delay) {
                    return 'opacity ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '') + ', ' + 'transform ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '');
                },
                rewind: function(intensity, alt) {
                    this.style.opacity = 0;
                    this.style.transform = 'scale(' + (1 + ((alt ? 0.25 : 0.05) * intensity)) + ')';
                },
                play: function() {
                    this.style.opacity = 1;
                    this.style.transform = 'none';
                },
            },
            'slide-left': {
                transition: function(speed, delay) {
                    return 'transform ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '');
                },
                rewind: function() {
                    this.style.transform = 'translateX(100vw)';
                },
                play: function() {
                    this.style.transform = 'none';
                },
            },
            'slide-right': {
                transition: function(speed, delay) {
                    return 'transform ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '');
                },
                rewind: function() {
                    this.style.transform = 'translateX(-100vw)';
                },
                play: function() {
                    this.style.transform = 'none';
                },
            },
            'flip-forward': {
                transition: function(speed, delay) {
                    return 'opacity ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '') + ', ' + 'transform ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '');
                },
                rewind: function(intensity, alt) {
                    this.style.opacity = 0;
                    this.style.transformOrigin = '50% 50%';
                    this.style.transform = 'perspective(1000px) rotateX(' + ((alt ? 45 : 15) * intensity) + 'deg)';
                },
                play: function() {
                    this.style.opacity = 1;
                    this.style.transform = 'none';
                },
            },
            'flip-backward': {
                transition: function(speed, delay) {
                    return 'opacity ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '') + ', ' + 'transform ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '');
                },
                rewind: function(intensity, alt) {
                    this.style.opacity = 0;
                    this.style.transformOrigin = '50% 50%';
                    this.style.transform = 'perspective(1000px) rotateX(' + ((alt ? -45 : -15) * intensity) + 'deg)';
                },
                play: function() {
                    this.style.opacity = 1;
                    this.style.transform = 'none';
                },
            },
            'flip-left': {
                transition: function(speed, delay) {
                    return 'opacity ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '') + ', ' + 'transform ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '');
                },
                rewind: function(intensity, alt) {
                    this.style.opacity = 0;
                    this.style.transformOrigin = '50% 50%';
                    this.style.transform = 'perspective(1000px) rotateY(' + ((alt ? 45 : 15) * intensity) + 'deg)';
                },
                play: function() {
                    this.style.opacity = 1;
                    this.style.transform = 'none';
                },
            },
            'flip-right': {
                transition: function(speed, delay) {
                    return 'opacity ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '') + ', ' + 'transform ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '');
                },
                rewind: function(intensity, alt) {
                    this.style.opacity = 0;
                    this.style.transformOrigin = '50% 50%';
                    this.style.transform = 'perspective(1000px) rotateY(' + ((alt ? -45 : -15) * intensity) + 'deg)';
                },
                play: function() {
                    this.style.opacity = 1;
                    this.style.transform = 'none';
                },
            },
            'tilt-left': {
                transition: function(speed, delay) {
                    return 'opacity ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '') + ', ' + 'transform ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '');
                },
                rewind: function(intensity, alt) {
                    this.style.opacity = 0;
                    this.style.transform = 'rotate(' + ((alt ? 45 : 5) * intensity) + 'deg)';
                },
                play: function() {
                    this.style.opacity = 1;
                    this.style.transform = 'none';
                },
            },
            'tilt-right': {
                transition: function(speed, delay) {
                    return 'opacity ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '') + ', ' + 'transform ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '');
                },
                rewind: function(intensity, alt) {
                    this.style.opacity = 0;
                    this.style.transform = 'rotate(' + ((alt ? -45 : -5) * intensity) + 'deg)';
                },
                play: function() {
                    this.style.opacity = 1;
                    this.style.transform = 'none';
                },
            },
            'fade-right': {
                transition: function(speed, delay) {
                    return 'opacity ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '') + ', ' + 'transform ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '');
                },
                rewind: function(intensity) {
                    this.style.opacity = 0;
                    this.style.transform = 'translateX(' + (-1.5 * intensity) + 'rem)';
                },
                play: function() {
                    this.style.opacity = 1;
                    this.style.transform = 'none';
                },
            },
            'fade-left': {
                transition: function(speed, delay) {
                    return 'opacity ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '') + ', ' + 'transform ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '');
                },
                rewind: function(intensity) {
                    this.style.opacity = 0;
                    this.style.transform = 'translateX(' + (1.5 * intensity) + 'rem)';
                },
                play: function() {
                    this.style.opacity = 1;
                    this.style.transform = 'none';
                },
            },
            'fade-down': {
                transition: function(speed, delay) {
                    return 'opacity ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '') + ', ' + 'transform ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '');
                },
                rewind: function(intensity) {
                    this.style.opacity = 0;
                    this.style.transform = 'translateY(' + (-1.5 * intensity) + 'rem)';
                },
                play: function() {
                    this.style.opacity = 1;
                    this.style.transform = 'none';
                },
            },
            'fade-up': {
                transition: function(speed, delay) {
                    return 'opacity ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '') + ', ' + 'transform ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '');
                },
                rewind: function(intensity) {
                    this.style.opacity = 0;
                    this.style.transform = 'translateY(' + (1.5 * intensity) + 'rem)';
                },
                play: function() {
                    this.style.opacity = 1;
                    this.style.transform = 'none';
                },
            },
            'fade-in': {
                transition: function(speed, delay) {
                    return 'opacity ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '');
                },
                rewind: function() {
                    this.style.opacity = 0;
                },
                play: function() {
                    this.style.opacity = 1;
                },
            },
            'fade-in-background': {
                custom: true,
                transition: function(speed, delay) {
                    this.style.setProperty('--onvisible-speed', speed + 's');
                    if (delay)
                        this.style.setProperty('--onvisible-delay', delay + 's');
                },
                rewind: function() {
                    this.style.removeProperty('--onvisible-background-color');
                },
                play: function() {
                    this.style.setProperty('--onvisible-background-color', 'rgba(0,0,0,0.001)');
                },
            },
            'zoom-in-image': {
                target: 'img',
                transition: function(speed, delay) {
                    return 'transform ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '');
                },
                rewind: function() {
                    this.style.transform = 'scale(1)';
                },
                play: function(intensity) {
                    this.style.transform = 'scale(' + (1 + (0.1 * intensity)) + ')';
                },
            },
            'zoom-out-image': {
                target: 'img',
                transition: function(speed, delay) {
                    return 'transform ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '');
                },
                rewind: function(intensity) {
                    this.style.transform = 'scale(' + (1 + (0.1 * intensity)) + ')';
                },
                play: function() {
                    this.style.transform = 'none';
                },
            },
            'focus-image': {
                target: 'img',
                transition: function(speed, delay) {
                    return 'transform ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '') + ', ' + 'filter ' + speed + 's ease' + (delay ? ' ' + delay + 's' : '');
                },
                rewind: function(intensity) {
                    this.style.transform = 'scale(' + (1 + (0.05 * intensity)) + ')';
                    this.style.filter = 'blur(' + (0.25 * intensity) + 'rem)';
                },
                play: function(intensity) {
                    this.style.transform = 'none';
                    this.style.filter = 'none';
                },
            },
        },
        add: function(selector, settings) {
            var style = settings.style in this.effects ? settings.style : 'fade'
              , speed = parseInt('speed'in settings ? settings.speed : 1000) / 1000
              , intensity = ((parseInt('intensity'in settings ? settings.intensity : 5) / 10) * 1.75) + 0.25
              , delay = parseInt('delay'in settings ? settings.delay : 0) / 1000
              , replay = 'replay'in settings ? settings.replay : false
              , stagger = 'stagger'in settings ? (parseInt(settings.stagger) > -125 ? (parseInt(settings.stagger) / 1000) : false) : false
              , staggerOrder = 'staggerOrder'in settings ? settings.staggerOrder : 'default'
              , state = 'state'in settings ? settings.state : null
              , effect = this.effects[style];
            if ('CARRD_DISABLE_ANIMATION'in window) {
                if (style == 'fade-in-background')
                    $$(selector).forEach(function(e) {
                        e.style.setProperty('--onvisible-background-color', 'rgba(0,0,0,0.001)');
                    });
                return;
            }
            $$(selector).forEach(function(e) {
                var children = (stagger !== false) ? e.querySelectorAll(':scope > li, :scope ul > li') : null, enter = function(staggerDelay=0) {
                    var _this = this, transitionOrig;
                    if (effect.target)
                        _this = this.querySelector(effect.target);
                    if (!effect.custom) {
                        transitionOrig = _this.style.transition;
                        _this.style.setProperty('backface-visibility', 'hidden');
                        _this.style.transition = effect.transition(speed, delay + staggerDelay);
                    } else
                        effect.transition.apply(_this, [speed, delay + staggerDelay]);
                    effect.play.apply(_this, [intensity, !!children]);
                    if (!effect.custom)
                        setTimeout(function() {
                            _this.style.removeProperty('backface-visibility');
                            _this.style.transition = transitionOrig;
                        }, (speed + delay + staggerDelay) * 1000 * 2);
                }, leave = function() {
                    var _this = this, transitionOrig;
                    if (effect.target)
                        _this = this.querySelector(effect.target);
                    if (!effect.custom) {
                        transitionOrig = _this.style.transition;
                        _this.style.setProperty('backface-visibility', 'hidden');
                        _this.style.transition = effect.transition(speed);
                    } else
                        effect.transition.apply(_this, [speed]);
                    effect.rewind.apply(_this, [intensity, !!children]);
                    if (!effect.custom)
                        setTimeout(function() {
                            _this.style.removeProperty('backface-visibility');
                            _this.style.transition = transitionOrig;
                        }, speed * 1000 * 2);
                }, targetElement, triggerElement;
                if (effect.target)
                    targetElement = e.querySelector(effect.target);
                else
                    targetElement = e;
                if (children)
                    children.forEach(function(targetElement) {
                        effect.rewind.apply(targetElement, [intensity, true]);
                    });
                else
                    effect.rewind.apply(targetElement, [intensity]);
                triggerElement = e;
                if (e.parentNode) {
                    if (e.parentNode.dataset.onvisibleTrigger)
                        triggerElement = e.parentNode;
                    else if (e.parentNode.parentNode) {
                        if (e.parentNode.parentNode.dataset.onvisibleTrigger)
                            triggerElement = e.parentNode.parentNode;
                    }
                }
                scrollEvents.add({
                    element: e,
                    triggerElement: triggerElement,
                    initialState: state,
                    enter: children ? function() {
                        var staggerDelay = 0, childHandler = function(e) {
                            enter.apply(e, [staggerDelay]);
                            staggerDelay += stagger;
                        }, a;
                        if (staggerOrder == 'default') {
                            children.forEach(childHandler);
                        } else {
                            a = Array.from(children);
                            switch (staggerOrder) {
                            case 'reverse':
                                a.reverse();
                                break;
                            case 'random':
                                a.sort(function() {
                                    return Math.random() - 0.5;
                                });
                                break;
                            }
                            a.forEach(childHandler);
                        }
                    }
                    : enter,
                    leave: (replay ? (children ? function() {
                        children.forEach(function(e) {
                            leave.apply(e);
                        });
                    }
                    : leave) : null),
                });
            });
        },
    };
    function slideshowBackground(id, settings) {
        var _this = this;
        if (!('images'in settings) || !('target'in settings))
            return;
        this.id = id;
        this.wait = ('wait'in settings ? settings.wait : 0);
        this.defer = ('defer'in settings ? settings.defer : false);
        this.transition = ('transition'in settings ? settings.transition : {
            style: 'crossfade',
            speed: 1000,
            delay: 3000
        });
        this.images = settings.images;
        this.preload = true;
        this.$target = $(settings.target);
        this.$wrapper = null;
        this.pos = 0;
        this.lastPos = 0;
        this.$slides = [];
        this.img = document.createElement('img');
        this.preloadTimeout = null;
        if ('CARRD_DISABLE_DEFER'in window) {
            this.defer = false;
            this.preload = false;
        }
        switch (this.transition.style) {
        case 'crossfade':
            this.transition.delay = Math.max(this.transition.delay, this.transition.speed * 2);
            break;
        case 'fade':
            this.transition.delay = Math.max(this.transition.delay, this.transition.speed * 3);
            break;
        case 'instant':
        default:
            break;
        }
        if (this.defer) {
            scrollEvents.add({
                element: this.$target,
                enter: function() {
                    _this.preinit();
                }
            });
        } else {
            this.preinit();
        }
    }
    ;slideshowBackground.prototype.speedClassName = function(speed) {
        switch (speed) {
        case 1:
            return 'slow';
        default:
        case 2:
            return 'normal';
        case 3:
            return 'fast';
        }
    }
    ;
    slideshowBackground.prototype.preinit = function() {
        var _this = this;
        if (this.preload) {
            this.preloadTimeout = setTimeout(function() {
                _this.$target.classList.add('is-loading');
            }, this.transition.speed);
            setTimeout(function() {
                _this.init();
            }, 0);
        } else {
            this.init();
        }
    }
    ;
    slideshowBackground.prototype.init = function() {
        var _this = this, loaded = 0, hasLinks = false, $slide, intervalId, i;
        this.$target.classList.add('slideshow-background');
        this.$target.classList.add(this.transition.style);
        for (i = 0; i < this.images.length; i++) {
            if (this.preload) {
                this.$img = document.createElement('img');
                this.$img.src = this.images[i].src;
                this.$img.addEventListener('load', function(event) {
                    loaded++;
                });
            }
            $slide = document.createElement('div');
            $slide.style.backgroundImage = 'url(\'' + this.images[i].src + '\')';
            $slide.style.backgroundPosition = this.images[i].position;
            $slide.setAttribute('role', 'img');
            $slide.setAttribute('aria-label', this.images[i].caption);
            this.$target.appendChild($slide);
            if (this.images[i].motion != 'none') {
                $slide.classList.add(this.images[i].motion);
                $slide.classList.add(this.speedClassName(this.images[i].speed));
            }
            if ('linkUrl'in this.images[i]) {
                $slide.style.cursor = 'pointer';
                $slide._linkUrl = this.images[i].linkUrl;
                hasLinks = true;
            }
            this.$slides.push($slide);
        }
        if (hasLinks)
            this.$target.addEventListener('click', function(event) {
                var slide;
                if (!('_linkUrl'in event.target))
                    return;
                slide = event.target;
                if ('onclick'in slide._linkUrl) {
                    (slide._linkUrl.onclick)(event);
                    return;
                }
                if ('href'in slide._linkUrl) {
                    if (slide._linkUrl.href.charAt(0) == '#') {
                        window.location.href = slide._linkUrl.href;
                        return;
                    }
                    if ('target'in slide._linkUrl && slide._linkUrl.target == '_blank')
                        window.open(slide._linkUrl.href);
                    else
                        window.location.href = slide._linkUrl.href;
                }
            });
        if (this.preload)
            intervalId = setInterval(function() {
                if (loaded >= _this.images.length) {
                    clearInterval(intervalId);
                    clearTimeout(_this.preloadTimeout);
                    _this.$target.classList.remove('is-loading');
                    _this.start();
                }
            }, 250);
        else {
            this.start();
        }
    }
    ;
    slideshowBackground.prototype.start = function() {
        var _this = this;
        this.$slides[_this.pos].classList.add('visible');
        this.$slides[_this.pos].classList.add('top');
        this.$slides[_this.pos].classList.add('initial');
        this.$slides[_this.pos].classList.add('is-playing');
        if (this.$slides.length == 1)
            return;
        setTimeout(function() {
            setInterval(function() {
                _this.lastPos = _this.pos;
                _this.pos = _this.pos + 1;
                if (_this.pos >= _this.$slides.length)
                    _this.pos = 0;
                switch (_this.transition.style) {
                case 'instant':
                    _this.$slides[_this.lastPos].classList.remove('top');
                    _this.$slides[_this.pos].classList.add('top');
                    _this.$slides[_this.pos].classList.add('visible');
                    _this.$slides[_this.pos].classList.add('is-playing');
                    _this.$slides[_this.lastPos].classList.remove('visible');
                    _this.$slides[_this.lastPos].classList.remove('initial');
                    _this.$slides[_this.lastPos].classList.remove('is-playing');
                    break;
                case 'crossfade':
                    _this.$slides[_this.lastPos].classList.remove('top');
                    _this.$slides[_this.pos].classList.add('top');
                    _this.$slides[_this.pos].classList.add('visible');
                    _this.$slides[_this.pos].classList.add('is-playing');
                    setTimeout(function() {
                        _this.$slides[_this.lastPos].classList.remove('visible');
                        _this.$slides[_this.lastPos].classList.remove('initial');
                        _this.$slides[_this.lastPos].classList.remove('is-playing');
                    }, _this.transition.speed);
                    break;
                case 'fade':
                    _this.$slides[_this.lastPos].classList.remove('visible');
                    setTimeout(function() {
                        _this.$slides[_this.lastPos].classList.remove('is-playing');
                        _this.$slides[_this.lastPos].classList.remove('top');
                        _this.$slides[_this.pos].classList.add('top');
                        _this.$slides[_this.pos].classList.add('is-playing');
                        _this.$slides[_this.pos].classList.add('visible');
                    }, _this.transition.speed);
                    break;
                default:
                    break;
                }
            }, _this.transition.delay);
        }, this.wait);
    }
    ;
    (function() {
        var $target, $slideshowBackground;
        $target = $('#container11');
        $slideshowBackground = document.createElement('div');
        $slideshowBackground.className = 'slideshow-background';
        $target.insertBefore($slideshowBackground, $target.firstChild);
        new slideshowBackground('container11',{
            target: '#container11 > .slideshow-background',
            wait: 0,
            defer: false,
            transition: {
                style: 'crossfade',
                speed: 2875,
                delay: 1625,
            },
            images: [{
                src: 'assets/images/container11-ecf3b229.jpg?v=20b38950',
                position: 'center',
                motion: 'in',
                speed: 2,
                caption: 'Dia de muertos',
            }, {
                src: 'assets/images/container11-93ea6e77.jpg?v=20b38950',
                position: 'center',
                motion: 'down',
                speed: 2,
                caption: 'Palacio de Bellas Artes',
            }, {
                src: 'assets/images/container11-2a320d02.jpg?v=20b38950',
                position: 'center',
                motion: 'in',
                speed: 1,
                caption: 'Ferias',
            }, {
                src: 'assets/images/container11-b0bde9f0.jpg?v=20b38950',
                position: 'right',
                motion: 'up',
                speed: 3,
                caption: 'Cenote',
            }, {
                src: 'assets/images/container11-7d01ac42.jpg?v=20b38950',
                position: 'center',
                motion: 'right',
                speed: 1,
                caption: 'Los Cabos',
            }, ]
        });
    }
    )();
    (function() {
        var $target, $slideshowBackground;
        $target = $('#container02');
        $slideshowBackground = document.createElement('div');
        $slideshowBackground.className = 'slideshow-background';
        $target.insertBefore($slideshowBackground, $target.firstChild);
        new slideshowBackground('container02',{
            target: '#container02 > .slideshow-background',
            wait: 0,
            defer: false,
            transition: {
                style: 'fade',
                speed: 2750,
                delay: 1000,
            },
            images: [{
                src: 'assets/images/container02-f41e4522.jpg?v=20b38950',
                position: 'center',
                motion: 'down',
                speed: 3,
                caption: 'Bandera de Mexico',
            }, ]
        });
    }
    )();
    (function() {
        var $target, $slideshowBackground;
        $target = $('#container04');
        $slideshowBackground = document.createElement('div');
        $slideshowBackground.className = 'slideshow-background';
        $target.insertBefore($slideshowBackground, $target.firstChild);
        new slideshowBackground('container04',{
            target: '#container04 > .slideshow-background',
            wait: 0,
            defer: false,
            transition: {
                style: 'fade',
                speed: 2750,
                delay: 1000,
            },
            images: [{
                src: 'assets/images/container04-2bec96c0.jpg?v=20b38950',
                position: 'bottom',
                motion: 'down',
                speed: 2,
                caption: 'San Miguel de Allende',
            }, ]
        });
    }
    )();
    (function() {
        var $target, $slideshowBackground;
        $target = $('#container06');
        $slideshowBackground = document.createElement('div');
        $slideshowBackground.className = 'slideshow-background';
        $target.insertBefore($slideshowBackground, $target.firstChild);
        new slideshowBackground('container06',{
            target: '#container06 > .slideshow-background',
            wait: 0,
            defer: false,
            transition: {
                style: 'crossfade',
                speed: 2875,
                delay: 1625,
            },
            images: [{
                src: 'assets/images/container06-e24e37c4.jpg?v=20b38950',
                position: 'center',
                motion: 'in',
                speed: 2,
                caption: 'Cascadas Tulimán',
            }, {
                src: 'assets/images/container06-ce1079b0.jpg?v=20b38950',
                position: 'center',
                motion: 'down',
                speed: 2,
                caption: 'Museo Soumaya',
            }, {
                src: 'assets/images/container06-bbc1a496.jpg?v=20b38950',
                position: 'center',
                motion: 'in',
                speed: 1,
                caption: 'Campeche',
            }, {
                src: 'assets/images/container06-6115391b.jpg?v=20b38950',
                position: 'top',
                motion: 'up',
                speed: 3,
                caption: 'Baile Tapatio',
            }, {
                src: 'assets/images/container06-00cf8af4.jpg?v=20b38950',
                position: 'center',
                motion: 'in',
                speed: 1,
                caption: 'Muñeca María',
            }, ]
        });
    }
    )();
    function lightboxGallery() {
        var _this = this;
        this.id = 'gallery';
        this.$wrapper = $('#' + this.id);
        this.$modal = null;
        this.$modalImage = null;
        this.$modalNext = null;
        this.$modalPrevious = null;
        this.$links = null;
        this.locked = false;
        this.current = null;
        this.delay = 375;
        this.navigation = null;
        this.mobile = null;
        this.protect = null;
        this.zoomIntervalId = null;
        this.initModal();
    }
    ;lightboxGallery.prototype.init = function(config) {
        var _this = this, $links = $$('#' + config.id + ' .thumbnail'), navigation = config.navigation, mobile = config.mobile, mobileNavigation = config.mobileNavigation, protect = ('protect'in config ? config.protect : false), i, j;
        j = 0;
        for (i = 0; i < $links.length; i++) {
            if ($links[i].dataset.lightboxIgnore != '1')
                j++;
        }
        if (j < 2)
            navigation = false;
        for (i = 0; i < $links.length; i++) {
            if ($links[i].dataset.lightboxIgnore == '1')
                continue;
            (function(index) {
                $links[index].addEventListener('click', function(event) {
                    event.stopPropagation();
                    event.preventDefault();
                    _this.show(index, {
                        $links: $links,
                        navigation: navigation,
                        mobile: mobile,
                        mobileNavigation: mobileNavigation,
                        protect: protect,
                    });
                });
            }
            )(i);
        }
    }
    ;
    lightboxGallery.prototype.initModal = function() {
        var _this = this, dragStart = null, dragEnd = null, $modal, $modalInner, $modalImage, $modalNext, $modalPrevious;
        $modal = document.createElement('div');
        $modal.id = this.id + '-modal';
        $modal.tabIndex = -1;
        $modal.className = 'gallery-modal';
        $modal.innerHTML = '<div class="inner"><img src="" /></div><div class="nav previous"></div><div class="nav next"></div><div class="close"></div>';
        $body.appendChild($modal);
        $modalInner = $('#' + this.id + '-modal .inner');
        $modalImage = $('#' + this.id + '-modal img');
        $modalImage.addEventListener('load', function() {
            $modal.classList.add('done');
            setTimeout(function() {
                if (!$modal.classList.contains('visible'))
                    return;
                $modal.classList.add('loaded');
                setTimeout(function() {
                    $modal.classList.remove('switching', 'from-left', 'from-right', 'done');
                }, _this.delay);
            }, ($modal.classList.contains('switching') ? 0 : _this.delay));
        });
        $modalImage.addEventListener('contextmenu', function() {
            if (_this.protect)
                event.preventDefault();
        }, true);
        $modalImage.addEventListener('dragstart', function() {
            if (_this.protect)
                event.preventDefault();
        }, true);
        $modalNext = $('#' + this.id + '-modal .next');
        $modalPrevious = $('#' + this.id + '-modal .previous');
        $modal.show = function(index, offset, direction) {
            var item, i, j, found;
            if (_this.locked)
                return;
            if (typeof index != 'number')
                index = _this.current;
            if (typeof offset == 'number') {
                found = false;
                j = 0;
                for (j = 0; j < _this.$links.length; j++) {
                    index += offset;
                    if (index < 0)
                        index = _this.$links.length - 1;
                    else if (index >= _this.$links.length)
                        index = 0;
                    if (index == _this.current)
                        break;
                    item = _this.$links.item(index);
                    if (!item)
                        break;
                    if (item.dataset.lightboxIgnore != '1') {
                        found = true;
                        break;
                    }
                }
                if (!found)
                    return;
            } else {
                if (index < 0)
                    index = _this.$links.length - 1;
                else if (index >= _this.$links.length)
                    index = 0;
                if (index == _this.current)
                    return;
                item = _this.$links.item(index);
                if (!item)
                    return;
                if (item.dataset.lightboxIgnore == '1')
                    return;
            }
            if (client.mobile)
                _this.zoomIntervalId = setInterval(function() {
                    _this.zoomHandler();
                }, 250);
            _this.locked = true;
            if (_this.current !== null) {
                $modal.classList.remove('loaded');
                $modal.classList.add('switching');
                switch (direction) {
                case -1:
                    $modal.classList.add('from-left');
                    break;
                case 1:
                    $modal.classList.add('from-right');
                    break;
                default:
                    break;
                }
                setTimeout(function() {
                    _this.current = index;
                    $modalImage.src = item.href;
                    setTimeout(function() {
                        $modal.focus();
                        _this.locked = false;
                    }, _this.delay);
                }, _this.delay);
            } else {
                _this.current = index;
                $modalImage.src = item.href;
                $modal.classList.add('visible');
                setTimeout(function() {
                    $modal.focus();
                    _this.locked = false;
                }, _this.delay);
            }
        }
        ;
        $modal.hide = function() {
            if (_this.locked)
                return;
            if (!$modal.classList.contains('visible'))
                return;
            _this.locked = true;
            $modal.classList.remove('visible');
            $modal.classList.remove('loaded');
            $modal.classList.remove('switching', 'from-left', 'from-right', 'done');
            clearInterval(_this.zoomIntervalId);
            setTimeout(function() {
                $modalImage.src = '';
                _this.locked = false;
                $body.focus();
                _this.current = null;
            }, _this.delay);
        }
        ;
        $modal.next = function(direction) {
            $modal.show(null, 1, direction);
        }
        ;
        $modal.previous = function(direction) {
            $modal.show(null, -1, direction);
        }
        ;
        $modal.first = function() {
            $modal.show(0);
        }
        ;
        $modal.last = function() {
            $modal.show(_this.$links.length - 1);
        }
        ;
        $modalInner.addEventListener('touchstart', function(event) {
            if (!_this.navigation)
                return;
            if (event.touches.length > 1)
                return;
            dragStart = {
                x: event.touches[0].clientX,
                y: event.touches[0].clientY
            };
        });
        $modalInner.addEventListener('touchmove', function(event) {
            var dx, dy;
            if (!_this.navigation)
                return;
            if (!dragStart || event.touches.length > 1)
                return;
            dragEnd = {
                x: event.touches[0].clientX,
                y: event.touches[0].clientY
            };
            dx = dragStart.x - dragEnd.x;
            dy = dragStart.y - dragEnd.y;
            if (Math.abs(dx) < 50)
                return;
            event.preventDefault();
            if (dx > 0)
                $modal.next(-1);
            else if (dx < 0)
                $modal.previous(1);
        });
        $modalInner.addEventListener('touchend', function(event) {
            if (!_this.navigation)
                return;
            dragStart = null;
            dragEnd = null;
        });
        $modal.addEventListener('click', function(event) {
            $modal.hide();
        });
        $modal.addEventListener('keydown', function(event) {
            if (!$modal.classList.contains('visible'))
                return;
            switch (event.keyCode) {
            case 39:
            case 32:
                if (!_this.navigation)
                    break;
                event.preventDefault();
                event.stopPropagation();
                $modal.next();
                break;
            case 37:
                if (!_this.navigation)
                    break;
                event.preventDefault();
                event.stopPropagation();
                $modal.previous();
                break;
            case 36:
                if (!_this.navigation)
                    break;
                event.preventDefault();
                event.stopPropagation();
                $modal.first();
                break;
            case 35:
                if (!_this.navigation)
                    break;
                event.preventDefault();
                event.stopPropagation();
                $modal.last();
                break;
            case 27:
                event.preventDefault();
                event.stopPropagation();
                $modal.hide();
                break;
            }
        });
        $modalNext.addEventListener('click', function(event) {
            $modal.next();
        });
        $modalPrevious.addEventListener('click', function(event) {
            $modal.previous();
        });
        this.$modal = $modal;
        this.$modalImage = $modalImage;
        this.$modalNext = $modalNext;
        this.$modalPrevious = $modalPrevious;
    }
    ;
    lightboxGallery.prototype.show = function(href, config) {
        this.$links = config.$links;
        this.navigation = config.navigation;
        this.mobile = config.mobile;
        this.mobileNavigation = config.mobileNavigation;
        this.protect = config.protect;
        if (this.navigation) {
            this.$modalNext.style.display = '';
            this.$modalPrevious.style.display = '';
            if (client.mobile && !this.mobileNavigation) {
                this.$modalNext.style.display = 'none';
                this.$modalPrevious.style.display = 'none';
            }
        } else {
            this.$modalNext.style.display = 'none';
            this.$modalPrevious.style.display = 'none';
        }
        if (this.protect) {
            this.$modalImage.style.WebkitTouchCallout = 'none';
            this.$modalImage.style.userSelect = 'none';
        } else {
            this.$modalImage.style.WebkitTouchCallout = '';
            this.$modalImage.style.userSelect = '';
        }
        if (client.mobile && !this.mobile)
            return;
        this.$modal.show(href);
    }
    ;
    lightboxGallery.prototype.zoomHandler = function() {
        var threshold = window.matchMedia('(orientation: portrait)').matches ? 50 : 100;
        if (window.outerWidth > window.innerWidth + threshold)
            this.$modal.classList.add('zooming');
        else
            this.$modal.classList.remove('zooming');
    }
    ;
    var _lightboxGallery = new lightboxGallery;
    _lightboxGallery.init({
        id: 'gallery01',
        navigation: true,
        mobile: true,
        mobileNavigation: true,
    });
    _lightboxGallery.init({
        id: 'gallery02',
        navigation: true,
        mobile: true,
        mobileNavigation: true,
    });
    onvisible.add('h1.style1, h2.style1, h3.style1, p.style1', {
        style: 'zoom-out',
        speed: 1125,
        intensity: 3,
        delay: 125,
        staggerOrder: '',
        state: true,
        replay: true
    });
    onvisible.add('h1.style2, h2.style2, h3.style2, p.style2', {
        style: 'fade-in',
        speed: 2125,
        intensity: 5,
        delay: 0,
        staggerOrder: '',
        state: true,
        replay: true
    });
    onvisible.add('.icons.style1', {
        style: 'zoom-out',
        speed: 1125,
        intensity: 3,
        delay: 0,
        stagger: 125,
        state: true,
        replay: true
    });
    onvisible.add('h1.style3, h2.style3, h3.style3, p.style3', {
        style: 'zoom-out',
        speed: 1125,
        intensity: 3,
        delay: 125,
        staggerOrder: '',
        state: true,
        replay: true
    });
    onvisible.add('h1.style5, h2.style5, h3.style5, p.style5', {
        style: 'fade-in',
        speed: 1000,
        intensity: 5,
        delay: 0,
        staggerOrder: '',
        state: true,
        replay: true
    });
    onvisible.add('h1.style9, h2.style9, h3.style9, p.style9', {
        style: 'fade-in',
        speed: 1000,
        intensity: 5,
        delay: 0,
        staggerOrder: '',
        state: true,
        replay: true
    });
    onvisible.add('.container.style1', {
        style: 'fade-down',
        speed: 1375,
        intensity: 5,
        delay: 0,
        staggerOrder: '',
        state: true,
        replay: true
    });
    onvisible.add('h1.style4, h2.style4, h3.style4, p.style4', {
        style: 'fade-right',
        speed: 1000,
        intensity: 3,
        delay: 0,
        staggerOrder: '',
        state: true,
        replay: true
    });
    onvisible.add('.container.style2', {
        style: 'fade-up',
        speed: 2750,
        intensity: 5,
        delay: 0,
        staggerOrder: '',
        state: true,
        replay: true
    });
    onvisible.add('h1.style6, h2.style6, h3.style6, p.style6', {
        style: 'zoom-out',
        speed: 1125,
        intensity: 3,
        delay: 125,
        staggerOrder: '',
        state: true,
        replay: true
    });
    onvisible.add('h1.style7, h2.style7, h3.style7, p.style7', {
        style: 'fade-right',
        speed: 1000,
        intensity: 3,
        delay: 0,
        staggerOrder: '',
        state: true,
        replay: true
    });
    onvisible.add('h1.style8, h2.style8, h3.style8, p.style8', {
        style: 'fade-in',
        speed: 1000,
        intensity: 5,
        delay: 0,
        staggerOrder: '',
        state: true,
        replay: true
    });
    onvisible.add('.buttons.style1', {
        style: 'fade-up',
        speed: 750,
        intensity: 3,
        delay: 0,
        state: true,
        replay: true
    });
    onvisible.add('.image.style1', {
        style: 'zoom-out',
        speed: 1875,
        intensity: 10,
        delay: 0,
        staggerOrder: '',
        state: true,
        replay: true
    });
    onvisible.add('.container.style3', {
        style: 'fade-up',
        speed: 1000,
        intensity: 5,
        delay: 0,
        staggerOrder: '',
        state: true,
        replay: true
    });
    onvisible.add('.gallery.style1', {
        style: 'fade-in',
        speed: 1000,
        intensity: 5,
        delay: 0,
        stagger: 125,
        state: true,
        replay: true
    });
    onvisible.add('.container.style5', {
        style: 'flip-backward',
        speed: 1625,
        intensity: 5,
        delay: 0,
        staggerOrder: '',
        state: true,
        replay: true
    });
}
)();
// ----cc: RDZ --------