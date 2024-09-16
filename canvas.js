class GameCanvas extends HTMLElement {
  static get observedAttributes() {
    return ["grid", "width", "height"];
  }

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "closed" });

    const style = document.createElement("style");
    style.textContent = `
      :host {
        display: block;
        width: 100%;
        height: 100%;
        user-select: none;
        background-color: white;
        padding: 0;
        margin: 0;
      }
      svg {
        width: 100%;
        height: 100%;
      }
      .grid line {
        stroke: #ccc;
        stroke-width: 1;
      }
    `;

    this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.svg.setAttribute("viewBox", "-500 -500 1000 1000");

    this.gridGroup = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "g"
    );
    this.gridGroup.setAttribute("class", "grid");

    this.svg.appendChild(this.gridGroup);
    shadow.appendChild(style);
    shadow.appendChild(this.svg);

    this.elements = [];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "grid") {
      this.updateGrid();
    }
    if (name === "width" || name === "height") {
      this.updateSize();
    }
  }

  updateSize() {
    const width = this.getAttribute("width");
    const height = this.getAttribute("height");
    if (width) {
      //this.svg.setAttribute('width', width);
      this.style.width = width;
    }
    if (height) {
      //this.svg.setAttribute('height', height);
      this.style.height = height;
    }
  }

  updateGrid() {
    const gridSize = parseInt(this.getAttribute("grid"), 10);
    this.gridGroup.innerHTML = "";

    if (!gridSize || gridSize <= 0) {
      return;
    }

    //const viewBox = this.svg.viewBox.baseVal;
    const viewBox = { x: -1000, y: -1000, width: 2000, height: 2000 }

    for (let x = viewBox.x; x <= viewBox.x + viewBox.width; x += gridSize) {
      const line = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      line.setAttribute("x1", x);
      line.setAttribute("y1", viewBox.y);
      line.setAttribute("x2", x);
      line.setAttribute("y2", viewBox.y + viewBox.height);
      this.gridGroup.appendChild(line);
    }

    for (let y = viewBox.y; y <= viewBox.y + viewBox.height; y += gridSize) {
      const line = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      line.setAttribute("x1", viewBox.x);
      line.setAttribute("y1", y);
      line.setAttribute("x2", viewBox.x + viewBox.width);
      line.setAttribute("y2", y);
      this.gridGroup.appendChild(line);
    }
  }

  rect(
    x = 0,
    y = 0,
    width = 100,
    height = 100,
    color = "black",
    rotate = 0,
    z = 0,
    scale = 1
  ) {
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");

    const adjustedX = x - width / 2;
    const adjustedY = y - height / 2;

    rect.setAttribute("x", adjustedX);
    rect.setAttribute("y", adjustedY);
    rect.setAttribute("width", width);
    rect.setAttribute("height", height);
    rect.setAttribute("fill", color);

    let transform = `
      translate(${x}, ${y})
      scale(${scale})
      rotate(${rotate})
      translate(${-x}, ${-y})
    `;
    rect.setAttribute("transform", transform.trim());

    this.elements.push({ element: rect, z });

    this.elements.sort((a, b) => a.z - b.z);

    this.elements.forEach(({ element }) => {
      this.svg.appendChild(element);
    });

    // Add the onClick method
    rect.onClick = (callback) => {
      rect.addEventListener("click", (e) => {
        const rectBounds = rect.getBoundingClientRect();
        const clickX = e.clientX;
        const clickY = e.clientY;

        if (
          clickX >= rectBounds.left &&
          clickX <= rectBounds.right &&
          clickY >= rectBounds.top &&
          clickY <= rectBounds.bottom
        ) {
          if (typeof callback === "function") {
            callback(e);
          } else {
            return true;
          }
        } else {
          return false;
        }
      });
    };

    // Add the onTouch method
    rect.onTouch = (callback) => {
      rect.addEventListener("touchstart", (e) => {
        const touch = e.touches[0];
        const rectBounds = rect.getBoundingClientRect();
        const touchX = touch.clientX;
        const touchY = touch.clientY;

        if (
          touchX >= rectBounds.left &&
          touchX <= rectBounds.right &&
          touchY >= rectBounds.top &&
          touchY <= rectBounds.bottom
        ) {
          if (typeof callback === "function") {
            callback(e);
          } else {
            return true;
          }
        } else {
          return false;
        }
      });
    };

    // Add the onRelease method
    rect.onRelease = (callback) => {
      rect.addEventListener("touchend", (e) => {
        if (typeof callback === "function") {
          callback(e);
        }
      });
    };

    return rect;
  }

  circ(
    cx = 0,
    cy = 0,
    radius = 50,
    color = "black",
    rotate = 0,
    z = 0,
    scale = 1
  ) {
    const circ = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );

    circ.setAttribute("cx", cx);
    circ.setAttribute("cy", cy);
    circ.setAttribute("r", radius);
    circ.setAttribute("fill", color);

    let transform = `
      translate(${cx}, ${cy})
      scale(${scale})
      rotate(${rotate})
      translate(${-cx}, ${-cy})
    `;
    circ.setAttribute("transform", transform.trim());

    this.elements.push({ element: circ, z });

    this.elements.sort((a, b) => a.z - b.z);

    this.elements.forEach(({ element }) => {
      this.svg.appendChild(element);
    });

    // Add the onClick method
    circ.onClick = (callback) => {
      circ.addEventListener("click", (e) => {
        const circBounds = circ.getBoundingClientRect();
        const clickX = e.clientX;
        const clickY = e.clientY;

        const dx = clickX - circBounds.left - circBounds.width / 2;
        const dy = clickY - circBounds.top - circBounds.height / 2;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance <= circBounds.width / 2) {
          if (typeof callback === "function") {
            callback(e);
          } else {
            return true;
          }
        } else {
          return false;
        }
      });
    };

    // Add the onTouch method
    circ.onTouch = (callback) => {
      circ.addEventListener("touchstart", (e) => {
        const touch = e.touches[0];
        const circBounds = circ.getBoundingClientRect();
        const touchX = touch.clientX;
        const touchY = touch.clientY;

        const dx = touchX - circBounds.left - circBounds.width / 2;
        const dy = touchY - circBounds.top - circBounds.height / 2;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance <= circBounds.width / 2) {
          if (typeof callback === "function") {
            callback(e);
          } else {
            return true;
          }
        } else {
          return false;
        }
      });
    };

    // Add the onRelease method
    circ.onRelease = (callback) => {
      circ.addEventListener("touchend", (e) => {
        if (typeof callback === "function") {
          callback(e);
        }
      });
    };

    return circ;
  }

  spr(
    x = 0,
    y = 0,
    width = 100,
    height = 100,
    href,
    rotate = 0,
    z = 0,
    scale = 1
  ) {
    const img = document.createElementNS("http://www.w3.org/2000/svg", "image");

    const adjustedX = x - width / 2;
    const adjustedY = y - height / 2;

    img.setAttribute("x", adjustedX);
    img.setAttribute("y", adjustedY);
    img.setAttribute("width", width);
    img.setAttribute("height", height);
    img.setAttributeNS("http://www.w3.org/1999/xlink", "href", href);

    let transform = `
      translate(${x}, ${y})
      scale(${scale})
      rotate(${rotate})
      translate(${-x}, ${-y})
    `;
    img.setAttribute("transform", transform.trim());

    this.elements.push({ element: img, z });

    this.elements.sort((a, b) => a.z - b.z);

    this.elements.forEach(({ element }) => {
      this.svg.appendChild(element);
    });

    // Add the onClick method
    img.onClick = (callback) => {
      img.addEventListener("click", (e) => {
        const imgBounds = img.getBoundingClientRect();
        const clickX = e.clientX;
        const clickY = e.clientY;

        if (
          clickX >= imgBounds.left &&
          clickX <= imgBounds.right &&
          clickY >= imgBounds.top &&
          clickY <= imgBounds.bottom
        ) {
          if (typeof callback === "function") {
            callback(e);
          } else {
            return true;
          }
        } else {
          return false;
        }
      });
    };

    // Add the onTouch method
    img.onTouch = (callback) => {
      img.addEventListener("touchstart", (e) => {
        const touch = e.touches[0];
        const imgBounds = img.getBoundingClientRect();
        const touchX = touch.clientX;
        const touchY = touch.clientY;

        if (
          touchX >= imgBounds.left &&
          touchX <= imgBounds.right &&
          touchY >= imgBounds.top &&
          touchY <= imgBounds.bottom
        ) {
          if (typeof callback === "function") {
            callback(e);
          } else {
            return true;
          }
        } else {
          return false;
        }
      });
    };

    // Add the onRelease method
    img.onRelease = (callback) => {
      img.addEventListener("touchend", (e) => {
        if (typeof callback === "function") {
          callback(e);
        }
      });
    };

    return img;
  }

  // Método para limpar a tela
  clear() {
    this.elements = [];
    while (this.svg.firstChild) {
      this.svg.removeChild(this.svg.firstChild);
    }
    this.svg.appendChild(this.gridGroup); // Re-add the gridGroup
  }
}

customElements.define("game-canvas", GameCanvas);