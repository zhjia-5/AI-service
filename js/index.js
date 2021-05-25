
var btn = document.getElementsByClassName('btn')[0];
var inp = document.getElementsByClassName('input')[0];

btn.onclick = onEvent;
inp.onkeyup = onEvent;
function onEvent(e) {
    if (e.type == 'click') {//点击了发送按钮
        renderDom('myself', inp.value);
        ajax({
            method: 'get',
            data: {
                text: inp.value
            },
            url: 'https://developer.duyiedu.com/edu/turing/chat',
            success: function (res) {
                renderDom('robot', res.text);
            }
        });
        inp.value = '';//渲染完后清空input框
    } else if (e.keyCode == 13) {//按下了回车键
        renderDom('myself', this.value);
        ajax({
            method: 'get',
            data: {
                text: this.value
            },
            url: 'https://developer.duyiedu.com/edu/turing/chat',
            success: function (res) {
                renderDom('robot', res.text);
            }
        });
        this.value = '';//渲染完后清空input框
    }
}

function renderDom(who, text) {
    var reg = /[\S]n*/g;//匹配非全部空格
    if (reg.test(text)) {
        var classN = who;
        var img = '';
        if (who === 'myself') {
            classN += ' clearfix';
            img = './img/1.png';
        }
        if (who === 'robot') {
            classN += ' clearfix';
            img = './img/2.jpg';
        }
        var content = document.getElementsByClassName('content')[0];
        var div = document.createElement('div');
        div.className = classN;
        div.innerHTML = `
            <img src="${img}">
            <div class="text">${text}</div>
        `;
        content.appendChild(div);
        content.scrollTop = content.scrollHeight;//将Y轴滚动距离值设置最大值
    }

}

