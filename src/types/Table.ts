import {HeaderCell} from "./HeaderCell";
import {BodyCell} from "./BodyCell";

export type Table = {
    header: HeaderCell[],
    data: BodyCell[][]
}
