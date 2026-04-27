// Calling the DOMs

const stages = document.querySelectorAll(".stage");

const answer1 = document.querySelectorAll(".option1");
const answer2 = document.querySelectorAll(".option2");
const answer3 = document.querySelectorAll(".option3");
const answer4 = document.querySelectorAll(".option4");




//Functions


// Stages connected with answer 1 buttons
const nextStage = (e) => {
    // console.log("clicked");
    console.log(e.target.textContent); //Unique text content from buttons! (textContent)
    switch(e.target.textContent) {
        /* Ordered according to answer1, see Figma file "Flowchart of ENIGMA"*/ 
        case "Continue_": 
            console.log("Continue was clicked");
            stages[0].classList.remove("active");
            stages[1].classList.add("active");
            answer1[0].classList.remove("active");
            answer1[1].classList.add("active");
            answer2[1].classList.add("active");
            answer3[1].classList.add("active");
        break;
        case "1) You make use of known hacker tools_":
            console.log("Answer");
            stages[1].classList.remove("active");
            stages[2].classList.add("active");
            answer1[1].classList.remove("active");
            answer1[2].classList.add("active");
            answer2[1].classList.remove("active");
            answer2[2].classList.add("active");
            answer3[1].classList.remove("active");
        break;
        case "1) Use brute force attack_":
            console.log("Answer");
            stages[2].classList.remove("active");
            stages[5].classList.add("active");
            answer1[2].classList.remove("active");
            answer1[5].classList.add("active");
            answer2[2].classList.remove("active");
            answer2[5].classList.add("active");
            answer3[5].classList.add("active");           
            answer4[5].classList.add("active");
        break;
        case "1) Velv3tyTeacupGr0ans@Covv":
            console.log("Answer");
            stages[5].classList.remove("active")
            stages[12].classList.add("active");
            answer1[5].classList.remove("active");
            answer1[7].classList.add("active");
            answer2[5].classList.remove("active");
            answer3[5].classList.remove("active");
            answer4[5].classList.remove("active");
        break;
        case "2) Dr@gonsMoon@Forever!":
            console.log("Answer");
            stages[5].classList.remove("active")
            stages[13].classList.add("active");
            answer1[5].classList.remove("active");
            answer1[7].classList.add("active");
            answer2[5].classList.remove("active");
            answer3[5].classList.remove("active");
            answer4[5].classList.remove("active");

        break;
        case "3) designacademy2024":
            console.log("Answer");
            stages[5].classList.remove("active")
            stages[14].classList.add("active");
            answer1[5].classList.remove("active");
            answer1[7].classList.add("active");
            answer2[5].classList.remove("active");
            answer3[5].classList.remove("active");
            answer4[5].classList.remove("active");
        break;
        case "4) SlimySnailsAndPuppyDogTail":
            console.log("Answer");
            stages[5].classList.remove("active")
            stages[15].classList.add("active");
            answer1[5].classList.remove("active");
            answer1[7].classList.add("active");
            answer2[5].classList.remove("active");
            answer3[5].classList.remove("active");
            answer4[5].classList.remove("active");
        break;

        case "Play again!":
            console.log("Answer");
            stages[12].classList.remove("active")
            stages[13].classList.remove("active")
            stages[14].classList.remove("active")
            stages[15].classList.remove("active")
            stages[0].classList.add("active");
            answer1[7].classList.remove("active");
            answer1[0].classList.add("active");

        break;

        /* Ordered according to answer2, see Figma file "Flowchart of ENIGMA"*/
        case "1) You make use of known hacker tools_":
            console.log("Answer1");
            stages[1].classList.remove("active");
            stages[2].classList.add("active");
            answer1[1].classList.remove("active");
            answer1[2].classList.add("active");
            answer2[1].classList.remove("active");
            answer2[2].classList.add("active");
            answer3[1].classList.remove("active");


        default: console.log("Something is rotten in the State of Denmark") /* to log and check if it worked or if there's an error*/
    }
}


// Event listeners

/* We use for... loop because there are many .btn and .answer1 etc. From here we go up to the closest event that this eventlistener is reacting to. In this case nextStage */


for (const answer of answer1) {
    answer.addEventListener("click", nextStage);
}

for (const answer of answer2) {
    answer.addEventListener("click", nextStage);
}

for (const answer of answer3) {
    answer.addEventListener("click", nextStage);
}

for (const answer of answer4) {
    answer.addEventListener("click", nextStage);
}