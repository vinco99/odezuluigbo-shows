"use client";

import { CldUploadWidget } from "next-cloudinary";


type ImageUploaderProps = {
    folder: string,
    onUpload: (url: string, publicId: string) => void;
};


export default function ImageUploader({folder,onUpload}: ImageUploaderProps) {
    return (
        <CldUploadWidget
            signatureEndpoint="/api/cloudinary/sign"
            options={{
                resourceType: "image",
                folder,
                multiple: false,
                maxFileSize: 5_000_000,
                clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
            }}
            onSuccess={(result) => {
                if (
                    typeof result.info === "object" &&
                    result.info &&
                    "secure_url" in result.info &&
                    "public_id" in result.info
                ) {
                    onUpload(
                        result.info.secure_url as string,
                        result.info.public_id as string
                    );
                }
            }}
        >
            {({ open }) => (
                <button className="btn btn-outline" type="button" onClick={() => open()}>
                    Upload Image
                </button>
            )}
        </CldUploadWidget>
    );
}