import { ref } from 'vue'

const year = ref(new Date().getFullYear().toString())

const tableData = ref(JSON.parse(localStorage.getItem('tableData')) || [])

export { year, tableData }
