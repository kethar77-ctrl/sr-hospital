/**
     * =======================================================================
     * HOSPITAL CONFIGURATION — EASY 2-MINUTE CLONING FOR OTHER HOSPITALS
     * Swap the values below to adapt this site for Jayashri Hospital
     * (919489924050, Ilayarasanenthal Rd) or Mithra Hospital (918220713993).
     * =======================================================================
     */
    const HOSPITAL_CONFIG = {
      name: "S.R. Hospital and Neocare",
      tagline: "Neonatal • Pediatric • Family Care • Kovilpatti",
      whatsappNumber: "919677957693",
      phoneDisplay: "+91 96779 57693",
      phoneTel: "+919677957693",
      shortAddress: "Puthu Road, Near Reliance Petrol Bunk, Kovilpatti 628501",
      fullAddress: "Puthu Road, Near Reliance Petrol Bunk, Kovilpatti, Tamil Nadu 628501",
      ratingText: "Trusted by 100+ Families in Kovilpatti",
      opMorning: "9:30 AM – 1:30 PM",
      opEvening: "5:30 PM – 9:00 PM",
      opSunday: "10:00 AM – 1:00 PM",
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=S.R.+Hospital+and+Neocare+Puthu+Road+Kovilpatti"
    };

    // Hydrate page fields from HOSPITAL_CONFIG on initial load
    document.addEventListener("DOMContentLoaded", () => {
      document.title = `${HOSPITAL_CONFIG.name} | Neonatal, Pediatric & Family Healthcare in Kovilpatti`;

      document.querySelectorAll("[data-hospital-name]").forEach(el => {
        el.textContent = HOSPITAL_CONFIG.name;
      });
      document.querySelectorAll("[data-hospital-tagline]").forEach(el => {
        el.textContent = HOSPITAL_CONFIG.tagline;
      });
      document.querySelectorAll("[data-hospital-short-address]").forEach(el => {
        el.textContent = HOSPITAL_CONFIG.shortAddress;
      });
      document.querySelectorAll("[data-hospital-address]").forEach(el => {
        el.textContent = HOSPITAL_CONFIG.fullAddress;
      });
      document.querySelectorAll("[data-hospital-phone-display]").forEach(el => {
        el.textContent = HOSPITAL_CONFIG.phoneDisplay;
      });
      document.querySelectorAll("[data-rating-text]").forEach(el => {
        el.textContent = HOSPITAL_CONFIG.ratingText;
      });
      document.querySelectorAll("[data-op-morning]").forEach(el => {
        el.textContent = HOSPITAL_CONFIG.opMorning;
      });
      document.querySelectorAll("[data-op-evening]").forEach(el => {
        el.textContent = HOSPITAL_CONFIG.opEvening;
      });
      document.querySelectorAll("[data-op-sunday]").forEach(el => {
        el.textContent = HOSPITAL_CONFIG.opSunday;
      });
      document.querySelectorAll("[data-op-summary]").forEach(el => {
        el.textContent = `Morning: ${HOSPITAL_CONFIG.opMorning} • Evening: ${HOSPITAL_CONFIG.opEvening}`;
      });

      ["top-call-link", "hero-call-link", "footer-call-link"].forEach(id => {
        const link = document.getElementById(id);
        if (link) link.href = `tel:${HOSPITAL_CONFIG.phoneTel}`;
      });

      ["maps-link", "map-card-link"].forEach(id => {
        const link = document.getElementById(id);
        if (link) link.href = HOSPITAL_CONFIG.googleMapsUrl;
      });

      // Set default appointment date input to today's date
      const dateInput = document.getElementById("appointment-date");
      if (dateInput) {
        const today = new Date().toISOString().split("T")[0];
        dateInput.value = today;
        dateInput.min = today;
      }

      const yearSpan = document.getElementById("current-year");
      if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    });

    // Helper: Launch WhatsApp with formatted text
    function launchWhatsApp(messageText) {
      try {
        const cleanPhone = HOSPITAL_CONFIG.whatsappNumber.replace(/\D/g, "");
        const encodedText = encodeURIComponent(messageText);
        const url = `https://wa.me/${cleanPhone}?text=${encodedText}`;
        window.open(url, "_blank", "noopener,noreferrer");
      } catch (err) {
        console.error("Could not open WhatsApp URL:", err);
      }
    }

    // General WhatsApp reception inquiry
    function openWhatsAppGeneral(introText) {
      const msg = `${introText}\n\nHospital: ${HOSPITAL_CONFIG.name}, Kovilpatti`;
      launchWhatsApp(msg);
    }

    // Pre-select department from Doctor/Department cards and scroll smoothly to booking form
    function selectDepartmentAndScroll(deptName) {
      const deptSelect = document.getElementById("patient-department");
      if (deptSelect) {
        for (let i = 0; i < deptSelect.options.length; i++) {
          if (deptSelect.options[i].value === deptName) {
            deptSelect.selectedIndex = i;
            break;
          }
        }
      }
      const section = document.getElementById("appointment");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }

    // OP Appointment Form Submission Handler
    const bookingForm = document.getElementById("op-booking-form");
    const feedbackBox = document.getElementById("form-feedback");

    if (bookingForm) {
      bookingForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const nameInput = document.getElementById("patient-name");
        const agePhoneInput = document.getElementById("patient-age-phone");
        const deptSelect = document.getElementById("patient-department");
        const dateInput = document.getElementById("appointment-date");
        const slotRadio = document.querySelector('input[name="op-slot"]:checked');

        const patientName = nameInput ? nameInput.value.trim() : "";
        const agePhone = agePhoneInput ? agePhoneInput.value.trim() : "";

        if (!patientName || !agePhone) {
          if (feedbackBox) feedbackBox.classList.remove("hidden");
          if (!patientName && nameInput) nameInput.focus();
          else if (agePhoneInput) agePhoneInput.focus();
          return;
        }

        if (feedbackBox) feedbackBox.classList.add("hidden");

        const department = deptSelect ? deptSelect.value : "Neonatal & NICU Care";
        const preferredDate = dateInput && dateInput.value ? dateInput.value : "Today";
        const opSlot = slotRadio ? slotRadio.value : `Morning OP (${HOSPITAL_CONFIG.opMorning})`;

        const message =
          `Hello ${HOSPITAL_CONFIG.name}! I would like to request an *OP Appointment*.\n\n` +
          `• *Patient Name:* ${patientName}\n` +
          `• *Age / Phone:* ${agePhone}\n` +
          `• *Department:* ${department}\n` +
          `• *Preferred Date:* ${preferredDate}\n` +
          `• *Preferred Slot:* ${opSlot}\n\n` +
          `Please confirm token availability. Thank you!`;

        launchWhatsApp(message);
      });
    }

    // Mobile Menu Toggle Logic
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const iconOpen = document.getElementById("menu-icon-open");
    const iconClose = document.getElementById("menu-icon-close");

    function toggleMobileMenu() {
      const isHidden = mobileMenu.classList.contains("hidden");
      if (isHidden) {
        mobileMenu.classList.remove("hidden");
        iconOpen.classList.add("hidden");
        iconClose.classList.remove("hidden");
      } else {
        mobileMenu.classList.add("hidden");
        iconOpen.classList.remove("hidden");
        iconClose.classList.add("hidden");
      }
    }

    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener("click", toggleMobileMenu);
    }

    document.querySelectorAll(".mobile-nav-link").forEach(link => {
      link.addEventListener("click", () => {
        if (!mobileMenu.classList.contains("hidden")) {
          toggleMobileMenu();
        }
      });
    });

(function(){
      const rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
      document.querySelectorAll('#departments .grid > div, #doctors .grid > div, #appointment .grid > div').forEach((el,i)=>{el.classList.add('reveal','tilt');el.style.transitionDelay=(i%3)*90+'ms';setTimeout(()=>el.style.transitionDelay='0ms',2500)});
      document.querySelectorAll('a.bg-medical-teal, button.bg-medical-teal, button[type=submit], #hero-call-link').forEach(b=>b.classList.add('btn-shine'));
      const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
      document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
      const co=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;co.unobserve(e.target);
        const el=e.target,end=parseFloat(el.dataset.count),d=+el.dataset.dec||0,t0=performance.now();
        (function f(t){const k=Math.min((t-t0)/1400,1),v=end*(1-Math.pow(1-k,3));el.textContent=v.toFixed(d);if(k<1&&!rm)requestAnimationFrame(f);else el.textContent=end.toFixed(d)})(t0)}),{threshold:.6});
      document.querySelectorAll('[data-count]').forEach(el=>co.observe(el));
      const bar=document.getElementById('progress'),top=document.getElementById('to-top');
      addEventListener('scroll',()=>{const h=document.documentElement,m=h.scrollHeight-h.clientHeight;bar.style.width=(m?scrollY/m*100:0)+'%';top.classList.toggle('show',scrollY>600)},{passive:true});
      top.onclick=()=>scrollTo({top:0,behavior:'smooth'});
      document.addEventListener('click',e=>{const b=e.target.closest('.btn-shine');if(!b||rm)return;const r=b.getBoundingClientRect(),s=Math.max(r.width,r.height),d=document.createElement('span');d.className='ripple-dot';d.style.cssText='width:'+s+'px;height:'+s+'px;left:'+(e.clientX-r.left-s/2)+'px;top:'+(e.clientY-r.top-s/2)+'px';b.appendChild(d);setTimeout(()=>d.remove(),600)});
      if(!rm&&matchMedia('(hover:hover)').matches)document.querySelectorAll('.tilt').forEach(c=>{
        c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform='perspective(800px) rotateY('+x*6+'deg) rotateX('+-y*6+'deg) translateY(-4px)'});
        c.addEventListener('mouseleave',()=>c.style.transform='')});
    })();
