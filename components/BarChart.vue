<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  Title,
} from 'chart.js'

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Legend, Tooltip, Title)

interface Dataset {
  label: string
  data: number[]
  backgroundColor?: string
  borderColor?: string
}

const props = defineProps<{
  labels: string[]
  datasets: Dataset[]
  options?: Record<string, unknown>
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
let chart: Chart<'bar'> | null = null

const render = () => {
  if (!canvasRef.value) return
  if (chart) chart.destroy()
  chart = new Chart(canvasRef.value, {
    type: 'bar',
    data: {
      labels: props.labels,
      datasets: props.datasets.map((d) => ({
        ...d,
        borderWidth: 0,
      })),
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom' },
        title: props.options?.title as any,
        tooltip: { mode: 'index', intersect: false },
      },
      interaction: { mode: 'index', intersect: false },
      ...props.options,
    },
  })
}

onMounted(render)
watch(() => props, render, { deep: true })
</script>

<template>
  <canvas ref="canvasRef" class="w-full" />
</template>
