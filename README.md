# Expo Router Auth Template

This is a template for building a mobile app with Expo, featuring authentication using Expo Router for routing. The project is configured for deployment on Vercel, making it easy to host your app in the cloud and dynamic on mobile.

## Getting Started

Follow these steps to get started with the Expo Router Auth Template:

### Prerequisites

- Make sure you have Node.js and npm installed on your machine.
- Install the Expo CLI globally by running:

  ```bash
  npm install -g expo-cli
  ```

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/expo-router-auth-template.git
   ```

2. Change into the project directory:

   ```bash
   cd expo-router-auth-template
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

### Configuration

1. **Authentication Configuration:**

   - Configure your authentication provider in the `src/auth` directory.

2. **Vercel Deployment:**

   - Ensure you have a Vercel account and the Vercel CLI installed.
   - Run the following command to link your project with Vercel:

     ```bash
     vercel
     ```

   - Follow the prompts to set up your deployment.

### Usage

- Start the Expo development server:

  ```bash
  npm start
  ```

- Open the Expo client on your mobile device or use an emulator to preview the app.

## Deployment

### Vercel

1. Push your changes to your GitHub repository.

2. Vercel will automatically detect your project and provide a deployment URL.

## Features

- **Authentication:** Integrated authentication system using Expo Secure Store.

- **Expo Router:** File based routing

- **Vercel Integration:** Seamless deployment on Vercel for web-based hosting.

## Contributing

Feel free to contribute to this project. Please follow the [Contribution Guidelines](CONTRIBUTING.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Notes

--- Use  "web3": "4.0.2" to avoid error
