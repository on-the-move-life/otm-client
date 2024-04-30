const data = [{
  "_id": {
    "$oid": "6618501a65441b568859053e"
  },
  "name": "signup",
  "questions": [
    {
      "content": "Gender",
      "inputType": "singleChoice",
      "code": "su1",
      "rank": 1,
      "screen": 1,
      "target": "GEN",
      "options": [
        {
          "id": "MALE",
          "value": "Male"
        },
        {
          "id": "FEMALE",
          "value": "Female"
        }
      ],
      "description": "What is your gender?"
    },
    {
      "content": "Age",
      "inputType": "number",
      "code": "su2",
      "questionOrder": 2,
      "rank": 2,
      "screen": 1,
      "target": "GEN",
      "description": "What is your age?",
      "isRequired": true
    },
    {
      "content": "Weight",
      "inputType": "number",
      "code": "su3",
      "questionOrder": 3,
      "rank": 3,
      "screen": 1,
      "target": "GEN",
      "description": "How much do you weight?",
      "isRequired": true
    },
    {
      "content": "Height",
      "inputType": "number",
      "code": "su4",
      "questionOrder": 4,
      "rank": 4,
      "screen": 1,
      "target": "GEN",
      "description": "What is your height?",
      "isRequired": true
    },
    {
      "screen": 2,
      "content": "Discover your BMI",
      "target": "BMI"
    },
    {
      "content": "How are your activity levels?",
      "inputType": "singleChoice",
      "code": "su5",
      "questionOrder": 1,
      "rank": 1,
      "screen": 3,
      "target": "FIT",
      "options": [
        {
          "id": "SED",
          "value": "Sedentary",
          "description": "Office job"
        },
        {
          "id": "LIA",
          "value": "Light Exercise",
          "description": "1-2 days a week"
        },
        {
          "id": "MOA",
          "value": "Moderate Exercise",
          "description": "3-5 days a week"
        },
        {
          "id": "VEA",
          "value": "Heavy Exercise",
          "description": "6-7 days a week"
        },
        {
          "id": "SUA",
          "value": "Athlete",
          "description": "2 times a day"
        }
      ],
      "description": "What is your current activity level?"
    },
    {
      "content": "Which of the following aligns best with your work lifestyle?",
      "inputType": "singleChoiceAndOther",
      "code": "su6",
      "rank": 1,
      "screen": 4,
      "description":  "Which of the following aligns best with your work lifestyle?",
      "options": [
        {
          "id": "STD",
          "value": "Standard 9-5 office hours"
        },
        {
          "id": "IROR",
          "value": "Irregular or rotating shift hours"
        },
        {
          "id": "FLEXIBLE",
          "value": "Freelance or remote work with flexible hours"
        },
        {
          "id": "STUD",
          "value": "Student schedule with designated study hours"
        },
        {
          "id": "FTPC",
          "value": "Full-time parent or caregiver"
        }
      ]
    },
    {
      "content": "How much time would you like to dedicate per workout",
      "inputType": "range",
      "rank": 1,
      "screen": 5,
      "description": "How much time per workout can you give",
      "code": "su7"
    },
    {
      "content": "What is your primary Fitness Goal?",
      "inputType": "singleChoice",
      "code": "su8",
      "questionOrder": 4,
      "rank": 1,
      "screen": 6,
      "target": "FIT",
      "options": [
        {
          "id": "SHRED",
          "value": "Shred",
          "description": "Lighter, Faster & Agile, Decrease fat"
        },
        {
          "id": "SIZE",
          "value": "Size",
          "description": "Bigger & Stronger, Increase muscle"
        }
      ],
      "description": "What do you aim to achieve?"
    },
    {
      "content": "What type of workout equipment do you have access to?",
      "inputType": "singleChoice",
      "code": "su9",
      "rank": 1,
      "screen": 7,
      "options": [
        {
          "id": "FULL",
          "value": "Full gym",
          "description": "various equipments"
        },
        {
          "id": "HOME",
          "value": "Home gym",
          "description": "dumbbells & resistance bands"
        },
        {
          "id": "NOEQ",
          "value": "No Equipments",
          "description": "bodyweight"
        }
      ],
      "target": "FIT",
      "description": "List the equipments available to you"
    },
    {
      "content": "Any past or current injuries that might affect your workouts? ",
      "inputType": "singleChoiceAndOther",
      "options":  [
        {
          "id": "No Injuries",
          "value": "No Injuries",
        }
      ],
      "code": "su10",
      "rank": 1,
      "screen": 8,
      "target": "MED",
      "description": "Any past injuries?"
    },
    {
      "content": "Push ups",
      "inputType": "number",
      "code": "su11",
      "rank": 1,
      "screen": 9,
      "target": "FITTEST",
      "description": "Push ups"
    },
    {
      "content": "Pull ups",
      "inputType": "number",
      "code": "su12",
      "rank": 2,
      "screen": 10,
      "target": "FITTEST",
      "description": "pull ups"
    },
    {
      "content": "Burpes",
      "inputType": "number",
      "code": "su13",
      "rank": 4,
      "screen": 9,
      "target": "FITTEST",
      "description": "Burpes"
    },
    {
      "content": "Situps",
      "inputType": "number",
      "code": "su14",
      "rank": 5,
      "screen": 9,
      "target": "FITTEST",
      "description": "Situps"
    },
    {
      "content": "Squats",
      "inputType": "number",
      "code": "su15",
      "rank": 3,
      "screen": 9,
      "target": "FITTEST",
      "description": "Squats"
    }
  ]
},
{
  "_id": {
    "$oid": "6618503865441b568859053f"
  },
  "name": "lifestyle",
  "questions": [
    {
      "content": "First Name",
      "inputType": "text",
      "code": "ls1",
      "rank": 1,
      "screen": 16,
      "target": "general",
      "description": "",
      "placeholder": "Jane",
      "isRequired": true
    },
    {
      "content": "Last Name",
      "inputType": "text",
      "code": "ls2",
      "rank": 2,
      "screen": 16,
      "target": "general",
      "description": "",
      "placeholder": "Smith",
      "isRequired": false
    },
    {
      "content": "Phone number",
      "inputType": "tel",
      "code": "ls3",
      "rank": 3,
      "screen": 16,
      "target": "general",
      "description": "",
      "placeholder": "10-digit number",
      "isRequired": true
    },
    {
      "content": "Email",
      "inputType": "email",
      "code": "ls4",
      "rank": 4,
      "screen": 16,
      "target": "general",
      "description": "",
      "placeholder": "name@example.com",
      "isRequired": true
    },
    {
      "content": "Age",
      "inputType": "number",
      "rank": 5,
      "screen": 16,
      "target": "general",
      "description": "",
      "code": "ls5",
      "placeholder": "Type your answer here...",
      "isRequired": true
    },
    {
      "content": "How much do you value health on a daily basis?",
      "inputType": "singleChoice",
      "code": "ls6",
      "rank": 1,
      "screen": 1,
      "target": "persona",
      "description": "1(Not much) to 5 (A lot)",
      "options": [
        {
          "id": "1",
          "value": "1 ⭐️"
        },
        {
          "id": "2",
          "value": "2 ⭐️⭐️"
        },
        {
          "id": "3",
          "value": "3 ⭐️⭐️⭐️"
        },
        {
          "id": "4",
          "value": "4 ⭐️⭐️⭐️⭐️"
        },
        {
          "id": "5",
          "value": "5 ⭐️⭐️⭐️⭐️⭐️"
        }
      ],
      "placeholder": "",
      "isRequired": false
    },
    {
      "content": "How open are you to change your lifestyle?",
      "inputType": "singleChoice",
      "code": "ls7",
      "rank": 1,
      "screen": 2,
      "target": "persona",
      "description": "1(Not open) to 5 (Very open)",
      "options": [
        {
          "id": "1",
          "value": "1 ⭐️"
        },
        {
          "id": "2",
          "value": "2 ⭐️⭐️"
        },
        {
          "id": "3",
          "value": "3 ⭐️⭐️⭐️"
        },
        {
          "id": "4",
          "value": "4 ⭐️⭐️⭐️⭐️"
        },
        {
          "id": "5",
          "value": "5 ⭐️⭐️⭐️⭐️⭐️"
        }
      ],
      "placeholder": "",
      "isRequired": false
    },
    {
      "content": "What’s your biggest motivation for making a lifestyle change?",
      "inputType": "multiChoice",
      "code": "ls10",
      "rank": 1,
      "screen": 3,
      "target": "persona",
      "description": "Choose as many as you like",
      "options": [
        {
          "id": "1",
          "value": "Improve physical health and performance"
        },
        {
          "id": "2",
          "value": "Enhance mental wellbeing"
        },
        {
          "id": "3",
          "value": "Prepare for an event (e.g., wedding, marathon)"
        },
        {
          "id": "4",
          "value": "Aesthetic changes like abs"
        },
        {
          "id": "5",
          "value": "Personal growth"
        }
      ],
      "placeholder": "",
      "isRequired": false
    },
    {
      "content": "Our programs are priced at 25k INR for 3 months. How comfortable are you with this investment in your health and fitness journey?",
      "inputType": "singleChoice",
      "code": "ls11",
      "rank": 1,
      "screen": 4,
      "target": "persona",
      "options": [
        {
          "id": "VCOM",
          "value": "Very Comfortable: It's worth the investment for my wellbeing."
        },
        {
          "id": "SCOM",
          "value": "Somewhat Comfortable: I could make it work if the results are right."
        },
        {
          "id": "NECO",
          "value": "Need Convincing: I need more information about the benefits."
        },
        {
          "id": "UNCOM",
          "value": "Uncomfortable: This is more than I'm comfortable spending right now."
        }
      ],
      "description": "",
      "placeholder": "",
      "isRequired": true
    },
    {
      "content": "On average, how many days a week do you engage in physical activity?",
      "description": "",
      "inputType": "singleChoice",
      "code": "ls12",
      "rank": 1,
      "screen": 5,
      "target": "fitness",
      "options": [
        {
          "id": "0",
          "value": "0 days"
        },
        {
          "id": "1-2",
          "value": "1-2 days"
        },
        {
          "id": "3-4",
          "value": "3-4 days"
        },
        {
          "id": "5-6",
          "value": "5-6 days"
        },
        {
          "id": "gt_6",
          "value": "More than 6"
        }
      ],
      "placeholder": "",
      "isRequired": false
    },
    {
      "content": "What is your biggest challenge in maintaining a regular exercise routine?",
      "description": "Choose as many as you like",
      "inputType": "multichoice",
      "code": "ls13",
      "rank": 1,
      "screen": 6,
      "target": "fitness",
      "options": [
        {
          "id": "TimeLack",
          "value": "Lack of time"
        },
        {
          "id": "InsufMoti",
          "value": "Insufficient Motivation"
        },
        {
          "id": "LessIdea",
          "value": "Uncertainty about what exercises to do"
        },
        {
          "id": "LackEqip",
          "value": "Lack of access to facilities or equipment"
        },
        {
          "id": "NONE",
          "value": "None of the above"
        }
      ],
      "placeholder": "",
      "isRequired": false
    },
    {
      "content": "How would you rate your current diet on a scale of 1-5?",
      "inputType": "singleChoice",
      "code": "ls14",
      "rank": 1,
      "screen": 7,
      "target": "nutrition",
      "description": "1 (Poor) to 5 (Excellent)",
      "options": [
        {
          "id": "1",
          "value": "1 ⭐️"
        },
        {
          "id": "2",
          "value": "2 ⭐️⭐️"
        },
        {
          "id": "3",
          "value": "3 ⭐️⭐️⭐️"
        },
        {
          "id": "4",
          "value": "4 ⭐️⭐️⭐️⭐️"
        },
        {
          "id": "5",
          "value": "5 ⭐️⭐️⭐️⭐️⭐️"
        }
      ],
      "placeholder": "",
      "isRequired": false
    },
    {
      "content": "What is your biggest challenge in maintaining a healthy diet?",
      "description": "Choose as many as you like",
      "inputType": "multiChoice",
      "code": "ls15",
      "rank": 1,
      "screen": 8,
      "target": "nutrition",
      "options": [
        {
          "id": "TimeCons",
          "value": "Time constraints make healthy eating difficult"
        },
        {
          "id": "Uncert",
          "value": "Uncertainty about what foods are healthy"
        },
        {
          "id": "LimitAccess",
          "value": "Limited access to healthy options"
        },
        {
          "id": "UnhCraving",
          "value": "Managing cravings for unhealthy foods"
        },
        {
          "id": "NONE",
          "value": "None of the above"
        }
      ],
      "placeholder": "",
      "isRequired": false
    },
    {
      "content": "On average, how many hours of sleep do you get per night?",
      "description": "",
      "inputType": "singleChoice",
      "code": "ls16",
      "rank": 1,
      "screen": 9,
      "target": "sleep",
      "options": [
        {
          "id": "Below4",
          "value": "Less than 4 hours"
        },
        {
          "id": "4-6H",
          "value": "4-6 hours"
        },
        {
          "id": "6-8H",
          "value": "6-8 hours"
        },
        {
          "id": "above8",
          "value": "More than 8 hours"
        }
      ],
      "placeholder": "",
      "isRequired": false
    },
    {
      "content": "What is your biggest challenge in achieving restful sleep?",
      "description": "Choose as many as you like",
      "inputType": "multiChoice",
      "code": "ls17",
      "rank": 1,
      "screen": 10,
      "target": "sleep",
      "options": [
        {
          "id": "STRESS",
          "value": "Stress or anxiety"
        },
        {
          "id": "UNCONF",
          "value": "Uncomfortable sleep environment"
        },
        {
          "id": "IRRSCHED",
          "value": "Irregular schedule"
        },
        {
          "id": "USEELEC",
          "value": "Use of electronics before bed"
        },
        {
          "id": "NONE",
          "value": "None of the above"
        }
      ],
      "placeholder": "",
      "isRequired": false
    },
    {
      "content": "On a typical day, how would you rate your energy levels?",
      "description": "",
      "inputType": "singleChoice",
      "code": "ls18",
      "rank": 1,
      "screen": 11,
      "target": "lifestyle",
      "options": [
        {
          "id": "HIGH",
          "value": "High - I feel energized and ready to take on the day"
        },
        {
          "id": "MODERATE",
          "value": "Moderate - I have enough energy to get through daily tasks, but may feel tired at times"
        },
        {
          "id": "LOW",
          "value": "Low - I often feel fatigued and struggle to stay alert and focused"
        },
        {
          "id": "VERYLOW",
          "value": "Very low - I frequently experience extreme fatigue and struggle to function throughout the day"
        }
      ],
      "placeholder": "",
      "isRequired": false
    },
    {
      "content": "How would you rate your stress levels on a day-to-day basis?",
      "inputType": "singleChoice",
      "code": "ls19",
      "rank": 1,
      "screen": 12,
      "target": "lifestyle",
      "description": "1 (Very low) to 5 (Very high)",
      "options": [
        {
          "id": "1",
          "value": "1 ⭐️"
        },
        {
          "id": "2",
          "value": "2 ⭐️⭐️"
        },
        {
          "id": "3",
          "value": "3 ⭐️⭐️⭐️"
        },
        {
          "id": "4",
          "value": "4 ⭐️⭐️⭐️⭐️"
        },
        {
          "id": "5",
          "value": "5 ⭐️⭐️⭐️⭐️⭐️"
        }
      ],
      "placeholder": "",
      "isRequired": false
    },
    {
      "content": "How would you describe your work-life balance?",
      "description": "",
      "inputType": "singleChoice",
      "code": "ls20",
      "rank": 1,
      "screen": 13,
      "target": "lifestyle",
      "options": [
        {
          "id": "WELLB",
          "value": "Well-balanced, with adequate time for relaxation and leisure activities"
        },
        {
          "id": "MODB",
          "value": "Moderately balanced, but sometimes feel overwhelmed by work demands"
        },
        {
          "id": "POOR",
          "value": "Poor, with work often encroaching on personal time and activities"
        },
        {
          "id": "GOOD",
          "value": "I'm currently not employed"
        }
      ],
      "placeholder": "",
      "isRequired": false
    },
    {
      "content": "What specific fitness objectives are you aiming to achieve?",
      "description": "Choose as many as you like",
      "inputType": "multiChoice",
      "code": "ls21",
      "rank": 1,
      "screen": 14,
      "target": "objective",
      "options": [
        {
          "id": "WTLO",
          "value": "Weight loss"
        },
        {
          "id": "MUSGN",
          "value": "Muscle gain"
        },
        {
          "id": "IMPEND",
          "value": "Improved endurance"
        },
        {
          "id": "FLEXMOB",
          "value": "Flexibility and mobility improvement"
        },
        {
          "id": "SPECTRAIN",
          "value": "Training for a specific event"
        }
      ],
      "placeholder": "",
      "isRequired": false
    },
    {
      "content": "Is there anything else you would like to tell us about your lifestyle?",
      "inputType": "text",
      "rank": 1,
      "screen": 15,
      "target": "general",
      "description": "",
      "code": "ls23",
      "placeholder": "Type your answer here...",
      "isRequired": false
    }
  ]
}]
export default data;