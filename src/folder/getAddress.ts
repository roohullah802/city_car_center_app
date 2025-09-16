import { useEffect, useState } from "react"
import { useLocationData } from "./location";
import axios from "axios";

const useGetCurrentLocation = ()=>{
    const [address, setAddress] = useState('');
    const location = useLocationData();
     useEffect(() => {
       async function res() {
         const response = await axios.get(
             `https://nominatim.openstreetmap.org/reverse`,
             {
               params: {
                 lat: location?.coords.latitude,
                 lon: location?.coords.longitude,
                 format: "json",
                 addressdetails: 1,
                 "accept-language": "en"
               },
               headers: {
                 'User-Agent': 'citycarcenter/1.0 (jaanroohullah83@gmail.com)',
               },
             }
           );
         setAddress(response.data.display_name)
       }
       res();
     }, [location]);
    

    return address
}

export {useGetCurrentLocation}