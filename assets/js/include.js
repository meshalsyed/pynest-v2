/* ══════════════════════════════════════════════════════════════════
   PYNEST — COMPONENT INJECTOR
   Loads shared navbar / footer / social-dock partials from /components
   into any inner page that has the matching placeholder divs:
     <div id="site-header"></div>
     <div id="site-footer"></div>
     <div id="site-social-dock"></div>
   Absolute paths ("/components/...") are used throughout so this works
   identically no matter how deep the page lives (e.g. /villas/x/y/).
   ══════════════════════════════════════════════════════════════════ */
(function(){
  "use strict";

  function inject(id, url){
    var el = document.getElementById(id);
    if(!el) return Promise.resolve();
    return fetch(url)
      .then(function(res){
        if(!res.ok) throw new Error("Failed to load " + url);
        return res.text();
      })
      .then(function(html){ el.innerHTML = html; })
      .catch(function(err){ console.error("[Pynest include.js]", err); });
  }

  function markActiveNavLink(){
    var current = (document.body.getAttribute("data-nav-key") || "").trim();
    if(!current) return;
    document.querySelectorAll("#nav .nav-links a[data-nav-key]").forEach(function(a){
      if(a.getAttribute("data-nav-key") === current){
        a.classList.add("active");
        a.setAttribute("aria-current", "page");
      }
    });
  }

  function setFooterYear(){
    var y = document.getElementById("footer-year");
    if(y) y.textContent = new Date().getFullYear();
  }

  function initNavScroll(){
    var nav = document.getElementById("nav");
    if(!nav) return;
    var toggle = function(){ nav.classList.toggle("solid", window.scrollY > 60); };
    toggle();
    window.addEventListener("scroll", toggle, { passive: true });
  }

  function initScrollReveal(){
    var items = document.querySelectorAll(".reveal");
    if(!items.length) return;
    if("IntersectionObserver" in window){
      var ro = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(entry.isIntersecting){
            entry.target.classList.add("in");
            ro.unobserve(entry.target);
          }
        });
      }, { threshold: .1 });
      items.forEach(function(el){ ro.observe(el); });
    } else {
      items.forEach(function(el){ el.classList.add("in"); });
    }
  }

  function initFaqAccordions(){
    document.querySelectorAll(".faq-question").forEach(function(btn){
      btn.addEventListener("click", function(){
        var item = btn.closest(".faq-item");
        var wasOpen = item.classList.contains("open");
        item.parentElement.querySelectorAll(".faq-item").forEach(function(i){
          i.classList.remove("open");
          var q = i.querySelector(".faq-question");
          if(q) q.setAttribute("aria-expanded", "false");
        });
        if(!wasOpen){
          item.classList.add("open");
          btn.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function(){
    Promise.all([
      inject("site-header", "/components/navbar.html"),
      inject("site-footer", "/components/footer.html"),
      inject("site-social-dock", "/components/social-dock.html")
    ]).then(function(){
      markActiveNavLink();
      setFooterYear();
      initNavScroll();
      document.dispatchEvent(new CustomEvent("pynest:components-ready"));
    });

    initScrollReveal();
    initFaqAccordions();
  });
})();
