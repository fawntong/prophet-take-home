# To run locally

- `node server.js` in `/server` (should be running on port 3000)
- `npm start` in `/client` (should be running on port 5000 if on MacOS)

## Notes:

It doesn't matter too much which port the client is running on. However, the client does expect the server to be 
running on port 3000. If the server must run on a different port, update the `proxy` in `/client/package.json` to 
reflect the updated port.

# Technology Used

- React (required)
- Typescript (required)
- Tailwind CSS (required)
- Axios
- Radix UI (expanded on in the "Design Decisions" section)

# Features

This application features a table that displays a list of investigations. 

The table columns include:
- ID
- Title/name of the investigation
- Severity (Low, Medium, High, Critical)
- Source (Okta, AWS, etc.)
- Determination (True positive, False positive, In progress, Closed)
- Analyst assigned to the investigation
- Date fired
- Date last updated
- Whether the investigation is ready for review

The table functionality includes:
- Pagination
- Filtering by ID, severity, determination, or source
- Sorting on any column (but only within the current page, not the entire list of investigations; this is expanded on in the "Trade-offs" and "API Enhancements" sections)

# High Level Overview

The project is rendered within the `InvestigationsPage` component. The component uses the `useFetchInvestigations` hook
(which takes in the desired filters and page number) to call the `/investigations` endpoint. The data returned is 
parsed into the client side `Investigation` type (defined in `investigation-type.ts`). The list of parsed 
`Investigation`s is then sorted by the `useSortInvestigations` hook, and finally then rendered by the 
`InvestigationsTable` component.

# Considerations

## Server vs Client Rendering

For this project, I chose to only use client-side rendering since that is more optimal for dynamic pages.

## Design Decisions

Besides the required technologies, I opted to use the [Radix UI](https://www.radix-ui.com/themes/playground) component
library. Building out basic components like buttons and dropdowns from scratch is quite tedious, especially when taking
concerns like accessibility and keyboard interactions into account, so it made sense to use a component library to handle
all that for me. I opted to go for a styled library rather than a headless one since I wasn't working within the constraints
of a design system, and so that it would save me some time. 

It was a bit arbitrary, but I specifically went with Radix as opposed to other libraries like Preline, Flowbite, 
or NextUI because it has support for all of the components I wanted to use for this project, and because I enjoyed its 
aesthetic the most. Additionally, Radix has [Primitives](https://www.radix-ui.com/primitives) which is a headless version
of their library. Though I haven't delved too deep into it, it should be feasible to migrate the project to use 
Radix Primitives if there was a desire to style the components more specifically to follow a design system.

## Trade-offs

While I believe this project meets minimum functionality, there are some UX improvements that I chose to not implement:
- Sorting throughout the entire list of investigations: Currently, sorting only works within the currently fetched page
of investigations. So if you were on page 1 and chose to sort by date, and there was an investigation on page 2 with 
an earlier date, it wouldn't show up until you got to page 2. However, I think the behavior that most users would expect
is that the entire list of investigations would be sorted, so all the earliest dates would show up on page 1, regardless
of what page they would be on when unsorted. I chose to punt on improving this feature while trying to time-box this project. 
Also, while the sorting improvement could be implemented client side, I think it would make more sense to have the
`/investigations` endpoint handle it server side.
- While I would have liked to explore some of the things mentioned in the "API Enhancements" section, as I think they
would align the UX more with what users would expect, I chose to focus on just the requirements, again in an effort
to time-box this project.


## Challenges

The biggest challenge I faced while working on this project was time. If I was writing production level code for the 
given requirements, I would expect this feature to take me several working days to complete, much more than the six
hours expected for this exercise. I tried to skim down on time as much as I could by focusing solely on the main
requirements, having minimal (i.e. none at this point) unit testing (though this project has been thoroughly manually tested),
and using the help of libraries like Radix where I could. 

## Testing

As of 8/16, unit tests have not been implemented yet. Tests will likely be added in the next few days. 

## API Enhancements

Improvements to the `/investigations` endpoint:
- Include the total number of investigations as part of the response. This number would be rendered as part of the
pagination footer to say "Showing investigations _ to _ of {{totalNumInvestigations}}"
- As mentioned in the "Trade-offs" section, the sorting UX could be improved if sorting was handled server-side
- Allow filtering by multiple values (e.g. allow filtering by "High" and "Critical" severities at the same time)
- I would guess that users would want to see their most recent investigations first by default, so it may make sense to
update the endpoint to return investigations ordered by `alertFiredTimestamp`

Other endpoints to implement:
- `/subscribe_investigation_added` which would be implemented as a stream. This would be used to find out if new investigations
have come in so they can be added to the list. However, assuming that we want to order investigations so that the most 
recent ones are first, we need to consider how this affects the page. If new investigations come in and are always
prepended to the table, this can lead to a jarring experience for the user. I think it would make sense to listen for
new investigations, then render a button prompting the user to refetch/refresh the table that they can click when they want to see the
new investigations. It might also make sense to change the implementation of `/investigations` to use cursor-based 
pagination rather than offset-based so that we don't miss displaying any investigations. 
- `/subscribe_investigation_updated` which would be implemented as a stream. This would be used to find out if any fields
of existing investigations have changed so that we can update the UI in real time.

# Screenshot

![screenshot of project](/ui_screenshot.png)
