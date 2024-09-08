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

import { useEffect, useState } from 'react';
import moment from 'moment/moment';
import { ROLES, STATUS } from '@src/utils/contants';
import { Controller, useForm } from 'react-hook-form';
import { useDebounce } from '@uidotdev/usehooks';
import { notifications } from '@mantine/notifications';
import TooltipCustom from '../common/tooltip';
// import { ResetIcon } from '../common/icon/reset-icon';
import { convertDate } from '@src/utils/convertData';
import AddCategory from './add_category';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any

type Tquery = {
    page: number;
    pageSize: number;
    status: number | string;
    title: string;
};

const Category = () => {
    const [id, setID] = useState<number | null>(null);
    const [userName, setUserName] = useState<string | null>(null);
    const [user, setUser] = useState({});
    const [query, setQuery] = useState<Tquery>({
        status: '',
        title: '',
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

    // useEffect(() => {
    //     if (query) {
    //         setQuery({
    //             ...query,
    //             status: watch('status'),
    //             roleId: watch('roleId'),
    //             name: watch('name'),
    //         });
    //     }
    // }, [watch('status'), watch('name'), watch('roleId')]);

    // const [deleteUser] = useDeleteOneUsersMutation();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [openedCreate, { open: openCreate, close: closeCreate }] =
        useDisclosure(false);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [openedUpdate, { open: openUpdate, close: closeUpdate }] =
        useDisclosure(false);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [opendConfirm, { open: openConfirm, close: closeConfirm }] =
        useDisclosure(false);

    // const handleDeleteDoc = async () => {
    //     if (id) {
    //         try {
    //             await deleteUser(id).unwrap();

    //             notifications.show({
    //                 title: 'Thành công',
    //                 color: '#06d6a0',
    //                 autoClose: 2000,
    //                 message: 'Xóa tài khoản thành công',
    //             });
    //             // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //         } catch (error: any) {
    //             notifications.show({
    //                 title: 'Lỗi',
    //                 color: '#ef476f',
    //                 autoClose: 2000,
    //                 message: JSON.stringify(error?.data?.error),
    //             });
    //         }
    //     }
    // };

    return (
        <Box className="mx-10 mb-24 px-6 py-8 bg-white rounded-xl max-h-max">
            <Flex align="center" justify="space-between">
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
                <AddCategory onClose={closeCreate} />
            </Modal>

            {/* Cập nhật người dùng */}
            {/* <Modal
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
            </Modal> */}

            {/* confirm */}
            {/* <CustomConfirm
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
            </CustomConfirm> */}
        </Box>
    );
};

export default Category;
