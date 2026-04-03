function start() {
  document.getElementById("screen1").classList.remove("active");
  document.getElementById("screen2").classList.add("active");

  confetti({ particleCount: 200, spread: 120 });

  startSlideshow();
}

/* 🎬 SLIDESHOW */
let slideIndex = 0;
let slideshowStarted = false;

function startSlideshow() {
  if (slideshowStarted) return; // prevent multiple intervals
  slideshowStarted = true;

  const slides = document.querySelectorAll(".slide");

  setInterval(() => {
    slides[slideIndex].classList.remove("active");

    slideIndex = (slideIndex + 1) % slides.length;

    slides[slideIndex].classList.add("active");
  }, 2500);
}

function nextToJar() {
  document.getElementById("screen2").classList.remove("active");
  document.getElementById("screen3").classList.add("active");
}

/* jar */
let compliments = [
  "You are stronger than you think 💪",
  "Whenever things feel like too much, remember—you can do all things through Christ who gives you strength 💖",
  "When things don’t make sense, trust in the Lord with all your heart. He’s got you 🤍",
  "You are one of the kindest and most honest people I know 🌸",
  "You never give up, and that inspires others ✨",
  "Be strong and courageous—God is with you wherever you go 🙏",
  "You are truly special 💫",
  "You are deeply loved ❤️",
  "God has given you a spirit of power, love, and a sound mind 💖",
  "Never doubt your worth—you are made in God’s image ✨"
];

let count = 0;

function popCompliment() {
  document.getElementById("compliment").innerText =
    compliments[Math.floor(Math.random() * compliments.length)];

  confetti({ particleCount: 100, spread: 100 });

  count++;

  if (count >= 5) {
    document.getElementById("finalBtn").style.display = "block";
  }
}

/* cake */
function goToCake() {
  document.getElementById("screen3").classList.remove("active");
  document.getElementById("screen4").classList.add("active");

  startMic();
}

function startMic() {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {

      const audioContext = new AudioContext();
      const mic = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();

      mic.connect(analyser);

      const data = new Uint8Array(analyser.frequencyBinCount);

      function detect() {
        analyser.getByteFrequencyData(data);

        let volume = data.reduce((a, b) => a + b) / data.length;

        if (volume > 50) {
          blowOut();
        }

        requestAnimationFrame(detect);
      }

      detect();
    });
}

/* prevent multiple blow */
let blown = false;

function blowOut() {
  if (blown) return;
  blown = true;

  let flame = document.getElementById("flame");

  flame.style.transition = "0.5s";
  flame.style.opacity = "0";

  document.getElementById("cakeMsg").innerText =
    "🎉 HAPPY BIRTHDAY TO YOU 💖";

  confetti({ particleCount: 300, spread: 150 });

  setTimeout(finalScreen, 2000);
}

/* final typing */
let typingStarted = false;

function finalScreen() {

  if (typingStarted) return;
  typingStarted = true;

  document.getElementById("screen4").classList.remove("active");
  document.getElementById("screen5").classList.add("active");

  let text = `Happy Birthday Sistarrr 💖  

Not just my sister, but someone who has always been there for me no matter what.  
Growing up together gave me so many memories that I will always cherish.  

I hope life brings you beautiful moments, and when it does,  
I hope you truly believe you deserve every single one of them. Because you do hehe 😁🤍  

No matter where life takes you, I know you will do amazing things.  
Always remember that you are deeply loved and you truly deserve all the happiness in the world.  

Happy Birthday once again 🎂💖`;

  let i = 0;
  let target = document.getElementById("finalText");

  target.innerHTML = "";

  function type() {
    if (i < text.length) {
      target.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, 40);
    }
  }

  type();
}
