var statusElement = document.querySelector("#status"),
    progressElement = document.querySelector("#progress"),
    spinnerElement = document.querySelector("#spinner"),
    Module = {
        preRun: [],
        postRun: [],
        print: function() {
            var e = document.querySelector("#output");
            return e && (e.value = ""),
                function(t) {
                    arguments.length > 1 && (t = Array.prototype.slice.call(arguments).join(" ")), console.log(t), e && (e.value += t + "\n", e.scrollTop = e.scrollHeight)
                }
        }(),
        printErr: function(e) {
            arguments.length > 1 && (e = Array.prototype.slice.call(arguments).join(" ")), console.error(e)
        },
        canvas: function() {
            var e = document.querySelector("#canvas");
            return e.addEventListener("webglcontextlost", (function(e) {
                alert("WebGL context lost. You will need to reload the page."), e.preventDefault()
            }), !1), e
        }(),
        setStatus: function(e) {
            if (Module.setStatus.last || (Module.setStatus.last = {
                    time: Date.now(),
                    text: ""
                }), e !== Module.setStatus.last.text) {
                var t = e.match(/([^(]+)\((\d+(\.\d+)?)\/(\d+)\)/),
                    n = Date.now();
                t && n - Module.setStatus.last.time < 30 || (Module.setStatus.last.time = n, Module.setStatus.last.text = e, t ? (e = t[1], progressElement.value = 100 * parseInt(t[2]), progressElement.max = 100 * parseInt(t[4]), progressElement.hidden = !0, spinnerElement.hidden = !1) : (progressElement.value = null, progressElement.max = null, progressElement.hidden = !0, e || (spinnerElement.style.display = "none")), statusElement.innerHTML = e)
            }
        },
        totalDependencies: 0,
        monitorRunDependencies: function(e) {
            this.totalDependencies = Math.max(this.totalDependencies, e), Module.setStatus(e ? "Preparing... (" + (this.totalDependencies - e) + "/" + this.totalDependencies + ")" : "All downloads complete.")
        }
    };
    
Module.setStatus("Downloading..."), window.onerror = function() {
    Module.setStatus("Exception thrown, see JavaScript console"), spinnerElement.style.display = "none", Module.setStatus = function(e) {
        e && Module.printErr("[post-exception status] " + e)
    }
}