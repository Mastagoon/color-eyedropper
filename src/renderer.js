const body = document.querySelector("body");
const img = document.querySelector("img");
const span = document.querySelector("#hex-span");
const div = document.querySelector("#color-div");
const color = document.querySelector("#color");
let canvas, context

body.addEventListener('keydown', (e) => {
	var name = e.key;
	if (name.toLowerCase() !== 'escape') return;
	return window.electronAPI.close();
});


const getElementPosition = (obj) => {
	let curLeft = 0, curTop = 0;
	if (obj.offsetParent) {
		do {
			curLeft += obj.offsetLeft;
			curTop += obj.offsetTop;
		} while (obj = obj.offsetParent);
		return { x: curLeft, y: curTop };
	}
	return undefined;
}

const getMousePosition = (element, event) => {
	let pos = getElementPosition(element)
	return {
		x: event.pageX - pos.x,
		y: event.pageY - pos.y
	}
}

const rgbToHex = (r, g, b) => { // ty copilot :D
	if (r > 255 || g > 255 || b > 255)
		throw "Invalid color component";
	return ((r << 16) | (g << 8) | b).toString(16);
}

const drawImageFromUrl = (url) => {
	img.setAttribute("src", url)
	canvas = document.createElement('canvas');
	const pic = new Image();
	pic.src = url;
	pic.onload = () => {
		canvas.width = pic.width
		canvas.height = pic.height
		context = canvas.getContext("2d")
		context.drawImage(pic, 0, 0);
	}
}

const getPixelColor = (x, y) => {
	if (!context || !canvas) return;
	const imageData = context.getImageData(x, y, 1, 1);
	const data = imageData.data;
	// const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3]})`;
	return "#" + ("000000" + rgbToHex(data[0], data[1], data[2])).slice(-6);
}

img.addEventListener('mousemove', (e) => {
	if (!canvas || !context) return;
	let pos = getMousePosition(img, e);
	// const imageData = context.getImageData(pos.x, pos.y, 1, 1);
	// const data = imageData.data;
	// const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3]})`;
	const hex = getPixelColor(pos.x, pos.y);
	// set the span's position to the mouse position
	div.style.left = (e.pageX) + 'px';
	div.style.top = (e.pageY - 10) + 'px';
	span.innerHTML = hex;
	color.style.backgroundColor = hex;
})

window.electronAPI.getScreenshot((_, value) => {
	drawImageFromUrl(value)
})
