import React from 'react'
import axios from 'axios'
import { Bar } from 'react-chartjs-2'

export default function BarCharts(props) {
    var labeluri = []
    var valori = []
    props.etichete.map(d => labeluri.push(d))
    props.numere.map(d => valori.push(d))
    const data = {
        labels: labeluri,
        datasets: [{
            label: 'Recent traffic',
            data: valori
        }]
    }

    return (
        <Bar data={data} options={{ maintainAspectRatio: false }} />
    )
}