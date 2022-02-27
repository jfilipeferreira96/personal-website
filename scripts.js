//Inicialização variaveis
const resume = document.getElementById('resume');
const email = document.getElementById('email');
const hamburguer = document.querySelector('.menu');
const menu_settings = document.querySelector('.base');
const mySVG = document.querySelector('svg');
const lampIcon = document.getElementById('icon_1');
const soundIcon = document.getElementById('icon_2');
const clicableSectionLamp = document.getElementById('clicable_icon_1');
const clicableSectionSound = document.getElementById('clicable_icon_2');
const sound = new Audio();

const paperPlanePaths = {
  //https://yqnn.github.io/svg-path-editor/
  'normal_devices': [
    { 
      path: "M 0 0 C 0.6667 -0.3333 191 -80 75 -96 C -216 -31 -220 -75 -103 -376",
      duration: "5"
    },
    {
      path: "M 0 0 C -216 -31 -220 -75 -44 -103 C 149 -171 204 106 -165 57 C -224 55 -235 -103 -220 -200",
      duration: "5"
    },
    {
      path: "M 0 0 C 0.6667 -0.3333 83 -30 45 -96 C 22 -122 -110 -112 -102 90 L -99 219",
      duration: "4"
    }
  ],
  'smaller_devices': [
    { 
      path: "M 0 0 C 107 -96 91 -183 -1 -105 C -37 -54 -98 -131 -50 -329",
      duration: "4"
    },
    {
      path: "M 0 0 C 107 -96 91 -183 -1 -105 C -37 -54 -139 45 -53 94 C 39 117 117 56 67 -367",
      duration: "5"
    },
    {
      path: "M 0 0 C 0.6667 -0.3333 83 -30 45 -96 C 22 -122 -99 -116 -72 82 C -63 144 -16.3333 182 -12 200",
      duration: "4"
    }
  ]
};

const sounds = {
    'unmute' : 'audio/unmute.mp3',
    'deafen' : 'audio/deafen.mp3',
    'lampSwitchOn' : 'audio/lampSwitchOn.mp3',
    'lampSwitchOff' : 'audio/lampSwitchOff.mp3',
    'buttonClicked' : 'audio/buttonClicked.mp3'
}

// Check if sound is on
let isSoundOn = true;

//TimelinesGsap
let tl = gsap.timeline({delay:0.5});
let tl2 = gsap.timeline({delay:0.3});
let wasResumePressed = 0;

//Animação Inicial
tl.from('#base_chao', { duration: 0.9, ease: "bounce.out", opacity:0, y:-100});
tl.from('#secretaria', { duration: 0.6, ease: "elastic.out(0.5, 0.3)", opacity:0, y:-100});
tl.from('#corpo', { duration: 0.7, ease: "power2. out", opacity:0});
tl.from('#inv_screen', { duration: 0.4, ease: "power2. out", opacity:0});
tl.to("#botao", 0.25,{ css: {x: -1, y: 0.9, opacity: 1, scale: 1.30, transformOrigin:"0% 100%, "}, ease:Power1.easeInOut});
tl.to("#botao", 0.45,{ css: {x: 0, y: 0, rotation: 0, scale: 1, transformOrigin:"0% 100%" }, ease:Power1.easeInOut}); 
tl.from(".headers,#buttons-container", { duration: 0.6, ease: "elastic.out(0.5, 0.3)", opacity:0, y:-50});
TweenMax.to(".base", 3.5,  {display:'inline', opacity: 1});

//Event Listeners
resume.addEventListener('click', (e) =>{
  e.preventDefault();

  if(isSoundOn){
    sound.src = './audio/buttonClicked.mp3';
    sound.play();
  }
  

  resume.classList.add('active');
  resume.setAttribute("disabled", "disabled");
  email.setAttribute("disabled", "disabled");
 
  if(wasResumePressed < 1){
    tl2.to("#botao", 0.25,{ css: {x: -1, y: 0.9, opacity: 1, scale: 1.30, transformOrigin:"0% 100%, "}, ease:Power1.easeInOut});
    tl2.to("#botao", 0.45,{ css: {x: 0, y: 0, rotation: 0, scale: 1, transformOrigin:"0% 100%" }, ease:Power1.easeInOut}); 
    //esconder os btns e apresentar o loading
    tl2.to("#todos_botoes, #botao_border", 0.25,{ css: { opacity: 0}, ease:Power1.easeInOut});
    tl2.to("#camada_loading" , 0.3, {autoAlpha: 1, display:'inline'});
    //barra a mover-se lateralmente
    tl2.to('#smaller_bar', 2,{delay:0.7, duration: 1.5, scaleX:6.88, ease:"slow(0.2, 0.3, false)" });
    //esconder a camada loading
    tl2.to("#camada_loading" , 0.5, {delay:0.5, autoAlpha: 0, display:'none'});
    tl2.to("#todos_botoes, #botao_border", 0.45,{ css: { opacity: 1}, ease:Power1.easeInOut});
  }else{
    tl2.restart();
  }
  
  setTimeout(resetResumeButton, 4000);
  
});

function resetResumeButton() {
  resume.classList.remove('active'),
  resume.removeAttribute('disabled'),
  email.removeAttribute('disabled'),
  wasResumePressed++
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

email.addEventListener('click', (e) =>{
  e.preventDefault();
  
  if(isSoundOn){
    sound.src = './audio/buttonClicked.mp3';
    sound.play();
  }

  email.classList.add('active');
  resume.disabled = 'true';
  email.disabled = 'true';

  tl.to("#botao", 0.25,{ css: {x: -1, y: 0.9, opacity: 1, scale: 1.30, transformOrigin:"0% 100%, "}, ease:Power1.easeInOut});
  tl.to("#botao", 0.45,{ css: {x: 0, y: 0, rotation: 0, scale: 1, transformOrigin:"0% 100%" }, ease:Power1.easeInOut}); 

  //path and duration of the paperairplane
  let path = '';
  let duration = '';

  if(window.innerWidth > 680){
    path = paperPlanePaths.normal_devices[getRandomInt(3)].path;
    duration = paperPlanePaths.normal_devices[getRandomInt(3)].duration;
  }else{
    path = paperPlanePaths.smaller_devices[getRandomInt(3)].path;
    duration = paperPlanePaths.smaller_devices[getRandomInt(3)].duration;
  }

  gsap.registerPlugin(MotionPathPlugin);
  document.getElementById('aviao_papel').style.display = 'inline';

  gsap.to("#layer6", {
    motionPath: {
      path: path,
      alignOrigin: [0.5, 0.5],
      autoRotate: true
    },
    duration: duration,
    transformOrigin: "50% 50%",
    ease: "power1.inOut"
  });

  //esconder o aviao apos x segundos
  TweenMax.to("#aviao_papel", 4.5, {display:"none", ease:Back.easeIn});
  
  setTimeout(resetEmailButton,3000);

});

function resetEmailButton() {
  window.location.href = "mailto:jfilipeferreira@ua.pt",
  email.classList.remove('active'),
  resume.removeAttribute('disabled'),
  email.removeAttribute('disabled')
  if(isSoundOn){
    sound.src = './audio/mailSent.mp3';
    sound.play();
  }
}

hamburguer.addEventListener('click', ()=>{
 
  menu_settings.classList.toggle("open");
  
});


//Resizing mySVG
function reportWindowSize() {
  if(window.innerWidth >= 1301){
    mySVG.setAttribute("viewBox", "-90 50 300 250");
  }else if(window.innerWidth < 1301 && window.innerWidth > 1150){
    mySVG.setAttribute("viewBox", "-70 50 300 250");
  }else if(window.innerWidth < 1150 && window.innerWidth > 894){
    mySVG.setAttribute("viewBox", "-70 50 300 300");
  }else if(window.innerWidth < 894 && window.innerWidth > 550){
   mySVG.setAttribute("viewBox", "-60 30 300 300");
  }else if(window.innerWidth < 550 && window.innerWidth > 421){
    mySVG.setAttribute("viewBox", "10 -20 250 250");
  }else if(window.innerWidth < 421){
    mySVG.setAttribute("viewBox", "50 0 200 250");
  }
}
window.addEventListener('resize', reportWindowSize);
document.addEventListener("DOMContentLoaded", function() {
  reportWindowSize();
});


// Dark Mode Styles
function darkMode() {
  lampIcon.classList.replace('fa-solid', 'fa-regular');
}

// Light Mode Styles
function lightMode() {
  lampIcon.classList.replace('fa-regular', 'fa-solid');
}

function deactivatingSound() {
  soundIcon.classList.replace('fa-volume-high', 'fa-volume-xmark');
  isSoundOn = false;
}

//Toogle Themes, hamburguer header section
clicableSectionLamp.addEventListener('click', (e) =>{
  if (lampIcon.classList.contains('fa-solid')) {
    if(isSoundOn){
      sound.src = './audio/lampSwitchOff.mp3';
      sound.play();
    }
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    darkMode();
  } else {
    if(isSoundOn){
      sound.src = './audio/lampSwitchOn.mp3';
      sound.play();
    }
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
    lightMode();
  }
  menu_settings.classList.toggle("open");
});

// Check Local Storage For Theme
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);

  if (currentTheme === 'dark') {
    darkMode();
  }
}

// Check Local Storage For Sound On/off
const soundOnOff = localStorage.getItem('sound');
console.log(soundOnOff);
if (soundOnOff) {
  document.documentElement.setAttribute('sound', soundOnOff);

  if (soundOnOff === 'off') {
    deactivatingSound();
  }
}

clicableSectionSound.addEventListener('click', (e) =>{
  if (soundIcon.classList.contains('fa-volume-xmark')) {
    sound.src = './audio/unmute.mp3';
    sound.play();
    localStorage.setItem('sound', 'on');
    soundIcon.classList.replace('fa-volume-xmark', 'fa-volume-high');
  } else {
    sound.src = './audio/deafen.mp3';
    sound.play();
    localStorage.setItem('sound', 'off');
    soundIcon.classList.replace('fa-volume-high', 'fa-volume-xmark');
    isSoundOn = false;
  }
  menu_settings.classList.toggle("open");
});

