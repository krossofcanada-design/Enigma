// =========================
// DOM CONNECTIONS
// =========================

const stages = document.querySelectorAll(".stage");

const answer1 = document.querySelectorAll(".option1");
const answer2 = document.querySelectorAll(".option2");
const answer3 = document.querySelectorAll(".option3");
const answer4 = document.querySelectorAll(".option4");



// ========================
// FUNCTIONS
// ========================

/* I undervisningen brugte vi textContent i en switch, som gik efter navnet på knappen, men det blev lidt langhåret for mig, så jeg ledte i chatGPT efter en anden løsning og kom frem til "flow", hvor jeg kunne skrive min flow chart logik og efterfølgende bruge en funktion, som kunne læse og udføre logikken. Det var også vigtigt for mig, at jeg kunne ændre på mit forgreningsscenarie undervejs uden at skulle omskrive alt for meget kode, så flow og brug af data-action i stedet for textContent*/

const flow = {

  // =========================
  // INTRO (Index 0)
  // =========================
  continue: {
    remove: { stages: [0], answer1: [0]},
    add: { stages: [1], answer1: [1], answer2: [1], answer3: [1] }
  },

  // =========================
  // STAGE 1
  // =========================
  hackerTools: {
    remove: { stages: [1], answer1: [1], answer2: [1], answer3: [1] },
    add: { stages: [2], answer1: [2], answer2: [2] }
  },

  contactTeacher: {
    remove: { stages: [1], answer1: [1], answer2: [1], answer3: [1] },
    add: { stages: [3], answer1: [3], answer2: [3], answer3: [3] }
  },

  socialMediaRecon: {
    remove: { stages: [1], answer1: [1], answer2: [1], answer3: [1] },
    add: { stages: [4], answer1: [4], answer2: [4] }
  },

  // =========================
  // STAGE 2
  // =========================
  bruteForce: {
    remove: { stages: [2], answer1: [2], answer2: [2] },
    add: { stages: [5], answer1: [5], answer2: [5], answer3: [5], answer4: [5] }
  },

  dictionaryAttack: {
    remove: { stages: [2], answer1: [2], answer2: [2] },
    add: { stages: [6], answer1: [6], answer2: [6], answer3: [6], answer4: [6] }
  },

  // =========================
  // STAGE 3
  // =========================
  fakeEventEmail: {
    remove: { stages: [3], answer1: [3], answer2: [3], answer3: [3] },
    add: { stages: [7], answer1: [7] }
  },

  fakeITReset: {
    remove: { stages: [3], answer1: [3], answer2: [3], answer3: [3] },
    add: { stages: [8], answer1: [7] }
  },

  fakeTeacherReset: {
    remove: { stages: [3], answer1: [3], answer2: [3], answer3: [3] },
    add: { stages: [9], answer1: [7] }
  },

  // =========================
  // STAGE 4
  // =========================
  personalizedEmail: {
    remove: { stages: [4], answer1: [4], answer2: [4] },
    add: { stages: [10], answer1: [7] }
  },

  socialDM: {
    remove: { stages: [4], answer1: [4], answer2: [4] },
    add: { stages: [11], answer1: [7] }
  },

  // =========================
  // PASSWORD SET A (stage 5)
  // =========================
  password1: {
    remove: { stages: [5], answer1: [5], answer2: [5], answer3: [5], answer4: [5] },
    add: { stages: [12], answer1: [7] }
  },

  password2: {
    remove: { stages: [5], answer1: [5], answer2: [5], answer3: [5], answer4: [5] },
    add: { stages: [13], answer1: [7] }
  },

  password3: {
    remove: { stages: [5], answer1: [5], answer2: [5], answer3: [5], answer4: [5] },
    add: { stages: [14], answer1: [7] }
  },

  password4: {
    remove: { stages: [5], answer1: [5], answer2: [5], answer3: [5], answer4: [5] },
    add: { stages: [15], answer1: [7] }
  },

  // =========================
  // PASSWORD SET B (stage 6)
  // =========================
  password1b: {
    remove: { stages: [6], answer1: [6], answer2: [6], answer3: [6], answer4: [6] },
    add: { stages: [16], answer1: [7] }
  },

  password2b: {
    remove: { stages: [6], answer1: [6], answer2: [6], answer3: [6], answer4: [6] },
    add: { stages: [17], answer1: [7] }
  },

  password3b: {
    remove: { stages: [6], answer1: [6], answer2: [6], answer3: [6], answer4: [6] },
    add: { stages: [18], answer1: [7] }
  },

  password4b: {
    remove: { stages: [6], answer1: [6], answer2: [6], answer3: [6], answer4: [6] },
    add: { stages: [19], answer1: [7] }
  },

  // =========================
  // RESET
  // =========================
  restart: {
    resetAll: true
  }
};



// =======================================================================
// ENGINE: Adds and removes active states automatically based on classList 
// =======================================================================

const applyChanges = (step) => {
  if (!step) return;

  // RESET GAME
  if (step.resetAll) {
    // Remove ALL active states globally
    document.querySelectorAll(".active").forEach(el => {
        el.classList.remove("active");
    });

    // Restore intro state
    stages[0].classList.add("active");
    answer1[0].classList.add("active");

    return;
    }

  // REMOVE ACTIVE STATES
  if (step.remove) {
    step.remove.stages?.forEach(i => stages[i]?.classList.remove("active"));
    step.remove.answer1?.forEach(i => answer1[i]?.classList.remove("active"));
    step.remove.answer2?.forEach(i => answer2[i]?.classList.remove("active"));
    step.remove.answer3?.forEach(i => answer3[i]?.classList.remove("active"));
    step.remove.answer4?.forEach(i => answer4[i]?.classList.remove("active"));
  }

  // ADD ACTIVE STATES
  if (step.add) {
    step.add.stages?.forEach(i => stages[i]?.classList.add("active"));
    step.add.answer1?.forEach(i => answer1[i]?.classList.add("active"));
    step.add.answer2?.forEach(i => answer2[i]?.classList.add("active"));
    step.add.answer3?.forEach(i => answer3[i]?.classList.add("active"));
    step.add.answer4?.forEach(i => answer4[i]?.classList.add("active"));
  }
};


// =========================
// EVENT HANDLER: When user "clicks", the event listener refers to the event handler with the name "handleClick".
// =========================

const handleClick = (e) => {
  const action = e.currentTarget.dataset.action;

  console.log("Action clicked:", action);

  const step = flow[action];

  if (!step) {
    console.log("Something is rotten in the State of Denmark for:", action);
    return;
  }

  applyChanges(step);
};



// =========================
// EVENT LISTENERS
// =========================

const allButtons = [
  ...answer1,
  ...answer2,
  ...answer3,
  ...answer4
];

allButtons.forEach(btn => {
  btn.addEventListener("click", handleClick);
});

