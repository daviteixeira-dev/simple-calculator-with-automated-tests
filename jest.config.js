module.exports = {
    testEnvironment: "jest-environment-jsdom", // Define o ambiente para simular o navegador (DOM)
    transform: {
        "^.+\\.js$": "babel-jest", // Transpila arquivos .js usando Babel para compatibilidade com ES6+
    },
};
