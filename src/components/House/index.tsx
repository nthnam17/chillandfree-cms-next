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
import AddHouse from './add-house';
import UpdateHouse from './update-house';
import CustomConfirm from '@src/components/common/CustomConfirm';
import CustomConfirmStatus from '@src/components/common/CustomConfirmStatus';
import ResetIcon from '@src/components/common/icon/reset-icon';
import SearchIcon from '../common/icon/search-icon';
import { notifications } from '@mantine/notifications';
import MenuIcon from '@src/components/common/icon/menu-icon';
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
import { useRouter } from 'next/router';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
const items: any = [
    { title: 'Trang chủ', href: '/' },
    { title: 'Nhà', href: '/house/list_house' },
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

type THouse = {
    page: number;
    pageSize: number;
    status: number | string;
    name: string;
    province_city: number;
    province_city_name: string;
    district: number;
    district_name: string;
};

const House = () => {
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
                name: 'Nhà 3 tầng',
                province_city: '1',
                province_city_name: 'Hà Nội',
                district: 1,
                district_name: 'Nam từ liêm',
                status: 1,
            },
            {
                id: 1,
                name: 'Nhà 7 tầng',
                province_city: '1',
                province_city_name: 'Hồ Chí Minh',
                district: 1,
                district_name: 'Quận 10',
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
    const [query, setQuery] = useState<THouse>({
        status: '',
        name: '',
        page: 1,
        pageSize: 10,
        province_city_name: '',
        district_name: '',
        province_city: 0,
        district: 0,
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

    const columnHelper = createColumnHelper<THouse>();
    const [openedCreate, { open: openCreate, close: closeCreate }] =
        useDisclosure(false);

    const [openedUpdate, { open: openUpdate, close: closeUpdate }] =
        useDisclosure(false);

    const [opendConfirm, { open: openConfirm, close: closeConfirm }] =
        useDisclosure(false);

    const [opendView, { open: openView, close: closeView }] =
        useDisclosure(false);
    const [
        opendConfirmStatus,
        { open: openConfirmStatus, close: closeConfirmStatus },
    ] = useDisclosure(false);

    const { data: investorDetail, isFetching } = useGetNewsQuery(
        { id: id },
        { skip: !id },
    );

    const [deleteNews] = useDeleteNewsMutation();
    const handleUpdateStatus = async () => {};
    const router = useRouter();
    const handleClickBoarding = (id: any) => {
        router.push(`/boarding-house/${id}`);
    };

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

    const columns: ColumnDef<THouse, any>[] = [
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
            header: () => <Text className="text-sm font-semibold">Tên</Text>,
        }),
        columnHelper.accessor((row) => row.province_city_name, {
            id: 'province_city_name',
            cell: ({ getValue }) => (
                <Text className="text-sm font-medium">{getValue()}</Text>
            ),
            header: () => (
                <Text className="text-sm font-semibold">Tỉnh/TP</Text>
            ),
        }),
        columnHelper.accessor((row) => row.district_name, {
            id: 'district_name',
            cell: ({ getValue }) => (
                <Text className="text-sm font-medium">{getValue()}</Text>
            ),
            header: () => (
                <Text className="text-sm font-semibold">Quận/Huyện</Text>
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
                            {getValue() == 1 ? 'Còn phòng' : 'Hết phòng'}
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
                                openConfirmStatus();
                                setID(doc.id as number);
                            }}
                        >
                            <TooltipCustom
                                label="Cập nhật trạng thái"
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
                                label="Xóa chủ đầu tư, chủ trọ"
                                color="#ef466f"
                                element={<DeleteIcon />}
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
                        Danh Sách Nhà
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
                    placeholder="Tìm kiếm tên nhà"
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

            {/* Thêm mới*/}
            <Modal
                centered
                className="rounded-xl overflow-hidden"
                onClose={closeCreate}
                opened={openedCreate}
                size="100%"
                title={
                    <Text className="text-lg font-semibold">Thêm mới nhà</Text>
                }
                transitionProps={{
                    transition: 'fade',
                    duration: 200,
                }}
            >
                <AddHouse
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
                {/* {!isFetching && <ViewCustomer newDetail={investorDetail} />} */}
            </Modal>

            {/* Cập nhật */}
            <Modal
                centered
                className="rounded-xl overflow-hidden"
                onClose={closeUpdate}
                opened={openedUpdate}
                size="100%"
                title={
                    <Text className="text-lg font-semibold">
                        Cập nhật thông tin tòa nhà
                    </Text>
                }
                transitionProps={{
                    transition: 'fade',
                    duration: 200,
                }}
            >
                {!isFetching && (
                    <UpdateHouse
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
                        Hành động thực hiện có thể ảnh hưởng dữ liệu của bạn
                    </Text>
                </Box>
            </CustomConfirm>

            {/* confirm status */}
            <CustomConfirmStatus
                onCancel={closeConfirmStatus}
                onClose={closeConfirmStatus}
                onConfirm={handleUpdateStatus}
                opened={opendConfirmStatus}
            >
                <Box className="my-2">
                    <Text className="text-sm">
                        Hành động thực hiện không thể hoàn tác
                    </Text>
                </Box>
            </CustomConfirmStatus>
        </Box>
    );
};

export default House;
