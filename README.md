
# QuizCrafter

QuizCrafter is a web application designed to create, manage, and take quizzes online. It allows users to participate in quizzes, view results, and track their progress. The application leverages React for the frontend, offering a smooth and interactive user experience.

![image](https://github.com/user-attachments/assets/f662c5b4-cdf0-41de-9732-a0870afadd6f)

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)
- [Contact](#contact)

## Features

- User-friendly interface for taking quizzes.
- Ability to create and manage quizzes.
- Real-time tracking of quiz progress and results.
- Responsive design for optimal performance on mobile and desktop devices.

## Technologies Used

- **React**
- **React Router**
- **Formik** (for form handling)
- **Yup** (for validation)
- **React helmet** (for SEO)
- **React animated cursor** (for custom cursor)
- **React error boundary** (for handle errors)
- **Framer Motion** (for animations)
- **Custom Hooks** (for API calls)
- **CSS Modules** (or SCSS for styling)
- **JSON Server** (for mock API, or a real backend if implemented)

## Getting Started

To get a local copy of the project up and running, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/quizcrafter.git
   ```

2. Navigate to the project directory:

   ```bash
   cd quizcrafter
   ```

3. Install the required packages:

   ```bash
   npm install
   ```

4. Run the application:

   ```bash
   npm start
   ```

   The app will be running on `http://localhost:3000`.

5. Navigate in another terminal to the JSON directory:

   ```bash
   cd src/resources/db
   ```

6. Run the JSON server (it's important to run it on a port other than 3000):

   ```bash
   json-server --watch db.json --port 5000
   ```


## Usage

1. Access the application in your web browser.
2. Create or select a quiz to take.
3. Enter your name to start the quiz.
4. Answer the questions and submit to see your results.

## API Endpoints

The application interacts with a mock backend for quiz data. Below are the key endpoints that the frontend uses:

- **GET /tests**:  
  - Description: Retrieves all quizzes available in the database.
  - Response: Returns an array of quiz objects, each containing properties such as `id`, `name`, `description`, `author`, `views`, and `questions`.

- **GET /tests/:id**:  
  - Description: Retrieves a specific quiz by its ID.
  - Parameters: `id` - The ID of the quiz to retrieve.
  - Response: Returns a quiz object if found; otherwise, returns a 404 error.

### Example Response for `/tests`:

```json
[
  {
    "id": "1",
    "name": "JavaScript Basics",
    "description": "Test your knowledge of JavaScript fundamentals.",
    "author": "John Doe",
    "views": 120,
    "questions": [...],
    "timer": 30
  }
]
```

## Demo

![image](https://github.com/user-attachments/assets/543aa16d-8cd7-460e-a389-9b69d85e3b06)

![image](https://github.com/user-attachments/assets/397dec79-269e-4bbf-a53a-2fe9cc926cc0)

![image](https://github.com/user-attachments/assets/ab411f1b-8a57-4301-bd27-29c7786140dc)

![image](https://github.com/user-attachments/assets/18e7c82d-5f77-4a4e-953d-987ba6bf2001)

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please follow these steps:

1. **Fork the repository**:  
   Click the "Fork" button at the top right corner of this repository.

2. **Create your feature branch**:

   ```bash
   git checkout -b feature/YourFeature
   ```

3. **Commit your changes**:

   ```bash
   git commit -m 'Add some feature'
   ```

4. **Push to the branch**:

   ```bash
   git push origin feature/YourFeature
   ```

5. **Open a pull request**:  
   Navigate to the original repository and click on the "Pull Requests" tab, then click the "New Pull Request" button.

### Code of Conduct

Please adhere to this project's code of conduct. We expect all contributors to treat each other with respect and contribute positively.

## License

This project is distributed under the MIT License. See the `LICENSE` file for more information.

## Acknowledgements

- Thank you to **React** for providing an awesome library.
- Special thanks to **Formik** and **Yup** for simplifying form handling and validation.
- Acknowledgments to **Framer Motion** for providing smooth animations.

## Contact

Your Name - [gorsunfoster@gmail.com](mailto:gorsunfoster@gmail.com)

Project Link: [https://github.com/gorsun4ic/quizcrafter](https://github.com/gorsun4ic/quizcrafter)
