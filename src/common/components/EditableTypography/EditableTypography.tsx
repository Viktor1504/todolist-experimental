import {ChangeEvent, useState} from 'react';
import {TextField, Typography} from '@mui/material';

type Props = {
    value: string;
    onChange: (value: string) => void;
}

export const EditableTypography = ({value, onChange}: Props) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(value)

    const deactivateEditModeHandler = () => {
        onChange(title)
        setEditMode(false)
    }
    const activateEditModeHandler = () => {
        setEditMode(true)
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        <>
            {
                editMode ?
                    <TextField
                        value={title}
                        variant={'outlined'}
                        onChange={handleChange}
                        onBlur={deactivateEditModeHandler}
                        size={'small'}
                        autoFocus
                    /> :
                    <Typography variant="inherit" onDoubleClick={activateEditModeHandler}>{title}</Typography>
            }
        </>
    )
}