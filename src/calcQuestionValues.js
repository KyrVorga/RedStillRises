const questions = [
    {
        "id": "q1",
        "text": "You encounter a strange animal trapped in a snare. Its injuries suggest it won’t survive long.",
        "options": [
            {"text": "End its suffering quickly with a decisive action.", "values": {"mars": 3, "apollo": 2, "neptune": 1}},
            {"text": "Use your skills to gently help it, even if it may not survive.", "values": {"ceres": 3, "minerva": 2, "venus": 1}},
            {"text": "Observe and document the animal to learn from it.", "values": {"mercury": 3, "pluto": 2, "bacchus": 1}},
            {"text": "Seek help from others who may be more experienced.", "values": {"juno": 3, "jupiter": 2, "vulcan": 1}}
        ]
    },
    {
        "id": "q2",
        "text": "Your mentor gives you a choice of tasks.",
        "options": [
            {"text": "Work on crafting something valuable, enhancing your skills.", "values": {"vulcan": 3, "apollo": 2, "pluto": 1}},
            {"text": "Gather resources that could benefit others in your group.", "values": {"ceres": 3, "juno": 2, "bacchus": 1}},
            {"text": "Perform a task that improves your survival skills.", "values": {"mars": 3, "mercury": 2, "neptune": 1}},
            {"text": "Choose the task that aligns with your long-term goals.", "values": {"jupiter": 3, "minerva": 2, "venus": 1}}
        ]
    },
    {
        "id": "q3",
        "text": "A valuable but outdated tradition in your community is being challenged by younger members advocating for modernization.",
        "options": [
            {"text": "Support the younger members’ push for modernization, believing that change is necessary for progress.", "values": {"venus": 3, "jupiter": 2, "apollo": 1}},
            {"text": "Propose a compromise that integrates both traditional and modern elements.", "values": {"minerva": 3, "diana": 2, "neptune": 1}},
            {"text": "Defend the tradition strongly, valuing its historical significance and cultural importance.", "values": {"ceres": 3, "vulcan": 2, "pluto": 1}},
            {"text": "Remain neutral and observe how the debate unfolds before taking a stance.", "values": {"juno": 3, "mercury": 2, "bacchus": 1}}
        ]
    },
    {
        "id": "q4",
        "text": "An important event in your community requires volunteers for various roles, but you can only choose one.",
        "options": [
            {"text": "Choose a role that puts you in the spotlight and allows you to showcase your talents.", "values": {"apollo": 3, "venus": 2, "minerva": 1}},
            {"text": "Select a behind-the-scenes role that ensures everything runs smoothly without much attention.", "values": {"minerva": 3, "ceres": 2, "vulcan": 1}},
            {"text": "Opt for a role that requires significant teamwork and coordination, valuing collaboration.", "values": {"diana": 3, "mercury": 2, "pluto": 1}},
            {"text": "Pick a role that offers immediate and tangible benefits to the community.", "values": {"pluto": 3, "jupiter": 2, "neptune": 1}}
        ]
    },
    {
        "id": "q5",
        "text": "You discover you have a hidden talent that could be valuable but requires dedicated training to develop fully.",
        "options": [
            {"text": "Pursue intensive training to master the talent, believing it will lead to significant personal and professional growth.", "values": {"mars": 3, "apollo": 2, "neptune": 1}},
            {"text": "Explore the talent casually, integrating it into your life as a supplementary skill.", "values": {"bacchus": 3, "diana": 2, "venus": 1}},
            {"text": "Decide that the talent is interesting but not worth the commitment, focusing on your current strengths.", "values": {"venus": 3, "minerva": 2, "bacchus": 1}},
            {"text": "Avoid pursuing the talent, prioritizing existing responsibilities and routines.", "values": {"juno": 3, "ceres": 2, "vulcan": 1}}
        ]
    },
    {
        "id": "q6",
        "text": "A close friend asks for your help with a risky plan that you both could profit from.",
        "options": [
            {"text": "Agree to the plan, trusting your friend and valuing the potential rewards.", "values": {"apollo": 3, "jupiter": 2, "mercury": 1}},
            {"text": "Assess the risks and benefits carefully before making a decision.", "values": {"mercury": 3, "ceres": 2, "pluto": 1}},
            {"text": "Decline the offer, preferring to avoid unnecessary risks.", "values": {"pluto": 3, "diana": 2, "neptune": 1}},
            {"text": "Negotiate terms and conditions to ensure fairness and safety.", "values": {"bacchus": 3, "juno": 2, "vulcan": 1}}
        ]
    },
    {
        "id": "q7",
        "text": "You find a long-lost artifact that could reveal important historical insights but might also cause controversy.",
        "options": [
            {"text": "Share the artifact with the public, believing that its historical value outweighs potential controversy.", "values": {"mars": 3, "pluto": 2, "vulcan": 1}},
            {"text": "Conduct further research privately to understand its significance before deciding on public disclosure.", "values": {"neptune": 3, "juno": 2, "bacchus": 1}},
            {"text": "Keep the artifact hidden to avoid stirring up controversy, prioritizing peace over discovery.", "values": {"venus": 3, "neptune": 2, "apollo": 1}},
            {"text": "Consult with experts and stakeholders to gauge their opinions before taking any action.", "values": {"mercury": 3, "jupiter": 2, "vulcan": 1}}
        ]
    },
    {
        "id": "q8",
        "text": "A friend gives you an embarrassing nickname and mocks you publicly.",
        "options": [
            {"text": "Confront them directly and establish boundaries.", "values": {"mars": 3, "apollo": 2, "neptune": 1}},
            {"text": "Turn the situation around by embracing the nickname with humor.", "values": {"venus": 3, "pluto": 2, "mercury": 1}},
            {"text": "Create a new, more embarrassing nickname for them in retaliation.", "values": {"bacchus": 3, "diana": 2, "pluto": 1}},
            {"text": "Seek to resolve the issue diplomatically and privately.", "values": {"juno": 3, "neptune": 2, "vulcan": 1}}
        ]
    },
    {
        "id": "q9",
        "text": "There is a heated debate in your community about whether certain resources should be controlled by the elite or made available to everyone.",
        "options": [
            {"text": "Support the control of resources by the elite to ensure their proper use and management.", "values": {"jupiter": 3, "apollo": 2, "bacchus": 1}},
            {"text": "Advocate for equal access to resources to benefit the whole community.", "values": {"ceres": 3, "vulcan": 2, "venus": 1}},
            {"text": "Seek a balanced approach that includes oversight but allows broader access.", "values": {"juno": 3, "diana": 2, "neptune": 1}},
            {"text": "Propose a compromise to involve various stakeholders in decision-making.", "values": {"mercury": 3, "minerva": 2, "pluto": 1}}
        ]
    },
    {
        "id": "q10",
        "text": "After buying supplies, you receive extra money back by mistake.",
        "options": [
            {"text": "Return the money to the shopkeeper, correcting the error.", "values": {"jupiter": 3, "apollo": 2, "neptune": 1}},
            {"text": "Keep the money, considering it a small windfall.", "values": {"bacchus": 3, "vulcan": 2, "mercury": 1}},
            {"text": "Donate the money to a cause you care about.", "values": {"venus": 3, "minerva": 2, "ceres": 1}},
            {"text": "Use the money for something immediately practical.", "values": {"diana": 3, "juno": 2, "pluto": 1}}
        ]
    },
    {
        id: 'q11',
        text: 'You witness a thief stealing from a copper. The thief drops the purse near you as he flees.',
        options: [
            { text: 'Return the purse to the copper, knowing it is the right thing to do.', values: { jupiter: 3, mars: 2, neptune: 1 } },
            { text: 'Leave the purse and avoid involvement to stay out of trouble.', values: { minerva: 3, ceres: 2, bacchus: 1 } },
            { text: 'Keep the purse, thinking it will help you or your family.', values: { mercury: 3, venus: 2, apollo: 1 } },
            { text: 'Hand over the purse to the authorities to handle the situation.', values: { juno: 3, diana: 2, pluto: 1 } }
        ]
    },
    {
        id: 'q12',
        text: 'You’re assigned a disliked task, and a friend offers to do it for you in exchange for a future favor.',
        options: [
            { text: 'Decline the offer and complete the task yourself, honoring the expectation.', values: { mars: 3, vulcan: 2, apollo: 1 } },
            { text: 'Accept the offer and agree to the favor, valuing efficiency.', values: { diana: 3, mercury: 2, neptune: 1 } },
            { text: 'Ask for help, promising to return the favor in the future.', values: { ceres: 3, minerva: 2, bacchus: 1 } },
            { text: 'Negotiate terms of the favor to ensure fairness.', values: { juno: 3, venus: 2, pluto: 1 } }
        ]
    },
    {
        id: 'q13',
        text: 'While you are helping to fix a communal structure, a piece of heavy equipment begins to fall towards a nearby person.',
        options: [
            { text: 'Move quickly to push the person out of the way and prevent injury.', values: { vulcan: 3, mars: 2, mercury: 1 } },
            { text: 'Try to grab and stabilize the equipment to avoid it falling.', values: { jupiter: 3, ceres: 2, apollo: 1 } },
            { text: 'Call out for others to assist in managing the situation.', values: { diana: 3, minerva: 2, neptune: 1 } },
            { text: 'Ensure the area is cleared and safe to prevent further accidents.', values: { neptune: 3, venus: 2, pluto: 1 } }
        ]
    },
    {
        id: 'q14',
        text: 'A gang of kids demands money from you, threatening violence.',
        options: [
            { text: 'Refuse to give them the money and prepare to defend yourself if necessary.', values: { mars: 3, vulcan: 2, apollo: 1 } },
            { text: 'Hand over the money to avoid immediate conflict, planning to recover it later.', values: { apollo: 3, jupiter: 2, mercury: 1 } },
            { text: 'Try to distract them and make a quick escape with the money.', values: { pluto: 3, neptune: 2, diana: 1 } },
            { text: 'Seek help from nearby adults or authorities to handle the situation.', values: { bacchus: 3, ceres: 2, pluto: 1 } }
        ]
    },
    {
        id: 'q15',
        text: 'A well-dressed man runs from an angry crowd, asking for your help.',
        options: [
            { text: 'Rush to his aid, despite not knowing the full story.', values: { mars: 3, jupiter: 2, vulcan: 1 } },
            { text: 'Stay out of the situation, not wanting to risk involvement.', values: { minerva: 3, neptune: 2, venus: 1 } },
            { text: 'Assist him, even if it means facing the crowd.', values: { diana: 3, bacchus: 2, neptune: 1 } },
            { text: 'Alert the crowd or authorities to address the situation appropriately.', values: { vulcan: 3, bacchus: 2, pluto: 1 } }
        ]
    }
];



const houseValues = {
    mars: 0,
    apollo: 0,
    neptune: 0,
    ceres: 0,
    minerva: 0,
    venus: 0,
    mercury: 0,
    pluto: 0,
    juno: 0,
    jupiter: 0,
    vulcan: 0,
    bacchus: 0,
    diana: 0
};

questions.forEach(question => {
    question.options.forEach(option => {
        Object.keys(option.values).forEach(house => {
            houseValues[house] += option.values[house];
        });
    });
});

const sortedHouses = Object.entries(houseValues).sort((a, b) => b[1] - a[1]);
console.log(sortedHouses);

let totalPoints = 0;
sortedHouses.forEach(([house, points]) => {
    totalPoints += points;
});
console.log("Total points:", totalPoints);