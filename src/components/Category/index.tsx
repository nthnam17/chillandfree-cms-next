import {
    Box,
    Breadcrumbs,
    Button,
    Flex,
    Modal,
    Select,
    Text,
    TextInput,
    Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { DeleteIcon } from '@src/components/common/icon/delete-icon';
import { EditIcon } from '@src/components/common/icon/edit-icon';
import DataTable from '@src/components/common/table';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import Link from 'next/link';
import AddIcon from '@src/components/common/icon/add-icon';
import AddCategory from './add-category';
import UpdateCategory from './update-category';
import CustomConfirm from '@src/components/common/CustomConfirm';
import SearchIcon from '../common/icon/search-icon';
import { notifications } from '@mantine/notifications';
import {
    useDeleteNewsMutation,
    useGetListNewsQuery,
    useGetNewsQuery,
} from '@src/redux/endPoint/news';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDebounce } from '@uidotdev/usehooks';
import moment from 'moment';
import { HOT, STATUS } from '@src/utils/contants';
import { useGetAllLanguageQuery } from '@src/redux/endPoint/language';
import TooltipCustom from '../common/tooltip';
import EyeIcon from '../common/icon/eye-icon';
import ViewCategory from './view-category';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
const items: any = [
    { title: 'Trang chủ', href: '/' },
    { title: 'Tin đăng', href: '/news' },
    { title: 'Danh mục', href: '/news/news-category' },
].map((item, index) => (
    <Box key={index}>
        <Link
            className="text-sm font-medium text-primary-gray no-underline"
            href={item.href as string}
            key={index}
        >
            {item.title}
        </Link>
    </Box>
));

type TCustomer = {
    page: number;
    pageSize: number;
    status: number | string;
    title: string;
    description: string;
};

const NewsGroup = () => {
    const dataDemo = {
        pageIndex: 1,
        pageSize: 10,
        totalPages: 2,
        totalRecords: 16,
        beginIndex: 0,
        endIndex: 10,
        data: [
            {
                id: 1,
                title: 'Nhà đất',
                description: 'Mua bán nhà cho thuê nhà đất',
                status: 1,
            },
            {
                id: 2,
                title: 'Chung cư',
                description: 'Mua bán nhà cho thuê Chung cư',
                status: 2,
            },
        ],
    };
    const useDataDemo = () => {
        return {
            data: dataDemo,
            isLoading: false,
            isError: false,
        };
    };
    const [id, setID] = useState<number | null>(null);
    const [query, setQuery] = useState<TCustomer>({
        status: '',
        title: '',
        description: '',
        page: 1,
        pageSize: 10,
    });

    const debouncedQuery = useDebounce(query, 300);

    const { control, register, watch } = useForm({
        defaultValues: {
            status: '',
            full_name: '',
        },
    });

    // useEffect(() => {
    //     // if (query) {
    //     //     setQuery({
    //     //         ...query,
    //     //         status: watch('status'),
    //     //         full_name: watch('full_name'),
    //     //         isHot: watch('isHot'),
    //     //     });
    //     // }
    // }, [watch('status'), watch('isHot'), watch('title')]);

    const columnHelper = createColumnHelper<TCustomer>();
    const [openedCreate, { open: openCreate, close: closeCreate }] =
        useDisclosure(false);

    const [openedUpdate, { open: openUpdate, close: closeUpdate }] =
        useDisclosure(false);

    const [opendConfirm, { open: openConfirm, close: closeConfirm }] =
        useDisclosure(false);

    const [opendView, { open: openView, close: closeView }] =
        useDisclosure(false);

    const { data: investorDetail, isFetching } = useGetNewsQuery(
        { id: id },
        { skip: !id },
    );

    const [deleteNews] = useDeleteNewsMutation();

    const handleDelete = async () => {
        // try {
        //     await deleteNews(id).unwrap();
        //     notifications.show({
        //         title: 'Thành công',
        //         color: '#06d6a0',
        //         autoClose: 2000,
        //         message: 'Xóa khách hàng thành công',
        //     });
        // } catch (error: any) {
        //     notifications.show({
        //         title: 'Lỗi',
        //         color: '#ef476f',
        //         autoClose: 2000,
        //         message: JSON.stringify(error?.data?.error),
        //     });
        // }
    };
    const { data: investorDetailList } = useGetAllLanguageQuery({});

    const columns: ColumnDef<TCustomer, any>[] = [
        columnHelper.display({
            id: '#',
            cell: ({ getValue, row, table }) => {
                const index = row.index + 1;
                const { pageIndex, pageSize } = table.getState().pagination;
                return (
                    <Text className="text-sm ">
                        {pageIndex * pageSize + index}
                    </Text>
                );
            },
            header: () => <Text className="text-sm font-semibold">#</Text>,
        }),
        columnHelper.accessor((row) => row.title, {
            id: 'title',
            cell: ({ getValue }) => (
                <Text className="text-sm font-medium">{getValue()}</Text>
            ),
            header: () => (
                <Text className="text-sm font-semibold">Tên danh mục</Text>
            ),
        }),
        columnHelper.accessor((row) => row.description, {
            id: 'phone',
            cell: ({ getValue }) => (
                <Text className="text-sm font-medium">{getValue()}</Text>
            ),
            header: () => <Text className="text-sm font-semibold">Mô tả</Text>,
        }),
        columnHelper.accessor((row) => row.status, {
            id: 'status',
            cell: ({ getValue }) => (
                <Box className="text-sm font-medium">
                    {
                        <Box
                            className={`inline-block rounded-md px-4 py-2 text-xs font-normal ${
                                getValue() == 1
                                    ? 'bg-success-opcity text-success'
                                    : 'bg-delete-opcity text-delete'
                            }`}
                        >
                            {getValue() == 1 ? 'Hoạt động' : 'Khóa'}
                        </Box>
                    }
                </Box>
            ),
            header: () => (
                <Text className="text-sm font-semibold">Trạng thái</Text>
            ),
        }),
        // Display Column
        columnHelper.display({
            id: 'actions',
            cell: ({ row }) => {
                const doc: any = row?.original;
                return (
                    <Box className="flex items-center gap-4">
                        <Box
                            className="flex items-center max-h-full text-warning cursor-pointer"
                            onClick={() => {
                                setID(doc.id);
                                openView();
                            }}
                        >
                            <TooltipCustom
                                label="Xem chi tiết"
                                color="#f1be46"
                                element={<EyeIcon size={20} />}
                            />
                        </Box>
                        <Box
                            className="flex items-center max-h-full text-primary-edit cursor-pointer"
                            onClick={() => {
                                setID(doc.id);
                                openUpdate();
                            }}
                        >
                            <TooltipCustom
                                label="Cập nhật"
                                color="#4b49ac"
                                element={<EditIcon />}
                            />
                        </Box>
                        <Box
                            className="flex items-center max-h-full  text-delete cursor-pointer"
                            onClick={() => {
                                openConfirm();
                                setID(doc.id as number);
                            }}
                        >
                            <TooltipCustom
                                label="Xóa"
                                color="#ef466f"
                                element={<DeleteIcon />}
                            />
                        </Box>
                    </Box>
                );
            },

            header: () => <Text className="text-sm font-medium">Thao tác</Text>,
        }),
    ];

    return (
        <Box className="mx-10 mb-24 px-6 py-8 bg-white shadow-sm rounded-xl max-h-max border border-dashed border-primary-border ">
            <Flex
                className="flex-col sm:flex-row items-start sm:items-center"
                justify="space-between"
            >
                <Box>
                    <Title className="text-lg text-primary-black uppercase">
                        Danh Sách danh mục
                    </Title>
                    <Breadcrumbs
                        mt="xs"
                        separator={
                            <Box className="w-1 h-1 rounded-full bg-primary-gray" />
                        }
                    >
                        {items}
                    </Breadcrumbs>
                </Box>

                <Box>
                    <Button
                        className=" min-h-[42px] rounded-lg bg-success-opcity text-sm text-success font-medium"
                        leftSection={<AddIcon />}
                        mt="sm"
                        onClick={openCreate}
                    >
                        Thêm Mới
                    </Button>
                </Box>
            </Flex>

            {/* Bộ lọc */}
            <Flex className="w-full sm:w-1/2 mt-4 mb-6 flex flex-col sm:grid sm:grid-cols-12 gap-4">
                <TextInput
                    className="col-span-6"
                    leftSection={<SearchIcon size={20} />}
                    placeholder="Tìm kiếm tên danh mục"
                    styles={{
                        input: {
                            paddingLeft: 36,
                        },
                        section: {
                            marginLeft: 4,
                        },
                    }}
                    {...register('full_name')}
                />
                <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                        <Select
                            className="col-span-3"
                            data={STATUS.map(
                                (item: {
                                    id: number | string;
                                    name: string;
                                }) => ({
                                    label: item.name,
                                    value: String(item.id),
                                }),
                            )}
                            placeholder="-- Chọn trạng thái --"
                            {...field}
                        />
                    )}
                />
            </Flex>

            {/* Tabel */}
            <Box className="m-[auto] w-full ease-in-out duration-300">
                <DataTable
                    columns={columns}
                    query={debouncedQuery}
                    useData={useDataDemo}
                />
            </Box>

            {/* Thêm mới*/}
            <Modal
                centered
                className="rounded-xl overflow-hidden"
                onClose={closeCreate}
                opened={openedCreate}
                size="1000"
                title={
                    <Text className="text-lg font-semibold">
                        Thêm mới danh mục tin đăng
                    </Text>
                }
                transitionProps={{
                    transition: 'fade',
                    duration: 200,
                }}
            >
                <AddCategory
                    investorDetailList={investorDetailList?.map(
                        (language: any) => ({
                            languageId: language?.id,
                            languageCode: language?.languageCode,
                            languageDescription: language?.description,
                        }),
                    )}
                    onClose={closeCreate}
                />
            </Modal>

            {/* view chi tiết */}
            <Modal
                centered
                className="rounded-xl overflow-hidden"
                onClose={closeView}
                opened={opendView}
                size="80%"
                title={<Text className="text-lg font-semibold">Chi tiết</Text>}
                transitionProps={{
                    transition: 'fade',
                    duration: 200,
                }}
            >
                {!isFetching && <ViewCategory newDetail={investorDetail} />}
            </Modal>

            {/* Cập nhật */}
            <Modal
                centered
                className="rounded-xl overflow-hidden"
                onClose={closeUpdate}
                opened={openedUpdate}
                size="1000"
                title={
                    <Text className="text-lg font-semibold">
                        Cập nhật danh mục tin đăng
                    </Text>
                }
                transitionProps={{
                    transition: 'fade',
                    duration: 200,
                }}
            >
                {!isFetching && (
                    <UpdateCategory
                        investorDetail={investorDetail}
                        onClose={closeUpdate}
                    />
                )}
            </Modal>

            {/* confirm */}
            <CustomConfirm
                onCancel={closeConfirm}
                onClose={closeConfirm}
                onConfirm={handleDelete}
                opened={opendConfirm}
            >
                <Box className="my-2">
                    <Text className="text-sm">
                        Hàng động thực hiện có thể ảnh hưởng dữ liệu của bạn
                    </Text>
                </Box>
            </CustomConfirm>
        </Box>
    );
};

export default NewsGroup;
