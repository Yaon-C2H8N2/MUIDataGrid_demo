import { Delete } from '@mui/icons-material';
import { Button, MenuItem, Select, TextField } from '@mui/material';
import type { GridColDef } from '@mui/x-data-grid';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { useEffect, useState } from 'react';
import type { DemoRow } from '../models/DemoRow.ts';
import './Grids.css';
import GridNameEdit from './GridNameEdit.tsx';

interface IProps {
  rows: DemoRow[];
}

interface Filters {
  searchValue: string;
  isActive?: boolean;
  isDeleted?: boolean;
}

const StateDrivenDataGrid = (props: IProps) => {
  const [unfilteredRows, setUnfilteredRows] = useState<DemoRow[]>(props.rows);
  const [rows, setRows] = useState<DemoRow[]>(props.rows);
  const [filters, setFilters] = useState<Filters>({
    searchValue: '',
    isActive: undefined,
    isDeleted: undefined,
  });

  useEffect(() => {
    const filteredRows = filterRows(unfilteredRows, filters);
    setRows(filteredRows);
  }, [filters, unfilteredRows]);

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      editable: true,
      renderEditCell: (params) => {
        return (
          <GridNameEdit
            onChange={(value) =>
              // Pas d'autre moyen que de passer par la GridApi pour mettre à jour la valeur de la cellule en cours d'édition.
              // Attention, (valeur de la cellule en cours d'édition) != (valeur de la cellule dans la ligne).
              // La DataGrid manipule les deux valeurs séparément afin de pouvoir revenir en arrière si l'utilisateur annule l'édition.
              params.api.setEditCellValue({
                id: params.id,
                field: 'name',
                value: value,
              })
            }
            value={params.value}
          />
        );
      },
    },
    { field: 'description', headerName: 'Description' },
    { field: 'createdAt', headerName: 'Creation date', type: 'date' },
    { field: 'updatedAt', headerName: 'Last update', type: 'date' },
    { field: 'isActive', headerName: 'Is active', type: 'boolean' },
    { field: 'isDeleted', headerName: 'Is deleted', type: 'boolean' },
    {
      field: 'actions',
      headerName: '',
      sortable: false,
      filterable: false,
      width: 100,
      renderCell: (params) => (
        <Button
          onClick={() => {
            const updatedRows = unfilteredRows.filter(
              (row) => row.id !== params.row.id,
            );
            setUnfilteredRows(updatedRows);
          }}
        >
          <Delete />
        </Button>
      ),
    },
  ];

  const applySearchValueFilter = (
    rows: DemoRow[],
    searchValue: string,
  ): DemoRow[] => {
    if (!searchValue) return rows;
    const lowerSearchValue = searchValue.toLowerCase();
    return rows.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(lowerSearchValue),
      ),
    );
  };

  const applyIsActiveFilter = (
    rows: DemoRow[],
    isActive?: boolean,
  ): DemoRow[] => {
    if (isActive === undefined) return rows;
    return rows.filter((row) => row.isActive === isActive);
  };

  const applyIsDeletedFilter = (
    rows: DemoRow[],
    isDeleted?: boolean,
  ): DemoRow[] => {
    if (isDeleted === undefined) return rows;
    return rows.filter((row) => row.isDeleted === isDeleted);
  };

  const filterRows = (rows: DemoRow[], filters: Filters): DemoRow[] => {
    let filteredRows = [...rows];
    if (filters.searchValue) {
      filteredRows = applySearchValueFilter(filteredRows, filters.searchValue);
    }
    filteredRows = applyIsActiveFilter(filteredRows, filters.isActive);
    filteredRows = applyIsDeletedFilter(filteredRows, filters.isDeleted);
    return filteredRows;
  };

  return (
    <>
      <div className={'filter-container'}>
        <TextField
          label={'Search value'}
          variant="outlined"
          size="small"
          value={filters.searchValue}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, searchValue: e.target.value }))
          }
        />
        <div className={'filter-container-line'}>
          <Select
            size="small"
            value={
              filters.isActive === undefined
                ? 'both'
                : filters.isActive
                  ? 'active'
                  : 'notActive'
            }
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
            value={
              filters.isDeleted === undefined
                ? 'both'
                : filters.isDeleted
                  ? 'deleted'
                  : 'notDeleted'
            }
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
        disableColumnMenu={true}
        disableColumnSorting={true}
        rows={rows}
        columns={columns}
        processRowUpdate={(newRow: DemoRow) => {
          //Est appelé lorsque la cellule/ligne est terminée d'être éditée. La grille mettra à jour la ligne avec la ligne retournée par cette fonction.
          //On est également obligé de mettre à jour le state unfilteredRows sinon la ligne reviendra à sa valeur précédente dès que le state rows sera mis à jour.
          const updatedRows = unfilteredRows.map((row) =>
            row.id === newRow.id ? { ...row, ...newRow } : row,
          );
          setUnfilteredRows(updatedRows);
          return newRow;
        }}
      />
    </>
  );
};

export default StateDrivenDataGrid;
