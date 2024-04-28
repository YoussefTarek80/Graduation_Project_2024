<template>
    <div>
        <canvas id="PieChart" height="400px" width="100px"></canvas>
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
            const ctx = document.getElementById("PieChart").getContext("2d");
            new Chart(ctx, {
                type: "polarArea", 
                data: {
                    labels: [
                        "المدارس",
                        "الطلاب",
                        "المناسبات",
                        "المسئولين",
                        "الطلبات",
                        "العمال",
                    ],
                    datasets: [
                        {
                            label: "عدد الشكاوي في الشهر",
                            data: [65, 59, 80, 81, 56, 55, 40],
                            backgroundColor: [
                                "rgba(255, 99, 132, 0.7)", 
                                "rgba(54, 162, 235, 0.7)", 
                                "rgba(255, 206, 86, 0.7)", 
                                "rgba(75, 192, 192, 0.7)", 
                                "rgba(153, 102, 255, 0.7)", 
                                "rgba(255, 159, 64, 0.7)", 
                            ],
                            borderColor: "white",
                            borderWidth: 2,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                },
            });
        },
    },
};
</script>
