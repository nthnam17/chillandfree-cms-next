/* eslint-disable jsx-a11y/alt-text */
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { DeleteIcon } from '../icon/delete-icon';
import { Box, Image, Loader, TextInput } from '@mantine/core';
import { useUploadImageMutation } from '@src/redux/endPoint/upload_image';
import { notifications } from '@mantine/notifications';
import TooltipCustom from '../tooltip';
import { log } from 'console';

interface UploadImageProps {
    getDataFn: (data: string) => void;
    className?: string;
    setData?: string;
}

const UploadImage = ({ getDataFn, setData, className }: UploadImageProps) => {
    const inputFileRef = useRef<HTMLInputElement | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>('');
    const [spinner, setSpinner] = useState<boolean | null>(false);
    const [uploadImage] = useUploadImageMutation();
    useEffect(() => {
        if (setData) {
            setSelectedImage(setData);
            getDataFn(setData);
        }
    }, [setData]);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSpinner(true);
        const selectedFiles = event.target.files;
        if (selectedFiles && selectedFiles.length > 0) {
            const formData = new FormData();
            for (let i = 0; i < selectedFiles.length; i++) {
                formData.append('files', selectedFiles[i]);
                formData.append('upload_preset', 'my-uploads');
            }
            callApiUploadImg(formData);
        }
    };

    const callApiUploadImg = async (param: FormData) => {
        try {
            if (param) {
                const data = await uploadImage(param).unwrap();
                setSelectedImage(`/downloadFile/${data?.src}`);
                getDataFn(`/downloadFile/${data?.src}`);
                setSpinner(false);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            notifications.show({
                title: 'Lỗi',
                color: '#ef476f',
                autoClose: 2000,
                message: JSON.stringify(error?.data?.message),
            });
            setSpinner(false);
        }
    };

    const handleClickSelectFile = () => {
        if (inputFileRef.current) {
            inputFileRef.current.value = '';
            inputFileRef.current.click();
        }
    };

    const handleClearImage = () => {
        setSelectedImage(null);
        getDataFn('');
        if (inputFileRef.current) {
            inputFileRef.current.value = '';
        }
    };
    return (
        <div className="relative w-full h-full">
            <div
                className="w-full h-full mx-auto cursor-pointer"
                onClick={handleClickSelectFile}
            >
                <TextInput
                    className="w-full h-full hidden"
                    multiple
                    onChange={handleFileChange}
                    ref={inputFileRef}
                    type="file"
                />
                {spinner && (
                    <Loader
                        className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] z-50"
                        color="green"
                    />
                )}
                <Image
                    className={`w-full h-full p-2 bg-primary-border ${
                        className ? className : 'object-contain'
                    }`}
                    src={
                        selectedImage
                            ? `${process.env.PUBLIC_IMAGE_API_BASE_URL}${selectedImage}`
                            : '/upload-one.png'
                    }
                />
            </div>
            {selectedImage && (
                <Box
                    className="absolute z-50 top-[0] right-0 max-h-full bg-[#ffdbe4] hover:bg-[#f8f8f8] p-1 rounded-full text-delete cursor-pointer"
                    onClick={handleClearImage}
                >
                    <TooltipCustom
                        color="#ef466f"
                        element={<DeleteIcon />}
                        label="Xóa ảnh"
                    />
                </Box>
            )}
        </div>
    );
};

export default UploadImage;
