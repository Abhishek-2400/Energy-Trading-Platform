import React, { useState, useEffect } from "react";
import './buyers.css';
import Link from "next/link";
import axios from "axios";

export default function Buyers() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/products/getallproducts', {
                    headers: {
                        'Cache-Control': 'no-cache, no-store, must-revalidate',
                        'Pragma': 'no-cache',
                        'Expires': '0'
                    }
                });
                if (!response || !response.data || !response.data.data) {
                    console.log('Error fetching data');
                } else {
                    console.log('Data fetched successfully', response.data.data);
                    setData(response.data.data);
                }
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="container">
            <table>
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Seller Name</th>
                        <th>Price</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((entry, index) =>
                        entry.tokens > 0 ? (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{entry.sellername}</td>
                                <td>${entry.priceperunit}</td>
                                <td>
                                    <Link
                                        href={{
                                            pathname: '/details',
                                            query: {
                                                id: entry.id,
                                                sellername: entry.sellername,
                                                selleremail: entry.selleremail,
                                                priceperunit: entry.priceperunit,
                                                locations: entry.locations,
                                                tokens: entry.tokens,
                                            }
                                        }}
                                    >
                                        <button>Details</button>
                                    </Link>
                                </td>
                            </tr>
                        ) : null
                    )}
                </tbody>
            </table>
        </div>
    );
}
