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
import AddNew from './add-news';
import UpdateNew from './update-new';
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
import ViewNew from './view-news';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
const items: any = [
    { title: 'Trang chủ', href: '/' },
    { title: 'Bài viết', href: '/news/news-list' },
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

type TNews = {
    page: number;
    pageSize: number;
    status: number | string;
    price: number | string;
    title: string;
    building: string;
    room_type: string;
    news_category: string;
    news_group: string;
    newGenre: string;
    createdBy: number | string;
    updatedBy: number | string;
    createdAt: number | string;
    updatedAt: number | string;
};

const News = () => {
    const [id, setID] = useState<number | null>(null);
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
                title: 'Cho thuê căn hộ Q7 Riverside 1pn 7tr - 2pn 8.5-9tr - 3pn 11tr mặt tiền view sông',
                price: '7.000.000',
                building: 'Riverside',
                room_type: 'Cao cấp',
                news_category: 'Căn hộ',
                news_group: 'Nổi bật',
                status: 1,
            },
            {
                id: 2,
                title: 'Cho thuê căn hộ tiện nghi hiện đại giá rẻ tại Tây Hồ, Hà Nội',
                price: '5.000.000',
                building: 'ViewSonic',
                room_type: 'Cao cấp',
                news_category: 'Chung cư mini',
                news_group: 'Giá rẻ',
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
    const [query, setQuery] = useState<TNews>({
        price: '',
        status: '',
        title: '',
        building: '',
        room_type: '',
        news_group: '',
        news_category: '',
        page: 1,
        pageSize: 10,
        newGenre: '',
        createdBy: '',
        updatedBy: '',
        createdAt: '',
        updatedAt: '',
    });

    const debouncedQuery = useDebounce(query, 300);

    const { control, register, watch } = useForm({
        defaultValues: {
            status: '',
            title: '',
            news_group: '',
            news_category: '',
        },
    });

    // useEffect(() => {
    //     if (query) {
    //         setQuery({
    //             ...query,
    //             status: watch('status'),
    //             title: watch('title'),
    //             isHot: watch('isHot'),
    //         });
    //     }
    // }, [watch('status'), watch('isHot'), watch('title')]);

    // console.log('TNews', TNews);

    const columnHelper = createColumnHelper<TNews>();
    const [openedCreate, { open: openCreate, close: closeCreate }] =
        useDisclosure(false);

    const [openedUpdate, { open: openUpdate, close: closeUpdate }] =
        useDisclosure(false);

    const [opendConfirm, { open: openConfirm, close: closeConfirm }] =
        useDisclosure(false);

    const [opendView, { open: openView, close: closeView }] =
        useDisclosure(false);

    const { data: newDetail, isFetching } = useGetNewsQuery(
        { id: id },
        { skip: !id },
    );

    const [deleteNews] = useDeleteNewsMutation();

    const handleDelete = async () => {
        try {
            await deleteNews(id).unwrap();

            notifications.show({
                title: 'Thành công',
                color: '#06d6a0',
                autoClose: 2000,
                message: 'Xóa tin tức thành công',
            });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            notifications.show({
                title: 'Lỗi',
                color: '#ef476f',
                autoClose: 2000,
                message: JSON.stringify(error?.data?.error),
            });
        }
    };
    const { data: newDetailList } = useGetAllLanguageQuery({});

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const columns: ColumnDef<TNews, any>[] = [
        columnHelper.display({
            id: '#',
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
                <Text className="text-sm font-semibold">Tiêu đề</Text>
            ),
        }),
        columnHelper.accessor((row) => row.news_category, {
            id: 'news_category',
            cell: ({ getValue }) => (
                <Text className="text-sm font-medium ">{getValue()}</Text>
            ),
            header: () => (
                <Text className="text-sm font-semibold">Danh mục </Text>
            ),
        }),
        columnHelper.accessor((row) => row.news_group, {
            id: 'news_group',
            cell: ({ getValue }) => (
                <Text className="text-sm font-medium ">{getValue()}</Text>
            ),
            header: () => <Text className="text-sm font-semibold">Nhóm </Text>,
        }),
        columnHelper.accessor((row) => row.price, {
            id: 'price',
            cell: ({ getValue }) => (
                <Text className="text-sm font-medium ">{getValue()}</Text>
            ),
            header: () => <Text className="text-sm font-semibold">Giá </Text>,
        }),
        columnHelper.accessor((row) => row.building, {
            id: 'building',
            cell: ({ getValue }) => (
                <Box className="text-sm font-medium">
                    {
                        <Box
                            className={`inline-block rounded-md text-center px-4 py-2 text-sm font-semibold`}
                        >
                            {getValue()}
                        </Box>
                    }
                </Box>
            ),
            header: () => (
                <Text className="text-sm font-semibold">Tòa nhà</Text>
            ),
        }),
        columnHelper.accessor((row) => row.room_type, {
            id: 'room_type',
            cell: ({ getValue }) => (
                <Box className="text-sm font-medium">
                    {
                        <Box
                            className={`inline-block rounded-md text-center px-4 py-2 text-sm font-semibold`}
                        >
                            {getValue()}
                        </Box>
                    }
                </Box>
            ),
            header: () => (
                <Text className="text-sm font-semibold">Loại phòng</Text>
            ),
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
        // columnHelper.accessor((row) => row.createdBy, {
        //     id: 'createdBy',
        //     cell: ({ getValue }) => (
        //         <Text className="text-sm font-medium">
        //             {getValue() || 'Đang cập nhật'}
        //         </Text>
        //     ),
        //     header: () => (
        //         <Text className="text-sm font-semibold">Người tạo</Text>
        //     ),
        // }),
        // columnHelper.accessor((row) => row.updatedBy, {
        //     id: 'updatedBy',
        //     cell: ({ getValue }) => (
        //         <Text className="text-sm font-medium">
        //             {getValue() || 'Đang cập nhật'}
        //         </Text>
        //     ),
        //     header: () => (
        //         <Text className="text-sm font-semibold">Người cập nhật</Text>
        //     ),
        // }),
        // columnHelper.accessor((row) => row.createdAt, {
        //     id: 'createdAt',
        //     cell: ({ getValue }) => (
        //         <Text className="text-sm font-medium">
        //             {moment.unix(getValue()).format('DD/MM/YYYY HH:mm:ss')}
        //         </Text>
        //     ),
        //     header: () => (
        //         <Text className="text-sm font-semibold">Ngày tạo</Text>
        //     ),
        // }),
        // columnHelper.accessor((row) => row.updatedAt, {
        //     id: 'updatedAt',
        //     cell: ({ getValue }) => (
        //         <Text className="text-sm font-medium">
        //             {moment.unix(getValue()).format('DD/MM/YYYY HH:mm:ss')}
        //         </Text>
        //     ),
        //     header: () => (
        //         <Text className="text-sm font-semibold">Ngày cập nhật</Text>
        //     ),
        // }),

        // Display Column
        columnHelper.display({
            id: 'actions',
            cell: ({ row }) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
                                label="Xem"
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
                                label="Chỉnh sửa"
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
                                label="Xóa bài viêt"
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
                        Danh Sách Bài Viết
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
                <Controller
                    name="status"
                    // eslint-disable-next-line react/jsx-sort-props
                    control={control}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
                            label="Trạng thái"
                            placeholder="-- Chọn trạng thái --"
                            {...field}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="news_group"
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    render={({ field }) => (
                        <Select
                            className="col-span-3"
                            data={HOT.map(
                                (item: {
                                    id: number | string;
                                    name: string;
                                }) => ({
                                    label: item.name,
                                    value: String(item.id),
                                }),
                            )}
                            label="Nổi bật"
                            placeholder="-- Chọn nhóm --"
                            {...field}
                        />
                    )}
                />

                <TextInput
                    className="col-span-6"
                    leftSection={<SearchIcon size={20} />}
                    placeholder="Nhập từ khóa"
                    styles={{
                        input: {
                            paddingLeft: 36,
                        },
                        section: {
                            marginLeft: 4,
                        },
                    }}
                    label="Tìm kiếm "
                    {...register('title')}
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

            {/* Thêm bài viết */}
            <Modal
                centered
                className="rounded-xl overflow-hidden"
                onClose={closeCreate}
                opened={openedCreate}
                size="100%"
                title={
                    <Text className="text-lg font-semibold">
                        Thêm mới bài viết
                    </Text>
                }
                transitionProps={{
                    transition: 'fade',
                    duration: 200,
                }}
            >
                <AddNew
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    newDetailList={newDetailList?.map((language: any) => ({
                        languageId: language?.id,
                        languageCode: language?.languageCode,
                        languageDescription: language?.description,
                    }))}
                    onClose={closeCreate}
                />
            </Modal>

            {/* view bài viết */}
            <Modal
                centered
                className="rounded-xl overflow-hidden"
                onClose={closeView}
                opened={opendView}
                size="80%"
                title={<Text className="text-lg font-semibold">Preview</Text>}
                transitionProps={{
                    transition: 'fade',
                    duration: 200,
                }}
            >
                {!isFetching && <ViewNew newDetail={newDetail} />}
            </Modal>

            {/* Cập nhật bài viết */}
            <Modal
                centered
                className="rounded-xl overflow-hidden"
                onClose={closeUpdate}
                opened={openedUpdate}
                size="100%"
                title={
                    <Text className="text-lg font-semibold">
                        Cập nhật bài viết
                    </Text>
                }
                transitionProps={{
                    transition: 'fade',
                    duration: 200,
                }}
            >
                {!isFetching && (
                    <UpdateNew newDetail={newDetail} onClose={closeUpdate} />
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

export default News;
