# Chefly Frontend

Modern Next.js web application for the Chefly platform - a marketplace for booking professional chefs.

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Atomic Design Pattern
- **Documentation**: Storybook
- **State Management**: React Context API + Zustand
- **API Client**: Axios
- **Real-time**: Socket.IO Client
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_SOCKET_URL=http://localhost:3004
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Storybook

Run Storybook to view and develop components in isolation:

```bash
npm run storybook
```

Open [http://localhost:6006](http://localhost:6006) to view Storybook.

Build Storybook for production:

```bash
npm run build-storybook
```

📖 **See [STORYBOOK.md](./STORYBOOK.md) for detailed documentation on using Storybook.**

### Build

Build the application for production:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages (login, register)
│   ├── explore/           # Chef exploration page
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Home page
├── components/            # UI Components (Atomic Design)
│   ├── atoms/            # Basic building blocks
│   │   ├── Avatar/
│   │   ├── Badge/
│   │   ├── Button/
│   │   ├── Card/
│   │   └── Input/
│   ├── molecules/        # Combinations of atoms
│   │   ├── BookingCard/
│   │   ├── ChefCard/
│   │   ├── ReviewCard/
│   │   └── SearchBar/
│   └── organisms/        # Complex components
│       ├── BookingForm/
│       ├── ChefGrid/
│       └── Navbar/
├── pages-stories/        # Storybook stories for pages
│   ├── HomePage.stories.tsx
│   ├── LoginPage.stories.tsx
│   ├── RegisterPage.stories.tsx
│   └── ExplorePage.stories.tsx
├── contexts/             # React Context providers
│   ├── AuthContext.tsx   # Authentication state
│   ├── SocketContext.tsx # Socket.IO connection
│   └── NotificationContext.tsx
├── services/             # API service layer
│   ├── auth.ts
│   ├── bookings.ts
│   ├── chat.ts
│   ├── chefs.ts
│   ├── favorites.ts
│   ├── notifications.ts
│   ├── payment.ts
│   └── reviews.ts
├── types/                # TypeScript type definitions
│   └── index.ts
└── lib/                  # Utilities
    ├── axios.ts          # Axios instance with interceptors
    └── utils.ts          # Helper functions

```

## Atomic Design Structure

This project follows the Atomic Design methodology:

### Atoms
Basic building blocks that can't be broken down further:
- Button, Input, Avatar, Badge, Card

### Molecules
Groups of atoms functioning together:
- ChefCard, BookingCard, ReviewCard, SearchBar

### Organisms
Complex UI components composed of molecules and/or atoms:
- Navbar, ChefGrid, BookingForm

### Templates & Pages
Page-level components built with organisms, molecules, and atoms.

## Features

- 🔐 **Authentication**: Login, registration with JWT tokens
- 🔍 **Chef Discovery**: Browse and search for chefs
- 📅 **Booking System**: Book chefs for events
- 💬 **Real-time Chat**: Message chefs via Socket.IO
- ⭐ **Reviews & Ratings**: Rate and review chef services
- ❤️ **Favorites**: Save favorite chefs
- 🔔 **Notifications**: Real-time notifications
- 💳 **Payments**: Integrated payment processing
- 📱 **Responsive**: Works on mobile, tablet, and desktop

## Component Development

All components are documented in Storybook with multiple variants and states. To develop a new component:

1. Create the component in the appropriate atomic level folder
2. Create a `.stories.tsx` file for Storybook
3. Export the component from `index.ts`
4. Add it to the main `components/index.ts` for easy importing

Example:
```typescript
// components/atoms/Button/Button.tsx
export const Button = ...

// components/atoms/Button/Button.stories.tsx
export default { title: 'Atoms/Button', ... }

// components/atoms/Button/index.ts
export { Button } from './Button';
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run storybook` - Start Storybook
- `npm run build-storybook` - Build Storybook

## API Integration

All API calls are made through service files in `src/services/`. The Axios instance automatically:
- Adds authentication tokens to requests
- Handles token refresh on 401 errors
- Redirects to login on authentication failure

Example:
```typescript
import { chefsService } from '@/services/chefs';

const chefs = await chefsService.getAllChefs({ limit: 10 });
```

## Contributing

1. Create a new branch for your feature
2. Develop components with Storybook stories
3. Test thoroughly
4. Submit a pull request

## License

MIT
