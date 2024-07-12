import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { getProductStart, getProductSuccess, getProductFailure } from '../redux/produtRedux';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'title',
    headerName: 'Title',
    width: 150,
    editable: true,
  },
  {
    field: 'desc',
    headerName: 'Description',
    width: 150,
    editable: true,
  },
  {
    field: 'price',
    headerName: 'Price',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'inStock',
    headerName: 'Stock',
    width: 160,
  },
  {
    field: 'action',
    headerName: 'Action',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    renderCell: (params) => (
      <>
        <Tooltip title="Edit">
          <IconButton
            color="primary"
            onClick={() => handleEdit(params.row.id)}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            color="secondary"
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </>
    ),
  },
];




export default function DataGridDemo() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(getProductStart());
      try {
        const res = await axios.get('/api/products');
        dispatch(getProductSuccess(res.data));
      } catch (err) {
        dispatch(getProductFailure());
      }
    };
    fetchProducts();
  }, [dispatch]);

  
const handleEdit = (productId) => {
  const selectedProduct = products.find(product => product.id === productId);
  if (selectedProduct) {
    history.push(`/addproduct/${selectedProduct.id}`, { product: selectedProduct });
  }
};

const handleDelete = (id) => {
  if (id) {
    console.log('Delete row with id:', id);
  } else {
    console.error('Cannot delete row without id:', id);
  }
};
  return (
    <Box sx={{ height: 400, width: '100%', backgroundColor: '#f8f8f8' }}>
      <DataGrid
        rows={products}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}