/*
Kabeers Protect JS JS (0.0.1)
Author(s) Kabeer Jaffri, Kabeers Network
©2020 Kabeers Network All Rights Reserved
*/
!(function () {
    try {
        let t = console;
        Object.defineProperty(window, "console", {
            get: function () {
                if (t._commandLineAPI) throw "Sorry, for security reasons, the script console is deactivated - Protect JS";
                return t;
            },
            set: function (e) {
                t = e;
            },
        });
    } catch (t) {}
})();
const MAIN = window,
    VOID = void 0,
    HOST = `${location.protocol}//${location.host}`,fail = (a) => {console.warn('Protected Function Called, - Protect JS')},
    stak = function (t, e, n, i, r, o, a) {
        return (
            (e = e || ""),
                (i = new Error(".").stack.split("\n")).shift(),
                (r = []),
                (o = HOST),
                (a = ["_fake_"]),
                i.forEach((t) => {
                    if (t.indexOf(o) < 0) return;
                    let n, i, c, l, f;
                    (f = 1),
                        (n = t.trim().split(o)),
                    (i = (i = n[0].split("@").join("").split("at ").join("").trim()).split(" ")[0]) || (i = "anon"),
                        a.forEach((t) => {
                            (0 == i.indexOf(t) || i.indexOf("." + t) > 0) && e.indexOf(t) < 0 && (f = 0);
                        }),
                    f && ((c = (n = n[1].split(" "))[0]).indexOf(":") > 0 ? ((n = c.split(":")), (c = n[0])) : (n = n.pop().split(":")), "/" != c && ((l = n[1]), (r[r.length] = [i, c, l].join(" "))));
                }),
                isNaN(1 * t) ? r : r[t]
        );
    },
    bore = function (t, e, n) {
        if (!("string" != typeof e || e.trim().length < 1)) return n === VOID ? new Function("a", `return a.${e}`)(t) : null === n ? (new Function("a", `delete a.${e}`)(t), !0) : (new Function("a", "z", `a.${e}=z`)(t, n), !0);
    },
    bake = function (t, e, n) {
        if (!t || !t.hasOwnProperty) return;
        n == VOID && (n = t[e]);
        let i = { enumerable: !1, configurable: !1, writable: !1, value: n },
            r = !0;
        try {
            Object.defineProperty(t, e, i);
        } catch (t) {
            r = !1;
        }
        return r;
    },
    protect = function (t, e) {
        if ("string" != typeof t || !t.trim()) return;
        if (e && "function" != typeof e) return;
        if (!e) return this[t];
        if (t in this) return void (this[t].list[this[t].list.length] = e);
        let n, i;
        (i = (n = t.split(".")).pop()), (n = n.join(".")), (this[t] = { func: bore(MAIN, t), list: [e] }), bore(MAIN, t, null);
        let r = {
            [`_fake_${t}`]: function () {
                let t, e, n, i, r;
                if ((t = ((t = stak(0, (e = "_fake_"))) || "").split(" ")[0]).startsWith(e) || !(t.indexOf(`.${e}`) < 0)) {
                    (t = protect(t.split(e).pop())), (n = [].slice.call(arguments));
                    for (let o in t.list) {
                        if (!t.list.hasOwnProperty(o) || r) continue;
                        let a, c;
                        if (((a = t.list[o].toString()), (r = (c = new Function("y", `return {[y]:${a}}[y];`)(e)).apply(t, n)) == VOID)) return;
                        Array.isArray(r) || (r = [r]), (i = t.func.apply(this, r));
                    }
                    return i;
                }
                fail (":(");
            },
        }[`_fake_${t}`];
        bake(r, "name", `_fake_${t}`), bake(n ? bore(MAIN, n) : MAIN, i, r);
        try {
            bore(MAIN, t).prototype = Object.create(this[t].func.prototype);
        } catch (t) {}
    }.bind({});
/*-------------------------
           USAGE
--------------------------*/
protect(/*Example Functio you want to Block*/ "console.error", function (t) {
    if (stak(0)) return t;
});
