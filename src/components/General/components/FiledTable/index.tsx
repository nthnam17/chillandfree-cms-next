import { Avatar, Box, Button, Flex, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import CustomConfirm from '@src/components/common/CustomConfirm';
import AddIcon from '@src/components/common/icon/add-icon';
import { DeleteIcon } from '@src/components/common/icon/delete-icon';
import { EditIcon } from '@src/components/common/icon/edit-icon';
import DataTable from '@src/components/common/table';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import React, { useState } from 'react';
import AddFiled from './add-filed';
import { TGeneralField } from '@src/types/general';
import Link from 'next/link';
import {
    useDeleteOneGeneralFieldMutation,
    useGetListGeneralFieldQuery,
} from '@src/redux/endPoint/general';
import EditFiled from './edit-filed';
import TooltipCustom from '@src/components/common/tooltip';

type Props = {
    generalId: number;
};
const FiledTable = ({ generalId }: Props) => {
    const [filedId, setFiledId] = useState<number | null>(null);
    const debouncedQuery = { page: 1, pageSize: 10 };
    const [deleteOneGeneralField] = useDeleteOneGeneralFieldMutation();

    const columnHelper = createColumnHelper<TGeneralField>();

    const [openedCreate, { open: openCreate, close: closeCreate }] =
        useDisclosure(false);

    const [openedUpdate, { open: openUpdate, close: closeUpdate }] =
        useDisclosure(false);

    const [opendConfirm, { open: openConfirm, close: closeConfirm }] =
        useDisclosure(false);

    const handleDeleteDoc = async () => {
        if (filedId) {
            try {
                await deleteOneGeneralField(filedId).unwrap();
                notifications.show({
                    title: 'Thành công',
                    color: '#06d6a0',
                    autoClose: 2000,
                    message: 'Xóa lĩnh vực phát triển thành công',
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
    const columns: ColumnDef<TGeneralField, any>[] = [
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
        columnHelper.accessor((row) => row.icon, {
            id: 'icon',
            cell: ({ getValue }) => (
                <Avatar
                    variant="filled"
                    radius="sm"
                    src={`${
                        process.env.PUBLIC_IMAGE_API_BASE_URL
                    }${getValue()}`}
                />
            ),
            header: () => <Text className="text-sm font-semibold">Icon</Text>,
        }),
        columnHelper.accessor((row) => row.title, {
            id: 'title',
            cell: ({ getValue }) => (
                <Text className="text-sm font-medium">{getValue()}</Text>
            ),
            header: () => (
                <Text className="text-sm font-semibold">Tên lĩnh vực</Text>
            ),
        }),
        columnHelper.accessor((row) => row.slug, {
            id: 'slug',
            cell: ({ getValue }) => (
                <Text className="text-sm font-medium">{getValue()}</Text>
            ),
            header: () => (
                <Text className="text-sm font-semibold">Đường dẫn</Text>
            ),
        }),
        columnHelper.accessor((row) => row.linkMedia, {
            id: 'linkMedia',
            cell: ({ getValue }) => (
                <Text className="text-sm font-medium">
                    <Link href={getValue() || '/'} target="_blank">
                        {getValue()}
                    </Link>
                </Text>
            ),
            header: () => (
                <Text className="text-sm font-semibold">Link Video</Text>
            ),
        }),
        columnHelper.accessor((row) => row.position, {
            id: 'position',
            cell: ({ getValue }) => (
                <Text className="text-sm font-medium">{getValue()}</Text>
            ),
            header: () => <Text className="text-sm font-semibold">Vị trí</Text>,
        }),

        // Display Column
        columnHelper.display({
            id: 'actions',
            cell: ({ row }) => {
                const doc = row?.original;
                return (
                    <Box className="flex items-center gap-4">
                        <Box
                            className="flex items-center max-h-full text-primary-edit cursor-pointer"
                            onClick={() => {
                                setFiledId(doc.id as number);
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
                                setFiledId(doc.id as number);
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
        <Box className="bg-white shadow-sm rounded-xl max-h-max ">
            <Flex align="center" justify="space-between">
                <Box>
                    <Button
                        className=" min-h-[42px] mb-5 rounded-lg bg-success-opcity text-sm text-success font-medium"
                        leftSection={<AddIcon />}
                        onClick={openCreate}
                    >
                        Thêm Mới
                    </Button>
                </Box>
            </Flex>

            {/* Tabel */}
            <Box className="m-[auto] w-full ease-in-out duration-300">
                <DataTable
                    columns={columns}
                    query={debouncedQuery}
                    useData={useGetListGeneralFieldQuery}
                />
            </Box>

            {/* Thêm mới */}
            <Modal
                centered
                className="rounded-xl overflow-hidden"
                onClose={closeCreate}
                opened={openedCreate}
                size="70%"
                title={
                    <Text className="text-base font-semibold uppercase">
                        Thêm mới lĩnh vực phát triển
                    </Text>
                }
                transitionProps={{
                    transition: 'fade',
                    duration: 100,
                }}
            >
                <AddFiled onClose={closeCreate} generalId={generalId} />
            </Modal>

            {/* Chỉnh sửa */}
            <Modal
                centered
                className="rounded-xl overflow-hidden"
                onClose={closeUpdate}
                opened={openedUpdate}
                size="70%"
                title={
                    <Text className="text-base font-semibold uppercase">
                        Cập nhật lĩnh vực phát triển
                    </Text>
                }
                transitionProps={{
                    transition: 'fade',
                    duration: 200,
                }}
            >
                {filedId && (
                    <EditFiled
                        filedId={filedId as number}
                        onClose={closeUpdate}
                    />
                )}
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
        </Box>
    );
};

export default FiledTable;
