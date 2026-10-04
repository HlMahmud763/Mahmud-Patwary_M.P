/* =====================================================================
   Mahmud Patwary (MP) — Premium 3D Portfolio
   Plain JavaScript — no build tools required. Works on GitHub Pages.
   3D engine: Three.js (loaded from CDN in index.html)
   ===================================================================== */
(function () {
  "use strict";

  /* ---------------------------------------------------------------
     Helpers
     --------------------------------------------------------------- */
  var root = document.documentElement;
  root.classList.add("js");

  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  function clamp(v, a, b) { if (a === undefined) a = 0; if (b === undefined) b = 1; return Math.min(b, Math.max(a, v)); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function smooth(t) { t = clamp(t); return t * t * (3 - 2 * t); }
  function seg(p, a, b) { return smooth((p - a) / (b - a)); }
  function damp(a, b, l, dt) { return lerp(a, b, 1 - Math.exp(-l * dt)); }

  var isFine = window.matchMedia("(pointer: fine)").matches;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isMobile = window.innerWidth < 768;

  /* ---------------------------------------------------------------
     Preloader
     --------------------------------------------------------------- */
  var pre = $("#preloader");
  var plBar = $("#plBar");
  var plCount = $("#plCount");
  var plStart = performance.now();
  var plDur = reduced ? 300 : 1800;
  document.body.classList.add("lock");

  function plTick(t) {
    var p = clamp((t - plStart) / plDur);
    var e = 1 - Math.pow(1 - p, 3);
    var n = Math.round(e * 100);
    if (plBar) plBar.style.width = n + "%";
    if (plCount) plCount.textContent = String(n).padStart(3, "0");
    if (p < 1) requestAnimationFrame(plTick);
    else setTimeout(finishPreload, 300);
  }
  function finishPreload() {
    if (pre) pre.classList.add("done");
    document.body.classList.remove("lock");
    setTimeout(function () { root.classList.add("loaded"); }, 300);
    setTimeout(function () { if (pre) pre.style.display = "none"; }, 1300);
  }
  requestAnimationFrame(plTick);

  /* ---------------------------------------------------------------
     Split headings into words
     --------------------------------------------------------------- */
  $$(".split").forEach(function (el) {
    var words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words
      .map(function (w, i) { return '<span class="w"><span style="--i:' + i + '">' + w + "</span></span>"; })
      .join(" ");
  });

  /* ---------------------------------------------------------------
     Reveal on scroll
     --------------------------------------------------------------- */
  if ("IntersectionObserver" in window) {
    var revealIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            revealIO.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 }
    );
    $$(".reveal, .split, .reveal-cert").forEach(function (el) { revealIO.observe(el); });
  } else {
    $$(".reveal, .split, .reveal-cert").forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------------------------------------------------------------
     Counters
     --------------------------------------------------------------- */
  function runCounter(el) {
    var target = parseFloat(el.getAttribute("data-count")) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    var start = performance.now();
    var dur = 1800;
    function tick(t) {
      var p = clamp((t - start) / dur);
      var e = 1 - Math.pow(1 - p, 4);
      el.textContent = Math.round(e * target) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  if ("IntersectionObserver" in window) {
    var countIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { runCounter(e.target); countIO.unobserve(e.target); }
      });
    }, { threshold: 0.4 });
    $$("[data-count]").forEach(function (el) { countIO.observe(el); });
  }

  /* ---------------------------------------------------------------
     Navbar: scrolled / hide on scroll / active link / mobile menu
     --------------------------------------------------------------- */
  var navWrap = $("#navWrap");
  var burger = $("#burger");
  var mobileMenu = $("#mobileMenu");
  var menuOpen = false;
  var lastY = window.scrollY;

  function setMenu(open) {
    menuOpen = open;
    navWrap.classList.toggle("open", open);
    mobileMenu.classList.toggle("open", open);
    document.body.classList.toggle("lock", open);
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  burger.addEventListener("click", function () { setMenu(!menuOpen); });
  $$("a", mobileMenu).forEach(function (a) {
    a.addEventListener("click", function () { setMenu(false); });
  });

  var sectionIds = ["home", "projects", "webdesign", "graphics", "achievements", "certificates", "about", "contact"];
  var navAnchors = $$("#navLinks a, #mobileMenu a");
  if ("IntersectionObserver" in window) {
    var activeIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var id = "#" + e.target.id;
          navAnchors.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === id); });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sectionIds.forEach(function (id) { var el = document.getElementById(id); if (el) activeIO.observe(el); });
  }

  /* ---------------------------------------------------------------
     Hero background slider
     --------------------------------------------------------------- */
  var slides = $$(".hero-slide");
  var dots = $$("#slideDots button");
  var slideNum = $("#slideNum");
  var slideIdx = 0;
  var slideTimer;
  function goSlide(i) {
    slides[slideIdx].classList.remove("active");
    dots[slideIdx] && dots[slideIdx].classList.remove("active");
    slideIdx = (i + slides.length) % slides.length;
    slides[slideIdx].classList.add("active");
    if (dots[slideIdx]) {
      void dots[slideIdx].offsetWidth; // restart CSS animation
      dots[slideIdx].classList.add("active");
    }
    if (slideNum) slideNum.textContent = "0" + (slideIdx + 1);
  }
  function startSlider() {
    clearInterval(slideTimer);
    slideTimer = setInterval(function () { goSlide(slideIdx + 1); }, 6000);
  }
  dots.forEach(function (d, i) { d.addEventListener("click", function () { goSlide(i); startSlider(); }); });
  if (slides.length) startSlider();

  /* ---------------------------------------------------------------
     3D tilt cards + spotlight features (desktop only)
     --------------------------------------------------------------- */
  if (isFine && !reduced) {
    $$("[data-tilt]").forEach(function (el) {
      var max = parseFloat(el.getAttribute("data-tilt")) || 8;
      var glare = document.createElement("div");
      glare.className = "tilt-glare";
      el.appendChild(glare);
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width;
        var y = (e.clientY - r.top) / r.height;
        el.style.transform = "perspective(1100px) rotateX(" + ((0.5 - y) * max * 2).toFixed(2) + "deg) rotateY(" + ((x - 0.5) * max * 2).toFixed(2) + "deg) scale(1.02)";
        el.style.setProperty("--gx", (x * 100).toFixed(1) + "%");
        el.style.setProperty("--gy", (y * 100).toFixed(1) + "%");
      });
      el.addEventListener("mouseleave", function () { el.style.transform = ""; });
    });

    $$("[data-spot]").forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty("--mx", e.clientX - r.left + "px");
        el.style.setProperty("--my", e.clientY - r.top + "px");
      });
    });
  }

  /* ---------------------------------------------------------------
     Custom cursor (desktop only)
     --------------------------------------------------------------- */
  var pointer = { x: 0, y: 0 };
  window.addEventListener("mousemove", function (e) {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
  }, { passive: true });

  if (isFine && !reduced) {
    root.classList.add("has-cursor");
    var ring = $("#cursorRing");
    var dot = $("#cursorDot");
    var cx = -100, cy = -100, rx = -100, ry = -100;
    window.addEventListener("mousemove", function (e) {
      cx = e.clientX; cy = e.clientY;
      dot.style.transform = "translate(" + cx + "px," + cy + "px)";
      var t = e.target;
      var hover = t && t.closest && t.closest("a, button, input, textarea, label, [data-lb]");
      ring.classList.toggle("hover", !!hover);
    }, { passive: true });
    (function loop() {
      rx += (cx - rx) * 0.2;
      ry += (cy - ry) * 0.2;
      ring.style.transform = "translate(" + rx + "px," + ry + "px)";
      requestAnimationFrame(loop);
    })();
  }

  /* ---------------------------------------------------------------
     Scroll-driven effects (one rAF-throttled handler)
     --------------------------------------------------------------- */
  var hero = $("#home");
  var heroBg = $("#heroBg");
  var heroCopy = $("#heroCopy");
  var story = $("#story");
  var storyCaps = $$(".story-cap").map(function (el) {
    return { el: el, r: el.getAttribute("data-range").split(",").map(parseFloat) };
  });
  var storyBar = $("#storyBar");
  var storyStep = $("#storyStep");
  var storyIntro = $("#storyIntro");
  var mockup = $("#mockup");
  var parallaxImgs = $$("[data-parallax] img");
  var drift = $("#drift");
  var aboutPhoto = $("#aboutPhoto");
  var aboutImg = $("#aboutImg");
  var aboutCard = $("#aboutCard");
  var toTop = $("#toTop");
  var toTopRing = $("#toTopRing");

  var heroProgress = 0;
  var storyProgress = 0;
  var ticking = false;

  function range4(p, r) {
    // 0 → fade in → hold → fade out
    if (p <= r[0] || p >= r[3]) return 0;
    if (p < r[1]) return (p - r[0]) / (r[1] - r[0]);
    if (p <= r[2]) return 1;
    return 1 - (p - r[2]) / (r[3] - r[2]);
  }

  function onScroll() {
    ticking = false;
    var y = window.scrollY;
    var vh = window.innerHeight;

    // navbar
    navWrap.classList.toggle("scrolled", y > 40);
    if (!menuOpen) navWrap.classList.toggle("hidden", y > lastY && y > 500);
    lastY = y;

    // back to top
    var docH = document.documentElement.scrollHeight - vh;
    var prog = docH > 0 ? y / docH : 0;
    toTop.classList.toggle("show", y > 600);
    if (toTopRing) toTopRing.style.strokeDashoffset = (289 * (1 - prog)).toFixed(1);

    // hero
    if (hero) {
      var hp = clamp(y / hero.offsetHeight);
      heroProgress = hp;
      if (hp < 1) {
        heroCopy.style.transform = "translate3d(0," + (-160 * hp).toFixed(1) + "px,0)";
        heroCopy.style.opacity = clamp(1 - hp / 0.6).toFixed(3);
        heroBg.style.transform = "scale(" + (1 + 0.15 * hp).toFixed(4) + ")";
      }
    }

    // story
    if (story && !root.classList.contains("no-webgl")) {
      var sr = story.getBoundingClientRect();
      var total = story.offsetHeight - vh;
      var sp = clamp(-sr.top / total);
      storyProgress = sp;
      storyCaps.forEach(function (c) {
        var o = range4(sp, c.r);
        c.el.style.opacity = o.toFixed(3);
        c.el.style.transform = "translate3d(0," + ((1 - o) * (sp < c.r[1] ? 40 : -40)).toFixed(1) + "px,0)";
        c.el.style.filter = o < 1 ? "blur(" + ((1 - o) * 10).toFixed(1) + "px)" : "none";
      });
      if (storyBar) storyBar.style.transform = "scaleY(" + sp.toFixed(4) + ")";
      if (storyStep) storyStep.textContent = sp < 0.34 ? "01" : sp < 0.7 ? "02" : "03";
      if (storyIntro) storyIntro.style.opacity = clamp(1 - sp / 0.05).toFixed(3);
    }

    // mockup tilt
    if (mockup) {
      var mr = mockup.getBoundingClientRect();
      if (mr.top < vh && mr.bottom > 0) {
        var mp = clamp((vh - mr.top) / (vh * 0.75));
        mockup.style.transform = "rotateX(" + ((1 - mp) * 38).toFixed(2) + "deg) scale(" + (0.88 + 0.12 * mp).toFixed(4) + ")";
        mockup.style.opacity = clamp(mp / 0.35).toFixed(3);
      }
    }

    // image parallax
    parallaxImgs.forEach(function (img) {
      var r = img.parentElement.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      var t = (r.top + r.height / 2 - vh / 2) / vh;
      img.style.transform = "translate3d(0," + (t * -8).toFixed(2) + "%,0)";
    });

    // drifting words
    if (drift) {
      var dr = drift.getBoundingClientRect();
      if (dr.bottom > 0 && dr.top < vh) {
        drift.style.transform = "translate3d(" + ((dr.top / vh - 0.5) * 160).toFixed(1) + "px,0,0)";
      }
    }

    // about parallax
    if (aboutPhoto) {
      var ar = aboutPhoto.getBoundingClientRect();
      if (ar.bottom > 0 && ar.top < vh) {
        var ap = clamp((vh - ar.top) / (vh + ar.height));
        aboutPhoto.style.transform = "rotate(" + lerp(-5, 3, ap).toFixed(2) + "deg)";
        aboutImg.style.transform = "translate3d(0," + lerp(-8, 8, ap).toFixed(2) + "%,0)";
        aboutCard.style.transform = "translate3d(0," + lerp(50, -50, ap).toFixed(1) + "px,0)";
      }
    }
  }
  function requestScroll() {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }
  window.addEventListener("scroll", requestScroll, { passive: true });
  window.addEventListener("resize", function () { isMobile = window.innerWidth < 768; requestScroll(); });
  onScroll();

  /* ---------------------------------------------------------------
     Back to top buttons
     --------------------------------------------------------------- */
  $$("[data-top]").forEach(function (b) {
    b.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
  });

  /* ---------------------------------------------------------------
     Lightbox (graphics + certificates)
     --------------------------------------------------------------- */
  var lb = $("#lightbox");
  var lbImg = $("#lbImg");
  var lbTitle = $("#lbTitle");
  var lbDesc = $("#lbDesc");
  var lbAr = $("#lbAr");
  var lbTag = $("#lbTag");
  var lbBody = $("#lbBody");
  var lbList = [];
  var lbIndex = 0;
  var lbGroup = "";

  function lbShow() {
    var el = lbList[lbIndex];
    var img = el.querySelector("img");
    lbImg.src = img ? img.src : "";
    lbImg.alt = el.getAttribute("data-title") || "";
    lbTitle.textContent = el.getAttribute("data-title") || "";
    lbDesc.textContent = el.getAttribute("data-desc") || "";
    var ar = el.getAttribute("data-ar") || "";
    lbAr.textContent = ar;
    lbAr.style.display = ar ? "" : "none";
    var label = lbGroup === "certs" ? "Certificate" : "Calligraphy";
    lbTag.textContent = label + " · " + String(lbIndex + 1).padStart(2, "0") + " / " + String(lbList.length).padStart(2, "0");
    lbBody.classList.add("has-text");
  }
  function lbOpen(el) {
    lbGroup = el.getAttribute("data-lb");
    lbList = $$('[data-lb="' + lbGroup + '"]');
    lbIndex = lbList.indexOf(el);
    lbShow();
    lb.classList.add("open");
    lb.setAttribute("aria-hidden", "false");
    document.body.classList.add("lock");
  }
  function lbClose() {
    lb.classList.remove("open");
    lb.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lock");
  }
  function lbNav(d) {
    lbIndex = (lbIndex + d + lbList.length) % lbList.length;
    lbShow();
  }
  $$("[data-lb]").forEach(function (el) {
    el.addEventListener("click", function () { lbOpen(el); });
  });
  $("#lbClose").addEventListener("click", lbClose);
  $("#lbPrev").addEventListener("click", function (e) { e.stopPropagation(); lbNav(-1); });
  $("#lbNext").addEventListener("click", function (e) { e.stopPropagation(); lbNav(1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) lbClose(); });
  document.addEventListener("keydown", function (e) {
    if (!lb.classList.contains("open")) {
      if (e.key === "Escape" && menuOpen) setMenu(false);
      return;
    }
    if (e.key === "Escape") lbClose();
    if (e.key === "ArrowRight") lbNav(1);
    if (e.key === "ArrowLeft") lbNav(-1);
  });
  // swipe on phones
  var touchX = null;
  lb.addEventListener("touchstart", function (e) { touchX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", function (e) {
    if (touchX === null) return;
    var dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) lbNav(dx < 0 ? 1 : -1);
    touchX = null;
  });

  /* ---------------------------------------------------------------
     Contact form → opens email app with the message
     --------------------------------------------------------------- */
  var chips = $$("#chips .chip");
  var service = "Website Design";
  chips.forEach(function (c) {
    c.addEventListener("click", function () {
      chips.forEach(function (x) { x.classList.remove("active"); });
      c.classList.add("active");
      service = c.textContent.trim();
    });
  });
  var form = $("#contactForm");
  var formNote = $("#formNote");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = $("#fName").value.trim();
    var email = $("#fEmail").value.trim();
    var msg = $("#fMsg").value.trim();
    var subject = encodeURIComponent("Project inquiry — " + service + " (" + name + ")");
    var body = encodeURIComponent(
      "Assalamualaikum Mahmud,\n\nMy name is " + name + ".\nI'm interested in: " + service + "\n\n" + msg + "\n\nReply to: " + email
    );
    window.location.href = "mailto:mahmudpatwary763@gmail.com?subject=" + subject + "&body=" + body;
    formNote.classList.add("show");
    setTimeout(function () { formNote.classList.remove("show"); }, 7000);
  });

  /* =================================================================
     THREE.JS — 3D SCENES
     ================================================================= */
  function webglOK() {
    try {
      var c = document.createElement("canvas");
      return !!(window.WebGLRenderingContext && (c.getContext("webgl") || c.getContext("experimental-webgl")));
    } catch (e) { return false; }
  }

  if (typeof THREE === "undefined" || !webglOK()) {
    root.classList.add("no-webgl");
    onScroll();
    return;
  }

  var COLORS = {
    gold: 0xc9a961,
    goldLight: 0xe2cf9a,
    goldDeep: 0x9c7b3a,
    ivory: 0xf4f0e6,
    forest: 0x1f3a2b,
    forestLight: 0x3d5f49,
    emerald: 0x2b4a37,
    bg: 0x0b1812
  };

  /* ---------- geometry: rounded box via extruded rounded rect ---------- */
  function roundedRect(w, h, r) {
    var s = new THREE.Shape();
    var x = -w / 2, y = -h / 2;
    s.moveTo(x + r, y);
    s.lineTo(x + w - r, y);
    s.quadraticCurveTo(x + w, y, x + w, y + r);
    s.lineTo(x + w, y + h - r);
    s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    s.lineTo(x + r, y + h);
    s.quadraticCurveTo(x, y + h, x, y + h - r);
    s.lineTo(x, y + r);
    s.quadraticCurveTo(x, y, x + r, y);
    return s;
  }
  function roundedBox(w, h, d, r) {
    r = Math.min(r, w / 2 - 0.001, h / 2 - 0.001);
    var bev = Math.min(d * 0.35, r * 0.5, 0.03);
    var g = new THREE.ExtrudeGeometry(roundedRect(w - bev * 2, h - bev * 2, Math.max(r - bev, 0.002)), {
      depth: Math.max(d - bev * 2, 0.002),
      bevelEnabled: true,
      bevelThickness: bev,
      bevelSize: bev,
      bevelSegments: 3,
      curveSegments: 10
    });
    g.center();
    return g;
  }

  /* ---------- materials ---------- */
  function goldMat(rough) {
    return new THREE.MeshStandardMaterial({
      color: COLORS.gold, metalness: 1, roughness: rough === undefined ? 0.22 : rough,
      emissive: COLORS.goldDeep, emissiveIntensity: 0.06, envMapIntensity: 1.4
    });
  }
  function glassMat(color, opacity) {
    return new THREE.MeshPhysicalMaterial({
      color: color, metalness: 0.15, roughness: 0.12, clearcoat: 1, clearcoatRoughness: 0.08,
      transparent: opacity < 1, opacity: opacity === undefined ? 1 : opacity, envMapIntensity: 1.2, side: THREE.DoubleSide
    });
  }
  function ivoryMat() {
    return new THREE.MeshPhysicalMaterial({
      color: COLORS.ivory, metalness: 0, roughness: 0.35, clearcoat: 0.6, clearcoatRoughness: 0.3, envMapIntensity: 0.9
    });
  }
  function flatMat(color) {
    return new THREE.MeshStandardMaterial({ color: color, roughness: 0.55, metalness: 0 });
  }
  function mesh(geo, mat) { return new THREE.Mesh(geo, mat); }

  /* ---------- procedural studio environment (warm gold + green rim) ---------- */
  function makeEnv(renderer) {
    var pm = new THREE.PMREMGenerator(renderer);
    var sc = new THREE.Scene();
    sc.background = new THREE.Color(0x0b1812);
    function panel(color, intensity, pos, scale) {
      var m = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 1),
        new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(intensity), side: THREE.DoubleSide })
      );
      m.position.set(pos[0], pos[1], pos[2]);
      m.scale.set(scale[0], scale[1], 1);
      m.lookAt(0, 0, 0);
      sc.add(m);
    }
    panel(0xf1dfae, 5, [4, 4, 3], [6, 4]);
    panel(0x9cc4a8, 3.5, [-5, 2, -3], [6, 6]);
    panel(0xfff6e0, 3, [0, 6, 0.01], [5, 5]);
    panel(0xd6c594, 1.2, [0, -5, 2], [10, 10]);
    panel(0xffffff, 2, [0, 1, -6], [14, 0.6]);
    panel(0xc9a961, 1.5, [6, -1, -2], [8, 0.4]);
    var tex = pm.fromScene(sc, 0.04).texture;
    pm.dispose();
    return tex;
  }

  /* ---------- gold dust particles ---------- */
  var dotTexture = (function () {
    var c = document.createElement("canvas");
    c.width = c.height = 64;
    var x = c.getContext("2d");
    var g = x.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.35, "rgba(255,240,200,0.6)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    x.fillStyle = g;
    x.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(c);
  })();

  function makeDust(count, sx, sy, sz, size) {
    var g = new THREE.BufferGeometry();
    var pos = new Float32Array(count * 3);
    var spd = new Float32Array(count);
    for (var i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * sx;
      pos[i * 3 + 1] = (Math.random() - 0.5) * sy;
      pos[i * 3 + 2] = (Math.random() - 0.5) * sz;
      spd[i] = 0.08 + Math.random() * 0.3;
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    var m = new THREE.PointsMaterial({
      size: size, map: dotTexture, transparent: true, depthWrite: false,
      blending: THREE.AdditiveBlending, color: COLORS.goldLight, opacity: 0.7, sizeAttenuation: true
    });
    var p = new THREE.Points(g, m);
    p.userData = { spd: spd, sy: sy, count: count };
    return p;
  }
  function updateDust(p, dt, t) {
    var a = p.geometry.attributes.position;
    var d = p.userData;
    for (var i = 0; i < d.count; i++) {
      a.array[i * 3 + 1] += d.spd[i] * dt * 0.5;
      a.array[i * 3] += Math.sin(t * 0.5 + i) * dt * 0.03;
      if (a.array[i * 3 + 1] > d.sy / 2) a.array[i * 3 + 1] = -d.sy / 2;
    }
    a.needsUpdate = true;
    p.material.opacity = 0.55 + Math.sin(t * 1.4) * 0.15;
  }

  /* ---------- stage (renderer + camera + resize + visibility) ---------- */
  function createStage(canvas, opts) {
    var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2));
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.setClearColor(0x000000, 0);

    var scene = new THREE.Scene();
    scene.fog = new THREE.Fog(COLORS.bg, opts.fogNear, opts.fogFar);
    scene.environment = makeEnv(renderer);

    scene.add(new THREE.AmbientLight(0xffffff, 0.3));
    var spot = new THREE.SpotLight(0xf1dfae, 1.4, 0, 0.6, 1);
    spot.position.set(6, 8, 7);
    scene.add(spot);
    var rim = new THREE.PointLight(0x8fb59a, 0.8);
    rim.position.set(-6, -3, 4);
    scene.add(rim);

    var camera = new THREE.PerspectiveCamera(opts.fov, 1, 0.1, 100);
    camera.position.set(0, 0, opts.z);

    var stage = { renderer: renderer, scene: scene, camera: camera, visible: true, width: 1, height: 1 };
    function resize() {
      var parent = canvas.parentElement;
      var w = parent.clientWidth, h = parent.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      stage.width = w; stage.height = h;
    }
    resize();
    if ("ResizeObserver" in window) new ResizeObserver(resize).observe(canvas.parentElement);
    else window.addEventListener("resize", resize);
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (e) { stage.visible = e[0].isIntersecting; }, { rootMargin: "120px 0px" }).observe(canvas);
    }
    return stage;
  }

  /* =================================================================
     HERO SCENE — floating glass screens, gold jewels, halo, dust
     ================================================================= */
  function initHero() {
    var canvas = $("#heroCanvas");
    if (!canvas) return;
    var st = createStage(canvas, { fov: 38, z: 9, fogNear: 9, fogFar: 20 });
    var scene = st.scene, camera = st.camera;

    var rig = new THREE.Group();
    var inner = new THREE.Group();
    inner.position.set(2.4, 0.1, 0);
    rig.add(inner);
    scene.add(rig);

    var floats = [];
    function floatify(obj, speed, rotI, floatI) {
      floats.push({ obj: obj, by: obj.position.y, br: obj.rotation.clone(), speed: speed, rotI: rotI, floatI: floatI, ph: Math.random() * 10 });
    }

    // back glass panel + gold frame
    var back = new THREE.Group();
    back.position.set(0.6, 0.2, -1.4);
    back.rotation.set(0.05, -0.45, 0.02);
    back.add(mesh(roundedBox(4.6, 3, 0.08, 0.14), glassMat(COLORS.emerald, 0.9)));
    var bFrame = mesh(roundedBox(4.72, 3.12, 0.02, 0.16), goldMat(0.3));
    bFrame.position.z = -0.05;
    back.add(bFrame);
    inner.add(back);
    floatify(back, 1.4, 0.25, 0.6);

    // ivory "design canvas"
    var mid = new THREE.Group();
    mid.position.set(-0.4, -0.15, 0.1);
    mid.rotation.set(-0.03, -0.35, -0.02);
    mid.add(mesh(roundedBox(3.6, 2.3, 0.1, 0.12), ivoryMat()));
    function addTo(g, geo, mat, x, y, z) { var m = mesh(geo, mat); m.position.set(x, y, z); g.add(m); return m; }
    addTo(mid, roundedBox(1.5, 0.16, 0.04, 0.04), goldMat(), -0.85, 0.75, 0.08);
    addTo(mid, roundedBox(2.6, 0.08, 0.03, 0.02), flatMat(0xc9bda0), -0.3, 0.42, 0.08);
    addTo(mid, roundedBox(2.1, 0.08, 0.03, 0.02), flatMat(0xc9bda0), -0.55, 0.22, 0.08);
    addTo(mid, roundedBox(1.0, 0.7, 0.05, 0.06), glassMat(COLORS.forestLight, 1), -1.1, -0.5, 0.08);
    addTo(mid, roundedBox(1.0, 0.7, 0.05, 0.06), glassMat(COLORS.forest, 1), 0.05, -0.5, 0.08);
    addTo(mid, roundedBox(1.0, 0.7, 0.05, 0.06), goldMat(0.35), 1.2, -0.5, 0.08);
    inner.add(mid);
    floatify(mid, 1.1, 0.2, 0.5);

    // small front card
    var front = new THREE.Group();
    front.position.set(2.3, -1.1, 1.2);
    front.rotation.set(0.1, -0.5, 0.12);
    front.add(mesh(roundedBox(1.7, 1.1, 0.08, 0.1), glassMat(COLORS.forestLight, 0.88)));
    var circ = mesh(new THREE.CircleGeometry(0.16, 32), goldMat());
    circ.position.set(-0.45, 0.25, 0.06);
    front.add(circ);
    addTo(front, roundedBox(0.9, 0.07, 0.03, 0.02), flatMat(COLORS.ivory), 0.1, 0.25, 0.06);
    addTo(front, roundedBox(1.3, 0.07, 0.03, 0.02), flatMat(COLORS.ivory), 0, -0.1, 0.06);
    inner.add(front);
    floatify(front, 1.8, 0.4, 0.9);

    // jewels
    var knot = mesh(new THREE.TorusKnotGeometry(0.8, 0.26, isMobile ? 140 : 220, 32, 2, 3), goldMat(0.16));
    knot.position.set(-3.2, 1.6, 0.4);
    knot.scale.setScalar(0.55);
    inner.add(knot);
    floatify(knot, 1.3, 0.3, 1.1);

    var halo = mesh(new THREE.TorusGeometry(3.9, 0.025, 16, 200), goldMat(0.25));
    halo.position.set(0.5, 0.1, -0.6);
    inner.add(halo);
    var halo2 = mesh(new THREE.TorusGeometry(4.6, 0.012, 12, 200), new THREE.MeshStandardMaterial({ color: COLORS.goldLight, metalness: 1, roughness: 0.3, transparent: true, opacity: 0.55 }));
    halo2.position.copy(halo.position);
    inner.add(halo2);

    var sph1 = mesh(new THREE.SphereGeometry(1, 48, 48), goldMat(0.12));
    sph1.position.set(3.4, 1.9, 0.2); sph1.scale.setScalar(0.34); inner.add(sph1); floatify(sph1, 2, 0, 1.4);
    var sph2 = mesh(new THREE.SphereGeometry(1, 40, 40), glassMat(COLORS.forestLight, 1));
    sph2.position.set(-2.6, -1.7, 0.9); sph2.scale.setScalar(0.22); inner.add(sph2); floatify(sph2, 1.6, 0, 1.2);
    var sph3 = mesh(new THREE.SphereGeometry(1, 32, 32), goldMat(0.1));
    sph3.position.set(1.4, 2.2, 1.4); sph3.scale.setScalar(0.12); inner.add(sph3); floatify(sph3, 2.2, 0, 1.6);
    var ico = mesh(new THREE.IcosahedronGeometry(1, 0), glassMat(COLORS.emerald, 0.95));
    ico.position.set(-1.4, -2.2, -0.3); ico.scale.setScalar(0.5); ico.rotation.set(0.4, 0.3, 0); inner.add(ico); floatify(ico, 1.2, 0.6, 0.8);

    var dust = makeDust(isMobile ? 90 : 160, 18, 10, 8, 0.07);
    scene.add(dust);

    var clock = new THREE.Clock();
    var tgt = new THREE.Vector3();

    function frame() {
      requestAnimationFrame(frame);
      if (!st.visible) { clock.getDelta(); return; }
      var dt = Math.min(clock.getDelta(), 0.05);
      var t = clock.elapsedTime;

      floats.forEach(function (f) {
        var s = t * f.speed + f.ph;
        f.obj.position.y = f.by + Math.sin(s) * 0.14 * f.floatI;
        f.obj.rotation.x = f.br.x + Math.cos(s * 0.5) * 0.12 * f.rotI;
        f.obj.rotation.y = f.br.y + Math.sin(s * 0.5) * 0.12 * f.rotI;
        f.obj.rotation.z = f.br.z + Math.sin(s * 0.4) * 0.08 * f.rotI;
      });
      knot.rotation.x += dt * 0.25;
      knot.rotation.y += dt * 0.35;
      halo.rotation.z = t * 0.15;
      halo.rotation.x = Math.sin(t * 0.3) * 0.3 + 0.9;
      halo2.rotation.z = -t * 0.1;
      halo2.rotation.y = Math.cos(t * 0.25) * 0.4 + 0.5;
      ico.rotation.y += dt * 0.3;

      var p = heroProgress;
      var mobile = st.width < 1024;
      rig.rotation.y = damp(rig.rotation.y, pointer.x * 0.18 + p * 0.9, 2.5, dt);
      rig.rotation.x = damp(rig.rotation.x, -pointer.y * 0.12 + p * 0.25, 2.5, dt);
      rig.position.y = damp(rig.position.y, p * 2.2, 3, dt);
      var s = (1 - p * 0.25) * (mobile ? 0.62 : 1);
      rig.scale.setScalar(damp(rig.scale.x, s, 3, dt));
      inner.position.x = damp(inner.position.x, mobile ? 0 : 2.4, 3, dt);
      inner.position.y = damp(inner.position.y, mobile ? 2.2 : 0.1, 3, dt);

      tgt.set(pointer.x * 0.35, pointer.y * 0.25 - p * 1.2, 9 + p * 1.5);
      camera.position.lerp(tgt, 1 - Math.exp(-2.5 * dt));
      camera.lookAt(0, 0, 0);

      updateDust(dust, dt, t);
      st.renderer.render(scene, camera);
    }
    frame();
  }

  /* =================================================================
     STORY SCENE — scattered pieces assemble into a website on scroll
     ================================================================= */
  var LAYERS = [
    { size: [5.2, 3.3, 0.12], r: 0.16, mat: "ivory", keys: [[[-1.5, -2.6, -4], [1.1, -0.8, 0.5]], [[0, 0, -0.6], [0, 0, 0]], [[0, 0, 0], [0, 0, 0]]] },
    { size: [5.2, 0.42, 0.08], r: 0.06, mat: "gold", keys: [[[3.5, 3.4, 1.5], [0.6, 0.4, -1.2]], [[0, 1.44, 0.3], [0, 0, 0]], [[0, 1.44, 0.08], [0, 0, 0]]] },
    { size: [3.1, 1.5, 0.1], r: 0.1, mat: "emerald", keys: [[[-4.5, 1.8, 2.5], [-0.8, 0.9, 0.6]], [[-0.9, 0.35, 0.9], [0, 0, 0]], [[-0.9, 0.35, 0.1], [0, 0, 0]]] },
    { size: [1.7, 1.5, 0.1], r: 0.1, mat: "greenLight", keys: [[[4.8, -1.2, 3], [0.9, -1.1, 0.3]], [[1.6, 0.35, 1.4], [0, 0, 0]], [[1.6, 0.35, 0.1], [0, 0, 0]]] },
    { size: [1.5, 1.0, 0.1], r: 0.08, mat: "greenLight", keys: [[[-5, -1.5, 1], [0.3, 1.3, -0.7]], [[-1.7, -0.95, 1.8], [0, 0, 0]], [[-1.7, -0.95, 0.1], [0, 0, 0]]] },
    { size: [1.5, 1.0, 0.1], r: 0.08, mat: "gold", keys: [[[0.5, -4, 2.5], [-1.2, 0.2, 0.9]], [[0, -0.95, 2.2], [0, 0, 0]], [[0, -0.95, 0.1], [0, 0, 0]]] },
    { size: [1.5, 1.0, 0.1], r: 0.08, mat: "emerald", keys: [[[5.5, 1.5, -1.5], [0.7, -0.6, 1.4]], [[1.7, -0.95, 1.8], [0, 0, 0]], [[1.7, -0.95, 0.1], [0, 0, 0]]] },
    { size: [1.2, 0.14, 0.06], r: 0.03, mat: "gold", keys: [[[-3, 3.5, -2], [1.5, 0.4, 0.2]], [[-1.5, 0.75, 1.1], [0, 0, 0]], [[-1.5, 0.75, 0.18], [0, 0, 0]]] },
    { size: [2.2, 0.08, 0.04], r: 0.02, mat: "ivory", keys: [[[2.5, -3.2, -2.5], [0.2, 1.1, 1.3]], [[-1.1, 0.42, 1.1], [0, 0, 0]], [[-1.1, 0.42, 0.18], [0, 0, 0]]] },
    { size: [1.6, 0.08, 0.04], r: 0.02, mat: "ivory", keys: [[[-2, 2.8, 3], [0.9, -0.6, 0.4]], [[-1.4, 0.2, 1.1], [0, 0, 0]], [[-1.4, 0.2, 0.18], [0, 0, 0]]] },
    { size: [0.9, 0.26, 0.08], r: 0.12, mat: "gold", keys: [[[3.2, 2.6, 3.4], [0.4, 0.8, -0.9]], [[-1.8, -0.15, 1.2], [0, 0, 0]], [[-1.8, -0.15, 0.2], [0, 0, 0]]] }
  ];

  function layerMat(kind) {
    switch (kind) {
      case "gold": return goldMat(0.22);
      case "emerald": return glassMat(COLORS.emerald, 1);
      case "greenLight": return glassMat(COLORS.forestLight, 1);
      default: return ivoryMat();
    }
  }

  function initStory() {
    var canvas = $("#storyCanvas");
    if (!canvas) return;
    var st = createStage(canvas, { fov: 36, z: 12.5, fogNear: 10, fogFar: 26 });
    var scene = st.scene, camera = st.camera;

    var group = new THREE.Group();
    scene.add(group);

    var pieces = LAYERS.map(function (l) {
      var m = mesh(roundedBox(l.size[0], l.size[1], l.size[2], l.r), layerMat(l.mat));
      group.add(m);
      return { m: m, l: l, seed: Math.random() * 10 };
    });

    // gold frame lines (appear at the end)
    var frame = new THREE.Group();
    frame.position.z = -0.1;
    var lineMat = new THREE.MeshStandardMaterial({ color: COLORS.gold, metalness: 1, roughness: 0.25, transparent: true, opacity: 0 });
    [[0, 1.78, 5.6, 0.04], [0, -1.78, 5.6, 0.04], [-2.78, 0, 0.04, 3.6], [2.78, 0, 0.04, 3.6]].forEach(function (d) {
      var b = mesh(new THREE.BoxGeometry(d[2], d[3], 0.04), lineMat);
      b.position.set(d[0], d[1], 0);
      frame.add(b);
    });
    group.add(frame);

    var halo = mesh(new THREE.TorusGeometry(4.4, 0.02, 12, 220), new THREE.MeshStandardMaterial({ color: COLORS.goldLight, metalness: 1, roughness: 0.3, transparent: true, opacity: 0 }));
    halo.position.z = -1.5;
    halo.rotation.x = 0.2;
    group.add(halo);

    var knot = mesh(new THREE.TorusKnotGeometry(0.8, 0.26, isMobile ? 140 : 200, 32, 2, 3), goldMat(0.16));
    group.add(knot);

    var dust = makeDust(isMobile ? 80 : 140, 20, 12, 10, 0.07);
    scene.add(dust);

    var clock = new THREE.Clock();
    var p = 0;
    var tgt = new THREE.Vector3();
    var va = new THREE.Vector3(), vb = new THREE.Vector3();

    function render() {
      requestAnimationFrame(render);
      if (!st.visible) { clock.getDelta(); return; }
      var dt = Math.min(clock.getDelta(), 0.05);
      var t = clock.elapsedTime;
      p = damp(p, storyProgress, 5, dt); // smoothed → feels like a scrubbed video

      pieces.forEach(function (pc) {
        var k = pc.l.keys, from, to, tt;
        if (p < 0.55) { from = k[0]; to = k[1]; tt = seg(p, 0.02, 0.55); }
        else { from = k[1]; to = k[2]; tt = seg(p, 0.55, 0.92); }
        va.set(from[0][0], from[0][1], from[0][2]);
        vb.set(to[0][0], to[0][1], to[0][2]);
        pc.m.position.lerpVectors(va, vb, tt);
        pc.m.rotation.set(lerp(from[1][0], to[1][0], tt), lerp(from[1][1], to[1][1], tt), lerp(from[1][2], to[1][2], tt));
        var idle = (1 - seg(p, 0, 0.5)) * 0.25;
        pc.m.position.y += Math.sin(t * 0.8 + pc.seed) * idle;
        pc.m.position.x += Math.cos(t * 0.6 + pc.seed) * idle * 0.6;
      });

      var ft = seg(p, 0.7, 1);
      frame.scale.setScalar(0.6 + 0.4 * ft);
      lineMat.opacity = ft;
      halo.rotation.z = t * 0.12;
      halo.scale.setScalar(0.7 + 0.5 * seg(p, 0.6, 1));
      halo.material.opacity = 0.5 * seg(p, 0.55, 0.95);

      knot.rotation.x += dt * 0.3;
      knot.rotation.y += dt * 0.4;
      var a = p * Math.PI * 1.6;
      var rad = 4.2 - seg(p, 0.6, 1) * 1.2;
      knot.position.set(Math.cos(a) * rad, Math.sin(a * 0.7) * 1.6 + 0.4, -2 + Math.sin(a) * 1.5);
      knot.scale.setScalar(0.7 - seg(p, 0.75, 1) * 0.45);

      var ry = lerp(0.9, -0.55, seg(p, 0, 0.55)) * (1 - seg(p, 0.55, 0.95));
      var rx = lerp(0.35, 0.22, seg(p, 0, 0.55)) * (1 - seg(p, 0.55, 0.95));
      group.rotation.y = ry + pointer.x * 0.08;
      group.rotation.x = rx - pointer.y * 0.06;
      var settle = seg(p, 0.62, 0.95);
      group.position.y = lerp(0, 0.85, settle);
      group.scale.setScalar(lerp(1, 0.86, settle));

      var zoom = st.width < 768 ? 1.75 : st.width < 1024 ? 1.25 : 1;
      var z = lerp(12.5, 8.6, seg(p, 0, 0.5)) * zoom;
      tgt.set(pointer.x * 0.2, pointer.y * 0.15, z);
      camera.position.lerp(tgt, 1 - Math.exp(-4 * dt));
      camera.lookAt(0, 0, 0);

      updateDust(dust, dt, t);
      st.renderer.render(scene, camera);
    }
    render();
  }

  try {
    initHero();
    initStory();
  } catch (err) {
    // If anything goes wrong with 3D, the site still works perfectly.
    console.warn("3D disabled:", err);
    root.classList.add("no-webgl");
    $$("canvas").forEach(function (c) { c.style.display = "none"; });
    onScroll();
  }
})();
