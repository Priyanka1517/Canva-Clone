# Canva Design Application

This is a Canva-like web application built using the MERN stack. The app allows users to create, customize, and save designs, including the ability to add shapes, text, and images. Users can sign up, log in, and manage their designs through a personal dashboard.

## Table of Contents
- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## Features
1. **Landing Page**: A visually appealing landing page introducing the app.
2. **Signup**: Register for an account to create and save designs.
3. **Signin**: Log in to access your dashboard and previous designs.
4. **Dashboard**: 
   - Collapsible side panel.
   - Create new designs.
   - Customize design sizes.
5. **Create Design**:
   - Collapsible side panel with tools to add shapes, text, and images.
   - Ability to save and download designs.
   - Canvas for editing and designing.
6. **Add Shapes**: Insert customizable shapes into your design.
7. **Add Text**: Insert and style text in your design.
8. **Logout**: Securely log out of the application.

## Screenshots

1. **Landing Page**  
   ![Landing Page](./screenshots/landing_page.png)

2. **Signup Page**  
   ![Signup Page](./screenshots/signup.png)

3. **Signin Page**  
   ![Signin Page](./screenshots/signin.png)

4. **Dashboard**  
   ![Dashboard](./screenshots/dashboard.png)

5. **Create Design Page**  
   ![Create Design](./screenshots/create_design.png)

6. **Add Shapes**  
   ![Add Shapes](./screenshots/add_shapes.png)

7. **Add Text**  
   ![Add Text](./screenshots/add_text.png)

8. **Logout**  
   ![Logout](./screenshots/logout.png)

## Tech Stack

- **Frontend**: React.js, TypeScript, React Router, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Deployment**: Docker (Optional)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Priyanka1517/Canva-Clone
    cd canva-clone
    ```

2. Install dependencies for both frontend and backend:

    ```bash
    # Backend
    cd ./canva-clone/
    npm install

    # Frontend
    cd client
    npm install

    ```

3. Set up environment variables:

    Create a `.env` file in the `root` directory with the following:

    ```env
    NODE_ENV = local
    PORT = 5000
    LOCAL_DB_URI = mongodb://admin:password@localhost:27017/canvasdb?authSource=admin
    JWT_SECRET = your_jtw_secret_key
    cloud_name = cloud_name_to_store_designs
    api_key = api_key_for_cloud
    api_secret = secret_api_key_for_cloud
    ```

4. Run the application:

    ```bash
    
    # Database
    docker-compose up
    docker exec -it mongodb_container bash
    mongosh -u admin -p password --authenticationDatabase admin

    # Backend
    npm run dev

    # Frontend
    cd ./frontend
    npm start
    ```

5. Visit `http://localhost:3000` in your browser to view the application.

## Usage

- **Create Account**: Sign up with your email and password.
- **Login**: Use your credentials to access the dashboard.
- **Dashboard**: Start a new design or continue editing saved designs.
- **Design Tools**: Use the canvas editor to add shapes, text, or images. Save and download your design when you're done.

## Future Enhancements

- Add more design elements (images, stickers, etc.).
- Implement version history for designs.
- Optimize the drag-and-drop interface.
- Real-time collaboration using WebSockets.
- Integrate cloud storage for design saving.

## Contributing

Feel free to fork this project and submit pull requests. For major changes, please open an issue first to discuss the proposed change.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
