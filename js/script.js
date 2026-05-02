// =========================
// Calling the DOMs
// =========================

const stages = document.querySelectorAll(".stage");

const answer1 = document.querySelectorAll(".option1");
const answer2 = document.querySelectorAll(".option2");
const answer3 = document.querySelectorAll(".option3");
const answer4 = document.querySelectorAll(".option4");

const hashcat = document.querySelector(".hashcat");
const specialStages = [9, 11, 14, 17, 18, 19];

const endBtn = document.getElementById("endSimulationBtn");
const overlay = document.getElementById("overlay");
const overlayRestart = document.getElementById("restartFromOverlay");


// ========================
// Flow Chart Logic
// ========================

/* I undervisningen brugte vi en switch baseret på værdien af textContent, hvor logikken hurtigt blev uoverskuelig i forhold til dette scenarie. Derfor søgte jeg en alternativ løsning og der implementerede en flow-variabel, hvor hvert step er et objekt. En funktion (applyChanges) læser objektet og anvender DOM-manipulation baseret på dets properties (remove, add, resetAll) ved hjælp af conditional checks.

Det var vigtigt for mig at kunne ændre i forgreningsscenariet undervejs uden at skulle omskrive store dele af koden. Derfor viste brugen af "data-action" sig at være et mere fleksibelt valg end "textContent".

Jeg undersøgte også muligheder for helt at undgå index-numre ved at bruge "data-group" på mine stages, så flowchart-logikken ville blive mere tydelig i javascript. Det ville samtidig have gjort koden lettere at forstå og arbejde videre med for andre, uden at de skulle referere til html eller flowchart. Jeg valgte dog at beholde den nuværende model for ikke at afvige for meget fra undervisningsmaterialet og gøre det unødigt komplekst for mit niveau af javascript. */

const flow = {

  // =========================
  // INTRO (Index 0)
  // =========================
  continue: {
    remove: { stages: [0], answer1: [0] },
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
    add: { stages: [4], answer1: [4], answer2: [4], answer3: [4] }
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
    add: { stages: [7], answer1: [7] },
    end: true
  },

  fakeITReset: {
    remove: { stages: [3], answer1: [3], answer2: [3], answer3: [3] },
    add: { stages: [8], answer1: [7] },
    end: true
  },

  fakeTeacherReset: {
    remove: { stages: [3], answer1: [3], answer2: [3], answer3: [3] },
    add: { stages: [9], answer1: [7] },
    end: true
  },

  // =========================
  // STAGE 4
  // =========================
  personalizedEmail: {
    remove: { stages: [4], answer1: [4], answer2: [4], answer3: [4] },
    add: { stages: [10], answer1: [7] },
    end: true
  },

  socialDM: {
    remove: { stages: [4], answer1: [4], answer2: [4], answer3: [4] },
    add: { stages: [11], answer1: [7] },
    end: true
  },

  dictionaryStage4: {
    remove: { stages: [4], answer1: [4], answer2: [4], answer3: [4] },
    add: { stages: [6], answer1: [6], answer2: [6], answer3: [6], answer4: [6] }
  },

  // =========================
  // PASSWORD SET A (stage 5)
  // =========================
  password1: {
    remove: { stages: [5], answer1: [5], answer2: [5], answer3: [5], answer4: [5] },
    add: { stages: [12], answer1: [7] },
    end: true
  },

  password2: {
    remove: { stages: [5], answer1: [5], answer2: [5], answer3: [5], answer4: [5] },
    add: { stages: [13], answer1: [7] },
    end: true
  },

  password3: {
    remove: { stages: [5], answer1: [5], answer2: [5], answer3: [5], answer4: [5] },
    add: { stages: [14], answer1: [7] },
    end: true
  },

  password4: {
    remove: { stages: [5], answer1: [5], answer2: [5], answer3: [5], answer4: [5] },
    add: { stages: [15], answer1: [7] },
    end: true
  },

  // =========================
  // PASSWORD SET B (stage 6)
  // =========================
  password1b: {
    remove: { stages: [6], answer1: [6], answer2: [6], answer3: [6], answer4: [6] },
    add: { stages: [16], answer1: [7] },
    end: true
  },

  password2b: {
    remove: { stages: [6], answer1: [6], answer2: [6], answer3: [6], answer4: [6] },
    add: { stages: [17], answer1: [7] },
    end: true
  },

  password3b: {
    remove: { stages: [6], answer1: [6], answer2: [6], answer3: [6], answer4: [6] },
    add: { stages: [18], answer1: [7] },
    end: true
  },

  password4b: {
    remove: { stages: [6], answer1: [6], answer2: [6], answer3: [6], answer4: [6] },
    add: { stages: [19], answer1: [7] },
    end: true
  },

  // ===============================================================================
  // RESET: bruges i ENGINE conditional statement til at lave en reset til start
  // ===============================================================================
  restart: {
    resetAll: true
  }
};


// hashcat state-1 med sorte øjne, of state-2 med glødende øjne
function updateHashcatState() {
  if (!hashcat) return;

  const isSpecialActive = specialStages.some(i =>
    stages[i]?.classList.contains("active")
  );

  hashcat.classList.remove("state-1", "state-2");
  hashcat.classList.add(isSpecialActive ? "state-2" : "state-1");
}



// =============================================================================================================================
// ENGINE: Adds and removes active states automatically based on classList, activated through "applyChanges" from event handler.
// =============================================================================================================================

const applyChanges = (step) => {
  if (!step) return;

  // Brug af "if..." til at kontrollere reset-logik (se også “initial reset” nederst på siden, da denne reset først træder i kraft efter første gennemløb af spillet). ".forEach" anvendes til at iterere over NodeLists, og "classList" bruges til at tilføje/fjerne aktive klasser.

  if (step.resetAll) {
    document.querySelectorAll(".active").forEach(el => {
      el.classList.remove("active");
    });

    stages[0].classList.add("active");
    answer1[0].classList.add("active");

    endBtn.classList.add("hidden");
    
    updateHashcatState();
    return;
  }

  
  // I stedet for switch bruges denne conditional statement for at tilgå klasseelementerne og fjerne/tilføje "active" ifølge flow logikken.

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

  if (step.end) endBtn.classList.remove("hidden");

  updateHashcatState();

};


// ===============================================================================================================
// EVENT HANDLER: When user "clicks", the event listener refers to the event handler with the name "handleClick".
// ===============================================================================================================

/* handleClick fungerer som event handler og kobles til event listeners på de interaktive elementer. Funktionen anvendes til at initiere engine-funktionen applyChanges.

Variablen "step" defineres dynamisk ud fra "action"-værdien i flow-objektet. Denne "action" hentes fra HTML via data-action attributten gennem e.currentTarget.dataset.

dataset giver adgang til alle data-* attributter på det klikkede HTML-element.

Elementer med klassen "stage" indeholder ikke data-action, da de ikke er direkte interaktive. De indgår i stedet som en del af flowets tilstande og styres indirekte via "step"-objektet i applyChanges-funktionen, som håndterer visning og skjulning af relevante stages og svarmuligheder. */

const handleClick = (e) => {
  const action = e.currentTarget.dataset.action;

  console.log("Action clicked:", action);

  if (!action) return;

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

// Alle knapper samles i ét array og får tildelt samme event listener via ".forEach".
const allButtons = [
  ...answer1,
  ...answer2,
  ...answer3,
  ...answer4
];

allButtons.forEach(btn => {
  btn.addEventListener("click", handleClick);
});


// Tilføjede denne, fordi reset logikken ikke virkede ved første render af siden.
document.addEventListener("DOMContentLoaded", () => {
  applyChanges({ resetAll: true });
});


// "End simulation" button
endBtn.addEventListener("click", () => {
  overlay.classList.remove("hidden");
  document.body.style.overflow = "hidden";
});

overlayRestart.addEventListener("click", () => {
  overlay.classList.add("hidden");
  document.body.style.overflow = "";
  applyChanges({ resetAll: true });
});