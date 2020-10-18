const string = `
.face *{box-sizing: border-box;margin: 0;padding: 0;}
.face *::before,.face *::after{box-sizing: border-box}

.face{
    background:#fce64d ;
        min-height: 50vh;
    position: relative;

}
.nose{
    width: 0;
    height: 0;
    border: 10px solid;
    border-color: black transparent transparent transparent;
    position: relative;
    top: 150px;
    left: 50%;
    margin-left: -10px;
    z-index: 2;
}
.nose>.head{
    width: 20px;
    height: 6px;
    position: absolute;
    background: black;
    top:-16px;
    margin-left: -10px;
    border-radius: 10px 10px 0 0;
}
@keyframes wave{
    0%{
      transform: rotate(0deg);
    }
    33%{
        transform: rotate(5deg);

    }
    66%{
        transform: rotate(-5deg);

    }
    100%{
        transform: rotate(0deg);

    }
}
.nose:hover{
    transform-origin: center bottom;
    animation: wave 200ms infinite linear;
}
.eye{
    border: 2px solid black;
    width: 64px;
    height: 64px;
    position: absolute;
    left: 50%;
    margin-left: -32px;
    top: 100px;
    background: #2e2e2e;
    border-radius: 50%;
}

.eye::before{
    content: '';
    display: block;
    width: 32px;
    height: 32px;
    background: #fff;
    border-radius: 50%;
    position: relative;
    left: 8px;
    top: 1px;
}
.eye.right{
    transform: translateX(100px);
}
.eye.left{
     transform: translateX(-100px);
 }
.mouth{
    width: 180px;
    height: 180px;
    position: absolute;
    left: 50%;
    top:200px;
    margin-left: -90px;
}
.mouth .up{
    position: relative;
    top: -25px;
    z-index: 1;
}
.mouth .up .lip {
    border: 3px solid black;
    height: 28px;
    width: 90px;
    position: absolute;
    left: 50%;
    background: #fce64d;
    border-top: none;
}
.mouth .up .lip.left {

    /*border-radius:0 0 0 50px;*/
    border-bottom-left-radius:80px 35px;
    transform: rotate(-20deg) translateX(-50px);
    margin-left: -44px;
}
.mouth .up .lip.left::before {
    content: '';
    display: block;
    width: 6px;
    height: 30px;
    position: absolute;
    right: -5px;
    bottom: 0;
    background:#fce64d ;
}.mouth .up .lip.right {
     border-bottom-right-radius:80px 35px;
    transform: rotate(20deg) translateX(50px);
    margin-left: -46px;
}
.mouth .up .lip.right::before {
    content: '';
    display: block;
    width: 6px;
    height: 30px;
    position: absolute;
    left: -5px;
    bottom: 0;
    background:#fce64d ;
}

.mouth .down{
    height: 170px;
    position: absolute;
    top: 0;
    width: 100%;
    overflow: hidden;
}
.mouth .down .tongue{
    border: 3px solid black;
    width: 150px;
    height: 1000px;
    position: absolute;
    bottom: 0;
    left: 50%;
    margin-left: -75px;
    border-radius: 75px/300px;
    background: #8e1b17;
    overflow: hidden;
}
.mouth .down .tongue .yuan{
    position: absolute;
    width: 200px;
    height: 300px;
    background: #eb5763;
    border-radius: 100px;
    bottom: -160px;
    left: 50%;
    margin-left: -100px;
}
.cheek{
    position: absolute;
    left: 50%;
    border: 3px solid  black;
    width: 88px;
    height: 88px;
    top: 250px;
    margin-left: -44px;
    border-radius: 50%;
    background: red;
}
.cheek.right{
    transform: translateX(-200px);
}
.cheek.left{
    transform: translateX(200px);
}
`

const player = {
    id:undefined,
    n:1,
    time:50,
    ui:{
         demo : document.querySelector('#demo'),
         demo2 : document.querySelector('#demo2')
    },
    events :{
        '#btnPause': 'pause',
        '#btnPlay': 'play',
        '#btnSlow': 'slow',
        '#btnNormal': 'normal',
        '#btnFast': 'fast'
    },
    init:()=>{
        player.ui.demo2.innerHTML = string.substr(0,player.n)
        player.ui.demo.innerText = string.substr(0,player.n)
        player.play()
        player.bindEvents()

    },
    bindEvents:()=>{
        for (let key in player.events) {
            if (player.events.hasOwnProperty(key)) {
                //hasOwnProperty 不继承原型链的属性
                const value = player.events[key]
                document.querySelector(key).onclick = player[value]
            }
        }
    },
    run :() => {
        player.n += 1
        if (player.n > string.length) {
            window.clearInterval(player.id)
            return
        }
        player.ui.demo2.innerHTML = string.substr(0, player.n)
        player.ui.demo.innerText = string.substr(0, player.n)
        player.ui.demo.scrollTop = player.ui.demo.scrollHeight
    },
    play : () => {
        player.id = setInterval(player.run, player.time)
    },
    pause : () => {
        window.clearInterval(player.id)
    },
    slow : () => {
        player.pause()
        player.time = 100
          player.play()
    },
    normal : () => {
        player.pause()
          player.time = 50
          player.play()
    },
    fast : () => {
        player.pause()
          player.time = 0
         player.play()
    }
}

player.init()

