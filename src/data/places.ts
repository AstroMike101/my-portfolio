export type Place = {
    name: string;
    coords: [number, number]; // [lat, lng]
    img: string; // path in /public/images
    desc: string;
};

export const places: Place[] = [
    {
        name: "Amsterdam, Netherlands",
        coords: [52.3676, 4.9041],
        img: "/images/amsterdam.jpg",
        desc: "Charming canals, bikes everywhere, and a mix of historic and modern vibes."
    },
    {
        name: "Atlanta, GA",
        coords: [33.7490, -84.3880],
        img: "/images/atlanta.jpg",
        desc: "Home base — southern hospitality, music, and vibrant culture."
    },
    {
        name: "Chicago, IL",
        coords: [41.8781, -87.6298],
        img: "/images/chicago.jpg",
        desc: "Skylines on Lake Michigan, deep-dish pizza, and windy city adventures."
    },
    {
        name: "Cologne, Germany",
        coords: [50.9375, 6.9603],
        img: "/images/cologne.jpg",
        desc: "A beautiful German city with gothic architecture and riverside views."
    },
    {
        name: "Guangzhou, China",
        coords: [23.1291, 113.2644],
        img: "/images/guangzhou.jpg",
        desc: "Bustling streets, Cantonese food heaven, and Pearl River nights."
    },
    {
        name: "Kyoto, Japan",
        coords: [35.0116, 135.7681],
        img: "/images/kyoto.jpg",
        desc: "Temples, gardens, tea houses, and timeless Japanese culture."
    },
    {
        name: "Milwaukee, WI",
        coords: [43.0389, -87.9065],
        img: "/images/milwaukee.jpg",
        desc: "Lakefront views, breweries, and a great midwestern energy."
    },
    {
        name: "New York City, NY",
        coords: [40.7128, -74.0060],
        img: "/images/newyork.jpg",
        desc: "The city that never sleeps - skyscrapers, culture, and hustle."
    },
    {
        name: "Portland, OR",
        coords: [45.5051, -122.6750],
        img: "/images/portland.jpg",
        desc: "Coffee, forests, indie vibes, and a love for the outdoors. This was also where I was born!"
    },
    {
        name: "San Diego, CA",
        coords: [32.7157, -117.1611],
        img: "/images/sandiego.jpg",
        desc: "Sunshine, surf spots, and laid-back California living."
    },
    {
        name: "Seaside, FL",
        coords: [30.3190, -86.1375],
        img: "/images/seaside.jpg",
        desc: "Seaside, Florida — pastel beach houses, emerald waters, and Gulf Coast charm."
    },
    {
        name: "Tokyo, Japan",
        coords: [35.6762, 139.6503],
        img: "/images/tokyo.jpg",
        desc: "Neon lights, ancient shrines, bullet trains, and endless energy."
    },
    {
        name: "Gatlinburg, TN",
        coords: [35.7143, -83.5102],
        img: "/images/gatlinburg.jpg",
        desc: "Gateway to the Smoky Mountains - cozy cabins, mountain views, and outdoor adventures."
    },
    {
        name: "Asheville, NC",
        coords: [35.5951, -82.5515],
        img: "/images/asheville.jpg",
        desc: "Eclectic mountain city - breweries, art scene, and the Blue Ridge Parkway."
    },
    {
        name: "Athens, GA",
        coords: [33.9519, -83.3576],
        img: "/images/athens.jpg",
        desc: "A spirited college town with live music, good food, and endless Bulldog pride. My alma mater - Go Dawgs!"
    },
    {
        name: "Las Vegas, NV",
        coords: [36.1699, -115.1398],
        img: "/images/lasvegas.jpg",
        desc: "Bright lights, desert nights, and endless entertainment in the city that never stops."
    },
    {
        name: "Vancouver, Canada",
        coords: [49.2827, -123.1207],
        img: "/images/vancouver.jpg",
        desc: "A stunning west coast city surrounded by mountains and ocean - vibrant, diverse, and full of natural beauty."
    },
    {
        name: "Mexico City, Mexico",
        coords: [19.4326, -99.1332],
        img: "/images/mexicocity.jpg",
        desc: "Vibrant capital of Mexico — history, street food, museums, and endless energy."
    },
    {
        name: "Minneapolis, MN",
        coords: [44.9778, -93.2650],
        img: "/images/minnesota.jpg",
        desc: "Land of 10,000 lakes — friendly people, cold winters, and summer at the lake."
    }
];
