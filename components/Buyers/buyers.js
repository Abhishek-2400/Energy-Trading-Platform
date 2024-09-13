"use client";

import React from "react";
import './buyers.css';
import Link from "next/link";

const data = [
    { "seller": 'Gurugram Power Ltd.', "available_energy": '500 kWh', "perkWh": '0.12', "contract_terms": '6 months', "generation_rate": '10 kWh/hour' },
    { "seller": 'Delhi Energy Co.', "available_energy": '300 kWh', "perkWh": '0.15', "contract_terms": '12 months', "generation_rate": '8 kWh/hour' },
    { "seller": 'Mumbai Solar Solutions', "available_energy": '750 kWh', "perkWh": '0.10', "contract_terms": '24 months', "generation_rate": '12 kWh/hour' },
    { "seller": 'Bangalore Power Ltd.', "available_energy": '600 kWh', "perkWh": '0.14', "contract_terms": '3 months', "generation_rate": '9 kWh/hour' },
    { "seller": 'Hyderabad Energy Ltd.', "available_energy": '400 kWh', "perkWh": '0.13', "contract_terms": '18 months', "generation_rate": '11 kWh/hour' },
    { "seller": 'Chennai Green Energy', "available_energy": '550 kWh', "perkWh": '0.16', "contract_terms": '6 months', "generation_rate": '10 kWh/hour' },
    { "seller": 'Pune Solar Inc.', "available_energy": '650 kWh', "perkWh": '0.11', "contract_terms": '12 months', "generation_rate": '13 kWh/hour' },
    { "seller": 'Kolkata Power Solutions', "available_energy": '500 kWh', "perkWh": '0.17', "contract_terms": '24 months', "generation_rate": '8 kWh/hour' },
    { "seller": 'Jaipur Energy Services', "available_energy": '450 kWh', "perkWh": '0.14', "contract_terms": '9 months', "generation_rate": '10 kWh/hour' },
    { "seller": 'Lucknow Solar Energy', "available_energy": '550 kWh', "perkWh": '0.12', "contract_terms": '6 months', "generation_rate": '9 kWh/hour' },
    { "seller": 'Ahmedabad Power Ltd.', "available_energy": '700 kWh', "perkWh": '0.13', "contract_terms": '18 months', "generation_rate": '12 kWh/hour' },
    { "seller": 'Nagpur Solar Co.', "available_energy": '350 kWh', "perkWh": '0.15', "contract_terms": '3 months', "generation_rate": '7 kWh/hour' },
    { "seller": 'Surat Green Energy', "available_energy": '800 kWh', "perkWh": '0.11', "contract_terms": '24 months', "generation_rate": '14 kWh/hour' },
    { "seller": 'Vijayawada Power Ltd.', "available_energy": '600 kWh', "perkWh": '0.16', "contract_terms": '12 months', "generation_rate": '11 kWh/hour' },
    { "seller": 'Indore Energy Co.', "available_energy": '500 kWh', "perkWh": '0.14', "contract_terms": '6 months', "generation_rate": '9 kWh/hour' }
];

export default function Buyers() {
    return (
        <div className="container">
            <table>
                <thead>
                    <tr>
                        <th>S. No.</th>
                        <th>Seller Name</th>
                        <th>Price</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((entry, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{entry.seller}</td>
                            <td>${entry.perkWh}</td>
                            <td><Link href='/details'><button>Details</button></Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}