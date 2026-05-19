document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. STICKY NAVBAR MANAGEMENT & ACCENT LINKS SCROLL ROUTINE
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    const handleWindowScroll = () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        let currentActiveSectionId = "";
        let currentScrollY = window.pageYOffset;

        sections.forEach(sec => {
            const h = sec.offsetHeight;
            const top = sec.offsetTop - 120;
            if (currentScrollY > top && currentScrollY <= top + h) {
                currentActiveSectionId = sec.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentActiveSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', handleWindowScroll);

    /* ==========================================================================
       2. RESPONSIVE MOBILE ACCORDION OVERLAY DRAWER LINKS
       ========================================================================== */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    const toggleMobileMenu = () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('open');
    };

    hamburger.addEventListener('click', toggleMobileMenu);

    navLinks.forEach(l => {
        l.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('open');
        });
    });

    /* ==========================================================================
       3. E-COMMERCE MEMORY CART STATE DATA CONTROLLER
       ========================================================================== */
    let globalCartStateData = [];

    const cartTrigger = document.getElementById('cart-trigger');
    const cartClose = document.getElementById('cart-close');
    const cartDrawer = document.getElementById('cart-drawer');
    const drawerOverlay = document.getElementById('drawer-overlay');
    const cartCountBadge = document.getElementById('cart-count');
    const drawerCountLabel = document.getElementById('drawer-count');
    const drawerItemsWrapper = document.getElementById('drawer-items');
    const subtotalTextDisplay = document.getElementById('cart-subtotal');
    const toastMessage = document.getElementById('toast');

    const toggleCartDrawerSystem = () => {
        cartDrawer.classList.toggle('open');
        drawerOverlay.classList.toggle('open');
    };

    cartTrigger.addEventListener('click', toggleCartDrawerSystem);
    cartClose.addEventListener('click', toggleCartDrawerSystem);
    drawerOverlay.addEventListener('click', toggleCartDrawerSystem);

    const triggerToastFeedback = (productName) => {
        toastMessage.textContent = `"${productName}" added to shopping selection.`;
        toastMessage.classList.add('active');
        setTimeout(() => toastMessage.classList.remove('active'), 3000);
    };

    const updateCalculatedCartDOM = () => {
        const totalItemsCount = globalCartStateData.length;
        cartCountBadge.textContent = totalItemsCount;
        drawerCountLabel.textContent = totalItemsCount;

        if (totalItemsCount === 0) {
            drawerItemsWrapper.innerHTML = `<p class="empty-message">Your shopping bag is currently empty.</p>`;
            subtotalTextDisplay.textContent = "$0.00";
            return;
        }

        drawerItemsWrapper.innerHTML = "";
        let runningCalculatedTotal = 0;

        globalCartStateData.forEach((item, index) => {
            runningCalculatedTotal += item.price;
            const itemRow = document.createElement('div');
            itemRow.classList.add('cart-item-row');
            itemRow.innerHTML = `
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <p>$${item.price.toFixed(2)}</p>
                </div>
                <button class="remove-item-btn" data-index="${index}">Remove</button>
            `;
            drawerItemsWrapper.appendChild(itemRow);
        });

        subtotalTextDisplay.textContent = `$${runningCalculatedTotal.toFixed(2)}`;

        // Attach individual remove item button triggers
        document.querySelectorAll('.remove-item-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const targetIdx = parseInt(this.getAttribute('data-index'), 10);
                globalCartStateData.splice(targetIdx, 1);
                updateCalculatedCartDOM();
            });
        });
    };

    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const parentProductCard = this.closest('.product-card');
            const itemPayload = {
                id: parentProductCard.getAttribute('data-id'),
                name: parentProductCard.getAttribute('data-name'),
                price: parseFloat(parentProductCard.getAttribute('data-price'))
            };

            globalCartStateData.push(itemPayload);
            updateCalculatedCartDOM();
            triggerToastFeedback(itemPayload.name);
        });
    });

    document.getElementById('checkout-btn').addEventListener('click', () => {
        if(globalCartStateData.length > 0) {
            alert("Checkout integration pipeline initializing securely via Asif Codes IO structural nodes.");
            globalCartStateData = [];
            updateCalculatedCartDOM();
            toggleCartDrawerSystem();
        }
    });

    /* ==========================================================================
       4. CLIENT PREFERENCE DYNAMIC CONFIG MODE ENGINE (DARK/LIGHT)
       ========================================================================= */
    const themeToggle = document.getElementById('theme-toggle');
    const bodyElement = document.body;

    const savedThemeProfile = localStorage.getItem('vortex-theme-token') || 'dark-mode';
    bodyElement.className = savedThemeProfile;

    themeToggle.addEventListener('click', () => {
        if (bodyElement.classList.contains('dark-mode')) {
            bodyElement.className = 'light-mode';
            localStorage.setItem('vortex-theme-token', 'light-mode');
        } else {
            bodyElement.className = 'dark-mode';
            localStorage.setItem('vortex-theme-token', 'dark-mode');
        }
    });

    /* ==========================================================================
       5. ACCORDION FAQ LOGISTICS ROUTINES
       ========================================================================== */
    const accordionTriggers = document.querySelectorAll('.accordion-trigger');

    accordionTriggers.forEach(t => {
        t.addEventListener('click', function() {
            const currentItem = this.parentElement;
            const nestedContent = this.nextElementSibling;

            document.querySelectorAll('.accordion-item').forEach(item => {
                if (item !== currentItem) {
                    item.classList.remove('active');
                    item.querySelector('.accordion-content').style.maxHeight = null;
                }
            });

            currentItem.classList.toggle('active');
            if (currentItem.classList.contains('active')) {
                nestedContent.style.maxHeight = nestedContent.scrollHeight + "px";
            } else {
                nestedContent.style.maxHeight = null;
            }
        });
    });

    /* ==========================================================================
       6. COMPREHENSIVE SECURITY REGEX CLIENT FORM MATCH VALIDATION
       ========================================================================== */
    const contactForm = document.getElementById('storefront-contact-form');
    const formFeedbackNotice = document.getElementById('form-msg');

    const evaluateGroupClasses = (fieldElement, assertionRule) => {
        if (assertionRule) {
            fieldElement.classList.remove('invalid');
            return true;
        } else {
            fieldElement.classList.add('invalid');
            return false;
        }
    };

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameField = document.getElementById('client-name');
        const emailField = document.getElementById('client-email');
        const notesField = document.getElementById('client-notes');

        const isNamePassed = evaluateGroupClasses(nameField.parentElement, nameField.value.trim().length > 1);
        
        const standardEmailSyntaxRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmailPassed = evaluateGroupClasses(emailField.parentElement, standardEmailSyntaxRegex.test(emailField.value.trim()));
        
        const isNotesPassed = evaluateGroupClasses(notesField.parentElement, notesField.value.trim().length > 6);

        if (isNamePassed && isEmailPassed && isNotesPassed) {
            formFeedbackNotice.style.color = 'var(--success-green)';
            formFeedbackNotice.textContent = "Secure storefront allocation registration confirmed. Verification dispatched.";
            contactForm.reset();
            document.querySelectorAll('.input-container').forEach(c => c.classList.remove('invalid'));
        } else {
            formFeedbackNotice.style.color = 'var(--error-red)';
            formFeedbackNotice.textContent = "Parameters incorrect. Resolve highlighted fields validation rules.";
        }
    });

    /* ==========================================================================
       7. VIEWPORT OBSERVERS: PARALLAX ANIMATIONS & COUNTERS METRICS
       ========================================================================== */
    const scrollTriggeredElements = document.querySelectorAll('.scroll-animate');
    const quantitativeMetricNumbers = document.querySelectorAll('.metric-num');

    const animateMetricsCounter = (counterLabel) => {
        const ultimateTargetValue = parseInt(counterLabel.getAttribute('data-target'), 10);
        let startingCounter = 0;
        const structuralStepRatio = ultimateTargetValue / 30;

        const loopRender = () => {
            startingCounter += structuralStepRatio;
            if (startingCounter < ultimateTargetValue) {
                counterLabel.textContent = Math.ceil(startingCounter) + (ultimateTargetValue === 98 ? "%" : "");
                setTimeout(loopRender, 30);
            } else {
                counterLabel.textContent = ultimateTargetValue + (ultimateTargetValue === 98 ? "%" : "");
            }
        };
        loopRender();
    };

    const optimizationObserverOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: "0px"
    };

    const structuralObserverPipeline = new IntersectionObserver((entries, pipelineObserver) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('scroll-animate')) {
                    entry.target.classList.add('animated-in');
                    pipelineObserver.unobserve(entry.target);
                }
                if (entry.target.classList.contains('metric-num')) {
                    animateMetricsCounter(entry.target);
                    pipelineObserver.unobserve(entry.target);
                }
            }
        });
    }, optimizationObserverOptions);

    scrollTriggeredElements.forEach(el => structuralObserverPipeline.observe(el));
    quantitativeMetricNumbers.forEach(m => structuralObserverPipeline.observe(m));
});