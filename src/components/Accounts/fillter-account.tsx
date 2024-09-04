import { Input, Select } from '@mantine/core';
import React, { FC } from 'react';
import SearchIcon from '../common/icon/search-icon';
import { Controller, useForm } from 'react-hook-form';
import { STATUS } from '@src/utils/enum';
interface Props {
    className?: string;
}

const FillterAccounts: FC<Props> = ({ className }) => {
    // const { replace, pathname } = useRouter();

    // const dispatch = useDispatch();
    // const { page } = useSelector((state: RootState) => state.pagesNews);

    // const {
    //     data: newsTypes,
    //     isLoading: isLoadingNewsType,
    //     isFetching: isFetchingNewsType,
    // } = useGetNewsTypesQuery();

    // const { register, handleSubmit, control, watch, setValue } = useForm();

    // const searchTitle = watch('search_title');
    // const selectedNewsType = watch('news_type');
    // const selectedStatus = watch('status');
    // const selectedIsHot = watch('is_hot');

    // const debounced = useDebounce(searchTitle, 500);

    // useEffect(() => {
    //     const replaceFillter = () => {
    //         replace({
    //             pathname: pathname,
    //             query: {
    //                 page: page,
    //                 ...(watch('search_title') && {
    //                     title: String(searchTitle),
    //                 }),
    //                 ...(watch('news_type') && {
    //                     news_type: Number(selectedNewsType),
    //                 }),
    //                 ...(watch('status') && { status: Number(selectedStatus) }),
    //                 ...(watch('is_hot') && { is_hot: Number(selectedIsHot) }),
    //             },
    //         });
    //     };

    //     const timeoutId = setTimeout(replaceFillter, 500);
    //     return () => clearTimeout(timeoutId);
    // }, [
    //     page,
    //     searchTitle,
    //     selectedNewsType,
    //     selectedStatus,
    //     selectedIsHot,
    //     debounced,
    // ]);

    const { register, control } = useForm();
    return (
        <div className={className}>
            <form>
                <div className="w-full flex gap-2 justify-end  order-last ">
                    <div className="w-full flex gap-5 flex-wrap py-[20px]">
                        <Input.Wrapper
                            className="rounded-md md:w-[20rem] sm:w-[10rem]"
                            label="Tên tài khoản"
                        >
                            <Input
                                leftSection={
                                    <SearchIcon fill="#000000" size={18} />
                                }
                                placeholder="Nhập tên cần tìm kiếm..."
                                size="sm"
                                type="search"
                                {...register('search_title')}
                            />
                        </Input.Wrapper>
                        <Controller
                            control={control}
                            name="status"
                            render={({ field: { onChange } }) => {
                                return (
                                    <Select
                                        className="w-[full] sm:w-[10rem]  h-10 p-0"
                                        data={STATUS}
                                        defaultValue="3"
                                        label="Trạng thái"
                                        onChange={onChange}
                                        size="sm"
                                    />
                                );
                            }}
                        />
                        {/* {newsTypes?.data && (
                            <Controller
                                name="news_type"
                                control={control}
                                render={({ field: { onChange, value } }) => {
                                    return (
                                        <Select
                                            label="Loại tin"
                                            className="md:w-[20rem] sm:w-[10rem] h-10 p-0"
                                            size="sm"
                                            onChange={onChange}
                                        >
                                            {newsTypes?.data.map((type) => (
                                                <SelectItem
                                                    key={type.id}
                                                    value={type.id}
                                                >
                                                    {type.name}
                                                </SelectItem>
                                            ))}
                                        </Select>
                                    );
                                }}
                            />
                        )}
                        <Controller
                            name="is_hot"
                            control={control}
                            render={({ field: { onChange, value } }) => {
                                return (
                                    <Select
                                        label="Tin nổi bật"
                                        className="md:w-[20rem] sm:w-[10rem]  h-10 p-0"
                                        size="sm"
                                        onChange={onChange}
                                    >
                                        {IS_HOT.map((status) => (
                                            <SelectItem
                                                key={status.value}
                                                value={status.value}
                                            >
                                                {status.label}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                );
                            }}
                        /> */}
                    </div>
                </div>
            </form>
        </div>
    );
};
FillterAccounts.defaultProps = {
    className: '',
};
export default FillterAccounts;
