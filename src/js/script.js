'use strict'

// import modals from "./modules/modal";

window.addEventListener('DOMContentLoaded', () =>{


    // modals();-------------------------------
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              windows = document.querySelectorAll('[data-modal]'),
              scroll = calcScrool();
    
    
            trigger.forEach(item => {
                item.addEventListener('click', (e) => {
                    if (e.target) {
                        e.preventDefault()
                    }

                    windows.forEach(item => {
                        item.style.display = 'none'
                    })
        
                    modal.style.display = "block"
                    document.body.style.overflow = "hidden"
                    document.body.style.marginRight = `${scroll}px`
                })
        
                close.addEventListener('click', () => {
                    windows.forEach(item => {
                        item.style.display = 'none'
                    })

                    modal.style.display = "none"
                    document.body.style.overflow = ""
                    document.body.style.marginRight = `0px`
                })
            })
    
            modal.addEventListener('click', (e) => {
                if (e.target === modal && closeClickOverlay){
                    windows.forEach(item => {
                        item.style.display = 'none'
                    })

                    modal.style.display = "none"
                    document.body.style.overflow = ""
                    document.body.style.marginRight = `0px`
                }
            })
        }

    function showModalByTime(selector, time){
        setTimeout(() => {
            document.querySelector(selector).style.display= "block";                    
            document.body.style.overflow = "hidden"
        }, time);
    }

    function calcScrool() {
        let div = document.createElement('div');

        div.style.width = '50px'
        div.style.height = '50px'
        div.style.overflow = 'scrool'
        div.style.visibility = 'hidden'


        document.body.appendChild(div)

        let scrollWi = div.offsetWidth - div.clientWidth;
        div.remove;

        return scrollWi

    }



    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.phone_link', '.popup', '.popup .popup_close');
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
    // showModalByTime('.popup', 60000)




    // ----------------------------------

    const tabs = (headerSelektor, tabSelector, contentSelector, actionClass, display = 'block') => {
        const header = document.querySelector(headerSelektor),
              tab = document.querySelectorAll(tabSelector),
              content = document.querySelectorAll(contentSelector);


        function hideTabContent() {
            content.forEach(item => {
                item.style.display = 'none';
            });
    
            tab.forEach(item => {
                item.classList.remove(actionClass);
            });
        }

        function showTabContent(i = 0) {
            content[i].style.display = display;
            tab[i].classList.add(actionClass);
        }
    
        hideTabContent();
        showTabContent();

        header.addEventListener('click', (e) => {
            const target = e.target;
            if (target &&
                (target.classList.contains(tabSelector.replace(/\./, "")) || 
            target.parentNode.classList.contains(tabSelector.replace(/\./, "")))) {
                tab.forEach((item, i) => {
                    if (target == item || target.parentNode == item) {
                        hideTabContent();
                        showTabContent(i);
                    }
                });
            }
        });   
    }
    tabs('.glazing_slider ', '.glazing_block', '.glazing_content', '.active');
    tabs('.decoration_slider', '.no_click', '.decoration_content > div > div', '.after_click');
    tabs('.balcon_icons', '.balcon_icons_img', '.big_img > img', 'do_image_more', 'inline-block')
    // _____________________________________________________
    // form

    const checkNumInputs = (selector) => {
        const numInputs = document.querySelectorAll(selector);

        numInputs.forEach(item => {
            item.addEventListener('input', () => {
                item.value = item.value.replace(/\D/, '');
            })
        })
    }

    // -------------------------------------------


    const forms = (state) => {
        const form = document.querySelectorAll('form'),
              inputs = document.querySelectorAll('input');


        checkNumInputs('input[name="user_phone"]');

        const message = {
            loading: 'Загрузка...',
            success: 'Спасибо! С вами свяжемся',
            failure: 'Что то пошло не так...'
        };

        const postData = async (url, data) => {
            document.querySelector('.status').textContent = message.loading;
            let res = await fetch(url, {
                method: "POST",
                body: data
            });

            return await res.text();
        };

        const clearInputs = () => {
            inputs.forEach(item => {
                item.value = '';
            })
        }

        form.forEach(item => {
            item.addEventListener('submit', (e) => {
                e.preventDefault();

                let statusMessage = document.createElement('div');
                statusMessage.classList.add('status');
                item.append(statusMessage);

                const formData = new FormData(item);
                if (item.getAttribute('data-calc') === "end") {
                    for (let key in state) {
                        formData.append(key, state[key]);
                    }
                }

                postData('assets/server.php', formData)
                    .then(res => {
                        console.log(res);
                        statusMessage.textContent = message.success;
                    })
                    .catch(() => {
                        statusMessage.textContent = message.failure
                    })
                    .finally(() => {
                        clearInputs();
                        setTimeout(() => {
                            statusMessage.remove();
                        }, 5000);
                    })
            })
        });
    }

    let modalState = {};

    forms(modalState);


    // ---------------changeModalState---------------------------------------------

    // let modalState = {};

    const changeModalState  = (state) => {
         const windowForm = document.querySelectorAll('.balcon_icons_img'),
               windowWidth = document.querySelectorAll('#width'),
               windowHeight = document.querySelectorAll('#height'),
               windowType = document.querySelectorAll('#view_type'),
               windowProfile = document.querySelectorAll('.checkbox');

        checkNumInputs('#width');
        checkNumInputs('#height');

        function bindActionToElems (event, elem, prop){
            elem.forEach((item, i) => {
                item.addEventListener(event, () => {
                    switch(item.nodeName) {
                        case 'SPAN' :
                            state[prop] = i;
                            break;
                        case 'INPUT' :
                            if (item.getAttribute('type') === 'checkbox') {
                                i === 0 ? state[prop] = "ХОЛОДНОЕ" : state[prop] = "ТЕПЛОЕ";
                                elem.forEach((box, j) => {
                                    box.checked = false;
                                    if (i == j) {
                                        box.checked = true; 
                                    }
                                })
                            } else {
                                state[prop] = item.value;
                            }
                            break;
                        case 'SELECT':
                            state[prop] = item.value;
                            break;
                    }

                    console.log(state)
                });
            });

        }

        bindActionToElems('click', windowForm, 'from');
        bindActionToElems('input', windowHeight, 'height');
        bindActionToElems('input', windowWidth, 'width');
        bindActionToElems('change', windowType, 'type');
        bindActionToElems('change', windowProfile, 'profile');




    };

    changeModalState(modalState);



    // ------------------Timer---------------------------------

    let deadline = '2023-04-01';

    const timer = (id, deadline) => {

        const addZero = (num) => {
            if (num <= 9) {
                return '0' + num
            } else {
                return num
            }
        }

        const getTimeRema = (endtime) => {
            const time = Date.parse(endtime) - Date.parse(new Date()),
                  seconds = Math.floor((time/1000) % 60),
                  min = Math.floor((time/1000/60) % 60),
                  hours = Math.floor((time/(1000 * 60 *60)) % 24),
                  days = Math.floor((time/(1000 * 60 *60 * 24)));

            return {
                'total': time,
                'days': days,
                'hours': hours,
                'min': min,
                'seconds': seconds
            };
        };

        const setClock  = (selector, endtime) => {
            const timer = document.querySelector(selector),
                  days = timer.querySelector("#days"),
                  hours = timer.querySelector("#hours"),
                  min = timer.querySelector("#minutes"),
                  seconds = timer.querySelector("#seconds"),
                  timeInterval = setInterval(updateClock, 1000);

            updateClock();

            function updateClock() {
                const t = getTimeRema(endtime);

                days.textContent = addZero(t.days)
                hours.textContent = addZero(t.hours)
                min.textContent = addZero(t.min)
                seconds.textContent = addZero(t.seconds)

                if (timer.total <= 0) {
                    days.textContent = "00"
                    hours.textContent = "00"
                    min.textContent = "00"
                    seconds.textContent = "00"

                    clearInterval(timeInterval);
                }

            }
        }

        setClock(id, deadline)

    }


    timer('.container1', deadline);


    // -------images---------------------------------------------------------

    const images = () => {
        const imgPopup = document.createElement('div'),
              workSection = document.querySelector('.works'),
              bigImg = document.createElement('img');

        imgPopup.classList.add('popup');
        workSection.appendChild(imgPopup);

        imgPopup.style.justifyContent = 'center';
        imgPopup.style.alignItems = 'center';
        imgPopup.style.display = 'none';
        bigImg.style.width = '350px';
        bigImg.style.height = '350px';

        imgPopup.appendChild(bigImg);

        workSection.addEventListener('click', (e) => {
            e.preventDefault()

            let target = e.target

            if (target && target.classList.contains('preview')) {
                imgPopup.style.display = 'flex';
                document.body.style.overflow = "hidden"
                const path = target.parentNode.getAttribute('href');
                bigImg.setAttribute('src', path)
            }

            if (target && target.matches('div.popup')){
                imgPopup.style.display = 'none';
                document.body.style.overflow = ""
                
            }
        })
    }

    images()


})