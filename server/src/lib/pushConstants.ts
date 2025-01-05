const en = {
    morning: {
        title: "Time to fill the diary",
        body: "It is time to fill morning part of your Diary.",
    },
    evening: {
        title: "Time to fill the diary",
        body: "It is time to fill evening part of your Diary.",
    },
    day_plan: {
        title: "Scheduled Task",
        body: (taskData: any) =>
            `The time of the scheduled task is approaching: ${taskData.task} in ${taskData.time}.`,
    },
};
const ru = {
    morning: {
        title: "Пора заполнять дневник",
        body: "Пришло время заполнить утреннюю часть твоего Дневника.",
    },
    evening: {
        title: "Пора заполнять дневник",
        body: "Пришло время заполнить вечернюю часть твоего Дневника.",
    },
    day_plan: {
        title: "Запланированная Задача",
        body: (taskData: any) =>
            `Приближается время запланированной задачи: ${taskData.task} в ${taskData.time}.`,
    },
};
const ua = {
    morning: {
        title: "Час заповнити щоденник",
        body: "Настав час заповнити ранкову частину твого Щоденника.",
    },
    evening: {
        title: "Час заповнити щоденник",
        body: "Настав час заповнити вечірню частину твого Щоденника.",
    },
    day_plan: {
        title: "Запланована Задача",
        body: (taskData: any) =>
            `Наближається час запланованого завдання: ${taskData.task} в ${taskData.time}.`,
    },
};

export default {
    en,
    ru,
    ua,
};
