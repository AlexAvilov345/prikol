let questionContainer = document.querySelector('.question')  
let answerContainer = document.querySelectorAll('.answer')
let result = document.querySelector('.result')
let button = document.querySelector(".button")
let container = document.querySelector(".container")
let name = document.querySelector("name")

function randint(min, max){
    return Math.round(Math.random() * (max - min) + min)
}
let randomsign = ['+','-','*','/']
function getrandomsign(){
    return randomsign[randint(0,3)]
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) { 
    let j = Math.floor(Math.random() * (i + 1)); 
    [array[i], array[j]] = [array[j], array[i]] 
  } 
  return array
}

class Question{
    constructor() {
        let a = randint(1,30)
        let b = randint(1,30)
        let sign = getrandomsign()
        this.question = `${a} ${sign} ${b}`
        if(sign == "+"){
           
            this.correct = a + b
        } else if (sign == '-'){
          
            this.correct = a - b
        } else if (sign == '*'){
            this.correct = a * b
        } else if (sign == '/'){
            this.correct = Math.round(a / b) 
            
 
        }
        
        
            let answerSet = new Set();
        answerSet.add(this.correct);

        while (answerSet.size < 5) {
            let randomAnswer = this.correct + randint(-10, 10);
            if (randomAnswer !== this.correct) { 
                answerSet.add(randomAnswer);
            }
        }

        this.answers = Array.from(answerSet);
        shuffle(this.answers);
    }
    display() {
    questionContainer.innerHTML = this.question
    for (let i = 0; i < this.answers.length; i += 1)
    {
    answerContainer[i].innerHTML = this.answers[i]
    }
    
}
}

let counter = 0

let currentQuestion = new Question()
let correct_counter = 0
currentQuestion.display()

for (let i = 0; i < answerContainer.length; i++) {
    answerContainer[i].addEventListener('click', () => {
        if (answerContainer[i].innerHTML == +currentQuestion.correct) {
            answerContainer[i].style.background = '#00FF00'
            correct_counter++
            anime({
                targets: answerContainer[i],
                backgroundColor: '#FFFFFF',
                duration: 500,
                delay: 100,
                easing: 'linear'
            })
        } else {
            answerContainer[i].style.background = '#FF0000'
            anime({
                targets: answerContainer[i],
                backgroundColor: '#FFFFFF',
                duration: 500,
                delay: 100,
                easing: 'linear'
            })
        }
        
            
            counter++
            currentQuestion = new Question()
            currentQuestion.display()
            
        })
        
    }
    button.addEventListener("click", ()=> {
        button.style.display = "none"
        container.style.display = "flex"
        result.style.display = "none"
        counter = 0
        correct_counter = 0
    
    setTimeout(() => {
        let accuracy = Math.round(correct_counter * 100 / counter) 
        result.innerHTML = `Ви дали ${correct_counter}
        правильних відповідей із ${counter}
        Точність - ${accuracy}%`
        button.style.display = "block"
        container.style.display = "none"
        result.style.display = "block" 

    }, 10000)})
