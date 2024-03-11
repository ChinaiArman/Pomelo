console.log("Script connected...")

let callServer = function () {
    window.location.assign("/changeGreeting?greeting=" + document.getElementById("inputBox").value)
}