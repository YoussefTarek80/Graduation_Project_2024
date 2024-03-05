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
                                "blue",
                                "black",
                                "red",
                                "orange",
                                "purple",
                                "yellow",
                                "cyan",
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
