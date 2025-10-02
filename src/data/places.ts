export type Place = {
    name: string;
    coords: [number, number]; // [lat, lng]
    img: string; // path in /public/images
    desc: string;
};

export const places: Place[] = [
    {
        name: "Amsterdam",
        coords: [52.3676, 4.9041],
        img: "/images/amsterdam.jpg",
        desc: "Charming canals, bikes everywhere, and a mix of historic and modern vibes."
    },
    {
        name: "Atlanta",
        coords: [33.7490, -84.3880],
        img: "/images/atlanta.jpg",
        desc: "Home base — southern hospitality, music, and plenty of tech energy."
    },
    {
        name: "Chicago",
        coords: [41.8781, -87.6298],
        img: "/images/chicago.jpg",
        desc: "Skylines on Lake Michigan, deep-dish pizza, and windy city adventures."
    },
    {
        name: "Cologne",
        coords: [50.9375, 6.9603],
        img: "/images/cologne.jpg",
        desc: "A beautiful German city with gothic architecture and riverside views."
    },
    {
        name: "Guangzhou",
        coords: [23.1291, 113.2644],
        img: "/images/guangzhou.jpg",
        desc: "Bustling streets, Cantonese food heaven, and Pearl River nights."
    },
    {
        name: "Kyoto",
        coords: [35.0116, 135.7681],
        img: "/images/kyoto.jpg",
        desc: "Temples, gardens, tea houses, and timeless Japanese culture."
    },
    {
        name: "Milwaukee",
        coords: [43.0389, -87.9065],
        img: "/images/milwaukee.jpg",
        desc: "Lakefront views, breweries, and a great midwestern energy."
    },
    {
        name: "New York City",
        coords: [40.7128, -74.0060],
        img: "/images/newyork.jpg",
        desc: "The city that never sleeps — skyscrapers, culture, and hustle."
    },
    {
        name: "Portland",
        coords: [45.5051, -122.6750],
        img: "/images/portland.jpg",
        desc: "Coffee, forests, indie vibes, and a love for the outdoors."
    },
    {
        name: "San Diego",
        coords: [32.7157, -117.1611],
        img: "/images/sandiego.jpg",
        desc: "Sunshine, surf spots, and laid-back California living."
    },
    {
        name: "Seaside",
        coords: [30.3190, -86.1375], 
        img: "/images/seaside.jpg",
        desc: "Seaside, Florida — pastel beach houses, emerald waters, and Gulf Coast charm."
    },

    {
        name: "Tokyo",
        coords: [35.6762, 139.6503],
        img: "/images/tokyo.jpg",
        desc: "Neon lights, ancient shrines, bullet trains, and endless energy."
    },
    {
  name: "Gatlinburg",
  coords: [35.7143, -83.5102], // Tennessee, Smoky Mountains
  img: "/images/gatlinburg.jpg",
  desc: "Gateway to the Smoky Mountains — cozy cabins, mountain views, and outdoor adventures."
},
{
  name: "Asheville",
  coords: [35.5951, -82.5515], // North Carolina
  img: "/images/asheville.jpg",
  desc: "Eclectic mountain city — breweries, art scene, and the Blue Ridge Parkway."
},
{
  name: "Athens",
  coords: [33.9519, -83.3576], // Georgia
  img: "/images/athens.jpg",
  desc: "College town home of UGA — live music, southern charm, and football Saturdays."
},
{
  name: "Mexico City",
  coords: [19.4326, -99.1332], // CDMX
  img: "/images/mexicocity.jpg",
  desc: "Vibrant capital of Mexico — history, street food, museums, and endless energy."
},
{
  name: "Minneapolis",
  coords: [44.9778, -93.2650], // Minneapolis (as state reference point)
  img: "/images/minnesota.jpg",
  desc: "Land of 10,000 lakes — friendly people, cold winters, and summer at the lake."
}

];
