interface DataObject {
    data: string | number;
    [key: string]: any;
}

export type BodyCell = string | number | DataObject;
