export const createRandomNumbers = (amount, min, max) =>
    Array.from({ length: amount }, () => createRandomNumber(min, max))

export const createRandomNumber = (min, max) =>
    Math.floor(Math.random() * max) + min
