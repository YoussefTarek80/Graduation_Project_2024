<template>
    <div>
        <canvas id="lineChart" height="400px" width="100px" ></canvas>
    </div>
</template>
<script>
import Chart from 'chart.js/auto';
export default {
    mounted() {
        this.renderChart();
    },
    methods: {
        renderChart() {
            const ctx = document.getElementById("lineChart").getContext("2d");
            new Chart(ctx, {
                type: "line",
                data: {
                    labels: [
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                    ],
                    datasets: [
                        {
                            label: "عدد الشكاوي في الشهر",
                            data: [65, 59, 80, 81, 56, 55, 40], 
                            borderColor: "rgba(92,44,126)",
                            borderWidth: 2,
                            fill: true,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                },
                            },
                        ],
                    },
                },
            });
        },
    },
};
</script>