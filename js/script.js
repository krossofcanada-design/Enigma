// First we call all the classes and ids to connect this file with html

const stages = document.querySelectorAll(".stage");
const btns = document.querySelectorAll(".btn");



//Functions

//Building the branch tree!

const nextStage = (e) => {
    // console.log("clicked")
    console.log(e.target.textContent); //knapper skal have unik tekst (textContent)
    switch(e.target.textContent) {
        case "Continue_": 
            console.log("Continue was clicked");
            stages[0].classList.remove("active");
            btns[0].classList.remove("active");
            stages[1].classList.add("active");
            btns[1].classList.add("active")
        break;
        case "1) You investigate the students' social media to find more personal information_":
            console.log("Option 1");
            stages[1].classList.remove("active");
            stages[2].classList.add("active");
        break;
        case "2) Pretending to be a student, you write an email to one of the teachers_":
            console.log("Option 2");
            stages[1].classList.remove("active");
            stages[3].classList.add("active");
        break;
        case "3) You make use of known hacker tools_":
            console.log("Option 3");
            stages[1].classList.remove("active");
            stages[4].classList.add("active");
        break;
        case "Start over":
            console.log("Start over");
            stages[2].classList.remove("active");
            stages[3].classList.remove("active");
            stages[4].classList.remove("active");
            stages[0].classList.add("active");
        break;

        default: console.log("Something is rotten in the State of Denmark"); 
    }
}



// Event listeners

for (const btn of btns) {
    btn.addEventListener("click", nextStage);
}
