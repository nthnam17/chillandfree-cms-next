/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-sort-props */
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
import CustomConfirm from '@src/components/common/CustomConfirm';
import SearchIcon from '@src/components/common/icon/search-icon';
import AddAccount from './add-account';
import UpdateAccount from './update-account';
import {
    useDeleteOneUsersMutation,
    useGetListUserQuery,
    useResetPasswordMutation,
} from '@src/redux/endPoint/accounts';
import { useEffect, useState } from 'react';
import moment from 'moment/moment';
import { ROLES, STATUS } from '@src/utils/contants';
import { Controller, useForm } from 'react-hook-form';
import { useDebounce } from '@uidotdev/usehooks';
import { TAccounts } from '@src/types/user';
import { notifications } from '@mantine/notifications';
import TooltipCustom from '../common/tooltip';
import { ResetIcon } from '../common/icon/reset-icon';
import { convertDate } from '@src/utils/convertData';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
const items: any = [
    { title: 'Trang chủ', href: '/' },
    { title: 'Người dùng', href: '/accounts' },
].map((item, index) => (
    <Box key={index}>
        <Link
            className="text-sm font-medium text-primary-gray no-underline"
            href={item.href as string}
        >
            {item.title}
        </Link>
    </Box>
));

type Tquery = {
    page: number;
    pageSize: number;
    status: number | string;
    roleId: number | string;
    name: string;
};

const News = () => {
    const [id, setID] = useState<number | null>(null);
    const [userName, setUserName] = useState<string | null>(null);
    const [user, setUser] = useState({});
    const [query, setQuery] = useState<Tquery>({
        status: '',
        roleId: '',
        name: '',
        page: 1,
        pageSize: 10,
    });

    const debouncedQuery = useDebounce(query, 300);

    const { control, register, watch } = useForm({
        defaultValues: {
            status: '',
            roleId: '',
            name: '',
        },
    });

    useEffect(() => {
        if (query) {
            setQuery({
                ...query,
                status: watch('status'),
                roleId: watch('roleId'),
                name: watch('name'),
            });
        }
    }, [watch('status'), watch('name'), watch('roleId')]);

    const [deleteUser] = useDeleteOneUsersMutation();
    const [resetPassword] = useResetPasswordMutation();

    const columnHelper = createColumnHelper<TAccounts>();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [openedCreate, { open: openCreate, close: closeCreate }] =
        useDisclosure(false);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [openedUpdate, { open: openUpdate, close: closeUpdate }] =
        useDisclosure(false);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [opendConfirm, { open: openConfirm, close: closeConfirm }] =
        useDisclosure(false);
    const [
        opendConfirmResetPass,
        { open: openConfirmResetPass, close: closeConfirmResetPass },
    ] = useDisclosure(false);

    const handleDeleteDoc = async () => {
        if (id) {
            try {
                await deleteUser(id).unwrap();

                notifications.show({
                    title: 'Thành công',
                    color: '#06d6a0',
                    autoClose: 2000,
                    message: 'Xóa tài khoản thành công',
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
        }
    };
    const handleResetPass = async () => {
        if (id) {
            try {
                await resetPassword(id).unwrap();

                notifications.show({
                    title: 'Thành công',
                    color: '#06d6a0',
                    autoClose: 2000,
                    message: 'Khôi phục mật khẩu thành công',
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
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const columns: ColumnDef<TAccounts, any>[] = [
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
        columnHelper.accessor((row) => row.name, {
            id: 'name',
            cell: ({ getValue }) => (
                <Text className="text-sm font-medium">{getValue()}</Text>
            ),
            header: () => (
                <Text className="text-sm font-semibold">Tên người dùng</Text>
            ),
        }),
        columnHelper.accessor((row) => row.username, {
            id: 'username',
            cell: ({ getValue }) => (
                <Text className="text-sm font-medium">{getValue()}</Text>
            ),
            header: () => (
                <Text className="text-sm font-semibold">Tên đăng nhập</Text>
            ),
        }),
        columnHelper.accessor((row) => row.roles?.name, {
            id: 'roles',
            cell: ({ getValue }) => (
                <Text className="text-sm font-medium">{getValue()}</Text>
            ),
            header: () => <Text className="text-sm font-semibold">Quyền</Text>,
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
        columnHelper.accessor((row) => row.createdBy, {
            id: 'createdBy',
            cell: ({ getValue }) => (
                <Text className="text-sm font-medium">
                    {getValue() || 'Đang cập nhật'}
                </Text>
            ),
            header: () => (
                <Text className="text-sm font-semibold">Người tạo</Text>
            ),
        }),
        columnHelper.accessor((row) => row.updatedBy, {
            id: 'updatedBy',
            cell: ({ getValue }) => (
                <Text className="text-sm font-medium">
                    {getValue() || 'Đang cập nhật'}
                </Text>
            ),
            header: () => (
                <Text className="text-sm font-semibold">Người cập nhật</Text>
            ),
        }),
        columnHelper.accessor((row) => row.createdAt, {
            id: 'createdAt',
            cell: ({ getValue }) => (
                <Text className="text-sm font-medium">
                    {moment.unix(getValue()).format('DD/MM/YYYY HH:mm:ss')}
                </Text>
            ),
            header: () => (
                <Text className="text-sm font-semibold">Ngày tạo</Text>
            ),
        }),
        columnHelper.accessor((row) => row.updatedAt, {
            id: 'updatedAt',
            cell: ({ getValue }) => (
                <Text className="text-sm font-medium">
                    {convertDate(getValue())}
                    {/* {getValue()} */}
                    {/* {moment.unix(getValue()).format('DD/MM/YYYY HH:mm:ss')} */}
                </Text>
            ),
            header: () => (
                <Text className="text-sm font-semibold">Ngày sửa</Text>
            ),
        }),

        // Display Column
        columnHelper.display({
            id: 'actions',
            cell: ({ row }) => {
                const doc = row?.original;
                return (
                    <Box className="flex items-center gap-4">
                        <Box
                            className="flex items-center max-h-full  text-delete cursor-pointer"
                            onClick={() => {
                                openConfirmResetPass();
                                setID(doc.id as number);
                                setUserName(doc.username as string);
                            }}
                        >
                            <TooltipCustom
                                label={'Khôi phục mật khẩu'}
                                color="#979797"
                                element={<ResetIcon size={20} fill="#979797" />}
                            />
                        </Box>
                        <Box
                            className="flex items-center max-h-full text-primary-edit cursor-pointer"
                            onClick={() => {
                                setUser({
                                    id: doc.id,
                                    name: doc.name,
                                    email: doc.email,
                                    phone: doc.phone,
                                    username: doc.username,
                                    avatar: doc.avatar,
                                    status: doc.status,
                                    roleId: doc.roles?.id,
                                });
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
                                label="Xóa người dùng"
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
        <Box className="mx-10 mb-24 px-6 py-8 bg-white shadow-sm rounded-xl max-h-max border border-dashed border-primary-border">
            <Flex align="center" justify="space-between">
                <Box>
                    <Title className="text-lg text-primary-black uppercase">
                        Danh Sách Người Dùng
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
                        onClick={openCreate}
                    >
                        Thêm Mới
                    </Button>
                </Box>
            </Flex>

            {/* Bộ lọc */}
            <Flex className="w-1/2 mt-4 mb-6 grid grid-cols-12 gap-4">
                <Controller
                    name="status"
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
                            placeholder="-- Chọn trạng thái --"
                            {...field}
                        />
                    )}
                />

                <Controller
                    name="roleId"
                    control={control}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    render={({ field }) => (
                        <Select
                            className="col-span-3"
                            data={ROLES.map(
                                (item: {
                                    id: number | string;
                                    name: string;
                                }) => ({
                                    label: item.name,
                                    value: String(item.id),
                                }),
                            )}
                            placeholder="-- Chọn quyền --"
                            {...field}
                        />
                    )}
                />

                <TextInput
                    className="col-span-6"
                    leftSection={<SearchIcon size={20} />}
                    placeholder="Tìm kiếm tên người dùng"
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
            </Flex>

            {/* Tabel */}
            <Box className="m-[auto] w-full ease-in-out duration-300">
                <DataTable
                    columns={columns}
                    useData={useGetListUserQuery}
                    query={debouncedQuery}
                />
            </Box>

            {/* Thêm bài viết */}
            <Modal
                centered
                className="rounded-xl overflow-hidden"
                onClose={closeCreate}
                opened={openedCreate}
                size="50%"
                title={
                    <Text className="text-base font-semibold uppercase">
                        Thêm mới người dùng
                    </Text>
                }
                transitionProps={{
                    transition: 'fade',
                    duration: 100,
                }}
            >
                <AddAccount onClose={closeCreate} />
            </Modal>

            {/* Cập nhật người dùng */}
            <Modal
                centered
                className="rounded-xl overflow-hidden"
                onClose={closeUpdate}
                opened={openedUpdate}
                size="50%"
                title={
                    <Text className="text-base font-semibold uppercase">
                        Cập nhật người dùng
                    </Text>
                }
                transitionProps={{
                    transition: 'fade',
                    duration: 200,
                }}
            >
                <UpdateAccount onClose={closeUpdate} user={user} />
            </Modal>

            {/* confirm */}
            <CustomConfirm
                onCancel={closeConfirm}
                onClose={closeConfirm}
                onConfirm={handleDeleteDoc}
                opened={opendConfirm}
            >
                <Box className="my-2">
                    <Text className="text-sm">
                        Hàng động thực hiện có thể ảnh hưởng dữ liệu của bạn
                    </Text>
                </Box>
            </CustomConfirm>
            {/* reset pass */}
            <CustomConfirm
                onCancel={closeConfirmResetPass}
                onClose={closeConfirmResetPass}
                onConfirm={handleResetPass}
                opened={opendConfirmResetPass}
                title="Khôi phục mật khẩu"
            >
                <Box className="my-2">
                    <Text className="text-sm">
                        Bạn muốn khôi phục mật khẩu tài khoản &quot;
                        {userName}&quot; ?
                    </Text>
                </Box>
            </CustomConfirm>
        </Box>
    );
};

export default News;
