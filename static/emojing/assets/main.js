import CONFIG from './config.js';
import {
	inbox,
	smileys,
	gestures_and_body_parts,
	people_and_fantasy,
	clothing_and_accessories,
	pale,
	cream_white,
	brown,
	dark_brown,
	black,
	animals_nature,
	food_drink,
	activity_and_sports,
	travel_places,
	objects,
	symbols,
	unicode_symbols,
	flags,
	dao
} from './data.js';

let en = CONFIG.en;

// 启用的 Emoji 符号
// 可以注释掉，不欲显示的块
const EMOJIS_ARR = [
	inbox,
	smileys,
	objects,
	animals_nature,
	food_drink,
	travel_places,
	symbols,
	unicode_symbols,
	dao,
	flags,
	activity_and_sports,
	clothing_and_accessories,
	gestures_and_body_parts,
	people_and_fantasy,
	pale,
	// cream_white,
	// brown,
	// dark_brown,
	// black,
]

const CONTAINER = document.querySelector('#emojis');
const ANCHORS = document.querySelector('#anchors');

// 渲染‘右侧导航’
renderAnchors(ANCHORS, EMOJIS_ARR);

// 渲染 Emoji 符号
let emojistr = '';
EMOJIS_ARR.map(item => {
	if(item.value) emojistr += genEmojistr(item);
})

renderEmojistr(CONTAINER, emojistr);

// 剪切板、弹窗
let clipboard = new ClipboardJS('.clip');
clipboard.on('success', function (e) {
	console.info('Text:', e.text);

	Toastify({
		text: '! Copied ' + e.text,
		duration: 1000,
		// gravity: 'bottom',
		position: 'right',
		position: 'center',
		style: {
			background: "linear-gradient(to right, #00b09b, #96c93d)",
			"font-family": "Segoe Script",
			"font-size": ".24rem",
		},
	}).showToast();

	e.clearSelection();
});

clipboard.on('error', function (e) {
	console.error('Action:', e.action);
	console.error('Trigger:', e.trigger);
});

function renderAnchors(anchors, emojisArr) {
	let _str = '';

	emojisArr.map(item => {
		if(item.value) _str += `<a href="#${item.id}">${en ? item.title : item.title_zh}</a>`;
	})

	anchors.innerHTML = _str;
}

function renderEmojistr(container, emojistr) {
	container.innerHTML = emojistr;
}

function genEmojistr(emojis) {
	let _emojistr = '';
	let _arr = emojis.value.split(' ');

	_arr.map(item => {
		if (item) _emojistr +=
			`<div data-clipboard-text="${item}" class="clip">${item}</div>`
	})

	return `<div id="${emojis.id}" class="title">${en ? emojis.title : emojis.title_zh}</div>` + _emojistr;
}

// 开个玩笑，不要介意 😝
const JOKER = document.querySelector('#joker');
JOKER.onclick = function() {
	Toastify({
		text: en ? '🤪 Duped! None dark mode!' : '🤪 你上当了，没有暗色模式！',
		duration: 2000,
		position: 'right',
		stopOnFocus: false,
		style: {
			background: "linear-gradient(to right, #ffd460, #f07b3f)",
			"font-family": "'Segoe Script', kaiti", 
			"font-size": ".16rem",
		},
	}).showToast();
}