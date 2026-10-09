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
                15. Return ONLY valid JSON. Do not return Markdown or code fences.

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
                    "title": "Day 1 - Meal Plan",
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
                    "title": "Day 1 - Workout",
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
                - Use numeric values for age, height, weight, day, and sets where applicable.
                - All other fields must follow the specified JSON structure.
                - The user object must preserve the supplied details.
                - Return only the final JSON object.
                `;
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