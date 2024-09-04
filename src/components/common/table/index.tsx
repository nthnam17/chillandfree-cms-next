import {
    Box,
    Center,
    Group,
    Image,
    Pagination,
    Skeleton,
    Table,
    Text,
} from '@mantine/core';
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import DownIcon from '../icon/down-icon';
import DownUpIcon from '../icon/down-up-icon';
import UpIcon from '../icon/up-icon';

interface TableProps<T extends object> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useData?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    query?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    columns?: ColumnDef<T, any>[];
    defaultPageSize?: number;
}

const DataTable = <T extends object>({
    useData,
    query = {},
    columns = [],
    defaultPageSize = 10,
}: TableProps<T>) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [data, setData] = useState([]);
    const [controlledPageCount, setPageCount] = useState(0);
    const [recordsPerPage, setRecordsPerPage] = useState(defaultPageSize);

    const tableInstance = useReactTable({
        columns,
        data,
        state: {
            sorting: sorting,
        },
        initialState: {
            pagination: {
                pageIndex: 0,
                pageSize: recordsPerPage,
            },
            sorting: sorting,
        },
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        debugTable: true,
        manualPagination: true,
        pageCount: controlledPageCount,
    });

    const {
        data: result,
        isLoading,
        isFetching,
    } = useData({
        ...query,
        page: tableInstance.getState().pagination.pageIndex + 1,
    });

    useEffect(() => {
        setLoading(isLoading || isFetching);
        setData(!(isLoading || isFetching) ? result?.data : []);
        setPageCount(result?.totalPages);
        setRecordsPerPage(result?.pageSize);
    }, [
        result,
        tableInstance.getState().pagination.pageIndex,
        tableInstance.getState().pagination.pageSize,
    ]);

    return (
        <Center w="100%">
            <Box className="w-full rounded-xl overflow-auto border border-dashed border-primary-border">
                <Table className="w-full ">
                    <Table.Thead bg="#f4f6f8" w="100%">
                        {tableInstance.getHeaderGroups().map((headerGroup) => (
                            <Table.Tr
                                className="border-none"
                                key={headerGroup.id}
                            >
                                {headerGroup.headers.map((header) => (
                                    <Table.Th
                                        className="px-5 py-2 text-primary-gray"
                                        key={header.id}
                                    >
                                        {header.isPlaceholder ? null : (
                                            <span
                                                {...{
                                                    className:
                                                        header.column.getCanSort()
                                                            ? 'cursor-pointer select-none flex gap-1 items-center'
                                                            : '',
                                                    onClick:
                                                        header.column.getToggleSortingHandler(),
                                                }}
                                            >
                                                {flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext(),
                                                )}
                                                {{
                                                    asc: <UpIcon size={16} />,
                                                    desc: (
                                                        <DownIcon size={16} />
                                                    ),
                                                }[
                                                    header.column.getIsSorted() as string
                                                ] ??
                                                    ((header.id as string) !=
                                                        'actions' &&
                                                        (header.id as string) !=
                                                            '#' && (
                                                            <DownUpIcon
                                                                size={12}
                                                            />
                                                        ))}
                                            </span>
                                        )}
                                    </Table.Th>
                                ))}
                            </Table.Tr>
                        ))}
                    </Table.Thead>

                    {data?.length != 0 && (
                        <Table.Tbody className="h-auto">
                            {tableInstance.getRowModel().rows.map((row) => (
                                <Table.Tr
                                    className="transition-all"
                                    key={row.id}
                                >
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <Table.Td
                                                className="max-w-[20rem] overflow-hidden px-5 py-2 border-primary-border border-b border-dashed "
                                                key={cell.id}
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext(),
                                                )}
                                            </Table.Td>
                                        );
                                    })}
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                    )}
                </Table>
                {data?.length == 0 && !loading && (
                    <Box className="w-full relative h-[200px]">
                        <Box className=" absolute w-full h-full flex flex-col justify-center items-center">
                            <Box className="w-[96px] h-[96px]">
                                <Image
                                    alt="imag"
                                    className="w-full h-full object-cover "
                                    src="/ic_content.svg"
                                />
                            </Box>
                            <Text className="text-sm font-semibold">
                                Không có dữ liệu
                            </Text>
                        </Box>
                    </Box>
                )}
                {loading && (
                    <Box className="w-full relative h-[500px]">
                        <Box className="absolute w-full h-full flex flex-col gap-4 justify-center items-center px-4 p-4">
                            {Array(10)
                                .fill(0)
                                .map((item, index) => {
                                    return (
                                        <Skeleton
                                            className="w-full rounded h-[64px] px-4"
                                            key={index}
                                        />
                                    );
                                })}
                        </Box>
                    </Box>
                )}
                {data?.length > 0 && (
                    <Box className="flex justify-end my-4 px-4">
                        <Pagination.Root
                            onChange={(page: number) => {
                                return tableInstance.setPageIndex(page - 1);
                            }}
                            total={Number(tableInstance.getPageCount())}
                        >
                            <Group gap={5} justify="center">
                                <Pagination.Previous />
                                <Pagination.Items />
                                <Pagination.Next />
                            </Group>
                        </Pagination.Root>
                    </Box>
                )}
            </Box>
        </Center>
    );
};

export default DataTable;
