# Heyama Objects API 🚀

[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)](https://swagger.io/)

A powerful **NestJS API** for managing objects with seamless image uploads. This project provides full CRUD operations for objects and handles file uploads to **Backblaze B2 S3-compatible storage**, featuring real-time updates via WebSockets.

## ✨ Features

- 🚀 **CRUD operations** for objects (Create, Read, Update, Delete)
- 📸 **Image upload functionality** using Backblaze B2 S3-compatible storage
- 🔄 **Real-time updates** via WebSockets
- 📚 **Swagger documentation** automatically generated
- 🗃️ **MongoDB database integration** with Mongoose ODM
- ✅ **Input validation and transformation** with class-validator
- 🌐 **CORS enabled** for cross-origin requests

## Technology Stack

- **Framework**: NestJS
- **Database**: MongoDB with Mongoose
- **File Storage**: Backblaze B2 (S3-compatible)
- **Real-time**: Socket.io
- **Documentation**: Swagger/OpenAPI
- **Validation**: class-validator
- **Language**: TypeScript

## Installation

```bash
npm install
```

## Environment Setup

Copy the `.env` file and configure the following environment variables:

```env
# MongoDB connection string
MONGODB_URI=mongodb://127.0.0.1:27017/heyama_dev

# Backblaze B2 S3-compatible storage
B2_S3_ENDPOINT=https://s3.us-east-005.backblazeb2.com
B2_S3_REGION=us-east-005
B2_S3_BUCKET=your-bucket-name
B2_S3_KEY_ID=your-key-id
B2_S3_KEY=your-application-key

# Optional: Port (defaults to 3000)
PORT=3000
```

## Running the Application

### Development

```bash
npm run start:dev
```

### Production

```bash
npm run build
npm run start:prod
```

### Debug Mode

```bash
npm run start:debug
```

The application will start on the specified PORT (default: 3000).

## API Documentation

Once the application is running, visit `http://localhost:3000/docs` to access the Swagger UI documentation.

## 📖 Usage

### Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd heyama_api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start MongoDB** (ensure it's running locally or configure remote instance)

5. **Run the application**
   ```bash
   npm run start:dev
   ```

6. **Access the API**
   - API endpoints: `http://localhost:3000`
   - Swagger documentation: `http://localhost:3000/docs`

### API Endpoints

#### Objects

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/objects` | Create a new object with an image (multipart/form-data) |
| `GET` | `/objects` | Get all objects |
| `GET` | `/objects/:id` | Get a specific object by ID |
| `DELETE` | `/objects/:id` | Delete an object by ID |

**Create Object Example:**
```bash
curl -X POST http://localhost:3000/objects \
  -F "title=My Object" \
  -F "description=A sample object" \
  -F "image=@path/to/image.jpg"
```

## 📜 Scripts

- `npm run start` - Start the application
- `npm run start:dev` - Start in development mode with watch
- `npm run start:debug` - Start in debug mode
- `npm run start:prod` - Start the production build
- `npm run build` - Build the application
- `npm run test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:cov` - Run tests with coverage
- `npm run test:e2e` - Run end-to-end tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Project Structure

```
src/
├── app.module.ts          # Main application module
├── main.ts                # Application bootstrap
├── objects/               # Objects feature module
│   ├── dto/               # Data Transfer Objects
│   ├── objects.controller.ts  # REST API endpoints
│   ├── objects.gateway.ts     # WebSocket gateway
│   ├── objects.module.ts      # Objects module
│   ├── objects.service.ts     # Business logic
│   ├── schemas/               # MongoDB schemas
│   └── objects.controller.spec.ts  # Controller tests
└── files/                 # File handling
    └── files.service.ts   # File upload service
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines

1. **Code Style**: Follow the existing coding style and Prettier configuration
2. **Testing**: Add tests for new features and ensure all tests pass
3. **Commits**: Write clear, descriptive commit messages
4. **Documentation**: Update README and API docs as needed

### Running Tests

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

### Linting and Formatting

```bash
# Check linting
npm run lint

# Format code
npm run format
```

## 📄 License

### Linting and Formatting
