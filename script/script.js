document.addEventListener('DOMContentLoaded', () => {

    const btnOpenModal = document.querySelector('#btnOpenModal');
    const closeModal = document.querySelector('#closeModal');
    const modalBlock = document.querySelector('#modalBlock');
    const questionTitle = document.querySelector('#question');
    const formAnswers = document.querySelector('#formAnswers');

    btnOpenModal.addEventListener('click', () => {

        modalBlock.classList.add('d-block');
        playTest();

    })

    closeModal.addEventListener('click', () => {

        modalBlock.classList.remove('d-block');

    })

    const playTest = () => {

        const renderQuestions = () => {
            let nameBurger = ["Белый", 'Черный'];
            let linkImage = ["burger.png","burgerBlack.png"];

            questionTitle.textContent = 'Какого цвета бургер?';
            let i =0;
            while (  i < nameBurger.length && i < linkImage.length) {
                formAnswers.innerHTML += `
                <div class="answers-item d-flex flex-column">
                    <input type="radio" id="answerItem1" name="answer" class="d-none">
                    <label for="answerItem1" class="d-flex flex-column justify-content-between">
                        <img class="answerImg" src="./image/${linkImage, linkImage[i]}" alt="burger">
                        <span>${nameBurger, nameBurger[i]}</span>
                    </label>
                </div>
                `
                i++;
            }
           
        }
        renderQuestions();

    }

})