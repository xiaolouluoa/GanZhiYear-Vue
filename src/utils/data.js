import { ref } from 'vue'

const year = ref(new Date().getFullYear())

const tableData = ref(JSON.parse(localStorage.getItem('tableData')) || [])

export { year, tableData }
