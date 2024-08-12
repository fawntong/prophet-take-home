# To run locally
`node server/server.js` (should be running on port 3000)
`npm start` in `/client`

# Task Overview:
Develop a single-page web application (SPA) that displays a list of ongoing security investigations.
Key Features:
- Dynamic Display: Implement a user-friendly interface for displaying the investigations, which
should be easy to navigate and understand. Include fields provided by the backend server.
- Sorting and Filtering: Allow users to sort and filter the list of investigations based on various
parameters (e.g., date, status, severity).
- API Integration: Use the provided backend server, which exposes a paginated
/investigations endpoint, to fetch investigation data.
- Look and Feel: Be creative and show your design skills.

# Technical Requirements:
- Language: Use TypeScript
- Framework: Build the application using React
- Styling: Use Tailwind CSS for styling to ensure a responsive and aesthetically pleasing design.

# Additional Considerations:
- Server & Client Rendering: Explain your rationale as to how you chose to implement where to
render HTML for the various requirements.
- Documentation: Provide clear and concise documentation for your project. This should
include:
  - Design Decisions: Explain the rationale behind your architectural and design choices.
  - Trade-offs: Discuss any trade-offs you made during development and the reasons
behind them.
  - Challenges: Describe any challenges you encountered and how you addressed them.
- Brownie Points: These are not required, but you can score some brownie points by:
  - Testing: Implement tests to cover critical functionalities of the application. Explain your
choice of testing tools and strategies, and produce test coverage numbers.

  - Proposing API enhancements to the /investigations endpoint (or other
endpoints that don’t yet exist)

# Data

type Investigation {
  id: string,
  title: string,
  source: string, (['AWS', 'Azure', 'Crowdstrike', 'SentinelOne', 'Okta'])
  alertFiredTimestamp: string,
  lastUpdatedTimestamp: string,
  severity: string, (['Low', 'Medium', 'High', 'Critical']),
  analystAssigned: string,
  determination: string, (['True positive', 'False positive', 'In progress', 'Closed']),
  readyForReview: string (['Yes', 'No'])
}

# notes

some edge cases that should be handled by server:
- duplicate ids
- pagination
- total investigations