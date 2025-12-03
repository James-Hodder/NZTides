# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

NZTides is an Expo React Native application for displaying tide predictions for New Zealand coastal locations. The app fetches tide data from LINZ (Land Information New Zealand) and stores it locally using AsyncStorage for offline access.

## Architecture

### App Structure
- **Expo Router**: File-based routing system where routes are defined by file structure in `tide-app/app/`
- **Navigation Flow**: Home screen lists locations → User taps location → Dynamic route `/location/[location]` displays tide data
- **Data Layer**: AsyncStorage for local persistence, axios for external API calls

### Key Directories
- `tide-app/app/` - Main application code
  - `app/location/[location].tsx` - Dynamic route for location-specific tide displays
  - `app/screens/` - Screen components (HomeScreen, LocationScreen - note: LocationScreen.tsx appears unused as routing uses `location/[location].tsx` instead)
  - `app/services/` - Data fetching and storage logic
    - `db.ts` - AsyncStorage wrapper for CRUD operations on tide predictions
    - `linzService.ts` - Fetches tide data from LINZ API
    - `tideParser.ts` - Parses CSV tide data from LINZ
  - `app/components/` - Reusable UI components (currently empty)
  - `app/types/` - TypeScript type definitions (currently empty)

### Data Flow
1. `HomeScreen` initializes AsyncStorage database
2. User selects location → navigates to `/location/[location]`
3. `[location].tsx` calls `fetchAndStoreTides()` which fetches from LINZ API
4. Parsed tide data stored via `addTidePrediction()` in AsyncStorage
5. `getTidesByLocation()` retrieves and displays cached data

### Known Issues
- `insertTideData()` in `db.ts` is a stub (not implemented)
- `linzService.ts` calls `insertTideData()` but should call `addTidePrediction()` instead
- Duplicate LocationScreen implementations exist (`screens/LocationScreen.tsx` vs `location/[location].tsx`)

## Development Commands

### Installation
```bash
cd tide-app
npm install
```

### Running the App
```bash
# Start development server
npm start
# or
npx expo start

# Run on specific platform
npm run ios        # iOS simulator
npm run android    # Android emulator
npm run web        # Web browser
```

### Code Quality
```bash
# Linting
npm run lint

# TypeScript checking
npx tsc --noEmit
```

## Platform Configuration

### iOS
- Bundle ID: `com.james-hodder.tideapp`
- Supports tablets
- New Architecture enabled

### Android
- Package: `com.james_hodder.tideapp`
- Adaptive icon configured with custom foreground/background/monochrome images
- Edge-to-edge enabled

## TypeScript Configuration
- Strict mode enabled
- Path alias: `@/*` maps to project root
- Expo base config extended

## Key Technologies
- **React 19.1.0** with React Native 0.81.5
- **Expo SDK ~54.0** with Expo Router for file-based routing
- **AsyncStorage** for local data persistence (SQLite alternative)
- **Axios** for HTTP requests to LINZ API
- **TypeScript** with strict type checking
