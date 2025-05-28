const codeSnippets = {
    javascript: [
        {
            code: `let name = "John";
let age = 25;
console.log("Hello " + name);`,
            explanation: "This code creates two variables (name and age) and prints a greeting message to the console using string concatenation."
        },
        {
            code: `function add(a, b) {
    return a + b;
}
let result = add(5, 3);`,
            explanation: "This defines a simple function that adds two numbers together and stores the result in a variable."
        },
        {
            code: `let numbers = [1, 2, 3, 4];
for (let i = 0; i < numbers.length; i++) {
    console.log(numbers[i]);
}`,
            explanation: "This code creates an array of numbers and uses a for loop to print each number to the console."
        }
    ],
    java: [
        {
            code: `public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
}`,
            explanation: "This is the classic 'Hello World' program in Java. It defines a class with a main method that prints text to the console."
        },
        {
            code: `int x = 10;
int y = 20;
int sum = x + y;
System.out.println(sum);`,
            explanation: "This code declares two integer variables, adds them together, and prints the result. It demonstrates basic variable declaration and arithmetic operations."
        },
        {
            code: `for (int i = 1; i <= 5; i++) {
    System.out.println("Count: " + i);
}`,
            explanation: "This is a simple for loop that counts from 1 to 5 and prints each number with a label. It shows basic loop structure in Java."
        }
    ],
    python: [
        {
            code: `name = "Alice"
age = 30
print(f"My name is {name} and I am {age}")`,
            explanation: "This code creates two variables and uses an f-string (formatted string literal) to print a message with the variable values."
        },
        {
            code: `def greet(name):
    return f"Hello, {name}!"

message = greet("Bob")
print(message)`,
            explanation: "This defines a simple function that takes a name parameter and returns a greeting message, then calls the function and prints the result."
        },
        {
            code: `numbers = [1, 2, 3, 4, 5]
for num in numbers:
    print(num * 2)`,
            explanation: "This code creates a list of numbers and uses a for loop to iterate through each number, printing double its value."
        }
    ]
};

let currentLanguage = '';
let currentCode = '';
let startTime = 0;
let timerInterval;
let isTestComplete = false;

function selectLanguage(language) {
    currentLanguage = language;
    document.getElementById('language-selection').style.display = 'none';
    document.getElementById('typing-area').style.display = 'block';
    startTest();
}

function startTest() {
    const snippets = codeSnippets[currentLanguage];
    const randomSnippet = snippets[Math.floor(Math.random() * snippets.length)];
    currentCode = randomSnippet.code;

    document.getElementById('code-display').innerHTML = highlightCode(currentCode, '');
    document.getElementById('typing-input').value = '';
    document.getElementById('explanation').classList.add('hidden');
    document.getElementById('explanation-text').textContent = randomSnippet.explanation;

    resetStats();
    isTestComplete = false;

    const input = document.getElementById('typing-input');
    input.focus();
    input.oninput = handleTyping;
}

function handleTyping() {
    if (!startTime) {
        startTime = Date.now();
        startTimer();
    }

    const typedText = document.getElementById('typing-input').value;
    const codeDisplay = document.getElementById('code-display');

    codeDisplay.innerHTML = highlightCode(currentCode, typedText);
    updateStats(typedText);

    if (typedText === currentCode && !isTestComplete) {
        completeTest();
    }
}

function highlightCode(originalCode, typedText) {
    let result = '';

    for (let i = 0; i < originalCode.length; i++) {
        if (i < typedText.length) {
            if (originalCode[i] === typedText[i]) {
                result += `<span class="correct">${originalCode[i]}</span>`;
            } else {
                result += `<span class="incorrect">${originalCode[i]}</span>`;
            }
        } else if (i === typedText.length) {
            result += `<span class="current">${originalCode[i]}</span>`;
        } else {
            result += originalCode[i];
        }
    }

    return result;
}

function updateStats(typedText) {
    const timeElapsed = (Date.now() - startTime) / 1000;
    document.getElementById('time').textContent = Math.floor(timeElapsed);

    if (typedText.length > 0) {
        const wordsTyped = typedText.split(' ').length;
        const wpm = Math.round((wordsTyped / timeElapsed) * 60);
        document.getElementById('speed').textContent = wpm || 0;

        let correctChars = 0;
        for (let i = 0; i < typedText.length; i++) {
            if (i < currentCode.length && typedText[i] === currentCode[i]) {
                correctChars++;
            }
        }
        const accuracy = Math.round((correctChars / typedText.length) * 100);
        document.getElementById('accuracy').textContent = accuracy;
    }
}

function completeTest() {
    isTestComplete = true;
    clearInterval(timerInterval);
    document.getElementById('explanation').classList.remove('hidden');
    document.getElementById('typing-input').style.border = '2px solid #4CAF50';
}

function startTimer() {
    timerInterval = setInterval(() => {
        if (!isTestComplete) {
            const timeElapsed = (Date.now() - startTime) / 1000;
            document.getElementById('time').textContent = Math.floor(timeElapsed);
        }
    }, 100);
}

function resetStats() {
    startTime = 0;
    clearInterval(timerInterval);
    document.getElementById('speed').textContent = '0';
    document.getElementById('accuracy').textContent = '100';
    document.getElementById('time').textContent = '0';
    document.getElementById('typing-input').style.border = '2px solid #333';
}

function goBack() {
    document.getElementById('language-selection').style.display = 'flex';
    document.getElementById('typing-area').style.display = 'none';
    resetStats();
}
