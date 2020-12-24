// Элементы со страницы
const elements = {
    myContancts: document.getElementById('my_contacts'),
    myContanctsActive: document.getElementById('my_contacts__active'),
    dataAbout: document.querySelector('[data-about]'),
    dataJS: document.querySelector('[data-js]'),
    dataAnim: document.querySelector('[data-animation]'),
    dataPS: document.querySelector('[data-ps]'),
    dataModeling: document.querySelector('[data-modeling]'),
    dataNavBar: document.querySelectorAll('[data-nav-bar]'),
    pages: document.querySelectorAll('[data-page]'),
    buttonOpen: document.querySelectorAll('[value="Развернуть"]')[0],
    textOpen: document.querySelector('.my_Text p'),
    psFrame: document.querySelector('#photoshop-frame__pic__img'),
    modelingFrame: document.querySelector('#modeling-frame__pic__img'),
    window: document.documentElement.clientWidth,
    buttonRight: document.querySelectorAll('.btn_right'),
    buttonLeft: document.querySelectorAll('.btn_left'),
    lightBox: document.querySelector('.lightbox'),
    mobileButtons: document.querySelectorAll('[data-mobiletab]')
};

// Фотографии для вкладки photoshop
const photoshop = [
    'images/photoshop/i_am.jpg',
    'images/photoshop/pushkino_1.jpg',
    'images/photoshop/pushkino_2.jpg',
    'images/photoshop/pushkino_3.jpg',
    'images/photoshop/pushkino_4.jpg',
    'images/photoshop/pushkino_5.jpg',
    'images/photoshop/pushkino_6.jpg',
    'images/photoshop/pushkino_covid.jpg',
    'images/photoshop/pushkino_park.jpg'
];

// Фотографии 3d моделирования
const modeling = [
    'images/3d_modeling/low_poly_1.jpg',
    'images/3d_modeling/low_poly_2.jpg',
    'images/3d_modeling/low_poly_3.jpg',
    'images/3d_modeling/low_poly_4.jpg',
    'images/3d_modeling/low_poly_5.jpg',
    'images/3d_modeling/low_poly_6.jpg',
    'images/3d_modeling/low_poly_7.png',
    'images/3d_modeling/vizualization_1.jpg',
    'images/3d_modeling/vizualization_2.jpg',
    'images/3d_modeling/vizualization_3.jpg',
    'images/3d_modeling/vizualization_4.jpg',
    'images/3d_modeling/vizualization_5.jpg',
];

// Прослушка кнопок переключения фотографий и моделинга
let flagPS = 0;
let flagModeling = 0;
elements.psFrame.src = photoshop[0];
elements.modelingFrame.src = modeling[0];

// Ловим события мобильных кнопкок
let mobb;

// Кнопка вперед
elements.buttonRight
    .forEach((button) => {
        button.addEventListener('click', (forward) => {
            forward.preventDefault();
            if (elements.dataPS.classList.contains('active_a') || mobb === 'photoshop') {
                if (flagPS > photoshop.length - 2) {
                    flagPS = 0;
                } else {
                    flagPS = flagPS + 1;
                }
                elements.psFrame.src = photoshop[flagPS];
            };
            if (elements.dataModeling.classList.contains('active_a') || mobb === '3d modeling') {
                if (flagModeling > modeling.length - 2) {
                    flagModeling = 0;
                } else {
                    flagModeling = flagModeling + 1;
                }
                elements.modelingFrame.src = modeling[flagModeling];
            };
        });
    })
// Кнопка назад
elements.buttonLeft
    .forEach((button) => {
        button.addEventListener('click', (back) => {
            back.preventDefault();
            if (elements.dataPS.classList.contains('active_a') || mobb === 'photoshop') {
                if (flagPS <= 0) {
                    flagPS = photoshop.length - 1;
                } else {
                    flagPS = flagPS - 1;
                }
                elements.psFrame.src = photoshop[flagPS];
            };
            if (elements.dataModeling.classList.contains('active_a') || mobb === '3d modeling') {
                if (flagModeling <= 0) {
                    flagModeling = modeling.length - 1;
                } else {
                    flagModeling = flagModeling - 1;
                }
                elements.modelingFrame.src = modeling[flagModeling];
                console.log(elements.modelingFrame.src)
            };
        });
    })

// Лайтбокс для просмотра фотографий во весь экран
elements.psFrame.addEventListener('click', bigImage);
elements.modelingFrame.addEventListener('click', bigImage);

function bigImage(event) {
    let imageForLightbox = document.createElement('img');
    imageForLightbox.src = this.src;
    // console.log(imageForLightbox);
    elements.lightBox.style.display = 'flex';
    elements.lightBox.append(imageForLightbox);
};

// Закрытие лайтбокса
elements.lightBox.addEventListener('click', (closeLightbox) => {
    console.log(closeLightbox.target)
    elements.lightBox.style.display = 'none';
    elements.lightBox.firstChild.remove();
});


// Отображаем контакты
elements.myContancts.addEventListener('click', (active) => {
    active.preventDefault();

    if (elements.myContanctsActive.style.opacity !== '1') {
        elements.myContanctsActive.firstElementChild.classList.remove('d-none', 'd-sm-none');
        elements.myContanctsActive.style.opacity = '1';
    } else {
        function one(callBack) {
            elements.myContanctsActive.style.opacity = '0';
            setTimeout(callBack, 500)
        }

        function two() {
            elements.myContanctsActive.firstElementChild.classList.add('d-none', 'd-sm-none');
        }
        one(() => {
            two()
        })
    }
});

// Отображаем текущую вкладку
elements.dataNavBar.forEach((pageActive) => {
    pageActive.addEventListener('click', (eventActive) => {
        eventActive.preventDefault();
        
        // Текущее значение из навбара
        const currentNavbarTopItem = eventActive.target.innerText;
        // Текущее значение дата атрибута мобильной кнопки
        const mobileItem = eventActive.target.parentNode.dataset.mobiletab;
        mobb = mobileItem;

        console.log('Значение навбара -->  ', currentNavbarTopItem, 'Значение дата атриубта -->  ', mobileItem);

        // Получаем вкладки верхнего нав бара
        const activeTab = Array.from(elements.dataNavBar[0].children);
        activeTab.forEach((itemActive) => {
            itemActive.classList.remove('active_a');
            if (currentNavbarTopItem.toLowerCase() === itemActive.firstChild.innerText.toLowerCase()) {
                console.log('work');
                itemActive.classList.add('active_a');
            }
        });
        
        // Отображаем текущие вкладки, выбираем между мобильной версией и десктопной
        if (window.innerWidth < 576) {
            currentTab(mobileItem);
        } else {
            currentTab(currentNavbarTopItem);
        };
    })
})

// Функция отображения содержимого вкладки
function currentTab(item_1) {
    console.log('Mobile work')
    elements.pages.forEach((activeTab) => {
        activeTab.classList.add('d-none')
        if (activeTab.dataset.page === item_1.toLowerCase()) {
            activeTab.classList.remove('d-none')
        }
    })
}

// Кнопка. Развернуть информацию
elements.buttonOpen.addEventListener('click', (open) => {
    
    if (elements.buttonOpen.value === 'Развернуть') {
        elements.textOpen.style.height = '100%';
        elements.buttonOpen.value = 'Свернуть';
        elements.buttonOpen.classList.add('mt-4');

    } else {
        elements.textOpen.style.height = '150px';
        elements.buttonOpen.value = 'Развернуть';
        elements.buttonOpen.classList.remove('mt-4');
        // Поднимаем страницу вверх
        elements.buttonOpen.scrollTo(0, 0);
    }

});


