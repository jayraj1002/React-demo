import { Box, Button, Toolbar, Typography } from '@mui/material'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import SearchBar from './UI/SearchBar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { DataGrid, GridColDef, GridCellParams, GridPaginationModel } from '@mui/x-data-grid';
import {Link,useLocation,useHistory } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react';
import DeleteDialog from './DeleteDialog';
import { deleteCountry, getAllCountries } from '../services/countryService';



export type countryDataType ={
  id: number,
  name: string,
  status: string
}
const drawerWidth = 240;
const CountryData = () => {
  
  const [isLoading, setIsLoading] = useState(true)

  const deleteId = useRef<number | undefined>()
  const [isDeleting, setIsDeleting] = useState(false)
  const [openDeleteDialog,setOpenDeleteDialog] = useState<boolean>(false)
  const [message, setMessage] = useState('')

  const [data, setData] = useState<readonly any[]>([] as readonly any[])

  const location = useLocation()
  const history = useHistory()

  const [keyword,setKeyword] = useState<string | undefined>()
  const [paginationModel, setPaginationModel] = useState({ page:0, pageSize:5})
  const totalRecord = useRef(0)
  
  const fetchData = async() => {
    const rows:any = await getAllCountries('admin/country/search',paginationModel.page+1,paginationModel.pageSize,'','',keyword)
    console.log(rows)
    const formattedData = rows.data.result.map((record: any) => {return {...record, status: record.status === 0 ?'Deleted': record.status === 1 ? 'Inactive':'Active',}})
    totalRecord.current = rows.data.totalRecords
    setData(formattedData)
    setIsLoading(false)
  }

  useEffect(()=>{
    fetchData();
  },[keyword,paginationModel])

  const handleEditView = (id:number,path:string)=> {
    // const editData = data.find((item)=> item.id === id)   
    // setEditData({
    //   id: id,
    //   name:editData?.name, //
    //   status:editData?.status 
    // })
    history.push(`/admin/country/${path}/${id}`)
  }

  //Onclick of delete button
  const handleDelete = (id:number) =>{
    deleteId.current = id
    setIsDeleting(true)
    setMessage('Are you sure you want to delete?')
    setOpenDeleteDialog(true)
  }

  //Onclick of YES
  const deleteConfirm = async() =>{
    setIsDeleting(false)
    const msg:any = await deleteCountry('admin/country/'+deleteId.current)
    console.log(msg)
    setMessage(msg)
  }

  //Onclick of OK
  const handleClose = ()=>{
    fetchData()
    setOpenDeleteDialog(false)
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 10 }, //All the fields like id,name,status is responsoble for data to show
    { field: 'name', headerName: 'Name', width: 140 },
    { field: 'status', headerName: 'Status', width: 125 },
    {
      field: 'Actions',
      headerName: 'Actions',
      width: 500,
      sortable: false,
      renderCell: (params: GridCellParams) => (
        <Box>

          <Button
            variant="outlined"
            startIcon={<EditIcon />}
          onClick={() => handleEditView(params.row.id,'edit')}
          >
            Edit
          </Button>

          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
          onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>

          <Button
            variant="outlined"
            startIcon={<VisibilityIcon />}
          onClick={() => handleEditView(params.row.id,'view')}
          >
            View
          </Button>
        </Box>
      ),
    },
  ];
  
  const rows = [
    { id: 1, Name: 'India', Status: 'Active' },
    { id: 2, Name: 'Canada', Status: 'InActive' },
    { id: 3, Name: 'USA', Status: 'Active' },
    { id: 4, Name: 'Australia', Status: 'Active' },
    { id: 5, Name: 'Japan', Status: 'Active' },
    { id: 6, Name: 'London', Status: 'Active' },
    { id: 7, Name: 'UAE', Status: 'Active' },
    { id: 8, Name: 'China', Status: 'Active' },
  ];

  const handlePagination = (params: GridPaginationModel) => {
    setPaginationModel(params)
  }

  return (
    <Box component="main" 
      sx={{ flexGrow: 1, p : 3, marginLeft:{lg:`${drawerWidth}px`,sm:`${drawerWidth}px`, md:`${drawerWidth}px`}}}>
      

      <Toolbar/>
      {openDeleteDialog && <DeleteDialog handleDialog={isDeleting?deleteConfirm:handleClose} handleCancel={() => {setOpenDeleteDialog(false)}} title='Delete Conformation' message={message} type={isDeleting? 'Delete' : 'Info'} />}
      <Box display='flex' justifyContent='space-between'>
        <Typography variant='h5'>Countries</Typography>
        {location.pathname.toLowerCase()=='/admin/country' && <Button component={Link} to='/admin/country/add' variant='contained' sx={{ backgroundColor: '#21479e', color: 'white' }} ><span><AddOutlinedIcon sx={{ color: 'white' }} /></span>Add New Country</Button>}
      </Box>

     
        <Box>
          <SearchBar searchKeyword = {(key)=>setKeyword(key)} />
        </Box>
            {isLoading ? <p>Loading...</p> : <DataGrid sx={{height: 400, width: '100%', marginTop: '1rem'}}
              rows={data}
              columns={columns} //field: in column is responsible for data viewing 
              pagination
              paginationMode='server'
              paginationModel={paginationModel}
              onPaginationModelChange={handlePagination}
              rowCount = {totalRecord.current}
              pageSizeOptions={[5, 10]}    
            />}           
    </Box>
  )
}
export default CountryData