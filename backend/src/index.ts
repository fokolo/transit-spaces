import {Client, TravelMode} from "@googlemaps/google-maps-services-js";
import 'dotenv/config'

const client = new Client({});
const API_KEY = process.env.GOOGLE_MAPS_API_KEY ?? ""


if (API_KEY.length == 0) process.exit(-1);

const ISRAEL_WORK_ARRIVAL_TIME = new Date("2022-09-11T06:00:00.000Z"); // Normal Sunday at 9AM Israel Time
const ISRAEL_SUBSET_CITIES_LIST = [
    "Qiryat Shemona",
    "Tiberias",
    "Haifa",
    "Netanya",
    "Tel Aviv",
    "Rishon Le'Zion",
    "Jerusalem",
    "Ashkelon",
    "Beer Sheva",
    "Mitzpe Ramon",
];

async function getLocationFromName(name: string) {
    const res = await client.geocode({
        params: {
            address: name,
            key: API_KEY
        }
    });

    return {[name]: res.data.results[0].geometry.location};
}

(async () => {
    // const citiesWithLocation = await Promise.all(ISRAEL_SUBSET_CITIES_LIST.map((city) => (getLocationFromName(city))))
    //
    // console.log(citiesWithLocation)

    const res = await client.distancematrix({
        params: {
            origins: ISRAEL_SUBSET_CITIES_LIST,
            destinations: ISRAEL_SUBSET_CITIES_LIST,
            mode: TravelMode.transit,
            arrival_time: ISRAEL_WORK_ARRIVAL_TIME,
            key: API_KEY
        }
    })

    console.log(JSON.stringify(res.data.rows, null, 2))

})().then(() => console.log("Done"));

// var service = new google.maps.DistanceMatrixService();
// service.getDistanceMatrix(
//     {
//         origins: [origin1, origin2],
//         destinations: [destinationA, destinationB],
//         travelMode: 'DRIVING',
//         transitOptions: TransitOptions,
//         drivingOptions: DrivingOptions,
//         unitSystem: UnitSystem,
//         avoidHighways: Boolean,
//         avoidTolls: Boolean,
//     }, callback);
//
// function callback(response, status) {
//     // See Parsing the Results for
//     // the basics of a callback function.
// }
