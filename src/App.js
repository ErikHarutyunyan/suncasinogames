import {useEffect} from "react";
import {data} from "./gameData";
import {Card} from "./components/Card";


export default function App() {

  useEffect(() => {
    // Bg Effects
    let canvasElement = document.getElementById("canvas");
    if (canvasElement == null) {
      /* ---- CORE ---- */
      /**/ /**/
      const canvas = document.createElement("canvas");
      /**/
      const context = canvas.getContext("2d");
      /**/
      let windowWidth = (canvas.width = window.innerWidth);
      /**/
      let windowHeight = (canvas.height = window.innerHeight);
      /**/
      canvas.id = "canvas";
      /**/
      document.body.insertBefore(
        canvas,
        document.body.firstChild
      ); /* ---- CREATING ZONE ---- */ /* ---- SETTINGS ---- */ /* ---- CORE END ---- */
      /**/
      const numberParticlesStart = 1000;
      const particleSpeed = 0.3;
      const velocity = 0.9;
      const circleWidth = 50;

      /* ---- INIT ---- */
      let particles = [];

      const getRandomFloat = (min, max) => Math.random() * (max - min) + min;

      /* ---- Particle ---- */
      function Particle(x, y) {
        this.x = x;
        this.y = y;

        this.vel = {
          x: getRandomFloat(-20, 20) / 100,
          y: getRandomFloat(-20, 20) / 100,
          min: getRandomFloat(2, 10),
          max: getRandomFloat(10, 100) / 10
        };

        this.color = "rgba(255, 255, 255, 0.05)";
      }

      Particle.prototype.render = function () {
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, 1, 0, Math.PI * 2);
        context.fill();
      };
      Particle.prototype.update = function () {
        const forceDirection = {
          x: getRandomFloat(-1, 1),
          y: getRandomFloat(-1, 1)
        };

        if (Math.abs(this.vel.x + forceDirection.x) < this.vel.max) {
          this.vel.x += forceDirection.x;
        }
        if (Math.abs(this.vel.y + forceDirection.y) < this.vel.max) {
          this.vel.y += forceDirection.y;
        }

        this.x += this.vel.x * particleSpeed;
        this.y += this.vel.y * particleSpeed;

        if (Math.abs(this.vel.x) > this.vel.min) {
          this.vel.x *= velocity;
        }
        if (Math.abs(this.vel.y) > this.vel.min) {
          this.vel.y *= velocity;
        }

        this.testBorder();
      };
      Particle.prototype.testBorder = function () {
        if (this.x > windowWidth) {
          this.setPosition(this.x, "x");
        } else if (this.x < 0) {
          this.setPosition(windowWidth, "x");
        }
        if (this.y > windowHeight) {
          this.setPosition(this.y, "y");
        } else if (this.y < 0) {
          this.setPosition(windowHeight, "y");
        }
      };
      Particle.prototype.setPosition = function (pos, coor) {
        if (coor === "x") {
          this.x = pos;
        } else if (coor === "y") {
          this.y = pos;
        }
      };

      function returnAnim() {
        particles = [];
        context.clearRect(0, 0, windowWidth, windowHeight);
        init();
      }

      /* ---- Functions ----*/
      function loop() {
        let i;
        const length = particles.length;
        for (i = 0; i < length; i++) {
          particles[i].update();
          particles[i].render();
        }
        requestAnimationFrame(loop);
      }

      /* ---- START ---- */
      function init() {
        let i;
        for (i = 0; i < numberParticlesStart; i++) {
          const angle = Math.random() * 360;
          particles.push(
            new Particle(
              windowWidth * 0.5 + Math.cos(angle) * circleWidth,
              windowHeight * 0.5 - Math.sin(angle) * circleWidth
            )
          );
        }
      }

      init();
      window.onresize = () => {
        windowWidth = canvas.width = window.innerWidth;
        windowHeight = canvas.height = window.innerHeight;
        particles = [];
        context.clearRect(0, 0, windowWidth, windowHeight);
        init();
      };
      window.addEventListener("click", () => {
        particles = [];
        context.clearRect(0, 0, windowWidth, windowHeight);
        init();
      });

      setInterval(returnAnim, 30000);
      loop();
    }
    // Card Animation
    const isNarrowScreen = window.matchMedia("(max-width: 500px)").matches;
    const wrapper = document.querySelectorAll(".cardWrap");
    if (!isNarrowScreen) {
      wrapper.forEach((element) => {
        let state = {
          mouseX: 0,
          mouseY: 0,
          height: element.clientHeight,
          width: element.clientWidth
        };

        element.addEventListener("mousemove", (ele) => {
          const card = element.querySelector(".card");
          const cardBg = card.querySelector(".cardBg");
          state.mouseX = ele.pageX - element.offsetLeft - state.width / 2;
          state.mouseY = ele.pageY - element.offsetTop - state.height / 2;

          // parallax angle in card
          const angleX = (state.mouseX / state.width) * 30;
          const angleY = (state.mouseY / state.height) * -30;
          card.style.transform = `rotateY(${angleX}deg) rotateX(${angleY}deg) `;

          // parallax position of background in card
          const posX = (state.mouseX / state.width) * -40;
          const posY = (state.mouseY / state.height) * -40;
          cardBg.style.transform = `translateX(${posX}px) translateY(${posY}px)`;
        });

        element.addEventListener("mouseout", () => {
          const card = element.querySelector(".card");
          const cardBg = card.querySelector(".cardBg");
          card.style.transform = `rotateY(0deg) rotateX(0deg) `;
          cardBg.style.transform = `translateX(0px) translateY(0px)`;
        });
      });
    }

  }, []);

  return (
    <section className="cardWrapper">
      <div className="container">
        {data.map((game) => {
          return <Card key={game.id} data={game}/>;
        })}
      </div>
    </section>
  );
}
