# Jua Techical Test


Here's a quick recap of what the goals of this task were.

Your task is to develop a prototype of a web application containing dynamic map viewer, allowing the
user to perform the following:

● Upload GeoJSON files, containing geo-referenced features and their properties.
● Show uploaded features and their properties on a dynamic web map.
● Add new properties and modify existing properties for features shown on the map.
● Save updated features with their properties to GeoJson file.



### Live application

I deployed this app to Vercel, so feel free to visit the below URL and play around
with it.

[jua-techtest.vercel.app](https://jua-techtest.vercel.app)


I also created a quick screencast to show off the features, while conveniently leaving out
all of the bugs 😊.

https://user-images.githubusercontent.com/43955976/199575969-a56e4ab6-f84b-4608-884a-c34b6c73005d.mp4



### Getting started

This application was written in Next.js, which is a React Framework. I did this to save a little
time in prototyping and deploying. I also used Tailwindcss to help cut out some of the hassle of
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

The mapping here is based on leaflet and [react-leaflet](https://react-leaflet.js.org/)
