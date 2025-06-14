# DecentProfile - Advanced Espresso Profile Management System

A comprehensive web application for creating, managing, and sharing espresso brewing profiles specifically designed for Decent Espresso machines. This platform allows coffee enthusiasts and professionals to craft detailed brewing profiles with precise control over pressure, flow, temperature, and timing parameters.

## 🚀 Features

### Profile Management

- **Advanced Profile Creation**: Create sophisticated brewing profiles with multiple steps
- **Flow & Pressure Control**: Support for both flow-rate and pressure-based brewing modes
- **Temperature Management**: Precise temperature control for each brewing step
- **Step-by-Step Configuration**: Define complex brewing sequences with transitions
- **Profile Sharing**: Public and private profile sharing capabilities
- **Version Control**: Track changes and maintain profile history

### Album System

- **Profile Collections**: Organize profiles into themed albums
- **Collaborative Curation**: Share album collections with other users
- **Visual Organization**: Rich media support for album presentation
- **Community Sharing**: Discover and share profile collections

### Technical Capabilities

- **Real-time Editing**: Live profile editing with immediate preview
- **Data Visualization**: Interactive charts for profile visualization using Highcharts
- **Import/Export**: Support for legacy profile formats
- **Advanced Filtering**: Search and filter profiles by various parameters
- **Responsive Design**: Optimized for desktop and mobile devices

## 🏗️ Architecture

### Frontend

- **Framework**: Angular 17 with TypeScript
- **UI Components**: Angular Material with custom styling
- **Styling**: TailwindCSS for responsive design
- **Charts**: Highcharts for profile visualization
- **State Management**: Apollo Client for GraphQL state management

### Backend Services

- **Authentication**: Firebase Authentication with Supabase integration
- **Database**: Firestore for profile and user data
- **API**: GraphQL with Apollo Server
- **Edge Functions**: Supabase Edge Functions for serverless operations
- **File Storage**: Firebase Storage for media assets

### Infrastructure

- **Hosting**: Firebase Hosting
- **Functions**: Firebase Functions for server-side logic
- **Monitoring**: Sentry integration for error tracking
- **CI/CD**: GitHub Actions for automated deployment

## 📦 Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Angular CLI
- Firebase CLI
- Git

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/obiwan007/decentProfile.git
   cd decentProfile
   ```

2. **Install client dependencies**

   ```bash
   cd client
   npm install
   ```

3. **Install function dependencies**

   ```bash
   cd ../functions
   npm install
   ```

4. **Configure Firebase**

   ```bash
   firebase login
   firebase use --add
   ```

5. **Set up environment variables**
   ```bash
   # Copy environment template
   cp client/src/environments/environment.ts.example client/src/environments/environment.ts
   # Configure your Firebase and Supabase credentials
   ```

## 🚀 Development

### Start Development Server

```bash
# Start Angular development server
cd client
npm start
```

Navigate to `http://localhost:4200/`

### Start Firebase Emulators

```bash
# Start local Firebase emulators
firebase emulators:start
```

This starts:

- Authentication emulator on port 9099
- Firestore emulator on port 8080
- Functions emulator on port 5001
- Hosting emulator on port 5002

### Generate GraphQL Types

```bash
cd client
npm run codegen
```

## 🔧 Building & Deployment

### Build for Production

```bash
cd client
npm run build
```

### Deploy to Firebase

```bash
# Deploy all services
firebase deploy

# Deploy specific services
firebase deploy --only hosting
firebase deploy --only functions
firebase deploy --only firestore
```

## 📚 API Documentation

### Profile Model

```typescript
interface Profile {
  id: string;
  title: string;
  author: string;
  notes: string;
  beverage_type: string;
  steps: Step[];
  tank_temperature: number;
  target_weight: number;
  target_volume: number;
  type: ProfileType; // 'flow' | 'pressure' | 'advanced'
  version: string;
  isPublic: boolean;
}
```

### Step Configuration

```typescript
interface Step {
  name: string;
  temperature: number;
  sensor: string;
  pump: PumpMode; // 'flow' | 'pressure'
  transition: TransitionMode; // 'fast' | 'smooth'
  pressure: number;
  flow: number;
  seconds: number;
  volume: number;
  weight: number;
  exit?: ExitCondition;
  limiter?: FlowLimiter;
}
```

## 🛠️ Available Scripts

### Client Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run unit tests
- `npm run codegen` - Generate GraphQL types
- `npm run prettier` - Format code

### Firebase Scripts

- `firebase serve` - Serve locally
- `firebase deploy` - Deploy to production
- `firebase emulators:start` - Start local emulators

## 🔒 Authentication & Security

- **Firebase Authentication**: Secure user authentication with multiple providers
- **Row-level Security**: Firestore security rules for data protection
- **Input Validation**: Comprehensive input validation and sanitization
- **CORS Configuration**: Proper CORS setup for API security

## 🧪 Testing

### Unit Tests

```bash
cd client
npm test
```

### End-to-End Tests

```bash
cd client
npm run e2e
```

## 📊 Monitoring & Analytics

- **Error Tracking**: Sentry integration for real-time error monitoring
- **Performance Monitoring**: Firebase Performance Monitoring
- **Analytics**: Custom analytics for user behavior tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Submit a pull request

### Development Guidelines

- Follow Angular style guide
- Use TypeScript strict mode
- Write unit tests for new features
- Follow conventional commit messages
- Update documentation for API changes

## 📄 License

This project is licensed under the GPL License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- Create an issue in the GitHub repository
- Join the [Discord channel](https://discord.com/channels/795391195852308501/933879561513492490)

## 🎯 Roadmap

- [ ] Mobile app development
- [ ] Bluetooth integration with Decent machines
- [ ] Advanced analytics and brewing insights
- [ ] Community features and rating system
- [ ] Machine learning profile optimization
- [ ] Multi-language support

---

Built with ❤️ for the specialty coffee community
