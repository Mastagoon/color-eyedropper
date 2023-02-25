const body = document.querySelector("body");
const span = document.querySelector("#hex-span");
const div = document.querySelector("#color-div");
const color = document.querySelector("#color");
let hex = "#FFFFFF";

// cancel on escape
body.addEventListener('keydown', (e) => {
	var name = e.key;
	if (name.toLowerCase() !== 'escape') return;
	window.electronAPI.close();
});

body.addEventListener('mousemove', async (e) => {
	let pos = {
		x: e.pageX,
		y: e.pageY,
	}
	hex = await window.electronAPI.sendMousePos(pos.x, pos.y)
	div.style.left = (e.pageX) + 'px';
	div.style.top = (e.pageY - 10) + 'px';
	span.innerHTML = hex;
	color.style.backgroundColor = hex;
})

body.addEventListener("click", () => window.electronAPI.copyToClipboard(hex));
