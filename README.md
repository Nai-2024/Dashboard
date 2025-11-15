
## **Travel Admin Dashboard**

A React-based administration dashboard for managing travel data including cities, places, notifications, and visualizing world locations using a map.
This dashboard is designed for internal admin use and provides a clean UI, CRUD operations, and real-time activity tracking.

**Features**

* Admin Authentication
* Basic Auth (username & password)
* Local validation + backend verification
* Session stored via localStorage

**Dashboard Overview**
* Total Cities
* Total Places
* Total Categories
* Total Users
* Recent Activity Log
* World Map Visualization (Leaflet)

**Cities Management**
* Add City
* Delete City
* Upload City Images
* Desktop, Tablet, and Mobile UI views

**Places Management**
* Add Place
* Update Place
* Delete Place
* Upload profile & gallery images (S3)
* View details in modal

**Notifications Management**
* Create notifications
* Delete notifications
* Stored using backend /api/titles
* Clean UI with table listing

**World Map Integration**
* Interactive Leaflet map
* Lock zoom.
* Shows cities on the global map

**Fully Responsive**
* Built with TailwindCSS to support:
* Desktop
* Tablet
* Mobile

**Project Structure**
src/
 ├── components/
 │   ├── Dashboard/
 │   │   ├── Dashboard.jsx
 │   │   └── DashboardOverview.jsx
 │   ├── Cities/
 │   │   ├── CitiesList.jsx
 │   │   └── AddCityForm.jsx
 │   ├── Places/
 │   │   ├── PlacesList.jsx
 │   │   └── AddPlaceForm.jsx
 │   ├── Notifications/
 │   │   ├── NotificationsList.jsx
 │   │   └── AddNotificationForm.jsx
 │   └── map/
 │       └── WorldMapLeaflet.jsx
 │
 ├── services/
 │   └── api/
 │       ├── citiesService.js
 │       ├── placesService.js
 │       ├── notificationsService.js
 │       └── userService.js
 │
 ├── config.js
 └── App.js

