export const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
];
export const isThisWeek = (date) => {
    const today = new Date();
    const first = today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1); // Adjust so Monday is the first day
    const last = first + 6;
    const firstDay = new Date(today.setDate(first)).setHours(0, 0, 0, 0);
    const lastDay = new Date(today.setDate(last)).setHours(23, 59, 59, 999);
    return date.getTime() >= firstDay && date.getTime() <= lastDay;
};
export const pepTalks = [
    {
        lessThan: 3,
        text: "You read less than my cat. And I don't have a cat."
    },
    {
        lessThan: 5,
        text: 'The numbers speak for themselves. Try to read more.'
    },
    {
        lessThan: 10,
        text: 'You are on the right track, but you need to read more.'
    },
    {
        lessThan: 15,
        text: 'If there was a reward for reading, you would get it.'
    },
    {
        lessThan: 50,
        text: 'You have exceeded all expectations. Keep it up.'
    },
    {
        lessThan: 100,
        text: 'Well, at first I doubted that you would last that long.'
    },
    {
        lessThan: 200,
        text: 'You read more than many people read in a year.'
    },
    {
        lessThan: 400,
        text: 'I never cease to be amazed by your abilities.'
    },
    {
        lessThan: 800,
        text: 'Even I got a bald spot from your streak'
    },
    {
        lessThan: 1000,
        text: 'You read more than I can imagine.'
    }
];
//# sourceMappingURL=user.utils.js.map