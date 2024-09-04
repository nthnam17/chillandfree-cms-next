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
import ViewBuildings from './view-buildings';
import { useRouter } from 'next/router';
const items: any = [
    { title: 'Trang chủ', href: '/' },
    { title: 'Chủ đầu tư, chủ trọ', href: '/partners/Investor_list' },
    { title: 'Tòa Nhà' },
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

type TBuildings = {
    page: number;
    pageSize: number;
    status: number | string;
    description: string;
    phone: string;
    address: string;
    name: string;
};

const Buildings = () => {
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
                name: 'Tòa nhà A',
                description: 'Tòa nhà có 4 phòng trọ',
                phone: '0123456799',
                address: 'Việt Nam',
                status: 1,
            },
            {
                id: 1,
                name: 'Tòa nhà B',
                description: 'Tòa nhà có 14 phòng trọ vip',
                phone: '0123456799',
                address: 'Việt Nam',
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
    const [query, setQuery] = useState<TBuildings>({
        status: '',
        name: '',
        page: 1,
        pageSize: 10,
        description: '',
        phone: '',
        address: '',
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

    const columnHelper = createColumnHelper<TBuildings>();
    const [opendView, { open: openView, close: closeView }] =
        useDisclosure(false);
    const [openedBoarding, { open: openBoarding, close: closeBoarding }] =
        useDisclosure(false);

    const { data: buildingsDetail, isFetching } = useGetNewsQuery(
        { id: id },
        { skip: !id },
    );
    const router = useRouter();
    const handleClickBoarding = (id: any) => {
        router.push(`/boarding-house/${id}`);
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

    const columns: ColumnDef<TBuildings, any>[] = [
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
        columnHelper.accessor((row) => row.description, {
            id: 'description',
            cell: ({ getValue }) => (
                <Text className="text-sm font-medium">{getValue()}</Text>
            ),
            header: () => (
                <Text className="text-sm font-semibold">Mô tả ngắn</Text>
            ),
        }),
        columnHelper.accessor((row) => row.phone, {
            id: 'phone',
            cell: ({ getValue }) => (
                <Text className="text-sm font-medium">{getValue()}</Text>
            ),
            header: () => (
                <Text className="text-sm font-semibold">
                    Số điện thoại tòa nhà
                </Text>
            ),
        }),
        columnHelper.accessor((row) => row.address, {
            id: 'address',
            cell: ({ getValue }) => (
                <Text className="text-sm font-medium">{getValue()}</Text>
            ),
            header: () => (
                <Text className="text-sm font-semibold">Địa chỉ</Text>
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
                                label="Chi tiết tòa nhà"
                                color="#f1be46"
                                element={<EyeIcon size={20} />}
                            />
                        </Box>

                        <Box
                            className="flex items-center max-h-full  text-delete cursor-pointer"
                            onClick={() => handleClickBoarding(doc.id)}
                        >
                            <TooltipCustom
                                label="Danh sách phòng trọ"
                                color="#ef466f"
                                element={<MenuIcon />}
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
                        Danh Sách Tòa nhà
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
                    placeholder="Tìm kiếm tên tòa nhà"
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
                        Chi tiết tòa nhà
                    </Text>
                }
                transitionProps={{
                    transition: 'fade',
                    duration: 200,
                }}
            >
                {!isFetching && (
                    <ViewBuildings buildingDetail={buildingsDetail} />
                )}
            </Modal>
        </Box>
    );
};

export default Buildings;
