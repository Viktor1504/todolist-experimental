import {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField, Typography, Tooltip} from '@mui/material';

type Props = {
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
};

export const EditableTypography = ({value, onChange, disabled = false}: Props) => {
    const [editMode, setEditMode] = useState(false);
    const [tempValue, setTempValue] = useState(value);

    const activateEditMode = () => {
        if (disabled) {
            return
        }
        setEditMode(true);
    }
    const deactivateEditMode = () => {
        if (tempValue !== value) {
            onChange(tempValue);
        }
        setEditMode(false);
    };

    const cancelEditMode = () => {
        setTempValue(value);
        setEditMode(false);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTempValue(e.currentTarget.value);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') deactivateEditMode();
        if (e.key === 'Escape') cancelEditMode();
    };

    return (
        <>
            {editMode ? (
                <TextField
                    value={tempValue}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onBlur={deactivateEditMode}
                    size="small"
                    autoFocus
                    variant="outlined"
                />
            ) : (
                <Tooltip title="Дважды кликните для редактирования" arrow>
                    <Typography
                        variant="inherit"
                        onDoubleClick={activateEditMode}
                        sx={{
                            cursor: 'pointer',
                            '&:hover': {
                                color: 'primary.main',
                                textDecoration: 'underline',
                            },
                        }}
                    >
                        {value}
                    </Typography>
                </Tooltip>
            )}
        </>
    );
};
