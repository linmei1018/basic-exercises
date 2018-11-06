<template>
  <div class="container login-container" @keyup.enter="handleSubmit">
    <div class="login-content">
      <div id="large-header" class="large-header">
        <canvas id="demo-canvas"></canvas>
        <div class="logo_box">
          <h3>登陆页面</h3>
          <i-form ref="formInline" :model="formInline">
            <form-item prop="username" class="input_outer" style="margin-bottom:20px">
              <span class="u_user"></span>
              <input name="logname" class="text" v-model="formInline.username" style="color: #FFFFFF !important" type="text" placeholder="请输入账户名" :maxlength="25" />
            </form-item>
            <form-item prop="username" class="input_outer" style="margin-bottom:20px">
              <span class="us_uer"></span>
              <input name="logpass" class="text" v-model="formInline.password" style="color: #FFFFFF !important" type="password" placeholder="请输入密码" :maxlength="16" required autocomplete='psd'>
            </form-item>
            <form-item prop="username" class="input_outer" style="margin-bottom:20px">
              <span class="us_code"></span>
              <input name="logcode" class="text" v-model="formInline.captcha" style="color: #FFFFFF !important" type="text" placeholder="请输入验证码">
              <span @click="recode">
                                 <!--<img :src="CodeSrc" height="20px"/>-->
                            </span>
            </form-item>
            <div class="mb2"><a class="act-but submit" @click="handleSubmit()" href="javascript:;" style="color: #FFFFFF">登录</a></div>
            <p style="text-align: center"><Checkbox v-model="single">保留登陆信息</Checkbox></p>
          </i-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Cookies from 'js-cookie'

  import urlApi from './common/urlApi';  //接口
  import codeMsg from './common/codeMessageMap'  //请求状态
  // import loginIp from './common/address'  //IP地址

  import {encrypt} from "./config/encrypt";

export default {
  name:'login',
  data(){
    return{
      // url: loginIp + urlApi.login,
      // CodeSrc: loginIp + urlApi.imgCode + '?a=' + new Date().getTime(),
      single: true,
      formInline: {
        username: Cookies.get('username'),
        password: Cookies.get('password'),
        captcha: ''
      },
    }
  },
  methods:{
    //刷新验证码
    recode () {
      let timestamp = new Date().getTime();
      // this.CodeSrc = loginIp + urlApi.imgCode + '?a=' + timestamp;
    },
    handleSubmit(){
      sessionStorage.clear();
      //判断是pc端,移动端
      if(/Android|webOS|iPhone|BlackBerry/i.test(navigator.userAgent)) {
       alert('手机端');
       this.$router.push({ name: 'mobileMain' });
      } else {
        alert('电脑端');
        let data = {
          username: this.formInline.username,
          password: this.formInline.password,
          captcha: this.formInline.captcha
        };
        if (!data.username || !data.password || !data.captcha){
          this.$Message.warning('请输入账户名,密码,验证码');
          return;
        }
        if (data.username.trim()===''||data.password===''||data.captcha.trim()===''){
          this.$Message.warning('请输入账户名,密码,验证码');
          return;
        }
        if (data.password.length <= 16){
          //密码加密
          data.password = encrypt(data.username,data.password);
        }
        if (this.single === true) {
          Cookies.set('username', this.formInline.username);
          Cookies.set('password', data.password)
        } else {
          Cookies.remove('username');
          Cookies.remove('password')
        }
        sessionStorage.username = data.username;
        this.$router.push({ name: 'HelloWorld' });
      }

    },
    //背景hover效果
    initLoginbg(){
      let width, height, largeHeader, canvas, ctx, points, target, animateHeader = true;

      // Main
      initHeader();
      initAnimation();
      addListeners();

      function initHeader() {
        width = window.innerWidth;
        height = window.innerHeight;
        target = {x: width/2, y: height/2};

        largeHeader = document.getElementById('large-header');
        largeHeader.style.height = height+'px';

        canvas = document.getElementById('demo-canvas');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');

        // create points
        points = [];
        for(var x = 0; x < width; x = x + width/20) {
          for(var y = 0; y < height; y = y + height/20) {
            var px = x + Math.random()*width/20;
            var py = y + Math.random()*height/20;
            var p = {x: px, originX: px, y: py, originY: py };
            points.push(p);
          }
        }

        // for each point find the 5 closest points
        for(var i = 0; i < points.length; i++) {
          var closest = [];
          var p1 = points[i];
          for(var j = 0; j < points.length; j++) {
            var p2 = points[j]
            if(!(p1 == p2)) {
              var placed = false;
              for(var k = 0; k < 5; k++) {
                if(!placed) {
                  if(closest[k] == undefined) {
                    closest[k] = p2;
                    placed = true;
                  }
                }
              }

              for(var k = 0; k < 5; k++) {
                if(!placed) {
                  if(getDistance(p1, p2) < getDistance(p1, closest[k])) {
                    closest[k] = p2;
                    placed = true;
                  }
                }
              }
            }
          }
          p1.closest = closest;
        }

        // assign a circle to each point
        for(var i in points) {
          var c = new Circle(points[i], 2+Math.random()*2, 'rgba(255,255,255,0.3)');
          points[i].circle = c;
        }
      }

      // Event handling
      function addListeners() {
        if(!('ontouchstart' in window)) {
          window.addEventListener('mousemove', mouseMove);
        }
        window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);
      }

      function mouseMove(e) {
        let posx = 0;
        let posy = 0;
        if (e.pageX || e.pageY) {
          posx = e.pageX;
          posy = e.pageY;
        }
        else if (e.clientX || e.clientY)    {
          posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
          posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        target.x = posx;
        target.y = posy;
      }

      function scrollCheck() {
        if(document.body.scrollTop > height) animateHeader = false;
        else animateHeader = true;
      }

      function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        largeHeader.style.height = height+'px';
        canvas.width = width;
        canvas.height = height;
      }

      // animation
      function initAnimation() {
        if (width > 750){
          animate();
        }
      }

      function animate() {
        if(animateHeader) {
          ctx.clearRect(0,0,width,height);
          for(var i in points) {
            // detect points in range
            if(Math.abs(getDistance(target, points[i])) < 4000) {
              points[i].active = 0.3;
              points[i].circle.active = 0.6;
            } else if(Math.abs(getDistance(target, points[i])) < 20000) {
              points[i].active = 0.1;
              points[i].circle.active = 0.3;
            } else if(Math.abs(getDistance(target, points[i])) < 40000) {
              points[i].active = 0.02;
              points[i].circle.active = 0.1;
            } else {
              points[i].active = 0;
              points[i].circle.active = 0;
            }

            drawLines(points[i]);
            points[i].circle.draw();
          }
        }
        requestAnimationFrame(animate);
      }


      // Canvas manipulation
      function drawLines(p) {
        if(!p.active) return;
        for(var i in p.closest) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.closest[i].x, p.closest[i].y);
          ctx.strokeStyle = 'rgba(156,217,249,'+ p.active+')';
          ctx.stroke();
        }
      }

      function Circle(pos,rad,color) {
        var _this = this;

        // constructor
        (function() {
          _this.pos = pos || null;
          _this.radius = rad || null;
          _this.color = color || null;
        })();

        this.draw = function() {
          if(!_this.active) return;
          ctx.beginPath();
          ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
          ctx.fillStyle = 'rgba(156,217,249,'+ _this.active+')';
          ctx.fill();
        };
      }

      // Util
      function getDistance(p1, p2) {
        return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
      }
    }
  },
  mounted(){
    this.initLoginbg(); //背景hover效果
  }

}
</script>

<style lang="less" scoped>
  .login-container{
    //重置默认样式
    a, button {
      outline: none;
    }
    a {
      color: #566473;
      text-decoration: none;
    }

    a:hover, a:focus {
      color: #34495e;
    }

    section {
      padding: 1em;
      text-align: center;
    }

    p.ref {
      text-align: center;
      padding: 2em 1em;
    }
    width: 100%;
    height: 100%;
  }
  .login-content{
    width: 100%;
    height: 100%;
  }
  //登陆样式
  /* Header */
  .large-header {
    position: relative;
    width: 100%;
    background: #333;
    overflow: hidden;
    background-size: cover;
    background-position: center center;
    z-index: 1;
  }

  .login-container .large-header {
    /*background-image: url('./images/login/star-bg.jpg');*/
  }
  .logo_box{
    width: 400px;
    height: 500px;
    padding: 35px;
    color: #EEE;
    position: absolute;
    left: 50%;
    top:50%;
    margin-left: -200px;
    margin-top: -250px;
  }
  .logo_box h3{
    text-align: center;
    height: 20px;
    font: 20px "microsoft yahei",Helvetica,Tahoma,Arial,"Microsoft jhengHei",sans-serif;
    color: #FFFFFF;
    height: 20px;
    line-height: 20px;
    padding:0 0 35px 0;
  }
  .forms{
    width: 280px;
    height: 485px;
  }
  .logon_inof{
    width: 100%;
    min-height: 450px;
    padding-top: 35px;
    position: relative;
  }
  .input_outer{
    height: 46px;
    padding: 0 5px;
    margin-bottom: 30px;
    border-radius: 50px;
    position: relative;
    border: rgba(255,255,255,0.2) 2px solid !important;
    input{
      margin-left: 50px;
    }
  }
  .u_user{
    width: 25px;
    height: 25px;
    background-image: url('./images/login/login_ico.png');
    //background: url(../img/login_ico.png);
    background-position:  -125px 0;
    position: absolute;
    margin: 10px 13px;
  }
  .us_uer{
    width: 25px;
    height: 25px;
    background-image: url('./images/login/login_ico.png');
    background-position: -125px -34px;
    position: absolute;
    margin: 10px 13px;
  }
  .us_code{
    width: 25px;
    height: 25px;
    background-image: url('./images/login/login_ico.png');
    background-position: -125px -212px;
    position: absolute;
    margin: 10px 13px;
  }
  .l-login{
    position: absolute;
    z-index: 1;
    left: 50px;
    top: 0;
    height: 46px;
    font: 14px "microsoft yahei",Helvetica,Tahoma,Arial,"Microsoft jhengHei";
    line-height: 46px;
  }
  .text{
    width: 220px;
    height: 46px;
    outline: none;
    display: inline-block;
    font: 14px "microsoft yahei",Helvetica,Tahoma,Arial,"Microsoft jhengHei";
    margin-left: 50px;
    border: none;
    background: none;
    line-height: 46px;
  }
  /*///*/
  .mb2{
    margin-bottom: 20px
  }
  .mb2 a{
    text-decoration: none;
    outline: none;
  }
  .submit {
    padding: 15px;
    margin-top: 20px;
    display: block;
  }
  .act-but{
    line-height: 20px;
    text-align: center;
    font-size: 20px;
    border-radius: 50px;
    background: #0096e6;
  }/* Header */
  .large-header {
    position: relative;
    width: 100%;
    background: #333;
    overflow: hidden;
    background-size: cover;
    background-position: center center;
    z-index: 1;
  }

  .login-container .large-header {
    background:#000;
    width: 100%;
    height: 100%;
    /*background-image: url('./images/login/star-bg.jpg');*/
  }
  .logo_box{
    width: 400px;
    height: 500px;
    padding: 35px;
    color: #EEE;
    position: absolute;
    left: 50%;
    top:50%;
    margin-left: -200px;
    margin-top: -250px;
  }
  .logo_box h3{
    text-align: center;
    height: 20px;
    font: 20px "microsoft yahei",Helvetica,Tahoma,Arial,"Microsoft jhengHei",sans-serif;
    color: #FFFFFF;
    line-height: 20px;
    padding:0 0 35px 0;
  }
  .forms{
    width: 280px;
    height: 485px;
  }
  .logon_inof{
    width: 100%;
    min-height: 450px;
    padding-top: 35px;
    position: relative;
  }
  .input_outer{
    height: 46px;
    padding: 0 5px;
    margin-bottom: 30px;
    border-radius: 50px;
    position: relative;
    border: rgba(255,255,255,0.2) 2px solid !important;
  }
  .u_user{
    width: 25px;
    height: 25px;
    background: url('./images/login/login_ico.png');
    background-position:  -125px 0;
    position: absolute;
    margin: 10px 13px;
  }
  .us_uer{
    width: 25px;
    height: 25px;
    background: url('./images/login/login_ico.png');
    background-position: -125px -34px;
    position: absolute;
    margin: 10px 13px;
  }
  .us_code{
    width: 25px;
    height: 25px;
    background: url('./images/login/login_ico.png');
    background-position: -125px -212px;
    position: absolute;
    margin: 10px 13px;
  }
  .l-login{
    position: absolute;
    z-index: 1;
    left: 50px;
    top: 0;
    height: 46px;
    font: 14px "microsoft yahei",Helvetica,Tahoma,Arial,"Microsoft jhengHei";
    line-height: 46px;
  }
  .text{
    width: 220px;
    height: 46px;
    outline: none;
    display: inline-block;
    font: 14px "microsoft yahei",Helvetica,Tahoma,Arial,"Microsoft jhengHei";
    margin-left: 50px;
    border: none;
    background: none;
    line-height: 46px;
  }
  /*///*/
  .mb2{
    margin-bottom: 20px
  }
  .mb2 a{
    text-decoration: none;
    outline: none;
  }
  .submit {
    padding: 15px;
    margin-top: 20px;
    display: block;
  }
  .act-but{
    line-height: 20px;
    text-align: center;
    font-size: 20px;
    border-radius: 50px;
    background: #0096e6;
  }


  input:-webkit-autofill , textarea:-webkit-autofill, select:-webkit-autofill {
    -webkit-text-fill-color: #ededed !important;
    -webkit-box-shadow: 0 0 0 1000px transparent  inset !important;
    background-color:transparent;
    background-image: none;
    transition: background-color 50000s ease-in-out 0s; //背景色透明  生效时长  过渡效果  启用时延迟的时间
  }
  input {
    background-color:transparent;}
</style>
