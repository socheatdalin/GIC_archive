import { Center, Flex, Grid, IconButton, VStack } from '@chakra-ui/react';
// import FileViewer from 'react-file-viewer';
// import makeAnimated from 'react-select/animated';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import SELECT_OPTIONS from 'react-select';
import Table from '@mui/joy/Table';
import React, { useState } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';
import {
    HiOutlinePencilAlt,
    HiOutlineTrash,
    HiPlusCircle,
    HiDocumentText,
} from 'react-icons/hi';
import { MdRemoveRedEye } from 'react-icons/md';
import { visuallyHidden } from '@mui/utils';
import { useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ModalEdit from '@mui/joy/Modal';
import ModalDelete from '@mui/joy/Modal';
import ModalCreate from '@mui/joy/Modal';
import ModalView from '@mui/joy/Modal';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalClose,
    Option,
    Select,
    Sheet,
    Typography,
} from '@mui/joy';

function labelDisplayedRows({ from, to, count }) {
    return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
}

// const columnsHeight = 0;
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'id',
        numeric: false,
        disablePadding: true,
        label: '',
    },
    {
        id: 'thesis_id',
        numeric: true,
        disablePadding: false,
        label: 'ID',
    },
    {
        id: 'student_id',
        numeric: false,
        disablePadding: true,
        label: 'Student Name',
    },
    {
        id: 'title',
        numeric: false,
        disablePadding: false,
        label: 'Title',
    },
    {
        id: 'field',
        numeric: false,
        disablePadding: false,
        label: 'Field',
    },
    {
        id: 'company',
        numeric: true,
        disablePadding: false,
        label: 'Company',
    },

    {
        id: 'action',
        numeric: true,
        disablePadding: false,
        label: 'Action',
    },
];

const groups = [
    { value: 'A', label: 'A' },
    { value: 'B', label: 'B' },
    { value: 'C', label: 'C' },
    { value: 'D', label: 'D' },
];

const generations = [
    { value: '22nd', label: '22nd' },
    { value: '23rd', label: '23rd' },
    { value: '24th', label: '24th' },
    { value: '25th', label: '25th' },
    { value: '26th', label: '26th' }
]
const Fields = [
    { value: 'Web', label: 'Web' },
    { value: 'Mobile', label: 'Mobile' },
    { value: 'Network', label: 'Network' },
    { value: 'Data Science', label: 'Data Science' },
]

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// const animatedComponents = makeAnimated();
EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <thead style={{ backgroundColor: 'tomato' }}>
            <tr>
                {headCells.map((headCell) => {
                    const active = orderBy === headCell.id;
                    return (
                        <th
                            style={{
                                textAlign: 'center',
                                backgroundColor: '#23395d',
                                color: 'white',
                                width: '100%'
                            }}
                            key={headCell.id}
                            aria-sort={
                                active
                                    ? { asc: 'ascending', desc: 'descending' }[order]
                                    : undefined
                            }
                        >
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <Link
                                underline="none"
                                color="neutral"
                                textColor={active ? 'primary.plainColor' : undefined}
                                component="button"
                                onClick={createSortHandler(headCell.id)}
                                fontWeight="lg"
                                startDecorator={
                                    headCell.numeric ? (
                                        <ArrowDownwardIcon sx={{ opacity: active ? 1 : 0 }} />
                                    ) : null
                                }
                                endDecorator={
                                    !headCell.numeric ? (
                                        <ArrowDownwardIcon sx={{ opacity: active ? 1 : 0 }} />
                                    ) : null
                                }
                                sx={{
                                    '& svg': {
                                        transition: '0.2s',
                                        transform:
                                            active && order === 'desc'
                                                ? 'rotate(0deg)'
                                                : 'rotate(180deg)',
                                    },
                                    '&:hover': { '& svg': { opacity: 1 } },
                                }}
                            >
                                {headCell.label}
                                {active ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc'
                                            ? 'sorted descending'
                                            : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </Link>
                        </th>
                    );
                })}
            </tr>
        </thead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

// var countSearch = 1;
// var countClick = 1;
export default function List() {
    // const [openMaterial, setOpenMaterial] = useState(false)
    // const [searchOpen, setSearchOpen] = useState(false)
    // const { onOpen: onDeleteModalOpen } = useDisclosure();

    const [thesis, setThesis] = React.useState([]);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [openView, setOpenView] = React.useState(false);
    const [openCreate, setOpenCreate] = React.useState(false);
    const [inputName, setInputName] = React.useState('');
    const [inputTitle, setInputTitle] = React.useState('');
    const [inputDesc, setInputDesc] = React.useState('');
    const [inputType, setInputType] = React.useState('');
    const [inputTag, setInputTag] = React.useState('');
    const [ID, setID] = React.useState('');
    const [Name, setName] = React.useState('');
    const [Desc, setDesc] = React.useState('');
    const [inputCompany, setInputCompany] = React.useState('');
    const [Teacher_id, setTeacher_id] = React.useState('');
    const [Type, setType] = React.useState('');
    const [Photo, setPhoto] = React.useState('');
    const [deleteID, setDeleteID] = React.useState('');
    const [inputFileType, setInputFileType] = React.useState('');
    const [inputFile, setInputFile] = React.useState(null);
    const [inputGit, setInputGit] = React.useState('');
    const [inputPhoto, setInputPhoto] = React.useState('');
    const [date, setdate] = React.useState('');
    const [Files, setFile] = React.useState(null);
    const [inputFilename, setinputFilename] = React.useState('');

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [setFilter] = useState({ searchText: '' });
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.name);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };
    const handleInputFile = async (e) => {
        setInputFile(e.target.file[0]);
    };

    const handlePhoto = async (e) => {
        setInputPhoto(e.target.files[0]);
    };
    const [length, setLength] = useState([]);
    const handleSearch = (e) => {
        // console.log(search)
        axios
            .post(
                'http://localhost:3001/thesis/field',
                { search: e.target.value }
            )
            .then((result) => {
                setThesis(result.data);
            })
            .catch((error) => console.log(error));
    };

    // const handleSort = (fromYear, toYear, Year) => {
    //     axios
    //         .post(
    //             'http://localhost:3000/admin/sort/course',
    //             { fromYear: fromYear, toYear: toYear, Year: Year },
    //             { withCredentials: true }
    //         )
    //         .then((result) => {
    //             setThesis(result.data.results);
    //         })
    //         .catch((error) => console.log(error));
    // };
    const handleInputTitle = (e) => {
        setInputTitle(e.target.value);
    };
    const handleInputGitUrl = (e) => {
        setInputGit(e.target.value);
    };

    const handleSelectType = (e) => {
        setInputType(e);
    };
    const handleInputName = async (e) => {
        setInputName(e.target.value);
    };
    const handleInputTags = async (e) => {
        setInputTag(e.target.value);
    };

    const handleInputcomapny = (e) => {
        setInputCompany(e.target.value);
    };


    const handleInputDesc = async (e) => {
        setInputDesc(e.target.value);
    };

    const handleName = async (e) => {
        setName(e.target.value);
    };
    const handleID = async (e) => {
        setID(e.target.value);
    };

    const handleTeacher_id = async (e) => {
        setTeacher_id(e.target.value)
    }

    const handleType = (e) => {
        setType(e.value)
    }
    const handleFilename = (e) => {
        setinputFilename(e.target.value)
    }

    const handleDesc = async (e) => {
        setDesc(e.target.value);
    };
    useEffect(() => {
        Thesis();
    }, []);

    const [open, setOpen] = React.useState(false);
    const rows = thesis;
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handlefile = async () => {
        setOpenView(true);
        window.location.href = `http://localhost:3001/static/${inputFile}`;
    };

    const handleSubmitEdit = async () => {
        setOpenEdit(true);
        window.location.replace('/thesis/list');
    };

    const onDeleteModalOpen = async (id) => {
        setDeleteID(id);
        setOpenDelete(true);
    };
    const handleDisplay = async () => {
        const response = await axios.get('http://localhost:3001/thesis/all/');
        setName(response.data[0].title);
        setID(response.data[0].id);
        // setTeacher(response.data[0].supervisor_name);
        setType(response.data[0].field);
        setFile(response.data[0].files);
        setDesc(response.data[0].descr);
    };

    const handleView = async (thesis_id) => {
        await axios
            .get('http://localhost:3001/thesis/all/' + thesis_id)
            .then((result) => {
                console.log(result.data);
                setName(result.data[0].username);
                setID(result.data[0].thesis_id);
                setDesc(result.data[0].descr);
                setInputType(result.data[0].field);
                setInputTitle(result.data[0].title)
                setInputCompany(result.data[0].company)
                setInputGit(result.data[0].github_url)
            })
            .catch((error) => console.log(error));

        setOpenView(true);
    };

    const handleSubmit = async () => {
        // e.preventDefault();
        const formData = new FormData();

        formData.append('username', inputName);
        formData.append('title', inputTitle);
        formData.append('filed', inputType.value);
        formData.append('company', inputCompany);
        formData.append('descr', inputDesc);
        formData.append('github_url', inputGit);
        formData.append('tags', inputTag);
        formData.append('file', inputFile);

        console.log(formData.get('file'));

        axios.post('http://localhost:3001/thesis/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((result) => {
                console.log(result);
                window.location.replace('/home/thesis/list');
            })
            .catch(error => console.log(error));
    }

    // const handleSubmit = async () => {
    //     axios.post('http://localhost:3001/upload/thesis', {
    //         title: inputTitle,
    //         username: inputName,
    //         descr: inputDesc,
    //         field: inputType.value,
    //         company: inputCompany,
    //         tags: inputTag,
    //         github_url: inputGit,
    //         // doc_id: inputFile,
    //     })
    //         .then((result) => {
    //             console.log(result);
    //             window.location.replace('/home/thesis/list')
    //         })
    //         .catch(error => console.log(error));
    // }
    const handleCreate = async (thesisId) => {
        // setID(thesisId);
        setOpenCreate(true);
    };

    const Thesis = async () => {
        axios
            .get('http://localhost:3001/thesis/all')
            .then((result) => {
                setThesis(result.data);
                console.log(result.data);
            })
            .catch((error) => console.log(error));
    };

    const handleDelete = async () => {
        axios.post('http://localhost:3001/thesis/delete/' + deleteID)
            .then((result) => {
                window.location.replace('/home/thesis/list');
            })
            .catch((error) => console.log(error));
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (newPage) => {
        setPage(newPage);
    };

    // const handleDoc = (id) => {
    //     window.location.replace(`/course/${id}/materials`)
    // }
    const handleChangeRowsPerPage = (event, newValue) => {
        setRowsPerPage(parseInt(newValue.toString(), 10));
        setPage(0);
    };

    const getLabelDisplayedRowsTo = () => {
        if (rows.length === -1) {
            return (page + 1) * rowsPerPage;
        }
        return rowsPerPage === -1
            ? rows.length
            : Math.min(rows.length, (page + 1) * rowsPerPage);
    };
    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;
    const [searchOpen, setSearchOpen] = useState(false)
    return (
        <Flex flexDir="column" mt="10px" bg="white" borderRadius="10px" h="full">
            {/* Popup */}
            <Box>
                <Modal
                    aria-labelledby="modal-title"
                    aria-describedby="modal-desc"
                    open={open}
                    onClose={() => setOpen(false)}
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                    <Sheet
                        variant="outlined"
                        sx={{
                            width: 700,
                            height: 500,
                            borderRadius: 'md',
                            p: 3,
                            boxShadow: 'lg',
                            marginTop: '-100',
                        }}
                    >
                        <ModalClose
                            variant="outlined"
                            sx={{
                                boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                                borderRadius: '50%',
                                bgcolor: 'background.body',
                                bgcolor: 'white',
                            }}
                        />
                        <Flex mb="10px" justifyContent="space-between" alignItems="center">
                            <Typography level="h4">Create Thesis</Typography>
                            <Button
                                onClick={handleSubmit}
                                sx={{ mr: '10px', mt: '20px', backgroundColor: '#23395d' }}
                                variant="solid"
                            >
                                Create
                            </Button>
                        </Flex>
                        <Grid templateColumns="repeat(4,1fr)  " gap="2">
                            <VStack spacing="3">
                                <FormControl sx={{ width: '300px' }}  >
                                    <FormLabel required>Student Name</FormLabel>
                                    <Input
                                        placeholder="Please enter your name"
                                        variant="outlined"
                                        color="neutral"
                                        value={inputName}
                                        onChange={handleInputName}
                                    />
                                    <FormLabel required>Title</FormLabel>
                                    <Input
                                        placeholder="Please enter your title"
                                        variant="outlined"
                                        color="neutral"
                                        type='text'
                                        value={inputTitle}
                                        onChange={handleInputTitle}
                                    />
                                    <FormLabel required>Company</FormLabel>
                                    <Input
                                        placeholder="Please enter your company's name"
                                        variant="outlined"
                                        color="neutral"
                                        value={inputCompany}
                                        onChange={handleInputcomapny}
                                    />
                                    <FormLabel required>Type</FormLabel>
                                    <SELECT_OPTIONS
                                        variant="outlined"
                                        color="neutral"
                                        placeholder="Select field"
                                        onChange={handleSelectType}
                                        defaultValue={[Fields[4], Fields[5]]}
                                        options={Fields}
                                    />
                                </FormControl>
                            </VStack>
                            <VStack spacing="3" ml="40px">
                                <FormControl sx={{ width: '300px' }}>
                                    <FormLabel required>Tag</FormLabel>
                                    <Input
                                        placeholder="Please enter project tags"
                                        variant="outlined"
                                        color="neutral"
                                        value={inputTag}
                                        onChange={handleInputTags}
                                    />
                                    <FormLabel required>URL</FormLabel>
                                    <Input
                                        placeholder="Please enter your Github URL"
                                        variant="outlined"
                                        color="neutral"
                                        type='url'
                                        name='github_url'
                                        value={inputGit}
                                        onChange={handleInputGitUrl}
                                    />
                                    <FormLabel required>Description</FormLabel>
                                    <TextField
                                        multiline
                                        rows={5}
                                        placeholder="Type your message here"
                                        variant="outlined"
                                        defaultValue=""
                                        value={inputDesc}
                                        onChange={handleInputDesc}
                                        fullWidth
                                        required
                                    />
                                    <Grid sx={{ mt: 10 }} >

                                        <input style={{ marginTop: '20px', marginBottom: '20px', marginLeft: '3px' }} type="file" name='file' onChange={handleInputFile} />

                                    </Grid>
                                </FormControl>
                            </VStack>
                        </Grid>
                    </Sheet>
                </Modal>
            </Box>

            <Box>
                <ModalDelete
                    aria-labelledby="modal-title"
                    aria-describedby="modal-desc"
                    open={openDelete}
                    onClose={() => setOpenDelete(false)}
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                    <Sheet
                        variant="outlined"
                        sx={{
                            width: 350,
                            height: 170,
                            borderRadius: 'md',
                            p: 3,
                            boxShadow: 'lg',
                            marginTop: '-100',
                        }}
                    >
                        <Flex
                            style={{
                                marginTop: '20px',
                                justifyContent: 'space-between',
                                textAlign: 'center',
                                margin: 'auto',
                                alignItems: 'center',
                            }}
                        >
                            <p> Are you sure you want to delete this thesis?</p>
                        </Flex>
                        <div
                            style={{
                                justifyConten: 'space-between',
                                textAlign: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Button
                                sx={{
                                    mr: '10px',
                                    mt: '20px',
                                    backgroundColor: '#CD3700',
                                    color: 'white',
                                }}
                                onClick={handleDelete}
                            >
                                Delete
                            </Button>
                            <Button
                                sx={{
                                    mr: '10px',
                                    mt: '20px',
                                    backgroundColor: '#23395d',
                                    color: 'white',
                                }}
                                onClick={handleCloseDelete}
                                variant="solid"
                            >
                                Cancel
                            </Button>
                        </div>
                    </Sheet>
                </ModalDelete>
            </Box>
            <Box>
                <ModalEdit
                    aria-labelledby="modal-title"
                    aria-describedby="modal-desc"
                    open={openEdit}
                    onClose={() => setOpenEdit(false)}
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                    <Sheet
                        variant="outlined"
                        sx={{
                            width: 900,
                            height: 700,
                            borderRadius: 'md',
                            p: 3,
                            boxShadow: 'lg',
                            marginTop: '-100',
                            overflowX: 'auto',
                        }}
                    >
                        <ModalClose
                            variant="outlined"
                            sx={{
                                boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                                borderRadius: '50%',
                                bgcolor: 'background.body',
                                bgcolor: 'white',
                            }}
                        />
                        <Flex mb="10px" justifyContent="space-between" alignItems="center">
                            <Typography level="h4">Update Thesis</Typography>
                            <Button
                                sx={{
                                    mr: '10px',
                                    mt: '20px',
                                    backgroundColor: '#23395d',
                                    color: 'white',
                                }}
                                onClick={handleSubmitEdit}
                                variant="solid"
                            >
                                Update
                            </Button>
                        </Flex>
                        <Grid templateColumns="repeat(4,1fr)  ">
                            <VStack>
                                <FormControl sx={{ width: '150px' }}>
                                    <FormLabel required>ID</FormLabel>
                                    <Input
                                        placeholder="Please enter your id"
                                        variant="outlined"
                                        color="neutral"
                                        value={ID}
                                        onChange={handleID}
                                    />
                                    <FormLabel required>To</FormLabel>
                                    {/* <Input
                                    placeholder="Please enter your id"
                                    variant="outlined"
                                    color="neutral"
                                    value={To}
                                    onChange={handleTo}
                                /> */}
                                </FormControl>
                            </VStack>
                            <VStack>
                                <FormControl sx={{ width: '150px', marginLeft: '-50px' }}>
                                    <FormLabel required>title</FormLabel>
                                    <Input
                                        placeholder="Please enter your title  name"
                                        variant="outlined"
                                        color="neutral"
                                        value={Name}
                                        onChange={handleName}
                                    />
                                    <FormLabel required>From</FormLabel>
                                    {/* <Input
                                    placeholder="Please enter your title name"
                                    variant="outlined"
                                    color="neutral"
                                    value={From}
                                    onChange={handleFrom}
                                /> */}
                                </FormControl>
                            </VStack>
                            <VStack>
                                <FormControl
                                    sx={{
                                        width: '150px',
                                        marginLeft: '-50px',
                                        marginBottom: '30px',
                                    }}
                                >
                                    <FormLabel required>Year</FormLabel>
                                    <SELECT_OPTIONS
                                        // onChange={handleSelectYear}
                                        placeholder="Select year"
                                        defaultValue={[{ label: generations, value: generations }]}
                                        options={generations}
                                    ></SELECT_OPTIONS>
                                    <FormLabel required>Teacher's name</FormLabel>
                                    <Input
                                        placeholder="Please enter teacher's ID"
                                        variant="outlined"
                                        color="neutral"
                                        value={Teacher_id}
                                    // onChange={handleTeach}
                                    />
                                </FormControl>
                            </VStack>
                            <VStack>
                                <FormControl sx={{ width: '150px', marginLeft: '-50px' }}>
                                    <FormLabel required>URL</FormLabel>
                                    <Input
                                        placeholder="Please enter your github URL  name"
                                        variant="outlined"
                                        color="neutral"
                                        value={Name}
                                        onChange={handleName}
                                    />
                                    <FormLabel required>From</FormLabel>
                                    {/* <Input
                                    placeholder="Please enter your github URL name"
                                    variant="outlined"
                                    color="neutral"
                                    value={From}
                                    onChange={handleFrom}
                                /> */}
                                    <FormLabel required>Type</FormLabel>
                                    <Input
                                        placeholder="Please enter Type"
                                        variant="outlined"
                                        color="neutral"
                                        value={inputType}
                                    // onChange={handleTeach}
                                    />
                                </FormControl>
                            </VStack>
                        </Grid>
                        <Grid
                            templateColumns="repeat(1,1fr) "
                            gap="2"
                            style={{ marginLeft: '30px', marginRight: '50px' }}
                        >
                            <FormControl>
                                <Grid mt={-10}>
                                    <input
                                        style={{ marginBottom: '20px', marginLeft: '3px' }}
                                        type="file"
                                        onChange={handlePhoto}
                                    />
                                </Grid>
                                <FormLabel style={{ marginTop: '-10px' }} required>
                                    Description
                                </FormLabel>
                                <TextField
                                    multiline
                                    rows={3}
                                    placeholder="Type your message here"
                                    variant="outlined"
                                    defaultValue={Desc}
                                    onChange={handleDesc}
                                    fullWidth
                                    required
                                />
                                {/* {handleData()} */}
                            </FormControl>
                        </Grid>
                    </Sheet>
                </ModalEdit>
            </Box>
            <ModalCreate
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={openCreate}
                onClose={() => setOpenCreate(false)}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Sheet
                    variant="outlined"
                    sx={{
                        width: 450,
                        height: 480,
                        borderRadius: 'md',
                        p: 3,
                        boxShadow: 'lg',
                        marginTop: '-50px',
                    }}
                >
                    <ModalClose
                        variant="outlined"
                        sx={{
                            boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                            borderRadius: '50%',
                            bgcolor: 'white',
                        }}
                    />
                    <Flex mb="10px" justifyContent="space-between" alignItems="center">
                        <Typography level="h4">Update Course</Typography>
                        <Button
                            sx={{ mr: '10px', mt: '20px', backgroundColor: '#23395d' }}
                            variant="solid"
                        >
                            Assign
                        </Button>
                    </Flex>
                    <Grid
                        templateColumns="repeat(1,1fr)  "
                        gap="2"
                        sx={{ marginTop: '10px' }}
                    >
                        <VStack spacing="3">
                            <FormControl sx={{ width: '250px' }}>
                                {/* <FormLabel required>Room</FormLabel>
                                <Input
                                    placeholder="Please enter room"
                                    variant="outlined"
                                    color="neutral"
                                    value={inputRoom1}
                                onChange={handleInputRoom1}
                                /> */}
                                {/* <FormLabel required>Date</FormLabel>
                                <SELECT_OPTIONS
                                    // onChange={handleSelectDate1}
                                    placeholder="Select date"
                                    defaultValue={[dates[20], dates[20]]}
                                    options={dates}
                                ></SELECT_OPTIONS> */}
                                {/* <FormLabel required>Start Time</FormLabel>
                                <SELECT_OPTIONS
                                    // onChange={handleSelectStartTime1}
                                    placeholder="Start time"
                                    defaultValue={[times[20], times[20]]}
                                    options={times}
                                ></SELECT_OPTIONS>
                                <FormLabel required>End Time</FormLabel>
                                <SELECT_OPTIONS
                                    // onChange={handleSelectEndTime1}
                                    placeholder="End time"
                                    defaultValue={[times[20], times[20]]}
                                    options={times}
                                ></SELECT_OPTIONS> */}
                                <FormLabel required>Group</FormLabel>
                                <SELECT_OPTIONS
                                    // onChange={handleSelectGroup}
                                    placeholder="Group"
                                    defaultValue={[groups[20], groups[20]]}
                                    options={groups}
                                />
                            </FormControl>
                        </VStack>
                    </Grid>
                </Sheet>
            </ModalCreate>

            <ModalView
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={openView}
                onClose={() => setOpenView(false)}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Sheet
                    variant="outlined"
                    sx={{
                        width: 660,
                        height: 700,
                        borderRadius: 'md',
                        p: 3,
                        boxShadow: 'lg',
                        marginTop: '-100',
                        overflowX: 'auto',
                    }}
                >
                    <ModalClose
                        variant="outlined"
                        sx={{
                            boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                            borderRadius: '10%',
                            bgcolor: 'white',
                            right: '10px',
                            top: '10px',
                        }}
                    />
                    <Flex mb="10px" justifyContent="space-between" alignItems="center">
                        <Typography level="h4">Thesis</Typography>
                        <Typography level="h4">
                            <IconButton
                                variant="ghost"
                                color="#7a37b3"
                                cursor="pointer"
                                bg="none"
                                size="sm"
                                top="50px"
                                left="10px"
                                border="none"
                                icon={<HiDocumentText color="#03A89E" size="1.8rem" />}
                            />
                        </Typography>
                    </Flex>

                    <VStack
                        style={{ marginTop: '10px', textAlign: 'left', fontSize: '16px' }}
                    >
                        <div>
                            <b>
                                <span
                                    style={{
                                        marginLeft: '-80px',
                                        color: '#517388',
                                        fontSize: '20px',
                                        textTransform: 'upperCase',
                                    }}
                                >
                                    {Name}
                                </span>
                            </b>
                        </div>
                        <div>
                            <span style={{ marginLeft: '-80px', color: '#23395d' }}>
                                {ID}
                            </span>
                        </div>
                        <div
                            style={{
                                paddingLeft: '30px',
                                width: 330,
                                height: 325,
                                borderRadius: '3px',
                            }}
                        >
                            <div style={{ marginTop: '10px' }}>
                                <span>
                                    <b>Title : </b>
                                </span>
                                <span style={{ marginLeft: '50px', color: '#517388' }}>
                                    {inputTitle}
                                </span>
                            </div>
                            <div style={{ marginTop: '10px' }}>
                                <span>
                                    <b>Field : </b>
                                </span>
                                <span style={{ marginLeft: '48px', color: '#517388' }}>
                                    {inputType}
                                </span>
                            </div>
                            <div style={{ marginTop: '10px' }}>
                                <span>
                                    <b>Company: </b>
                                </span>
                                <span style={{ marginLeft: '85px', color: '#517388' }}>
                                    {inputCompany}
                                </span>
                            </div>
                            <div style={{ marginTop: '10px' }}>
                                <span>
                                    <b>Git : </b>
                                </span>
                                <span style={{ marginLeft: '48px', color: '#517388' }}>
                                    {inputGit}
                                </span>
                            </div>
                            <div style={{ marginTop: '50px' }}>
                                {/* <img src={`http://localhost:3001/static/${inputFile}`} alt="" /> */}
                                {/* <Button onClick={() => handlefile()}>Document files</Button> */}
                            </div>

                        </div>
                    </VStack>
                </Sheet>
            </ModalView>

            <Grid
                as="form"
                templateColumns="auto max-content"
                p="3"
                mb="3"
                boxShadow="sm"
                onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const formProps = Object.fromEntries(formData);
                    setFilter((prev) => ({
                        ...prev,
                        searchText: formProps.searchText,
                    }));
                }}
            >
                <Box
                    borderRadius="8px"
                    mt="10px"
                    h="60px"
                    display="flex"
                    flexDir="row"
                    justifyContent="space-between"
                >
                    <Flex
                        width="100%"
                        ml="10px"
                        variant="standard"
                        templateColumns="15vw max-content"
                        gap="4"
                    >
                        <FormControl sx={{ width: '200px' }}>
                            <SELECT_OPTIONS
                                // onChange={handleFromYear}
                                placeholder="From Year"
                            // defaultValue={[fromYear[20], fromYear[20]]}
                            // options={fromYear}
                            ></SELECT_OPTIONS>
                        </FormControl>
                        <FormControl sx={{ width: '200px' }}>
                            <SELECT_OPTIONS
                                // onChange={handleToYear}
                                placeholder="To Year"
                            // defaultValue={[toYear[20], toYear[20]]}
                            // options={toYear}
                            ></SELECT_OPTIONS>
                        </FormControl>
                        <FormControl sx={{ width: '200px' }}>
                            <SELECT_OPTIONS
                                // onChange={handleSelectYear}
                                placeholder="Select Year"
                                defaultValue={[generations[20], generations[20]]}
                                options={generations}
                            ></SELECT_OPTIONS>
                        </FormControl>
                        <span>
                            <Input
                                sx={{
                                    '&:hover': { '& svg': { opacity: 1 } },
                                    width: '200px',
                                    left: '910px',
                                    position: 'absolute',
                                    transition: 'width 3s',
                                }}
                                placeholder="search ..."
                                variant="outlined"
                                color="neutral"
                                onChange={handleSearch}
                            />
                        </span>
                        <Button
                            onClick={() => handleSearch()}
                            style={{ backgroundColor: '#23395d' }}
                            sx={{ position: 'absolute', right: '105px' }}
                            variant="solid"
                        // onClick={() => history.push(`${parentUrl} /add`)}
                        >
                            <BiSearchAlt2 style={{ width: '20px', height: '20px' }} />
                        </Button>
                    </Flex>
                    <Grid h="42px" mr="10px">
                        <Button
                            sx={{ width: '75px', backgroundColor: '#23395d' }}
                            variant="solid"
                            onClick={() => setOpen(true)}
                        >
                            Add
                        </Button>
                    </Grid>
                </Box>
            </Grid>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                    marginTop: '20px',
                    marginRight: '40px',
                    marginBottom: '20px',
                }}
            >
                <Sheet
                    sx={{
                        mt: '10px',
                        ml: 1,
                        width: '99%',
                        height: '100%',
                        borderRadius: 'sm',
                    }}
                >
                    <Table aria-labelledby="tableTitle" hoverRow>
                        <EnhancedTableHead
                            // numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <tbody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.name);
                                    return (
                                        <tr
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            spacing={2}
                                            style={{
                                                textAlign: 'center',
                                                cursor: 'pointer',
                                            }}
                                            key={row.name}
                                        >
                                            <td>
                                                <IconButton
                                                    onClick={() => {
                                                        handleCreate(row.thesis_id);
                                                    }}
                                                    size="sm"
                                                    variant="ghost"
                                                    cursor="pointer"
                                                    border="none"
                                                    bg="none"
                                                    color="#78909c"
                                                    icon={<HiPlusCircle color="#23395d" size="1.3rem" />}
                                                />
                                            </td>
                                            <td>{row.thesis_id}</td>
                                            <td>{row.username}</td>
                                            <td>{row.title}</td>
                                            <td>{row.field}</td>
                                            <td>{row.company}</td>
                                            <td>
                                                <Center spacing={2} gap="8">
                                                    <IconButton
                                                        onClick={() => handleView(row.thesis_id)}
                                                        variant="ghost"
                                                        color="#78909c"
                                                        cursor="pointer"
                                                        bg="none"
                                                        size="sm"
                                                        border="none"
                                                        icon={
                                                            <MdRemoveRedEye color="#4682B4" size="1.3rem" />
                                                        }
                                                    />

                                                    <IconButton
                                                        variant="ghost"
                                                        cursor="pointer"
                                                        color="#78909c"
                                                        border="none"
                                                        bg="none"
                                                        size="sm"
                                                        icon={
                                                            <HiOutlinePencilAlt
                                                                color="#03A89E"
                                                                size="1.3rem"
                                                            />
                                                        }
                                                        onClick={() => {
                                                            handleDisplay(row.thesis_id, 'edit');
                                                        }}
                                                    />
                                                    <IconButton
                                                        onClick={() => {
                                                            onDeleteModalOpen(row.thesis_id);
                                                        }}
                                                        size="sm"
                                                        variant="ghost"
                                                        cursor="pointer"
                                                        border="none"
                                                        bg="none"
                                                        color="#78909c"
                                                        icon={
                                                            <HiOutlineTrash color="#CD3700" size="1.3rem" />
                                                        }
                                                    />
                                                </Center>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={9}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 2,
                                            justifyContent: 'flex-end',
                                        }}
                                    >
                                        <FormControl orientation="horizontal" size="sm">
                                            <FormLabel>Rows per page:</FormLabel>
                                            <Select
                                                onChange={handleChangeRowsPerPage}
                                                value={rowsPerPage}
                                            >
                                                <Option value={5}>5</Option>
                                                <Option value={10}>10</Option>
                                                <Option value={25}>25</Option>
                                            </Select>
                                        </FormControl>
                                        <Typography
                                            textAlign="center"
                                            fontSize="12px"
                                            sx={{ minWidth: 80 }}
                                        >
                                            {labelDisplayedRows({
                                                from: rows.length === 0 ? 0 : page * rowsPerPage + 1,
                                                to: getLabelDisplayedRowsTo(),
                                                count: rows.length === -1 ? -1 : rows.length,
                                            })}
                                        </Typography>
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            <IconButton
                                                size="sm"
                                                color="neutral"
                                                variant="outlined"
                                                disabled={page === 0}
                                                onClick={() => handleChangePage(page - 1)}
                                                sx={{ bgcolor: 'background.surface' }}
                                            >
                                                <KeyboardArrowLeftIcon />
                                            </IconButton>
                                            <IconButton
                                                size="sm"
                                                color="neutral"
                                                variant="outlined"
                                                disabled={
                                                    rows.length !== -1
                                                        ? page >= Math.ceil(rows.length / rowsPerPage) - 1
                                                        : false
                                                }
                                                onClick={() => handleChangePage(page + 1)}
                                                sx={{ bgcolor: 'background.surface' }}
                                            >
                                                <KeyboardArrowRightIcon />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                </td>
                            </tr>
                        </tfoot>
                    </Table>
                </Sheet>
            </Box>
        </Flex>
    );
}
