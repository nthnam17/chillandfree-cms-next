/* eslint-disable react-hooks/exhaustive-deps */
import AddIcon from '@icon/add-icon';
import { DeleteIcon } from '@icon/delete-icon';
import { EditIcon } from '@icon/edit-icon';
import SearchIcon from '@icon/search-icon';
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
import CustomConfirm from '@src/components/common/CustomConfirm';
import DataTable from '@src/components/common/table';
import {
    useDeleteLanguageMutation,
    useGetAllLanguageQuery,
    useGetDataLanguagesQuery,
} from '@src/redux/endPoint/language';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import Link from 'next/link';
import AddLanguage from './add-language';
import UpdateLanguage from './update-language';
import { useEffect, useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import { Controller, useForm } from 'react-hook-form';
import { STATUS } from '@src/utils/contants';
import { notifications } from '@mantine/notifications';
import TooltipCustom from '../common/tooltip';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
const items: any = [
    { title: 'Trang chủ', href: '/' },
    { title: 'Ngôn ngữ', href: '/language' },
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

type TLanguage = {
    id: number | string;
    description: string;
    status: number | string;
    languageCode: string;
    page: 1;
    pageSize: 10;
    createdBy: number | string;
    updatedBy: number | string;
    createdAt: number | string;
    updatedAt: number | string;
};

const Language = () => {
    const [id, setID] = useState<number | null>(null);

    const [language, setLanguage] = useState({});

    const [query, setQuery] = useState<TLanguage>({
        id: '',
        status: '',
        description: '',
        languageCode: '',
        page: 1,
        pageSize: 10,
        createdBy: '',
        updatedBy: '',
        createdAt: '',
        updatedAt: '',
    });

    const debouncedQuery = useDebounce(query, 300);

    const { control, register, watch } = useForm({
        defaultValues: {
            status: '',
            description: '',
        },
    });
    useEffect(() => {
        if (query) {
            setQuery({
                ...query,
                status: watch('status'),
                description: watch('description'),
            });
        }
    }, [watch('status'), watch('description')]);

    const columnHelper = createColumnHelper<TLanguage>();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [openedCreate, { open: openCreate, close: closeCreate }] =
        useDisclosure(false);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [openedUpdate, { open: openUpdate, close: closeUpdate }] =
        useDisclosure(false);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [opendConfirm, { open: openConfirm, close: closeConfirm }] =
        useDisclosure(false);

    const { data: languages } = useGetAllLanguageQuery(query);

    const [deleteLanguage] = useDeleteLanguageMutation();
    const handleDelete = async () => {
        try {
            await deleteLanguage(id).unwrap();

            notifications.show({
                title: 'Thành công',
                color: '#06d6a0',
                autoClose: 2000,
                message: 'Xóa ngôn ngữ thành công',
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const columns: ColumnDef<TLanguage, any>[] = [
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
        columnHelper.accessor((row) => row.description, {
            id: 'description',
            cell: ({ getValue }) => (
                <Text className="text-sm font-medium">{getValue()}</Text>
            ),
            header: () => (
                <Text className="text-sm font-semibold">Ngôn ngữ</Text>
            ),
        }),
        columnHelper.accessor((row) => row.languageCode, {
            id: 'languageCode',
            cell: ({ getValue }) => (
                <Text className="text-sm font-medium">{getValue()}</Text>
            ),
            header: () => <Text className="text-sm font-semibold">Code</Text>,
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
                                setLanguage({
                                    id: doc.id,
                                    description: doc.description,
                                    languageCode: doc.languageCode,
                                    status: doc.status,
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
                                label="Xóa ngôn ngữ"
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
        languages && (
            <Box className="mx-10 px-6 py-8 bg-white shadow-sm rounded-xl max-h-max border border-dashed border-primary-border  ">
                <Flex align="center" justify="space-between">
                    <Box>
                        <Title className="text-lg text-primary-black uppercase">
                            Danh Sách Ngôn Ngữ
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
                            className="min-h-[42px] rounded-lg bg-success-opcity text-success text-sm text-primary-white font-medium"
                            leftSection={<AddIcon size={18} />}
                            onClick={openCreate}
                        >
                            Thêm mới
                        </Button>
                    </Box>
                </Flex>

                {/* Bộ lọc */}
                <Flex className="w-full sm:w-1/2 mt-4 mb-6 flex flex-col sm:grid sm:grid-cols-12 gap-4">
                    <Controller
                        control={control}
                        name="status"
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

                    <TextInput
                        className="col-span-6"
                        leftSection={<SearchIcon size={20} />}
                        placeholder="Tìm kiếm ngôn ngữ"
                        styles={{
                            input: {
                                paddingLeft: 36,
                            },
                            section: {
                                marginLeft: 4,
                            },
                        }}
                        {...register('description')}
                    />
                </Flex>
                {/* Tabel */}
                <Box className="m-[auto] w-full ease-in-out duration-300">
                    <DataTable
                        columns={columns}
                        query={debouncedQuery}
                        useData={useGetDataLanguagesQuery}
                    />
                </Box>

                {/* Thêm mới  */}
                <Modal
                    centered
                    onClose={closeCreate}
                    opened={openedCreate}
                    size="lg"
                    title={
                        <Text className="text-lg font-semibold">
                            Thêm mới ngôn ngữ
                        </Text>
                    }
                    transitionProps={{ transition: 'fade', duration: 200 }}
                    xOffset={0}
                    yOffset="1vh"
                >
                    <AddLanguage onClose={closeCreate} />
                </Modal>

                {/* Cập nhật  */}
                <Modal
                    centered
                    onClose={closeUpdate}
                    opened={openedUpdate}
                    size="lg"
                    title={
                        <Text className="text-lg font-semibold">
                            Cập nhật ngôn ngữ
                        </Text>
                    }
                    transitionProps={{ transition: 'fade', duration: 200 }}
                    xOffset={0}
                    yOffset="1vh"
                >
                    <UpdateLanguage language={language} onClose={closeUpdate} />
                </Modal>

                {/* confirm  */}
                <CustomConfirm
                    onCancel={closeConfirm}
                    onClose={closeConfirm}
                    onConfirm={handleDelete}
                    opened={opendConfirm}
                >
                    <Box className="my-1">
                        <Text className="text-sm">
                            Hàng động thực hiện có thể ảnh hưởng dữ liệu của bạn
                        </Text>
                    </Box>
                </CustomConfirm>
            </Box>
        )
    );
};

export default Language;
