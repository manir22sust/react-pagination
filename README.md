### React Pagination Component

This React component provides a straightforward implementation of pagination for fetching and displaying data from an API. Here's a breakdown of its functionality:

#### State Management:

The component uses the useState hook to manage various state variables:

- **posts**: Stores the fetched data.
- **totalPosts**: Keeps track of the total number of available posts.
- **isLoading** and **error**: Manage loading and error states respectively.
- **visible**: Represents the number of results to display per page.
- **page**: Tracks the current page number.
- **pages**: Calculates the total number of pages based on the total posts and visible results per page.

#### Event Handlers:

- **handleResultsPerPage**: Updates the number of visible results per page and resets the current page to the first page.
- **getPrevPage** and **getNextPage**: Allow users to navigate to the previous and next pages respectively. These functions ensure that the page number loops back to the first or last page when reaching the boundaries.

#### Fetching Data:

- **fetchTotalPosts**: Fetches the total number of posts from the API and calculates the total number of pages based on the selected number of visible results per page.
- **fetchPosts**: Fetches the posts for the current page from the API. It aborts the fetch request if the component unmounts before the request completes.

#### Effects:

The useEffect hook is used to fetch the total number of posts whenever the number of visible results per page changes.

Another useEffect hook fetches the posts for the current page whenever the page number or number of visible results per page changes. It also handles cleanup by aborting ongoing fetch requests when the component unmounts.

#### Rendering:

- Renders pagination controls including previous and next buttons, current page number, and total pages.
- Provides a dropdown menu for users to select the number of results to display per page.
- Renders loading and error messages while fetching data.
- Renders each fetched post with its ID, title, and body.

Overall, this component offers a user-friendly pagination feature for handling large datasets efficiently in a React application.
