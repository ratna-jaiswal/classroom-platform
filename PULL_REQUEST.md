# Pull Request Template

## Description

Fixed the doubts page functionality where new doubts were not showing up in the list after being submitted. The issue was that the doubts were hardcoded static data and the submit function only logged to console without persisting or updating the UI.

**Changes made:**
- Created a Doubt interface/model for type safety
- Implemented localStorage-based persistence for doubts
- Added API endpoints (`/api/doubts`) for creating and fetching doubts
- Updated the doubts page to use dynamic state management
- Added proper form validation and loading states
- Implemented real-time UI updates when new doubts are added
- Added toast notifications for user feedback
- Made stats dynamic based on actual doubts data

Fixes # (doubts not appearing after submission)

## Type of change

- [x] Bug fix (non-breaking change which fixes an issue)
- [x] New feature (non-breaking change which adds functionality)
- [x] Backend implementation (database models, API endpoints, etc.)

## How Has This Been Tested?

- [x] Tested adding new doubts through the "Ask Question" form
- [x] Verified doubts appear immediately in the list after submission
- [x] Tested form validation for required fields
- [x] Verified loading states and toast notifications work correctly
- [x] Tested dynamic stats updates when doubts are added

**Test Configuration:**
- Browser: Chrome/Edge
- Environment: Local development server (npm run dev)
- Device: Desktop

## Checklist:

- [x] My code follows the style guidelines of this project
- [x] I have performed a self-review of my code
- [x] I have commented my code, particularly in hard-to-understand areas
- [x] My changes generate no new warnings
- [x] New and existing functionality works as expected locally

## Screenshots (if applicable):

The doubts page now properly displays newly added questions in real-time with:
- Dynamic question list that updates immediately
- Proper loading states during submission
- Toast notifications for success/error feedback
- Updated statistics reflecting actual data

## GSSoC 2025 Points Claim:
- [x] Level 2 (Medium) - 25 points

**Justification:** This involved fixing a core functionality bug, implementing API endpoints, adding proper state management, and improving user experience with real-time updates and feedback mechanisms.