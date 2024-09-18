import tableMocks from "../mocks/tableMocks.json";
import type {HeaderCell} from "../types/HeaderCell";
import {Table} from "../types/Table";
import type {BodyCell} from "../types/BodyCell";

const table = document.querySelector<HTMLElement>("#table");
let selectedDropDownIndex: number = 0;
let sortDirection: 'asc' | 'desc' = 'asc';
let selectedSortKey: string = '';

function renderHeaderCells(cells: HeaderCell[]) {
    if (table) {
        const thead= document.createElement('thead');
        const tr = document.createElement('tr');
        cells.forEach((headerCell, headerCellIdx) => {
            const th = document.createElement('th');
            th.textContent = headerCell.caption;
            th.setAttribute('tabindex', String(headerCellIdx + 1));
            th.setAttribute('data-key', headerCell.id);
            th.addEventListener('click', (e: MouseEvent) => {
                const target = e.target as HTMLElement;
                if (target.dataset.key) {
                    if (target.dataset.key === selectedSortKey) {
                        sortDirection = sortDirection === 'desc' ? 'asc' : 'desc';
                    } else {
                        selectedSortKey = target.dataset.key
                        sortDirection = 'asc';
                    }
                    sortTable(target.dataset.key, sortDirection);
                }
            })
            th.addEventListener('keydown', (e: KeyboardEvent) => {
                if (e.key === 'Enter') {
                    const targetEl = e.target as HTMLElement;
                    if (targetEl.dataset.key) {
                        if (targetEl.dataset.key === selectedSortKey) {
                            sortDirection = sortDirection === 'desc' ? 'asc' : 'desc';
                        } else {
                            selectedSortKey = targetEl.dataset.key
                            sortDirection = 'asc';
                        }
                        sortTable(targetEl.dataset.key, sortDirection);
                    }
                }
            })
            if (headerCell.align || headerCell.type) {
                th.classList.add(headerCell.align ? `align-${headerCell.align}` : `align-${headerCell.type}`);
            }
            tr.appendChild(th);
        })
        thead.appendChild(tr);
        table.appendChild(thead);
    }
}

function renderBodyCells(cells: Table) {
    if (table) {
        const tbody = document.createElement('tbody');
        cells.data.forEach((row: BodyCell[]) => {
            const tr = document.createElement('tr');
            cells.header.forEach((headerCell, i) => {
                const td = document.createElement('td');
                td.textContent = typeof row[i] === 'object' ? String(row[i]['data']) : String(row[i]);
                if (headerCell.align || headerCell.type) {
                    td.classList.add(headerCell.align ? `align-${headerCell.align}` : `align-${headerCell.type}`);
                }
                tr.appendChild(td);
            })
            tbody.appendChild(tr);
            table.appendChild(tbody);
        })
    }
}

function clearHeader() {
    if (!table) return;
    const thead = table.querySelector('thead');
    if (thead) {
        thead.remove();
    }
}

function clearBody() {
    if (!table) return;
    const tbody = table.querySelector('tbody');
    if (tbody) {
        tbody.remove();
    }
}

function clearTable() {
    if (!table) return;
    const thead = table.querySelector('thead');
    const tbody = table.querySelector('tbody');
    if (thead && tbody) {
        clearHeader();
        clearBody();
    }
}

function renderTable(index: number = 0) {
    selectedDropDownIndex = index;
    renderHeaderCells(tableMocks[index].header as HeaderCell[])
    renderBodyCells(tableMocks[index] as Table)
}

function sortTable(key: string, direction: 'asc' | 'desc') {
    const headerColIndex = tableMocks[selectedDropDownIndex].header.findIndex(col => col.id === key);
    if (headerColIndex >= 0) {
        const sortedTable = {...tableMocks[selectedDropDownIndex]};
        sortedTable.data.sort((a, b) => {
            const aValue = typeof a[headerColIndex] === 'object' ? a[headerColIndex].data : a[headerColIndex];
            const bValue = typeof b[headerColIndex] === 'object' ? b[headerColIndex].data : b[headerColIndex];
            if (aValue < bValue) return direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return direction === 'asc' ? 1 : -1;
            return 0;
        });
        if (sortedTable) {
            clearBody();
            renderBodyCells(sortedTable as Table)
        }
    }
}

export { renderTable, clearTable };
