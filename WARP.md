# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

PrizePicks MCP is a React Native Expo app for sports betting and fantasy picks, built with PrizePicks-inspired UI/UX. The app features a custom dark theme with PrizePicks green (#00D4AA) accents and uses Tamagui for styling.

## Development Commands

### Core Development
```bash
# Start development server with platform selection menu
npm start
# or
expo start

# Start on specific platforms
npm run ios          # iOS simulator
npm run android      # Android emulator
npm run web          # Web browser

# Linting
npm run lint
```

### Project Management
```bash
# Reset project to blank state (moves starter code to app-example/)
npm run reset-project
```

## Architecture & Structure

### App Structure
- **File-based routing** via Expo Router with experimental typed routes enabled
- **Tab-based navigation** with main app content in `app/(tabs)/`
- **Modal presentations** for secondary screens
- **Custom theming** via Tamagui with PrizePicks brand colors

### Key Directories
- `app/` - Main application screens using file-based routing
  - `(tabs)/` - Tab bar screens (Home, Explore/Leaderboard)
  - Main screens: `chat.tsx`, `text-to-bet.tsx`, `picks.tsx`, `modal.tsx`
- `components/` - Reusable components including UI primitives
- `constants/` - Theme definitions and app constants
- `hooks/` - Custom React hooks for color scheme and theming
- `assets/images/` - App icons, logos, and static images

### Styling Architecture
- **Tamagui** as the primary styling system with custom config
- **Custom PrizePicks theme** defined in `tamagui.config.ts`
- **Styled components pattern** using Tamagui's styled function
- **Dark-first design** with PrizePicks brand colors:
  - Background: `#000000` / `#0A0A0A` / `#1A1A1A`
  - Accent: `#00D4AA` (PrizePicks green)
  - Secondary: `#8B5CF6` (purple accent)
  - Text: `#FFFFFF` / `#CCCCCC`
  - Borders: `#333333`

### Navigation Structure
- Root layout with Stack navigator
- Tab layout for main screens (Home, Explore)
- Modal presentations for secondary flows
- Custom haptic feedback on tab interactions

### Key Features
- **Home Screen**: PrizePicks-style dashboard with games, picks, and onboarding
- **Chat System**: Community chat with mock API integration
- **Text-to-Bet**: AI-powered betting suggestions (mocked Cedar OS integration)
- **Picks Interface**: Sports betting interface
- **Custom Components**: Haptic tabs, themed views, parallax scrolls

### Configuration Files
- `app.json` - Expo configuration with new architecture enabled
- `tamagui.config.ts` - Custom theme configuration
- `tsconfig.json` - TypeScript with path aliases (`@/*`)
- `eslint.config.js` - ESLint with Expo preset

### Dependencies
- **Expo SDK 54** with new architecture enabled
- **React Native 0.81.4** with React 19.1.0
- **Tamagui** for styling system
- **Expo Router** for file-based navigation
- **React Navigation** for tab and stack navigation
- **React Native Reanimated** for animations
- **Expo Symbols** for SF Symbols on iOS

## Development Guidelines

### Styling Patterns
- Use Tamagui styled components over inline styles
- Follow PrizePicks color palette consistently
- Implement proper safe area handling with `useSafeAreaInsets`
- Use custom theme variables from Tamagui config

### Component Patterns
- Create styled components using Tamagui's styled function
- Implement consistent card-based layouts with rounded corners
- Use proper TypeScript types for component props
- Follow React Native performance best practices

### API Integration
- Mock API endpoints are currently hardcoded (e.g., chat API at `10.90.204.59:3001`)
- Text-to-bet feature includes mock Cedar OS integration
- Prepare for real API integration by maintaining consistent data structures

### Platform Considerations
- App supports iOS, Android, and Web platforms
- Uses platform-specific fonts and styling where appropriate
- Implements proper platform-specific icon handling

### State Management
- Uses React hooks for local state management
- No global state management library currently implemented
- Consider adding Redux Toolkit or Zustand for complex state needs

## Testing & Quality

### Current Setup
- ESLint configured with Expo preset
- TypeScript strict mode enabled
- No test framework currently configured

### Recommended Additions
- Jest and React Native Testing Library for unit tests
- Detox for E2E testing
- Prettier for code formatting consistency
