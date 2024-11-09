// "use client";
// import React from "react";
// import './page.css';
// import MapComponent from "../../../components/Maps/maps";
// import Navbar from "../../../components/Navbar/Navbar";
// import { useRouter, useSearchParams } from 'next/navigation';

// export default function Marketplace() {
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const id = searchParams.get('id');
//     const sellername = searchParams.get('sellername');
//     const selleremail = searchParams.get('selleremail');
//     const priceperunit = searchParams.get('priceperunit');
//     const locations = searchParams.get('locations');
//     const tokens = searchParams.get('tokens');

//     const handleTransferOwnership = () => {
//         const query = new URLSearchParams({
//             id: id || "",
//             sellername: sellername || "",
//             selleremail: selleremail || "",
//             priceperunit: priceperunit || "",
//             locations: locations || "",
//             tokens: tokens || ""
//         }).toString();

//         router.push(`/payment?${query}`);
//     };

//     return (
//         <>
//             <Navbar />
//             <div className="details">
//                 <h2>Detailed view of Harman Energy trading</h2>
//                 <MapComponent />
//                 <div className="seller-info">
//                     <p>Name of seller <span>: {sellername}</span></p>
//                     <p>Price per unit <span>: ${priceperunit}</span></p>
//                     <p>Available tokens/units <span>: {tokens}</span></p>
//                     <p>Location <span>: {locations}</span></p>
//                     <button onClick={handleTransferOwnership}>Transfer Ownership</button>
//                 </div>
//             </div>
//         </>
//     );
// }


"use client";
import React, { useEffect, useState } from "react";
import './page.css';
import MapComponent from "../../../components/Maps/maps";
import Navbar from "../../../components/Navbar/Navbar";
import { useRouter, useSearchParams } from 'next/navigation';

export default function Marketplace() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // State to hold search params after they are loaded
    const [params, setParams] = useState({
        id: '',
        sellername: '',
        selleremail: '',
        priceperunit: '',
        locations: '',
        tokens: ''
    });

    useEffect(() => {
        // Only update when searchParams is available (client-side)
        setParams({
            id: searchParams.get('id') || "",
            sellername: searchParams.get('sellername') || "",
            selleremail: searchParams.get('selleremail') || "",
            priceperunit: searchParams.get('priceperunit') || "",
            locations: searchParams.get('locations') || "",
            tokens: searchParams.get('tokens') || ""
        });
    }, [searchParams]);

    const handleTransferOwnership = () => {
        const query = new URLSearchParams(params).toString();
        router.push(`/payment?${query}`);
    };

    return (
        <>
            <Navbar />
            <div className="details">
                <h2>Detailed view of Harman Energy trading</h2>
                <MapComponent />
                <div className="seller-info">
                    <p>Name of seller <span>: {params.sellername}</span></p>
                    <p>Price per unit <span>: ${params.priceperunit}</span></p>
                    <p>Available tokens/units <span>: {params.tokens}</span></p>
                    <p>Location <span>: {params.locations}</span></p>
                    <button onClick={handleTransferOwnership}>Transfer Ownership</button>
                </div>
            </div>
        </>
    );
}
