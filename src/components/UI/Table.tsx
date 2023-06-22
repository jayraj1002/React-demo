import { DataGrid, GridColDef, GridValueGetterParams, GridCellParams } from '@mui/x-data-grid';
//No use
export const customDataTable = ({data}: any, {columns}: any) =>{
    return(
        <DataGrid sx={{height: 400, width: '100%', marginTop: '1rem'}}
              rows={data}
              columns={columns} //field: in column is responsible for data viewing 
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              // checkboxSelection
            />
    )
}