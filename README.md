
# Prayer Times Desktop Application

A beautiful prayer times desktop application that displays prayer times for Tangier, with a clean white and green theme.

## Features

- Displays daily prayer times (Fajr, Dhuhr, Asr, Maghrib, Isha)
- Countdown to the next prayer
- Custom title bar for a native look
- Daily automatic refresh of prayer times

## Installation and Development

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Development

```sh
# Clone the repository
git clone <repository-url>
cd prayer-times-app

# Install dependencies
npm install

# Start development server
npm run dev
```

### Building the Desktop App

```sh
# Build the app for production
npm run build

# Package the app for your platform
npm run electron:build
```

This will create executables in the `release` folder that you can install on your system.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the app for production
- `npm run electron:dev` - Run the app in development mode
- `npm run electron:build` - Package the app for your platform

## Supported Platforms

- Windows
- macOS
- Linux

