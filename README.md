# Jua Techical Test


Here's a quick recap of what the goals of this task were.

Your task is to develop a prototype of a web application containing dynamic map viewer, allowing the
user to perform the following:

- Upload GeoJSON files, containing geo-referenced features and their properties.
- Show uploaded features and their properties on a dynamic web map.
- Add new properties and modify existing properties for features shown on the map.
- Save updated features with their properties to GeoJson file.


### Live application

I deployed this app to Vercel, so feel free to visit the below URL and play around
with it.

[jua-techtest.vercel.app](https://jua-techtest.vercel.app)


Here's the [sample geojson](https://raw.githubusercontent.com/johnckealy/jua-techtest/main/components/sample.geojson) that I based the work off of, so that's the best one to use
when testing the app.

I also created a quick screencast to show off the features, while conveniently leaving out
all of the bugs 😊.

https://user-images.githubusercontent.com/43955976/199575969-a56e4ab6-f84b-4608-884a-c34b6c73005d.mp4



### Getting started

This application was written in Next.js, which is a React Framework. I did this to save a little
time in prototyping and deploying. I also used Tailwindcss to help with some basic
styling.

To run the app locally

```
git clone https://github.com/johnckealy/jua-techtest.git
cd jua-techtest
yarn install
yarn dev
```
The app should be available at `localhost:3000`.



### Choices of library

The mapping here is based on leaflet and [react-leaflet](https://react-leaflet.js.org/). I also
found a nice library called [react-leaflet-draw](https://github.com/alex3165/react-leaflet-draw) which took
care of the heavy lifting in the editing of the polygons.


### Structure

From the entry point of the app at `pages/index.js`, I've added some user instructions sections.
When the user uploads a geojson file, a conditional render draws the map based on
the data. To do so, the control enters `components/BaseMap.js`, which is the main
controller.

React-leaflet gives us `MapContainer` and `TileLayer` for the base map, on top of which I've added
`AllFeatures` to render all of the polygons from the data, and also `components/DrawTool.js`
to manipulate the map.

When the user has made some edits, there's a download button to download a geojson file.


### Challenges

I've never actually used react-leaflet before, and it's been years since I played around with
leaflet itself. However, the map and the polygons came togther quite quickly, thanks to
the [leaflet geoJSON](https://leafletjs.com/examples/geojson/) capabilities. `react-leaflet-draw`
was also very quick to get up and running.

However, I hit a wall at that point. The [sample geojson](https://raw.githubusercontent.com/johnckealy/jua-techtest/main/components/sample.geojson) file was pretty darn huge. I needed to find a way to only highlight
one feature at a time so that the user could edit each one individually, otherwise, the
editor would consume way too much memory and everything would be slow and janky (or just plain crash).

For this, I created a state object called `selectedFeature` to be passed into the draw tool. `selectedFeature`
would change its colour as it mounted on top of the other layers, and using it allowed me to restrict the
`DrawTool.js` component to only work with one feature at a time. I could pass the state setters as
props into the component, and then send the updated polygons back to `BaseMap.js`, via the `UpdateGeoJSON`
function. I could then deep copy the original feature set and modify the copy, and afterward reset the state
to reflect the user's changes. Doing this probably isnt the most memory efficient, but having a mutable
json object in the react state was really convenient for loading and downloading the full feature set.
This approach probably took the most time to figure out.

Finally, I should mention that this app is very much geared towards the [sample geojson](https://raw.githubusercontent.com/johnckealy/jua-techtest/main/components/sample.geojson)  data provided. I didn't have
time to generalize it, so although it will work with other datasets, the map will load centered in south
Africa, and so you will need to zoom out and pan to see other datasets. Also, the metadata for new
features will be added according to that geojson file's properties.

And that's it! I hope you enjoyed checking out this mini-application and I look forward to hearing your thoughts!
