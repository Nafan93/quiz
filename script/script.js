document.addEventListener('DOMContentLoaded', () => {

    // Поиск элементов страницы
    const btnOpenModal = document.querySelector('#btnOpenModal');
    const closeModal = document.querySelector('#closeModal');
    const modalBlock = document.querySelector('#modalBlock');
    const questionTitle = document.querySelector('#question');
    const formAnswers = document.querySelector('#formAnswers');
    const buttonNext = document.querySelector('#next');
    const buttonPrev = document.querySelector('#prev');
    const buttonSend = document.querySelector('#send');
    
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

        const finalAnswers = [];

        let numberQuestion = 0;

        //Рендер ответов
        const renderAnsvers = (index) => {

            questions[index].answers.forEach((answer) => {

                //Добавление div с ответами и стилями
                const ansverItem = document.createElement('div');
                ansverItem.classList.add('answers-item', 'd-flex', 'justify-conten-center');

                //Генерация ответов внури div
                ansverItem.innerHTML = `
                <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none" value="${answer.title}">
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

            switch(true) {

                case numberQuestion === 0:
                    questionTitle.textContent = `${questions[indexQuestion].question}`
                    renderAnsvers(indexQuestion)
                    buttonNext.classList.remove('d-none')
                    buttonPrev.classList.remove('d-none')
                    buttonSend.classList.add('d-none')
                    buttonPrev.disabled = true; 
                break;

                case numberQuestion >= 0 && numberQuestion <= questions.length-1:
                    questionTitle.textContent = `${questions[indexQuestion].question}`
                    renderAnsvers(indexQuestion)
                    buttonNext.removeAttribute('disabled')
                    buttonPrev.removeAttribute('disabled')
                break;
                case numberQuestion === questions.length: 
                    buttonNext.classList.add('d-none')
                    buttonPrev.classList.add('d-none')
                    buttonSend.classList.remove('d-none')

                    formAnswers.innerHTML = `
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Введите номер телефона</label>
                            <input type="email" class="form-control" id="numberPhone" placeholder="Ваш номер телефона">
                        </div>
                        `;
                break;

                case numberQuestion === questions.length + 1:
                    formAnswers.textContent = ''
                    formAnswers.textContent = 'Спасибо за заказ!'
                    setTimeout(() => {
                        modalBlock.classList.remove('d-block');
                    }, 2000)
                break;

            }   

        }

        renderQuestions(numberQuestion);

        const checkAnswer = () => {

            const obj = {};

            const inputs = [...formAnswers.elements].filter((input) => input.checked || input.id === 'numberPhone');
            
            inputs.forEach((input, index) =>  {
                if (numberQuestion >= 0 && numberQuestion <= questions.length-1) {
                    obj[`${index}_${questions[numberQuestion].question}`] = input.value;
                }

                if (numberQuestion === questions.length){
                    obj['Номер телефона'] = input.value;
                }
            });
            finalAnswers.push(obj);
        }

        //Обработка клика по Next button
        buttonNext.onclick = () => {
            checkAnswer();
            //Увеличиваем numberQuestion на 1
            numberQuestion++;
            renderQuestions(numberQuestion);
        };

        //Обработка клика по Prev button        
        buttonPrev.onclick = () => {
            //Уменьшаем numberQuestion на -1
            numberQuestion--;
            renderQuestions(numberQuestion);
        }
        //Обработка клика по Send button 
        buttonSend.onclick = () => {
            checkAnswer();
            numberQuestion++;
            renderQuestions(numberQuestion);
            console.log(finalAnswers);
        }
    }
});