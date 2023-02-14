'use strict'

// import modals from "./modules/modal";

window.addEventListener('DOMContentLoaded', () =>{


    // modals();-------------------------------
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              windows = document.querySelectorAll('[data-modal]');
    
    
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
                })
        
                close.addEventListener('click', () => {
                    windows.forEach(item => {
                        item.style.display = 'none'
                    })

                    modal.style.display = "none"
                    document.body.style.overflow = ""
                })
            })
    
            modal.addEventListener('click', (e) => {
                if (e.target === modal && closeClickOverlay){
                    windows.forEach(item => {
                        item.style.display = 'none'
                    })

                    modal.style.display = "none"
                    document.body.style.overflow = ""
                }
            })
        }

    function showModalByTime(selector, time){
        setTimeout(() => {
            document.querySelector(selector).style.display= "block";                    
            document.body.style.overflow = "hidden"
        }, time);
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


    const forms = () => {
        const form = document.querySelectorAll('form'),
              inputs = document.querySelectorAll('input'),
              phoneInputs = document.querySelectorAll('input[name="user_phone"]');

        phoneInputs.forEach(item => {
            item.addEventListener('input', () => {
                item.value = item.value.replace(/\D/, '');
            })
        })

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

    forms();


    // --------Modal-----------------------------------------------------





})