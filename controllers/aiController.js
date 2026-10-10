const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const createDietPlan = async (req, res) => {
    const { name, age, height, weight, gender, fitnessGoal, fitnessLevel, workoutLocation, dietaryPlan, medicalHistory } = req.body;
    try {
       
const prompt = `
You are an AI fitness and nutrition assistant.
Create a personalized 7-day diet plan and workout plan using ALL the
user details provided below.

USER DETAILS:
- Name: ${name}
- Age: ${age}
- Height: ${height} cm
- Weight: ${weight} kg
- Gender: ${gender}
- Fitness Goal: ${fitnessGoal}
- Fitness Level: ${fitnessLevel}
- Workout Location: ${workoutLocation}
- Dietary Preference: ${dietaryPlan}
- Medical History: ${medicalHistory}

REQUIREMENTS:
1. Generate a complete plan for all 7 days.
2. Generate both dietPlan and workoutPlan for every day.
3. Personalize meals using age, fitness goal, dietary preference,
   weight, height, gender, and medical history.
4. Use practical and commonly available food options.
5. Include breakfast, lunch, dinner, and snacks each day.
6. Include exercise names, sets, reps, rest time, and descriptions.
7. Adapt exercises to the user's fitness level and workout location.
8. Include warm-up, cool-down, rest, and recovery where appropriate.
9. Avoid repeating the exact same meals and workouts unnecessarily.
10. Do not calculate or include BMI.
11. Do not diagnose diseases or prescribe treatments.
12. If medical history indicates a risk, recommend professional guidance.
13. If the user is under 18, prioritize growth, balanced nutrition,
    and safe physical activity. Do not recommend calorie restriction,
    fasting, starvation, aggressive weight loss, or supplements.
14. Do not invent user details. Preserve the provided name, age, goal,
    fitness level, and workout location.

15. UNIQUE DIET PLAN HEADINGS:
    - Generate a unique, meaningful, and descriptive title for each
      of the 7 diet plan days.
    - The title must reflect that day's actual meals, nutrition focus,
      or dietary variety.
    - Example titles:
      "Balanced Nutrition Day"
      "Protein-Rich Meal Plan"
      "Fiber-Rich Nutrition"
      "Energy-Balanced Meals"
      "Colorful Whole-Food Meals"
      "Healthy Meal Variety"
      "Recovery-Focused Nutrition"
    - These are examples only. Generate titles according to the actual
      meals and user's dietary preference.
    - Do not use generic titles such as "Day 1 - Meal Plan".

16. UNIQUE WORKOUT PLAN HEADINGS:
    - Generate a unique, meaningful, and descriptive title for each
      of the 7 workout plan days.
    - The title must reflect the actual exercises, workout focus,
      muscle groups, or recovery activity.
    - Adapt titles according to fitness goal, fitness level,
      workout location, and recovery needs.
    - Example titles:
      "Full Body Strength Training"
      "Upper Body Workout"
      "Lower Body Strength"
      "Cardio and Endurance"
      "Core Strength Training"
      "Full Body Conditioning"
      "Active Recovery and Mobility"
    - These are examples only. Generate titles based on the actual
      workout planned for each day.
    - Do not use generic titles such as "Day 1 - Workout".

17. The dietPlan and workoutPlan titles must be different from each
    other for the same day.
18. Avoid duplicate titles across all 7 days unless repetition is
    genuinely appropriate for the user's personalized plan.
19. Every title must accurately describe its corresponding plan.
20. Keep the existing JSON property names unchanged.
21. Return ONLY valid JSON. Do not return Markdown or code fences.

RETURN EXACTLY THIS JSON STRUCTURE:
{
  "user": {
    "name": "",
    "age": 0,
    "height": 0,
    "weight": 0,
    "gender": "",
    "goal": "",
    "level": "",
    "location": "",
    "dietaryPreference": "",
    "medicalHistory": ""
  },
  "dietPlan": [
    {
      "day": 1,
      "title": "Balanced Nutrition Day",
      "meals": [
        {
          "meal": "Breakfast",
          "name": "",
          "description": ""
        },
        {
          "meal": "Lunch",
          "name": "",
          "description": ""
        },
        {
          "meal": "Dinner",
          "name": "",
          "description": ""
        },
        {
          "meal": "Snack",
          "name": "",
          "description": ""
        }
      ]
    }
  ],
  "workoutPlan": [
    {
      "day": 1,
      "title": "Full Body Strength Training",
      "focus": "",
      "warmUp": "",
      "exercises": [
        {
          "name": "",
          "sets": 0,
          "reps": "",
          "rest": "",
          "description": ""
        }
      ],
      "coolDown": "",
      "recoveryNotes": ""
    }
  ]
}

IMPORTANT OUTPUT RULES:
- dietPlan must contain exactly 7 objects, for Day 1 through Day 7.
- workoutPlan must contain exactly 7 objects, for Day 1 through Day 7.
- Every diet day must contain Breakfast, Lunch, Dinner, and Snack.
- Every workout day must include a suitable workout or recovery activity.
- Every day must have an appropriate, descriptive title.
- All 7 diet titles should be meaningfully different.
- All 7 workout titles should be meaningfully different.
- Diet and workout titles for the same day must be different.
- Use numeric values for age, height, weight, day, and sets where applicable.
- Preserve the user's supplied details in the user object.
- Do not add or remove JSON properties.
- Return only the final JSON object.`;

        const interaction = await ai.interactions.create({
            model: "gemini-3.8-flash",
            input: prompt,
        }); 
        const output = interaction.output_text;
        res.status(200).json({ success: true, text: JSON.parse(output), message: "Ai generate successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
};

module.exports = {
    createDietPlan
}