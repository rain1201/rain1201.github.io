var lrcJSON;
var lrcTime ; //歌词对应的时间数组
var ul; //获取ul
var i;
var $li; //获取所有li
var isLocked; //当拖动进度条的时候锁定，防止拖动进度条时audio时间改变出现冲突
var currentLine; //当前播放到哪一句了
var currentTime; //当前播放的时间
var audio;
var ppxx;
function chlrc(){
var lrcJSON = {
	"[00:00.000]": "大主宰乐团 - 剪刀刺客",
	"[00:02.610]": "作词：鲍鱼",
	"[00:03.460]": "作曲：侯俊杰",
	"[00:04.560]": "制作人：张寥、小雄",
	"[00:06.110]": "编曲：小雄、十七",
	"[00:07.510]": "吉他：十七",
	"[00:08.410]": "贝斯：甄洋",
	"[00:09.310]": "鼓：李默",
	"[00:09.910]": "混音师：孟韬",
	"[00:11.800]": "监制：高航",
	"[00:11.370]": "音乐制作营销：奔跑怪物",
	"[00:15.440]": "发行：完美青春OST",
	"[00:25.240]": "不慌不忙 见识过风浪",
	"[00:30.210]": "玩命是日常 但我不怕伤",
	"[00:37.170]": "风骚一秒 剪刀已出鞘",
	"[00:42.230]": "贱招就拆招 目标跑不掉",
	"[00:48.390]": "四两拨千斤 刺客却坚守正义",
	"[00:54.860]": "敌挡就杀敌 鸡挡就杀鸡",
	"[00:57.910]": "杀鸡 杀鸡 杀鸡",
	"[01:04.670]": "飞刀 剪刀 出招 接招吧",
	"[01:10.790]": "刺客 刺客 刺客 剪刀刺客",
	"[01:30.280]": "精通表演 伪装不敷衍",
	"[01:35.420]": "客户的心愿 交给我实现",
	"[01:42.620]": "风高月夜 躁动的鲜血",
	"[01:47.480]": "仇恨与偏见 都被我化解",
	"[01:53.790]": "隐姓又埋名 埋不掉赤子之心",
	"[02:00.150]": "将过往抛弃 重新做自己",
	"[02:03.210]": "自己 自己 自己",
	"[02:10.390]": "飞刀 剪刀 出招 接招吧",
	"[02:16.410]": "刺客 刺客 刺客 剪刀刺客",
	"[03:13.780]": "飞刀 剪刀 出招 接招吧",
	"[03:20.570]": "刺客 刺客 刺客 剪刀刺客",


};

lrcTime = []; //歌词对应的时间数组
ul = $("#lrclist")[0]; //获取ul

i = 0;
ul.innerHTML=""
$.each(lrcJSON, function(key, value) { //遍历lrc

	lrcTime[i++] = parseFloat(key.substr(1, 3)) * 60 + parseFloat(key.substring(4, 10)); //00:00.000转化为00.000格式
	ul.innerHTML += "<li><p>" + lrcJSON[key] + "</p></li>"; //ul里填充歌词
});
lrcTime[lrcTime.length] = lrcTime[lrcTime.length - 1] + 3; //如不另加一个结束时间，到最后歌词滚动不到最后一句


$li = $("#lrclist>li"); //获取所有li
isLocked = false; //当拖动进度条的时候锁定，防止拖动进度条时audio时间改变出现冲突
currentLine = 0; //当前播放到哪一句了
currentTime; //当前播放的时间
audio = document.getElementById("audio");
ppxx; //保存ul的translateY值
};
function uptime() { //audio时间改变事件
	/*var lrcJSON;
	var lrcTime ; //歌词对应的时间数组
	var ul = $("#lrclist")[0]; //获取ul
	var i;
	var $li = $("#lrclist>li"); //获取所有li
	var isLocked ; //当拖动进度条的时候锁定，防止拖动进度条时audio时间改变出现冲突
	var currentLine ; //当前播放到哪一句了
	var currentTime; //当前播放的时间
	var audio = document.getElementById("audio");
	var ppxx;*/
	if (isLocked == false) {
		isLocked = true;
		//audio.currentTime;
		for (n = -8, len = lrcTime.length; n <= 8; n++) { //将可视部分的所有其他歌词设置为默认
			if (currentLine + n < len - 1) {
				$li.get(currentLine + n).className = "";
				//console.log(" clear" + currentLine + n);

			} else break;
		}

		for (j = 0, len = lrcTime.length; j < len; j++) {

			if (audio.currentTime <= lrcTime[j + 1] && audio.currentTime >= lrcTime[j]) {
				currentLine = j;
				ppxx = 180 - (currentLine * 32);
				ul.style.transform = "translateY(" + ppxx + "px)";

				$li.get(currentLine - 1).className = "";
				//console.log("on" + currentLine);
				$li.get(currentLine).className = "on";
				break;
			}
		}
		isLocked = false;
	}

};
