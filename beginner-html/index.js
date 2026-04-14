let count = 0;

function increase() {
    count++;
    render();
}

function decrease() {
    count--;
    render();
}

function render() {
    document.getElementById("count").innerText = count;
}