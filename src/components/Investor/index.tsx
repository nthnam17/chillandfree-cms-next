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
import AddInvestor from './add-investor';
import UpdateInvestor from './update-investor';
import CustomConfirm from '@src/components/common/CustomConfirm';
import CustomConfirmStatus from '@src/components/common/CustomConfirmStatus';
import SearchIcon from '../common/icon/search-icon';
import MenuIcon from '@src/components/common/icon/menu-icon';
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
import ViewInvestor from './view-investor';
import { useRouter } from 'next/router';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
const items: any = [
    { title: 'Trang chủ', href: '/' },
    { title: 'Chủ đầu tư, chủ trọ', href: '/partners/customer_list' },
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

type TInvestor = {
    page: number;
    pageSize: number;
    status: number | string;
    full_name: string;
    email: string;
    phone: string;
    address: string;
};

const Investor = () => {
    const router = useRouter();
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
                full_name: 'Trương Văn B',
                email: 'email@gmail.com',
                phone: '0974381465',
                address: 'Việt Nam',
                status: 1,
            },
            {
                id: 1,
                full_name: 'Nguyễn Văn A',
                email: 'emailNVA@gmail.com',
                phone: '0123456789',
                address: 'Việt Nam',
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
    const [query, setQuery] = useState<TInvestor>({
        status: '',
        full_name: '',
        page: 1,
        pageSize: 10,
        email: '',
        phone: '',
        address: '',
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

    const columnHelper = createColumnHelper<TInvestor>();
    const [openedCreate, { open: openCreate, close: closeCreate }] =
        useDisclosure(false);

    const [openedUpdate, { open: openUpdate, close: closeUpdate }] =
        useDisclosure(false);

    const [opendConfirm, { open: openConfirm, close: closeConfirm }] =
        useDisclosure(false);

    const [
        opendConfirmStatus,
        { open: openConfirmStatus, close: closeConfirmStatus },
    ] = useDisclosure(false);
    const [opendView, { open: openView, close: closeView }] =
        useDisclosure(false);

    const { data: investorDetail, isFetching } = useGetNewsQuery(
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

    const handleClickBuildings = (id: any) => {
        router.push(`/buildings/${id}`);
    };

    const handleUpdateStatus = async () => {};
    const { data: investorDetailList } = useGetAllLanguageQuery({});

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const columns: ColumnDef<TInvestor, any>[] = [
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
        columnHelper.accessor((row) => row.full_name, {
            id: 'title',
            cell: ({ getValue }) => (
                <Text className="text-sm font-medium">{getValue()}</Text>
            ),
            header: () => <Text className="text-sm font-semibold">Họ Tên</Text>,
        }),
        columnHelper.accessor((row) => row.email, {
            id: 'email',
            cell: ({ getValue }) => (
                <Text className="text-sm font-medium">{getValue()}</Text>
            ),
            header: () => <Text className="text-sm font-semibold">Email</Text>,
        }),
        columnHelper.accessor((row) => row.phone, {
            id: 'phone',
            cell: ({ getValue }) => (
                <Text className="text-sm font-medium">{getValue()}</Text>
            ),
            header: () => (
                <Text className="text-sm font-semibold">Số điện thoại</Text>
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
                            {getValue() == 1 ? 'Đang hợp tác' : 'Ngừng hợp tác'}
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
                                label="Xóa chủ đầu tư, chủ trọ"
                                color="#ef466f"
                                element={<DeleteIcon />}
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
                                label="Duyệt chủ đầu tư, chủ nhà"
                                color="#ef466f"
                                element={<EditIcon />}
                            />
                        </Box>
                        <Box
                            className="flex items-center max-h-full  text-delete cursor-pointer"
                            onClick={() => handleClickBuildings(doc.id)}
                        >
                            <TooltipCustom
                                label="Danh sách tòa nhà"
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
                        Danh Sách Chủ Đầu Tư, Chủ Trọ
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
                    placeholder="Tìm kiếm tên chủ đầu tư, chủ nhà"
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
                size="100%"
                title={
                    <Text className="text-lg font-semibold">
                        Thêm mới chủ đầu tư, chủ trọ
                    </Text>
                }
                transitionProps={{
                    transition: 'fade',
                    duration: 200,
                }}
            >
                <AddInvestor
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
                {!isFetching && <ViewInvestor newDetail={investorDetail} />}
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
                        Cập nhật chủ đàu tư, chủ trọ
                    </Text>
                }
                transitionProps={{
                    transition: 'fade',
                    duration: 200,
                }}
            >
                {!isFetching && (
                    <UpdateInvestor
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

            {/* confirm */}
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

export default Investor;
