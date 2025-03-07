$(function () {
    mainVisualSlider()
    mainGamesSlider()
    mainLivecasinoSlider()
    mainLiveSlotsSlider()
    clickNav()
    clickUserinfo()
    activePopup()
    clickTableTr()
    circleProgressbar()
    wheelAction()
    selectFaker()
    activeTabWallet();
    activeBtnCategory()
    activePopupMember()
    mainMsgMore()
    visualAnimation1()
    wheelanimation()
})

function visualAnimation1(){
    const leftElements = document.querySelectorAll('.swiper-slide-item.visual1 .left');

    leftElements.forEach(element => {
        // 조명 컨테이너
        const container = document.createElement('div');
        container.className = 'light-container';

        // 6개의 원형 조명
        for (let i = 0; i < 6; i++) {
            const light = document.createElement('div');
            light.className = 'circle-light';
            container.appendChild(light);
        }

        // 기본 오버레이
        const overlay = document.createElement('div');
        overlay.className = 'light-overlay';

        // 글로우 효과
        const glow = document.createElement('div');
        glow.className = 'glow-effect';

        element.appendChild(container);
        element.appendChild(overlay);
        element.appendChild(glow);
    });
}

function mainVisualSlider() {
    var swiper = new Swiper(".main__visualslider", {
        slidesPerView: 1,
        autoplay:{
            delay: 300000,
        },
        loop:true,
        pagination: {
            el: '.swiper-pagination', // 페이지네이션 요소의 CSS 선택자
            clickable: true,          // 페이지네이션 버튼 클릭 가능 여부
            type: 'bullets',          // 페이지네이션 유형 ('bullets', 'fraction', 'progressbar', 'custom')
        },
    });
}

function mainGamesSlider() {
    var swiper = new Swiper(".main__gamesslider", {
        slidesPerView: 3,
        spaceBetween: 20,
        autoplay:{
            delay: 3000,
        },
        loop:true,
        breakpoints:{
            1024:{
                slidesPerView:3,
                spaceBetween: 20,
            },
            767:{
                spaceBetween:15,
            },
            320:{
                slidesPerView:2,
                spaceBetween:10,
            }
        },
    });
}


function mainLivecasinoSlider() {
    var swiper = new Swiper(".main__livecasinoslider", {
        slidesPerView: 6,
        spaceBetween: 15,
        navigation: {
            nextEl: ".main__livecasino .swiper-button-next",
            prevEl: ".main__livecasino .swiper-button-prev"
        },
        autoplay:true,
        breakpoints:{
            1024:{
                slidesPerView:6,
            },
            320:{
                slidesPerView:3,
                spaceBetween: 10,
            }
        },
        loop:true,
    });
}

function mainLiveSlotsSlider() {
    var swiper = new Swiper(".main__liveslotslider", {
        slidesPerView: 6,
        spaceBetween: 15,
        navigation: {
            nextEl: ".main__liveslotslider__outer .swiper-button-next",
            prevEl: ".main__liveslotslider__outer .swiper-button-prev"
        },
        autoplay:true,
        breakpoints:{
            1024:{
                slidesPerView:6,
            },
            320:{
                slidesPerView:3,
                spaceBetween: 10,
            }
        },
        loop:true,
    });
}
function clickNav(){
    const $nav = $('nav').eq(0)
    $('.btn-menu').on('click', function(){
        $nav.toggleClass('active')
    })
}

function clickUserinfo(){
    $('.btn-polygondown').on('click', function(){
        $('.sideProfile__outer').toggleClass('active')
        $('.img-polygondown').toggleClass('active')
    })
}

function changeWalletType(type){
    let idx = type==='deposit' ? 0 : 1
    $('.popup .firstTab button').eq(idx).addClass('active').siblings().removeClass('active')
    $('.popup__divider>div').removeClass('active').eq(idx).addClass('active')
}

function activePopup(){
    $('.aside__wallet').on('click', function(){
        showWallet()
    })
    $('.btn-deposit').on('click', function(){
        showWallet('deposit')
    })
    $('.btn-withdrawal').on('click', function(){
        showWallet('withdrawal')
    })

    function showWallet(type){
        $('.popup.wallet').css({display:'flex'})
        let idx = 0;
        if( type==='deposit' ){
            idx = 0
        }else if( type==='withdrawal' ){
            idx = 1
        }
        $('.popup .firstTab button').eq(idx).addClass('active').siblings().removeClass('active')
        $('.popup__divider>div').removeClass('active').eq(idx).addClass('active')
    }
    /* close */
    $('.popup .btn-close, .popup .bg').on('click', function(){
        $('.popup').hide()
    })

}

function clickTableTr(){
    $('.mypage__table .tr_top').on('click', function(){
        const $this = $(this)
        if( $this.hasClass('active') ){
            $this.removeClass('active')
        }else{
            $('.mypage__table .tr_top').removeClass('active')
            $this.addClass('active')
        }
    })
}


function circleProgressbar(){
    if( !$('.progress-bar').length ) return;
    const circle = document.querySelector('.progress-bar');
    const valueDisplay = document.querySelector('#progress-value');
    const maxValue = document.querySelector('#progress-value-default');
    const circumference = 2 * Math.PI * 70; // 원의 둘레 계산

    circle.style.strokeDasharray = circumference;
    
    function setProgress() {
        const currentValue = parseInt(valueDisplay.getAttribute('data-nowValue')) || 0;
        const maxNum = parseInt(maxValue.textContent) || 100000;
        const percent = (currentValue / maxNum) * 100;
        
        const offset = circumference - (percent / 100 * circumference);
        circle.style.strokeDashoffset = offset;
        
        // 숫자 표시 업데이트
        valueDisplay.textContent = currentValue.toLocaleString();
        maxValue.textContent = maxNum.toLocaleString();
    }

    // 초기 실행
    setProgress();

    // data-nowValue 값이 변경될 때마다 업데이트하기 위한 Observer 설정
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'data-nowValue') {
                setProgress();
            }
        });
    });

    observer.observe(valueDisplay, {
        attributes: true,
        attributeFilter: ['data-nowValue']
    });
}

function wheelAction(){
    if(!$('.wheel_action').length) return
    const startButton = document.querySelector('.btn-spin.start');
    const centerImage = document.querySelector('.wheel-circle');
    let isSpinning = false;
    let currentRotation = 0;  // 현재 회전 각도를 저장


    function start(){
        if (isSpinning) return;

        isSpinning = true;

        // 기본 회전 수 (9.5바퀴 = 3420도) + 랜덤 추가 회전 (0-359도)
        const additionalRotation = Math.floor(Math.random() * 360);
        const totalRotation = 3420 + additionalRotation;

        // 현재 각도에서 새로운 각도만큼 추가 회전
        currentRotation += totalRotation;

        // 애니메이션 적용
        centerImage.style.transition = 'transform 5s cubic-bezier(0.32, 0, 0.39, 1)';
        centerImage.style.transform = `rotate(${currentRotation}deg)`;

        // 애니메이션 완료 후 상태 초기화
        setTimeout(() => {
            isSpinning = false;
            // transition 제거 (다음 회전을 위해)
            centerImage.style.transition = 'none';
        }, 5000);
    }

    startButton.addEventListener('click', function() {
        start()
    });
}

function selectFaker(){
    if( !$('.select__fake').length ) return;
    $('.select__fake').each(function(){
        const $this = $(this)
        const $selected = $this.find('.selected')
        const $option = $this.find('.option')

        $selected.on('click', function(){
            $(this).toggleClass('active')
        })
        $option.on('click', function(){
            $selected.empty().append($(this).children().clone())
            $selected.removeClass('active')
        })
    })
}

function activeBtnCategory() {
    $('.btn-category').on('click', function() {
        $(this).toggleClass('active');
    });
}

function activeTabWallet() {
    $('.popup.wallet').each(function(){
        $(this).find('.tab button').on('click', function() {
            $(this).addClass('active').siblings().removeClass('active');
        })
    });
}


function activePopupMember(){
    $('.btn-member.signup').on('click', function(){
        $('.popup.signup').css({display:'flex'})
    })
    $('.showSignupPopup').on('click', function(){
        $('.popup.signup').css({display:'flex'})
    })

    $('.btn-member.login').on('click', function(){
        $('.popup.login').css({display:'flex'})
    })


}

function mainMsgMore(){
    const $msg = $('.main__msg')
    $msg.find('.btn-readmore').on('click', function(){
        $msg.toggleClass('active')
        if( $msg.hasClass('active') ){
            $(this).text('Read less...')
        }else{
            $(this).text('Read more...')
        }
    })
}

function wheelanimation(){
    const title_wonderwheel_each = $('.title_wonderwheel_each')
    if( !title_wonderwheel_each.length ) return;
    const title_wonderwheel = $('.title_wonderwheel')
/* 
    setTimeout(() => {
        title_wonderwheel_each.hide()
        title_wonderwheel.css({opacity:1})
    },3000) */
}

function popupBasicOpen(){
    $('.popup__basic').show()
}
function popupBasicClose(){
    $('.popup__basic').hide()
}

document.addEventListener('DOMContentLoaded', function() {
    const popupManager = {
        imagePopups: Array.from(document.querySelectorAll('.popup__image__cont')),
        textPopupContainer: document.querySelector('.popup__text__cont__container'),
        textPopups: Array.from(document.querySelectorAll('.popup__text__cont')),
        popupContainer: document.querySelector('.popup__container'),
        maxVisiblePopups: window.innerWidth > 991 ? 3 : 1,
        activeImagePopups: [],
        activeTextPopups: [],
        isTextPopupPhase: false,

        init() {
            // 초기화 순서 변경
            this.bindEvents();
            this.checkCookieStatus();
            this.showInitialPopups();
        },

        checkCookieStatus() {
            this.imagePopups.forEach(popup => {
                const popupId = popup.dataset.popupId;
                if (popupId && this.getCookie(`popup_${popupId}`) === 'closed') {
                    popup.style.display = 'none';
                    popup.classList.add('closed');
                }
            });

            this.textPopups.forEach(popup => {
                const popupId = popup.dataset.popupId;
                if (popupId && this.getCookie(`popup_${popupId}`) === 'closed') {
                    popup.style.display = 'none';
                    popup.classList.add('closed');
                }
            });

            const allImagesClosed = this.imagePopups.every(popup => popup.classList.contains('closed'));
            if (allImagesClosed) {
                this.isTextPopupPhase = true;
                if (this.textPopups.every(popup => popup.classList.contains('closed'))) {
                    this.closeAllPopups();
                }
            }
        },

        setCookie(name, value, days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
        },

        getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) {
                return parts.pop().split(';').shift();
            }
            return null;
        },

        bindEvents() {
            // 이벤트 위임을 사용하여 팝업 컨테이너에 이벤트 리스너 추가
            this.popupContainer.addEventListener('click', (e) => {
                // 닫기 버튼 클릭 처리
                if (e.target.closest('.popup-close')) {
                    e.preventDefault();
                    e.stopPropagation();
                    const popup = e.target.closest('.popup__image__cont, .popup__text__cont');
                    if (popup) {
                        this.handlePopupClose(popup);
                    }
                }
                
                // 오늘 하루 닫기 버튼 클릭 처리
                if (e.target.closest('.btn-todayclose')) {
                    e.preventDefault();
                    e.stopPropagation();
                    const popup = e.target.closest('.popup__image__cont, .popup__text__cont');
                    if (popup) {
                        this.handleTodayClose(popup);
                    }
                }
            });

            // 리사이즈 이벤트
            window.addEventListener('resize', () => {
                const newMaxVisible = window.innerWidth > 991 ? 3 : 1;
                if (newMaxVisible !== this.maxVisiblePopups) {
                    this.maxVisiblePopups = newMaxVisible;
                    this.updateVisiblePopups();
                }
            });
        },

        showInitialPopups() {
            const hasVisiblePopups = this.imagePopups.some(popup => !popup.classList.contains('closed')) ||
                                   this.textPopups.some(popup => !popup.classList.contains('closed'));
            
            if (!hasVisiblePopups) {
                this.popupContainer.style.display = 'none';
                return;
            }
            
            this.popupContainer.style.display = 'flex';
            this.updateVisiblePopups();
        },

        updateVisiblePopups() {
            if (!this.isTextPopupPhase) {
                const remainingImages = this.imagePopups.filter(popup => !popup.classList.contains('closed'));
                this.activeImagePopups = remainingImages.slice(0, this.maxVisiblePopups);
                
                this.imagePopups.forEach(popup => {
                    popup.style.display = this.activeImagePopups.includes(popup) ? 'block' : 'none';
                });

                if (remainingImages.length === 0) {
                    this.isTextPopupPhase = true;
                    this.showTextPopups();
                }
            } else {
                this.showTextPopups();
            }
        },

        showTextPopups() {
            if (this.textPopupContainer && this.textPopups.length > 0) {
                this.textPopupContainer.style.display = 'block';
                
                const remainingTexts = this.textPopups.filter(popup => !popup.classList.contains('closed'));
                this.activeTextPopups = remainingTexts.slice(0, this.maxVisiblePopups);
                
                this.textPopups.forEach(popup => {
                    popup.style.display = this.activeTextPopups.includes(popup) ? 'block' : 'none';
                });

                if (remainingTexts.length === 0) {
                    this.closeAllPopups();
                }
            } else {
                this.closeAllPopups();
            }
        },

        handlePopupClose(popup) {
            if (!popup || popup.classList.contains('closed')) return;
            
            popup.classList.add('closed');
            popup.style.display = 'none';
            this.updateVisiblePopups();
        },

        handleTodayClose(popup) {
            if (!popup || popup.classList.contains('closed')) return;
            
            const popupId = popup.dataset.popupId;
            if (popupId) {
                this.setCookie(`popup_${popupId}`, 'closed', 1);
            }
            this.handlePopupClose(popup);
        },

        closeAllPopups() {
            this.popupContainer.style.display = 'none';
        }
    };

    // 팝업 매니저 초기화
    popupManager.init();
});