import { Box, Button, Flex, Select, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import CloseIcon from '@src/components/common/icon/close-icon';
import SaveIcon from '@src/components/common/icon/save-icon';
import { useCreateLanguageMutation } from '@src/redux/endPoint/language';
import { STATUS } from '@src/utils/contants';
import { Controller, useForm } from 'react-hook-form';

type Props = {
    onClose: () => void;
};

const AddLanguage = ({ onClose }: Props) => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        mode: 'onTouched',
    });

    const [createLanguage] = useCreateLanguageMutation();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSubmit = async (data: any) => {
        try {
            const payload = {
                ...data,
                status: data.status ? Number(data.status) : 1,
            };

            await createLanguage(payload).unwrap();

            onClose();
            notifications.show({
                title: 'Thành công',
                color: '#06d6a0',
                autoClose: 2000,
                message: 'Thêm mới ngôn ngữ thành công',
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

    return (
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Box className="w-full">
                <TextInput
                    className="w-full"
                    label="Ngôn ngữ"
                    mt="md"
                    placeholder="Ngôn ngữ"
                    required
                    {...register('description', {
                        required: 'Không được để trống ',
                        validate: (value) => {
                            return !!value.trim() || 'Không được để trống';
                        },
                    })}
                    error={errors?.description?.message as string}
                    styles={{
                        input: {
                            borderColor: errors?.description
                                ? 'red'
                                : '#e9ecee',
                        },
                    }}
                />
                <TextInput
                    className="w-full"
                    label="Mã code"
                    mt="md"
                    placeholder="Mã code"
                    required
                    {...register('languageCode', {
                        required: 'Không được để trống ',
                        validate: (value) => {
                            return !!value.trim() || 'Không được để trống';
                        },
                    })}
                    error={errors?.languageCode?.message as string}
                    styles={{
                        input: {
                            borderColor: errors?.languageCode
                                ? 'red'
                                : '#e9ecee',
                        },
                    }}
                />
                <Controller
                    control={control}
                    name="status"
                    render={({ field }) => (
                        <Select
                            className="col-span-3"
                            data={STATUS.filter((val) => val.id).map(
                                (item: {
                                    id: number | string;
                                    name: string;
                                }) => ({
                                    label: item.name,
                                    value: String(item.id),
                                }),
                            )}
                            label="Trạng thái"
                            mt="md"
                            placeholder="-- Trạng thái --"
                            {...field}
                            defaultValue="1"
                        />
                    )}
                />
            </Box>
            <Flex className="flex justify-end gap-4 mt-6">
                <Button
                    className="h-[42px] max-h-full text-sm font-normal bg-success-opcity text-success"
                    leftSection={<SaveIcon size={18} strokeWidth={2} />}
                    type="submit"
                >
                    Thêm ngôn ngữ
                </Button>
                <Button
                    className="h-[42px] max-h-full text-sm font-normal bg-delete-opcity  text-delete"
                    leftSection={<CloseIcon size={18} strokeWidth={2} />}
                    onClick={onClose}
                >
                    Hủy bỏ
                </Button>
            </Flex>
        </form>
    );
};

export default AddLanguage;
