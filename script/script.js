document.addEventListener('DOMContentLoaded', () => {

    // Поиск элементов страницы
    const btnOpenModal = document.querySelector('#btnOpenModal');
    const closeModal = document.querySelector('#closeModal');
    const modalBlock = document.querySelector('#modalBlock');
    const questionTitle = document.querySelector('#question');
    const formAnswers = document.querySelector('#formAnswers');
    const buttonNext = document.querySelector('#next');
    const buttonPrev = document.querySelector('#prev');
    
    // Массив вопросов
    const questions = [
        {
            question: "Какого цвета бургер?",
            answers: [
                {
                    title: 'Стандарт',
                    url: './image/burger.png'
                },
                {
                    title: 'Черный',
                    url: './image/burgerBlack.png'
                }
            ],
            type: 'radio'
        },
        {
            question: "Из какого мяса котлета?",
            answers: [
                {
                    title: 'Курица',
                    url: './image/chickenMeat.png'
                },
                {
                    title: 'Говядина',
                    url: './image/beefMeat.png'
                },
                {
                    title: 'Свинина',
                    url: './image/porkMeat.png'
                }
            ],
            type: 'radio'
        },
        {
            question: "Дополнительные ингредиенты?",
            answers: [
                {
                    title: 'Помидор',
                    url: './image/tomato.png'
                },
                {
                    title: 'Огурец',
                    url: './image/cucumber.png'
                },
                {
                    title: 'Салат',
                    url: './image/salad.png'
                },
                {
                    title: 'Лук',
                    url: './image/onion.png'
                }
            ],
            type: 'checkbox'
        },
        {
            question: "Добавить соус?",
            answers: [
                {
                    title: 'Чесночный',
                    url: './image/sauce1.png'
                },
                {
                    title: 'Томатный',
                    url: './image/sauce2.png'
                },
                {
                    title: 'Горчичный',
                    url: './image/sauce3.png'
                }
            ],
            type: 'radio'
        }
    ];

    //Окрытие Modal
    btnOpenModal.addEventListener('click', () => {

        modalBlock.classList.add('d-block');
        playTest();
    });

    //Закрытие Modal
    closeModal.addEventListener('click', () => {

        modalBlock.classList.remove('d-block');
    });

    //Рендер теста
    const playTest = () => {

        let numberQuestion = 0;

        //Рендер ответов
        const renderAnsvers = (index) => {

            questions[index].answers.forEach((answer) => {

                //Добавление div с ответами и стилями
                const ansverItem = document.createElement('div');
                ansverItem.classList.add('answers-item', 'd-flex', 'flex-column');

                //Генерация ответов внури div
                ansverItem.innerHTML = `
                <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none">
                <label for="${answer.title}" class="d-flex flex-column justify-content-between">
                    <img class="answerImg" src="${answer.url}" alt="burger">
                    <span>${answer.title}</span>
                </label>
                `;
                formAnswers.appendChild(ansverItem);
            });
        }

        //Рендер вопросов
        const renderQuestions = (indexQuestion) => {
            formAnswers.innerHTML = ``;
            questionTitle.textContent = `${questions[indexQuestion].question}`;
            renderAnsvers(indexQuestion);
        }
        renderQuestions(numberQuestion);


        //Обработка клика по Next button
        buttonNext.onclick = () => {
            //Увеличиваем numberQuestion на 1
            numberQuestion++;

            if (numberQuestion == questions.length - 1) {
                buttonNext.disabled = true;
            } else {
                buttonPrev.removeAttribute('disabled');
            };
            renderQuestions(numberQuestion);
        };

        //Обработка клика по Prev button
        //Деактивация кнопки
        buttonPrev.disabled = true;

        buttonPrev.onclick = () => {

            numberQuestion--;
            //Если numberQuestion = 0, то кнопка блокируется
            if (numberQuestion == 0) {
                buttonPrev.disabled = true;
            } else {
                //Кнопка Next button активна при numberQuestion != 0
                buttonNext.removeAttribute('disabled');
            }
            renderQuestions(numberQuestion);
        }



    }
});