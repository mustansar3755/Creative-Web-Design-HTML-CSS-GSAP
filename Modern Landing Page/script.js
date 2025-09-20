document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(CustomEase, SplitText);

  CustomEase.create("hop", ".8,0,.3,1");

  const splitTextElement = (
    selector,
    type = "words,chars",
    addFirstChar = false
  ) => {
    const elements = document.querySelectorAll(selector);

    elements.forEach((element) => {
      const splitText = new SplitText(element, {
        type,
        wordsClass: "words",
        charsClass: "char",
      });

      if (type.includes("chars")) {
        splitText.chars.forEach((char, index) => {
          const text = char.textContent;
          char.innerHTML = `<span>${text}</span>`;

          if (addFirstChar && index === 0) {
            char.classList.add("first-char");
          }
        });
      }
    });
  };

  // Split Elements
  splitTextElement(".title1 h1", "words,chars", true);
  splitTextElement(".title2 h1");
  splitTextElement(".card h1", "words,chars", true);

  // Setting Initial states
  gsap.set([".split .title1 .first-char span", ".split .title2 .char span"], {
    y: "0%",
  });

  gsap.set(".split .title1 .first-char", {
    x: "18rem",
    y: "-3rem",
    fontWeight: "900",
    scale: 0.75,
  });

  gsap.set(".split .title2 .char", {
    x: "-8rem",
    fontWeight: "500",
    fontSize: "14rem",
  });

  // Timeline
  const tl = gsap.timeline();

  // Main Intro animation
  tl.to(
    ".main .title1 .char span",
    {
      y: "0%",
      duration: 0.75,
      stagger: 0.05,
      ease: "hop",
    },
    0.5
  )
    .to(
      ".main .title1 .char:not(.first-char) span",
      {
        y: "100%",
        duration: 0.75,
        stagger: 0.05,
      },
      2
    )
    .to(
      ".main .title2 .char span",
      {
        y: "0%",
        duration: 0.75,
        stagger: 0.05,
      },
      2.5
    )
    .to(
      ".main .title1 .first-char",
      {
        x: "30rem",
        duration: 0.75,
      },
      3.5
    )
    .to(
      ".main .title2 .char",
      {
        x: "-12rem",
        duration: 1,
      },
      3.5
    )
    .to(
      ".main .title1 .first-char",
      {
        x: "26rem",
        y: "-2rem",
        duration: 1,
        scale: 0.75,
        fontWeight: "900",
      },
      4.5
    )
    .to(
      ".main .title2 .char",
      {
        x: "-8rem",
        fontSize: "14rem",
        fontWeight: "500",
        duration: 0.75,
        onComplete: () => {
          gsap.set(".main", {
            clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
          });
          gsap.set(".split", {
            clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
          });
        },
      },
      4.5
    )
    .to(
      ".container",
      {
        clipPath: "polygon(0% 48%, 100% 48%, 100% 52%, 0% 52%)",
        duration: 1,
      },
      5
    )
    .to(
      [".main", ".split"],
      {
        y: (i) => (i === 0 ? "-50%" : "50%"),
        duration: 1,
      },
      6
    )
    .to(
      ".container",
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1,
      },
      6
    )
    .to(
      ".container .card",
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1,
      },
      6.25
    )
    .to(
      ".container .card h1 .char span",
      {
        y: "0%",
        duration: 1,
        stagger: 0.05,
      },
      6.5
    );
});
