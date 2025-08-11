# NestJS Authentication & Authorization System

A scalable NestJS application with comprehensive authentication and authorization flow using best practices.

## Features

- 🔐 **JWT-based Authentication**
- 👥 **Role-based Authorization (RBAC)**
- 🔒 **Password Hashing with bcrypt**
- 📧 **Email Validation**
- 🛡️ **Input Validation with class-validator**
- 🏗️ **Scalable Architecture**
- 📊 **User Management System**
- 🔄 **Token Refresh Mechanism**

## Tech Stack

- **Framework**: NestJS
- **Database**: MySQL with TypeORM
- **Authentication**: JWT + Passport.js
- **Validation**: class-validator
- **Password Hashing**: bcrypt
- **Configuration**: @nestjs/config

## Project Structure

```
src/
├── auth/
│   ├── dto/
│   │   ├── login.dto.ts
│   │   ├── refresh-token.dto.ts
│   │   └── index.ts
│   ├── guards/
│   │   ├── jwt-auth.guard.ts
│   │   ├── local-auth.guard.ts
│   │   └── roles.guard.ts
│   ├── decorators/
│   │   └── roles.decorator.ts
│   ├── strategies/
│   │   ├── jwt.strategy.ts
│   │   └── local.strategy.ts
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── auth.module.ts
├── users/
│   ├── dto/
│   │   ├── create-user.dto.ts
│   │   ├── update-user.dto.ts
│   │   └── index.ts
│   ├── user.entity.ts
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── users.module.ts
└── app.module.ts
```

## Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment Setup**:
   Create a `.env` file in the root directory:
   ```env
   # Application
   APP_PORT=3000
   NODE_ENV=development

   # Database
   DB_HOST=localhost
   DB_PORT=3303
   DB_USERNAME=root
   DB_PASSWORD=123456
   DB_DATABASE=todo_db

   # JWT
   JWT_SECRET=your_super_secret_key_here
   JWT_EXPIRES_IN=3600s
   ```

3. **Database Setup**:
   - Ensure MySQL is running
   - Create the database: `todo_db`
   - The application will auto-create tables in development mode

4. **Run the application**:
   ```bash
   # Development
   npm run start:dev

   # Production
   npm run build
   npm run start:prod
   ```

## API Endpoints

### Authentication

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "password": "SecurePass123!",
  "phoneNumber": "+1234567890"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

#### Refresh Token
```http
POST /auth/refresh
Authorization: Bearer <jwt_token>
```

#### Verify Token
```http
POST /auth/verify
Authorization: Bearer <jwt_token>
```

#### Logout
```http
POST /auth/logout
Authorization: Bearer <jwt_token>
```

### User Management

#### Get User Profile
```http
GET /users/profile
Authorization: Bearer <jwt_token>
```

#### Update Profile
```http
PATCH /users/profile
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Smith",
  "phoneNumber": "+1234567890"
}
```

#### Get All Users (Admin/Moderator)
```http
GET /users
Authorization: Bearer <jwt_token>
```

#### Get User by ID (Admin/Moderator)
```http
GET /users/:id
Authorization: Bearer <jwt_token>
```

#### Update User (Admin)
```http
PATCH /users/:id
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "status": "active",
  "role": "admin"
}
```

#### Delete User (Admin)
```http
DELETE /users/:id
Authorization: Bearer <jwt_token>
```

#### Get Active Users (Admin/Moderator)
```http
GET /users/active/list
Authorization: Bearer <jwt_token>
```

#### Get Users by Role (Admin)
```http
GET /users/role/:role
Authorization: Bearer <jwt_token>
```

#### Get User Statistics (Admin)
```http
GET /users/stats/count
Authorization: Bearer <jwt_token>
```

#### Check Email Availability
```http
GET /users/check-email/:email
Authorization: Bearer <jwt_token>
```

## User Roles

- **USER**: Basic user with limited access
- **MODERATOR**: Can view users and manage basic operations
- **ADMIN**: Full access to all operations

## User Status

- **ACTIVE**: User can access the system
- **INACTIVE**: User account is disabled
- **SUSPENDED**: User account is temporarily suspended

## Security Features

### Password Requirements
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character

### JWT Token
- Configurable expiration time
- Contains user ID, email, and role
- Automatic token validation

### Input Validation
- Email format validation
- Password strength validation
- Required field validation
- Data type validation

## Best Practices Implemented

1. **Separation of Concerns**: Clear separation between auth and user modules
2. **Dependency Injection**: Proper use of NestJS DI container
3. **Guards and Decorators**: Role-based access control
4. **DTOs**: Type-safe request/response handling
5. **Error Handling**: Comprehensive error responses
6. **Environment Configuration**: Secure configuration management
7. **Database Security**: Password hashing and secure queries
8. **Input Validation**: Comprehensive validation with class-validator
9. **Scalable Architecture**: Modular design for easy scaling
10. **Type Safety**: Full TypeScript implementation

## Development

### Running Tests
```bash
npm run test
npm run test:watch
npm run test:cov
```

### Code Formatting
```bash
npm run format
npm run lint
```

### Database Migrations
The application uses TypeORM's `synchronize: true` in development mode. For production, implement proper migrations.

## Production Considerations

1. **Environment Variables**: Use strong JWT secrets
2. **Database**: Use connection pooling and proper indexing
3. **Rate Limiting**: Implement rate limiting for auth endpoints
4. **Logging**: Add comprehensive logging
5. **Monitoring**: Implement health checks and monitoring
6. **Security Headers**: Add security headers middleware
7. **CORS**: Configure CORS properly
8. **HTTPS**: Use HTTPS in production

## Contributing

1. Follow the existing code structure
2. Add proper validation for new endpoints
3. Include error handling
4. Write tests for new features
5. Update documentation

## License

This project is licensed under the MIT License.