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
import MenuIcon from '@src/components/common/icon/menu-icon';
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
// import ViewBoarding from './view-boardding';
import { useRouter } from 'next/router';
type BoardingsProps = {
    idBuilding: any;
};

type TBoardingsHouse = {
    page: number;
    pageSize: number;
    name: string;
    type: number;
    type_name: string;
    count_customer: string;
    price: string;
    time_pay: string;
    status_pay: number | string;
    status: number | string;
};

const BoardingsHouse = () => {
    const items: any = [
        { title: 'Trang chủ', href: '/' },
        { title: 'Phòng trọ' },
    ].map((item, index) => (
        <Box key={index}>
            {item.href ? (
                <Link
                    className="text-sm font-medium text-primary-gray no-underline"
                    href={item.href as string}
                    key={index}
                >
                    {item.title}
                </Link>
            ) : (
                <span className="text-sm font-medium text-primary-gray">
                    {item.title}
                </span>
            )}
        </Box>
    ));

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
                name: 'Phòng số 1',
                type: 1,
                type_name: 'Loại phòng cao cấp',
                count_customer: 3,
                price: '3.000.000đ',
                time_pay: 'ngày M-10 - hàng tháng',
                status_pay: 1,
                status: 1,
            },
            {
                id: 2,
                name: 'Phòng số 2',
                type: 1,
                type_name: 'Loại phòng cao cấp siêu víp',
                count_customer: 5,
                price: '5.000.000đ',
                time_pay: 'ngày M-10 - hàng tháng',
                status_pay: 1,
                status: 1,
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
    const [query, setQuery] = useState<TBoardingsHouse>({
        page: 1,
        pageSize: 10,
        name: '',
        type: 0,
        type_name: '',
        count_customer: '',
        price: '',
        time_pay: '',
        status_pay: '',
        status: '',
    });

    const debouncedQuery = useDebounce(query, 300);

    const { control, register, watch } = useForm({
        defaultValues: {
            status: '',
            name: '',
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

    const columnHelper = createColumnHelper<TBoardingsHouse>();
    const [opendView, { open: openView, close: closeView }] =
        useDisclosure(false);
    const [openedBoarding, { open: openBoarding, close: closeBoarding }] =
        useDisclosure(false);

    const { data: boardingsDetail, isFetching } = useGetNewsQuery(
        { id: id },
        { skip: !id },
    );
    const router = useRouter();
    const handleClickBoarding = (id: any) => {
        router.push(`/buildings/${id}`);
    };

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

    const columns: ColumnDef<TBoardingsHouse, any>[] = [
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
        columnHelper.accessor((row) => row.name, {
            id: 'name',
            cell: ({ getValue }) => (
                <Text className="text-sm font-medium">{getValue()}</Text>
            ),
            header: () => <Text className="text-sm font-semibold">Họ Tên</Text>,
        }),
        columnHelper.accessor((row) => row.type_name, {
            id: 'type_name',
            cell: ({ getValue }) => (
                <Text className="text-sm font-medium">{getValue()}</Text>
            ),
            header: () => (
                <Text className="text-sm font-semibold">Loại phòng</Text>
            ),
        }),
        columnHelper.accessor((row) => row.price, {
            id: 'price',
            cell: ({ getValue }) => (
                <Text className="text-sm font-medium">{getValue()}</Text>
            ),
            header: () => (
                <Text className="text-sm font-semibold">Giá phòng</Text>
            ),
        }),
        columnHelper.accessor((row) => row.count_customer, {
            id: 'count_customer',
            cell: ({ getValue }) => (
                <Text className="text-sm font-medium">{getValue()}</Text>
            ),
            header: () => (
                <Text className="text-sm font-semibold">Số lượng người ở</Text>
            ),
        }),
        columnHelper.accessor((row) => row.time_pay, {
            id: 'time_pay',
            cell: ({ getValue }) => (
                <Text className="text-sm font-medium">{getValue()}</Text>
            ),
            header: () => (
                <Text className="text-sm font-semibold">
                    Thời gian thanh toán
                </Text>
            ),
        }),
        columnHelper.accessor((row) => row.status_pay, {
            id: 'status_pay',
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
                            {getValue() == 1
                                ? 'Thanh toán 1 phần'
                                : 'Chưa thanh toán'}
                        </Box>
                    }
                </Box>
            ),
            header: () => (
                <Text className="text-sm font-semibold">
                    Trạng thái thanh toán
                </Text>
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
                                label="Chi tiết phòng trọ"
                                color="#f1be46"
                                element={<EyeIcon size={20} />}
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
                        Danh Sách phòng trọ
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
            </Flex>

            {/* Bộ lọc */}
            <Flex className="w-full sm:w-1/2 mt-4 mb-6 flex flex-col sm:grid sm:grid-cols-12 gap-4">
                <TextInput
                    className="col-span-6"
                    leftSection={<SearchIcon size={20} />}
                    placeholder="Tìm kiếm tên phòng trọ"
                    styles={{
                        input: {
                            paddingLeft: 36,
                        },
                        section: {
                            marginLeft: 4,
                        },
                    }}
                    {...register('name')}
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
            {/* chi tiêt */}
            <Modal
                centered
                className="rounded-xl overflow-hidden"
                onClose={closeView}
                opened={opendView}
                size="80%"
                title={
                    <Text className="text-lg font-semibold">
                        Chi tiết phòng trọ
                    </Text>
                }
                transitionProps={{
                    transition: 'fade',
                    duration: 200,
                }}
            >
                {/* {!isFetching && (
                    <ViewBoarding boardingDetail={boardingsDetail} />
                )} */}
            </Modal>
        </Box>
    );
};

export default BoardingsHouse;
