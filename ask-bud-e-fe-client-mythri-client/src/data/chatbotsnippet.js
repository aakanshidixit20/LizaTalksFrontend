// Simple Chatbot Example
class Chatbot {
  constructor(name) {
    this.name = name;
    this.responses = {
      hello: "Hi there! How can I help you today?",
      bye: "Goodbye! Have a nice day!",
      default: "I'm not sure I understand. Can you rephrase?"
    };
  }

  getResponse(message) {
    const msg = message.toLowerCase();
    if (msg.includes("hello") || msg.includes("hi")) {
      return this.responses.hello;
    } else if (msg.includes("bye")) {
      return this.responses.bye;
    } else {
      return this.responses.default;
    }
  }
}

// Usage
const bot = new Chatbot("Chatty");

console.log(bot.getResponse("Hello!")); // Hi there! How can I help you today?
console.log(bot.getResponse("Bye"));    // Goodbye! Have a nice day!
console.log(bot.getResponse("What's up?")); // I'm not sure I understand. Can you rephrase?
