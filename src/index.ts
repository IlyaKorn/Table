import './styles.css';
import tableMocks from './mocks/tableMocks.json'
import { Table } from "./types/Table";
import { renderTable, clearTable } from "./table/renderTable";
import renderDropdownOptions from "./dropdown/renderDropdownOptions";
const dropdown = document.querySelector<HTMLSelectElement>('#dropdown');

if (dropdown) {
    dropdown.addEventListener('change', (event) => {
        const selectedIndex = (event.target as HTMLSelectElement).selectedIndex;
        handleSelectChange(selectedIndex);
    });
}

function handleSelectChange(selectedIndex: number) {
    clearTable();
    renderTable(selectedIndex);
}

document.addEventListener('DOMContentLoaded', () => {
    renderTable();
    renderDropdownOptions(tableMocks as Table[]);
});
