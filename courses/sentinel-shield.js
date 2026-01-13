// Block Right-Click
document.addEventListener('contextmenu', event => event.preventDefault());

// Block F12, Ctrl+Shift+I, Ctrl+U
document.onkeydown = function(e) {
    if(event.keyCode == 123 || 
      (e.ctrlKey && e.shiftKey && (e.keyCode == 'I'.charCodeAt(0) || e.keyCode == 'J'.charCodeAt(0))) || 
      (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0))) {
        return false;
    }
};

// Console Wipe
setInterval(() => console.clear(), 100);