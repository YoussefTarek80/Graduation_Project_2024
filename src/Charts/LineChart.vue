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
                        "يناير",
                        "فبراير",
                        "مارس",
                        "ابريل",
                        "مايو",
                        "يوينو",
                        "يوليو",
                        "اغسطس",
                        "سبتمبر" ,
                        "اكتوبر" ,
                        "نوفمبر" ,
                        "ديسمبر" ,

                    ],
                    datasets: [
                        {
                            label: "عدد الطلبات في الشهر",
                            data: [65, 59, 80, 81, 56, 55, 40, 40, 10, 50, 80, 30],
                            borderColor: "rgba(92,44,126,0.7)",
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