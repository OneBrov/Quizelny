import { Button } from '@material-ui/core'
import React from 'react'

interface FileButtonProps {
    value: any
    type: "audio" | "image"
    onChange: () => void
}

export const FileButton: React.FC<FileButtonProps> = ({
    value, type, onChange
}) => {
    return (
                <Button
                    className=" mb-10"
                    variant="contained"
                    component="label"
                >
                    Загрузить {type === "image"? "изображение" : "аудио"} 
                    <input
                        value={value}
                        type="file"
                        accept={`${type}/*`}
                        hidden
                        onChange={(e) => onChange(e)}
                    />
                </Button>
    )
}
