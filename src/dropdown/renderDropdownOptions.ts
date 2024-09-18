import {Table} from "../types/Table";

const dropdown = document.querySelector<HTMLSelectElement>('#dropdown');

function renderDropdownOptions (tableData: Table[]) {
    if (dropdown) {
        tableData.forEach((opt, index) => {
            const option = document.createElement('option');
            option.value = `report-${index + 1}`;
            option.textContent = `report-${index + 1}`;
            dropdown.appendChild(option);
        });
    }
}

export default renderDropdownOptions;
