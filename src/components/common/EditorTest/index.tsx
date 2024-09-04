// import { useUploadImageMutation } from '@src/redux/endPoint/upload_image';
import { Editor } from '@tinymce/tinymce-react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const window: any;

export default function TinyMCE() {
    // const [uploadFile] = useUploadImageMutation();

    return (
        <>
            <Editor
                apiKey="x3cc544zg5imjhq9psigzawmtnqr0thb4eyf3mn7dwdu8z0q"
                initialValue="<p>Try adding an image with image upload!</p>"
                onEditorChange={(e) => {
                    console.log('e', e);
                }}
                init={{
                    height: 500,
                    plugins: [
                        'advlist',
                        'autolink',
                        'lists',
                        'link',
                        'image',
                        'charmap',
                        'preview',
                        'anchor',
                        'searchreplace',
                        'visualblocks',
                        'code',
                        'fullscreen',
                        'insertdatetime',
                        'media',
                        'table',
                        'code',
                        'help',
                        'wordcount',
                    ],
                    toolbar:
                        'undo redo | styles | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
                    image_title: true,
                    automatic_uploads: true,
                    file_picker_types: 'image',
                    images_upload_base_path: `https://cms.tektra.vn/api/uploadFile`,
                    images_upload_credentials: true,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
                    file_picker_callback: function (cb, value: any, meta: any) {
                        const input = document.createElement('input');
                        input.setAttribute('type', 'file');
                        input.setAttribute('accept', 'image/*');
                        const url = `https://cms.tektra.vn/api/uploadFile`;
                        const xhr = new XMLHttpRequest();
                        const fd = new FormData();
                        xhr.open('POST', url, true);

                        // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
                        input.onchange = function (e: any) {
                            const file = e?.target?.files?.[0];
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            const reader = new FileReader() as any;
                            xhr.onload = function () {
                                if (
                                    xhr.readyState === 4 &&
                                    xhr.status === 200
                                ) {
                                    // File uploaded successfully
                                    const response = JSON.parse(
                                        xhr.responseText,
                                    );
                                    const url = `https://cms.tektra.vn/api${response.data}`;
                                    cb(url, {
                                        title: response.original_filename,
                                    });
                                }
                            };

                            reader.onload = function () {
                                const id = 'blobid' + new Date().getTime();
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                const blobCache =
                                    window?.tinymce?.activeEditor.editorUpload
                                        .blobCache;
                                const base64 = reader?.result?.split(',')?.[1];

                                const blobInfo = blobCache.create(
                                    id,
                                    file,
                                    base64,
                                );
                                blobCache.add(blobInfo);

                                // call the callback and populate the Title field with the file name

                                fd.append(
                                    'file',
                                    blobInfo.blob(),
                                    blobInfo.filename(),
                                );

                                xhr.send(fd);
                            };

                            reader.readAsDataURL(file);
                        };

                        input.click();
                    },
                }}
            />
        </>
    );
}
