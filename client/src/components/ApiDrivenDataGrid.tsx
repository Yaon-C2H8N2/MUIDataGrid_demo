import {GridColDef} from "@mui/x-data-grid";
import {DemoRow} from "../models/DemoRow.ts";
import {DataGridPro, useGridApiRef} from "@mui/x-data-grid-pro";
import {useState} from "react";
import {Button, MenuItem, Select, TextField} from "@mui/material";
import {Delete} from "@mui/icons-material";
import './Grids.css'

interface IProps {
    rows: DemoRow[]
}

interface Filters {
    searchValue: string;
    isActive?: boolean;
    isDeleted?: boolean;
}

const ApiDrivenDataGrid = (props: IProps) => {
    const apiRef = useGridApiRef();
    const [filters, setFilters] = useState<Filters>({
        searchValue: '',
        isActive: undefined,
        isDeleted: undefined,
    });

    const columns: GridColDef[] = [
        {field: 'name', headerName: 'Name'},
        {field: 'description', headerName: 'Description'},
        {field: 'createdAt', headerName: 'Creation date', type: 'date'},
        {field: 'updatedAt', headerName: 'Last update', type: 'date'},
        {field: 'isActive', headerName: 'Is active', type: 'boolean'},
        {field: 'isDeleted', headerName: 'Is deleted', type: 'boolean'},
        {field: 'actions', headerName: '', sortable: false, filterable: false, width: 100,
            renderCell: (params) => (
                <Button
                    onClick={() => {
                        params.api.updateRows([{id: params.row.id, _action: 'delete'}]);
                    }}
                >
                    <Delete/>
                </Button>
            )
        }
    ];

    return (
        <>
            <div className={"filter-container"}>
                <TextField
                    label={"Search value"}
                    variant="outlined"
                    size="small"
                    value={filters.searchValue}
                    onChange={(e) => setFilters((prev) => ({...prev, searchValue: e.target.value}))}
                />
                <div className={"filter-container-line"}>
                    <Select
                        size="small"
                        value={filters.isActive === undefined ? 'both' : filters.isActive ? 'active' : 'notActive'}
                        onChange={(e) => {
                            const value = e.target.value;
                            setFilters((prev) => ({
                                ...prev,
                                isActive: value === 'both' ? undefined : value === 'active',
                            }));
                        }}
                    >
                        <MenuItem value="both">-- Is Active ?--</MenuItem>
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="notActive">Not Active</MenuItem>
                    </Select>
                    <Select
                        size="small"
                        value={filters.isDeleted === undefined ? 'both' : filters.isDeleted ? 'deleted' : 'notDeleted'}
                        onChange={(e) => {
                            const value = e.target.value;
                            setFilters((prev) => ({
                                ...prev,
                                isDeleted: value === 'both' ? undefined : value === 'deleted',
                            }));
                        }}
                    >
                        <MenuItem value="both">-- Is Deleted ?--</MenuItem>
                        <MenuItem value="deleted">Deleted</MenuItem>
                        <MenuItem value="notDeleted">Not Deleted</MenuItem>
                    </Select>
                </div>
            </div>
            <DataGridPro
                apiRef={apiRef}
                rows={props.rows}
                columns={columns}
                disableColumnMenu={true}
                disableColumnSorting={true}
                filterModel={{
                    items: [
                        {id: 0, field: 'isActive', operator: 'is', value: filters.isActive},
                        {id: 1, field: 'isDeleted', operator: 'is', value: filters.isDeleted},
                    ],
                    quickFilterValues: [filters.searchValue]
                }}
            />
        </>
    )
}

export default ApiDrivenDataGrid
