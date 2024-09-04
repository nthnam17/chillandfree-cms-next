import React from 'react';
import { Button, Flex, Modal, Text } from '@mantine/core';

type Props = {
    opened?: boolean;
    title?: string | React.ReactNode;
    children?: React.ReactNode;
    confirm?: string | React.ReactNode;
    cancel?: string | React.ReactNode;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onCancel: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onConfirm: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClose: any;
};

const CustomConfirm = ({
    opened = false,
    children,
    onClose,
    onCancel,
    onConfirm,
    cancel = 'Hủy',
    confirm = 'Đồng ý',
    title = 'Bạn có muốn xóa bỏ bản ghi này không?',
} // eslint-disable-next-line @typescript-eslint/no-explicit-any
: Props): any => {
    return (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <Modal
            centered
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onClose={onClose as any}
            opened={opened}
            size="lg"
            title={<Text className="text-base font-semibold">{title}</Text>}
        >
            {children}

            <Flex className="w-full flex items-center justify-end gap-4">
                <Button
                    className="h-[42px] max-h-full rounded-md bg-success-opcity text-success"
                    onClick={async () => {
                        await onConfirm();
                        onCancel();
                    }}
                >
                    {confirm}
                </Button>
                <Button
                    className="h-[42px] max-h-full rounded-md bg-delete-opcity text-delete"
                    onClick={async () => {
                        await onCancel();
                        onClose();
                    }}
                >
                    {cancel}
                </Button>
            </Flex>
        </Modal>
    );
};

export default CustomConfirm;
