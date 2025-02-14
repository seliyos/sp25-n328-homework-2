

const path = require('path');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function quitApp() {
    rl.close();
}

function includeFunctionFolder(callback) {
    rl.question("Include functions folder? (y/n): ", function (userAnswer) {
        const cleanedAnswer = userAnswer.trim().toLowerCase();
        if (cleanedAnswer === "y" || cleanedAnswer === "") {
            callback(true);
        } else if (cleanedAnswer === "n") {
            callback(false);
        } else {
            includeFunctionFolder(callback);
        }
    });
}

rl.question("Enter the project name: ", function (projectName) {
    const baseDirectory = process.cwd();
    const projectDirectory = path.join(baseDirectory, projectName);
    const readmeFile = path.join(projectDirectory, "README.md");

    if (!fs.existsSync(projectDirectory)) {
        fs.mkdirSync(projectDirectory);
    }

    includeFunctionFolder(function (includeFunctions) {
        if (includeFunctions) {
            const functionsDirectory = path.join(projectDirectory, "functions");
            fs.mkdirSync(functionsDirectory);
        }

        fs.writeFileSync(readmeFile, `# ${projectName}\n\nProject created using CLI tool.`);
        console.log("Project setup complete!");
        quitApp();
    });
});
