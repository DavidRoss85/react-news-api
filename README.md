# Welcome to the Client for the News Feed web app

## Notes:
1. **Include an src/app/config.js with the URL and TTL variables**
 - CACHE_TTL
 - SERVER_URL

2. **CACHE_TTL controls how long cached results will remain valid in local storage (Number: milliseconds)**

3. **SERVER_URL points to the Server app**

## Welcome to the app

This is a front-end application that is paired with the "news-server" project. This was made as part of a portfolio made while in Nucamp coding bootcamp. Please feel free to analyze and comment.

**Some details:**

**Using the app:**

On Startup, users will be greeted with the main page, which will offer a default view and a set of news suggestions. The images and news are all provided by the news API, and in some cases with the pictures unavailable, the website will insert a random AI-generated image in its place.
These suggestions are not region locked, so they will respond to changes in the region drop-down box.
In addition, users will have the option to type in a custom search term or use one of the pre-populated search recommendations below.
Once a search is performed, users will be directed to the search page where they may view their results. When a user clicks the user icon dropdown at the top right corner of the navigation bar, they will have the option to log in, which will allow them to utilize a completely customized view for their homepage. The user clicks sign in, is prompted to log in using their credentials, and once successful will be presented with their customized view.
At any time, users can access their options by clicking the options icon from the user dropdown menu and clicking the edit home screen settings.
From here, users can add, delete, or move frozen columns. Change the title or appearance of each block and customize what news is fed to each block. Once saved, the changes will be reflected on their home page.

**Code:**

The front end was built using the React framework, utilizing Redux, react Strap, React Router and React Spring for global state management, layout, navigation, and animation respectively.

The Redux store is where everything begins. Any changes to information in the store can trigger subsequent updates in the app.
It has four different reducers and their accompanying slices, news settings, user, and cache. On startup, the app component renders the main components, header, footer, NAV menu, and routes nested components representing the different page views. Each one of the page components is built with their respective feature components and these with components of their own. The home page, which is the first view will load the settings from the Redux store and using those settings we'll use our map function to layout the News Tile components, which acts as a container for the feed.
The  News Tile uses the settings to figure out what type of components to load inside of it, and passes some of the attributes to the feature components. Now the feature components themselves take these parameters such as ID and use that to access the Redux Store news data specific to that component and display it to the user. Here we can see this articles palette feature using the ID prop to update a specific array item in a new slice via the Fetch breaking news function.

This dispatch function is actually an asynchronous Thunk that will receive the search criteria from the news feature and perform the server request for information.
Once the request is fulfilled, the news data is received in the form of a JSON object where it is then parsed and stored in the Redux store, which will trigger the news feature to update displaying the news. The user's custom preferences are loaded when they log in. The dropdown menu for logging in has a ternary statement that displays a different menu depending on the login status. When the user submits their information, it dispatches the attemptLogin Thunk which accesses the login endpoint.

Once it receives validation back from the server, another dispatch is made to the fetch user settings Thunk, which will try to access the user endpoint for settings. These get returned and updated in the settings slice. This will then trigger a refresh of the affected components. 

**Challenges:**
An interesting challenge to overcome was the news API's limitation on requests. Attempting too many requests within a short time resulted in a 24 hour ban on requests for a specific API key. To get around this, I needed a way to cache the data so that too many requests weren't being sent to the server every time a component updated. I decided that the client's local storage was a good way to go and gave the user the ability to clear the cache and options.


### Check out [My Portfolio Page](https://davidross-web-portfolio.web.app).