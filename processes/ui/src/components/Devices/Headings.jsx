import React from 'react'

const Headings = () => {

    const headings = [
        'Id',
        'Device Name',
        'Device Type',
        'Healthy?',
        'Added on'
    ]

    return (
        headings.map((header, i) => (
            <th className="text-center" key={i}>{header}</th>
        ))
    )
}

export default Headings
