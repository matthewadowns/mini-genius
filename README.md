This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app), which uses [`RapidAPI`](https://rapidapi.com) to query [`Genius`](https://genius.com).

## Development

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

### Run Jest Unit Tests

Uses (`jest`)[https://jestjs.io/docs] and (`@testing-library/react`)[https://testing-library.com/docs/react-testing-library/intro/] to unit test React components.

```bash
npm run test
```

## Project Overview

1. Added a service (`queryGenius`) that uses (`axios`)[https://axios-http.com/docs/intro] for HTTP requests.
  - Only makes `GET` requests when user input is not empty
3. Added a custom React hook (`useGenius`) for using `queryGenius` in React components
  - A resusable hook that returns an object with `error`, `isLoading` and `results` to components
5. Created 3 components:
  - `SearchGenius` 
    - Provides user input and leverages `useGenius` to make requests. 
    - Includes debounce so requests are only made every 2s while user is typing.
    - Includes user-centric unit tests
  - `ResultsList`
    - Renders message when no results are returned
    - Renders a `ResultItem` for each result returned
    - Indicates number of results shown, including when maximum (10) is reached 
  - `ResultItem`
    - Displays details of each search result for the user query

## UI

![image](https://user-images.githubusercontent.com/1906670/169914632-64b3728b-cb46-483a-8133-798b89700794.png)

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
